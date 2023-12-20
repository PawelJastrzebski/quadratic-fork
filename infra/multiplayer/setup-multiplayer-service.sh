#!/bin/bash
# Create a systemd service
cat <<EOF | sudo tee /etc/systemd/system/quadratic-multiplayer.service
[Unit]
Description=Quadratic Multiplayer Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/home/ubuntu/
ExecStart=/home/ubuntu/quadratic-multiplayer
Restart=always
Environment="HOST=0.0.0.0"
Environment="PORT=80"
Environment="HEARTBEAT_CHECK_S=15"
Environment="HEARTBEAT_TIMEOUT_S=60"
Environment="AUTHENTICATE_JWT=false"
Environment="QUADRATIC_API_URI="
Environment="QUADRATIC_API_JWT=ADD_TOKEN_HERE"
Environment="AUTH0_JWKS_URI=https://dev-nje7dw8s.us.auth0.com/.well-known/jwks.json"

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd to recognize the new service
sudo systemctl daemon-reload

# Enable and start the servicesudo systemctl status quadratic-multiplayer.service
sudo systemctl status quadratic-multiplayer.service

sudo systemctl enable quadratic-multiplayer

# sudo systemctl start quadratic-multiplayer
# view logs of service
# journalctl -u quadratic-multiplayer.service

echo 'Install Data Dog Agent'
DD_ENV={{DD_ENV}} DD_API_KEY={{DD_API_KEY}} DD_SITE="us5.datadoghq.com" DD_APM_INSTRUMENTATION_ENABLED=host bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"