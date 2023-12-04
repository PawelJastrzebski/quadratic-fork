//! Shared State
//!
//! Store information about the state of the application in a send + sync
//! struct.  All access and mutations to state should be performed here.

use std::{collections::HashMap, sync::Arc};

use anyhow::{anyhow, Result};
use axum::extract::ws::{Message, WebSocket};
use futures_util::stream::SplitSink;
use serde::Serialize;
use tokio::sync::Mutex;
use uuid::Uuid;

#[derive(Serialize, Debug, Clone)]
pub(crate) struct User {
    #[serde(skip_serializing)]
    pub(crate) id: String,
    pub(crate) first_name: String,
    pub(crate) last_name: String,
    pub(crate) image: String,
    #[serde(skip_serializing)]
    pub(crate) socket: Option<Arc<Mutex<SplitSink<WebSocket, Message>>>>,
}

impl PartialEq for User {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
            && self.first_name == other.first_name
            && self.last_name == other.last_name
            && self.image == other.image
    }
}

#[derive(Serialize, Debug, Clone, PartialEq)]
pub(crate) struct Room {
    pub(crate) file_id: Uuid,
    pub(crate) users: HashMap<String, User>,
}

impl Room {
    pub(crate) fn new(file_id: Uuid) -> Self {
        Room {
            file_id,
            users: HashMap::new(),
        }
    }
}

#[derive(Debug)]
pub(crate) struct State {
    pub(crate) rooms: Mutex<HashMap<Uuid, Room>>,
}

impl State {
    pub(crate) fn new() -> Self {
        State {
            rooms: Mutex::new(HashMap::new()),
        }
    }

    /// Retrieves a copy of a room.
    pub(crate) async fn get_room(&self, file_id: &Uuid) -> Result<Room> {
        let rooms = self.rooms.lock().await;
        let room = rooms
            .get(file_id)
            .ok_or(anyhow!("Room {file_id} not found"))?
            .to_owned();

        Ok(room)
    }

    /// Add a user to a room.  If the room doesn't exist, it is created.  Users
    /// are only added to a room once (HashMap).
    pub(crate) async fn enter_room(&self, file_id: Uuid, user: &User) -> bool {
        let mut rooms = self.rooms.lock().await;
        let room = rooms.entry(file_id).or_insert_with(|| Room::new(file_id));

        let user_id = user.id.clone();

        tracing::trace!("User {:?} entered room {:?}", user, room);

        room.users.insert(user_id, user.clone()).is_none()
    }

    /// Removes a user from a room. If the room is empty, it deletes the room.
    /// Returns true if the room still exists after the user leaves.
    pub(crate) async fn leave_room(&self, file_id: Uuid, user_id: &String) -> bool {
        let mut rooms = self.rooms.lock().await;

        // todo: there's probably a better way of handling the case where the room does not exist
        let room = rooms.entry(file_id).or_insert_with(|| Room::new(file_id));
        room.users.remove(user_id);

        // remove the room if it's empty
        if room.users.len() == 0 {
            rooms.remove(&file_id);
            tracing::trace!(
                "User {:?} left room {:?}. Room deleted because it was empty.",
                user_id,
                file_id
            );
            false
        } else {
            tracing::trace!("User {:?} left room {:?}", user_id, room);
            true
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::test_util::new_user;

    use super::*;

    #[tokio::test]
    async fn enters_and_retrieves_a_room() {
        let state = State::new();
        let file_id = Uuid::new_v4();
        let user = new_user();

        let is_new = state.enter_room(file_id, &user).await;
        let room = state.get_room(&file_id).await.unwrap();
        let user = room.users.get(&user.id).unwrap();

        assert!(is_new);
        assert_eq!(state.rooms.lock().await.len(), 1);
        assert_eq!(room.users.len(), 1);
        assert_eq!(room.users.get(&user.id), Some(user));
    }
}
