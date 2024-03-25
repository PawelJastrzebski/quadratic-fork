import {
  JsCodeCell,
  JsHtmlOutput,
  JsRenderBorders,
  JsRenderCodeCell,
  JsRenderFill,
  SheetBounds,
  SheetInfo,
} from '@/quadratic-core-types';
import { PythonStateType } from '@/web-workers/pythonWebWorker/pythonClientMessages';
import {
  CoreClientImportProgress,
  CoreClientTransactionProgress,
  CoreClientTransactionStart,
} from '@/web-workers/quadraticCore/coreClientMessages';
import EventEmitter from 'eventemitter3';

interface EventTypes {
  undoRedo: (undo: boolean, redo: boolean) => void;

  addSheet: (sheetInfo: SheetInfo, user: boolean) => void;
  deleteSheet: (sheetId: string, user: boolean) => void;
  sheetInfo: (sheetInfo: SheetInfo[]) => void;
  sheetInfoUpdate: (sheetInfo: SheetInfo) => void;
  changeSheet: () => void;
  sheetBounds: (sheetBounds: SheetBounds) => void;

  setCursor: (cursor: string) => void;
  generateThumbnail: () => void;

  sheetOffsets: (sheetId: string, column: number | undefined, row: number | undefined, size: number) => void;
  sheetFills: (sheetId: string, fills: JsRenderFill[]) => void;
  htmlOutput: (html: JsHtmlOutput[]) => void;
  htmlUpdate: (html: JsHtmlOutput) => void;
  sheetBorders: (sheetId: string, borders: JsRenderBorders) => void;
  renderCodeCells: (sheetId: string, codeCells: JsRenderCodeCell[]) => void;

  pythonState: (state: PythonStateType, version?: string) => void;
  updateCodeCell: (sheetId: string, codeCell: JsCodeCell) => void;

  importProgress: (message: CoreClientImportProgress) => void;
  transactionStart: (message: CoreClientTransactionStart) => void;
  transactionProgress: (message: CoreClientTransactionProgress) => void;
}

export const events = new EventEmitter<EventTypes>();
