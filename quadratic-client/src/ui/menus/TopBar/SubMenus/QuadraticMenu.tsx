import { Check } from '@mui/icons-material';
import { Menu, MenuDivider, MenuItem, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useParams } from 'react-router';
import { useNavigate, useSubmit } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  copyAction,
  createNewFileAction,
  cutAction,
  deleteFile,
  downloadFileAction,
  duplicateFileAction,
  isViewerOrAbove,
  pasteAction,
  provideFeedbackAction,
  redoAction,
  undoAction,
  viewDocsAction,
} from '../../../../actions';
import { editorInteractionStateAtom } from '../../../../atoms/editorInteractionStateAtom';
import { authClient } from '../../../../auth';
import { useGlobalSnackbar } from '../../../../components/GlobalSnackbarProvider';
import { ROUTES } from '../../../../constants/routes';
import { copyToClipboard, cutToClipboard, pasteFromClipboard } from '../../../../grid/actions/clipboard/clipboard';
import { grid } from '../../../../grid/controller/Grid';
import { pixiApp } from '../../../../gridGL/pixiApp/PixiApp';
import { focusGrid } from '../../../../helpers/focusGrid';
import { KeyboardSymbols } from '../../../../helpers/keyboardSymbols';
import { useRootRouteLoaderData } from '../../../../router';
import { isMac } from '../../../../utils/isMac';
import { useFileContext } from '../../../components/FileProvider';
import { MenuLineItem } from '../MenuLineItem';
import { TopBarMenuItem } from '../TopBarMenuItem';
import { useGridSettings } from './useGridSettings';

export const QuadraticMenu = () => {
  const [editorInteractionState, setEditorInteractionState] = useRecoilState(editorInteractionStateAtom);
  const settings = useGridSettings();

  const navigate = useNavigate();
  const submit = useSubmit();
  const { uuid } = useParams() as { uuid: string };
  const { addGlobalSnackbar } = useGlobalSnackbar();
  const { name, syncState } = useFileContext();
  const { isAuthenticated } = useRootRouteLoaderData();
  const { permission } = editorInteractionState;

  // For mobile, set Headers to not visible by default
  useEffect(() => {
    if (isMobile) {
      settings.setShowHeadings(false);
      pixiApp.viewportChanged();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Menu
        menuButton={({ open }) => (
          <TopBarMenuItem title="Main menu" open={open}>
            <img src="/favicon.ico" width="22" height="22" alt="Quadratic Icon" />
          </TopBarMenuItem>
        )}
      >
        {isViewerOrAbove(permission) && (
          <>
            <MenuItem disabled={syncState === 'syncing'} href={ROUTES.FILES} style={{ textDecoration: 'none' }}>
              <MenuLineItem primary="Back to files" />
            </MenuItem>
            <MenuDivider />
          </>
        )}
        <MenuItem
          onClick={() => {
            setEditorInteractionState({
              ...editorInteractionState,
              showCommandPalette: true,
            });
            focusGrid();
          }}
        >
          <MenuLineItem primary="Command palette" secondary={KeyboardSymbols.Command + 'P'} />
        </MenuItem>
        <MenuDivider />
        {isViewerOrAbove(permission) && (
          <SubMenu label={<MenuLineItem primary="File" />}>
            {createNewFileAction.isAvailable(permission) && (
              <MenuItem onClick={() => createNewFileAction.run({ navigate })}>
                <MenuLineItem primary={createNewFileAction.label} />
              </MenuItem>
            )}
            {duplicateFileAction.isAvailable(permission) && (
              <MenuItem onClick={() => duplicateFileAction.run({ name, submit })}>
                <MenuLineItem primary={duplicateFileAction.label} />
              </MenuItem>
            )}
            {downloadFileAction.isAvailable(permission) && (
              <MenuItem
                onClick={() => {
                  downloadFileAction.run({ name });
                }}
              >
                <MenuLineItem primary={downloadFileAction.label} />
              </MenuItem>
            )}
            {deleteFile.isAvailable(permission) && (
              <>
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    deleteFile.run({ uuid, addGlobalSnackbar });
                  }}
                >
                  <MenuLineItem primary={deleteFile.label} />
                </MenuItem>
              </>
            )}
          </SubMenu>
        )}
        <SubMenu label={<MenuLineItem primary="Edit" />}>
          {undoAction.isAvailable(permission) && (
            <MenuItem onClick={() => grid.undo()} disabled={!grid.hasUndo()}>
              <MenuLineItem primary={undoAction.label} secondary={KeyboardSymbols.Command + 'Z'} />
            </MenuItem>
          )}
          {redoAction.isAvailable(permission) && (
            <>
              <MenuItem onClick={() => grid.redo()} disabled={!grid.hasRedo()}>
                <MenuLineItem
                  primary={redoAction.label}
                  secondary={
                    isMac ? KeyboardSymbols.Command + KeyboardSymbols.Shift + 'Z' : KeyboardSymbols.Command + 'Y'
                  }
                />
              </MenuItem>
              <MenuDivider />
            </>
          )}

          {cutAction.isAvailable(permission) && (
            <MenuItem onClick={cutToClipboard}>
              <MenuLineItem primary={cutAction.label} secondary={KeyboardSymbols.Command + 'X'} />
            </MenuItem>
          )}
          <MenuItem onClick={copyToClipboard}>
            <MenuLineItem primary={copyAction.label} secondary={KeyboardSymbols.Command + 'C'} />
          </MenuItem>
          {pasteAction.isAvailable(permission) && (
            <MenuItem onClick={pasteFromClipboard}>
              <MenuLineItem primary={pasteAction.label} secondary={KeyboardSymbols.Command + 'V'} />
            </MenuItem>
          )}
        </SubMenu>
        <SubMenu label={<MenuLineItem primary="View" />}>
          <MenuItem onClick={() => settings.setShowHeadings(!settings.showHeadings)}>
            <MenuLineItem primary="Show row and column headings" Icon={settings.showHeadings && Check} indent />
          </MenuItem>
          <MenuItem onClick={() => settings.setShowGridAxes(!settings.showGridAxes)}>
            <MenuLineItem primary="Show grid axis" Icon={settings.showGridAxes && Check} indent />
          </MenuItem>
          <MenuItem onClick={() => settings.setShowGridLines(!settings.showGridLines)}>
            <MenuLineItem primary="Show grid lines" Icon={settings.showGridLines && Check} indent />
          </MenuItem>
          <MenuItem onClick={() => settings.setShowCellTypeOutlines(!settings.showCellTypeOutlines)}>
            <MenuLineItem primary="Show code cell outlines" Icon={settings.showCellTypeOutlines && Check} indent />
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => settings.setPresentationMode(!settings.presentationMode)}>
            <MenuLineItem primary="Presentation mode" Icon={settings.presentationMode && Check} indent />
          </MenuItem>
          {/*
          Commented out because the editor switches this state automatically when the user
          is editing a formula.
          <MenuItem
            type="checkbox"
            checked={settings.showA1Notation}
            onClick={() => settings.setShowA1Notation(!settings.showA1Notation)}
          >
            Show A1 notation on headings
          </MenuItem> */}
        </SubMenu>

        <SubMenu label={<MenuLineItem primary="Help" />}>
          <MenuItem onClick={() => viewDocsAction.run()}>
            <MenuLineItem primary={viewDocsAction.label} />
          </MenuItem>
          {provideFeedbackAction.isAvailable(permission) && (
            <MenuItem onClick={() => provideFeedbackAction.run({ setEditorInteractionState })}>
              <MenuLineItem primary={provideFeedbackAction.label} />
            </MenuItem>
          )}
        </SubMenu>

        {isAuthenticated && (
          <>
            <MenuDivider />
            <MenuItem onClick={() => authClient.logout()}>
              <MenuLineItem primary="Log out" />
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};
