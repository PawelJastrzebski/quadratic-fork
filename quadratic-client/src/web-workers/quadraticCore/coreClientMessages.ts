import {
  CellAlign,
  CellFormatSummary,
  CodeCellLanguage,
  JsCodeCell,
  JsRenderCell,
  JsRenderCodeCell,
  JsRenderFill,
  SheetInfo,
} from '@/quadratic-core-types';

export interface ClientCoreLoad {
  type: 'clientCoreLoad';
  url: string;
  version: string;
  sequenceNumber: number;
}

export interface SheetMetadata {
  offsets: string;
  bounds?: { x: number; y: number; width: number; height: number };
  boundsNoFormatting?: { x: number; y: number; width: number; height: number };
  name: string;
  order: string;
  color?: string;
}

export interface ClientCoreGetCodeCell {
  type: 'clientCoreGetCodeCell';
  sheetId: string;
  x: number;
  y: number;
  id: number;
}

export interface CoreClientGetCodeCell {
  type: 'coreClientGetCodeCell';
  cell: JsCodeCell | undefined;
  id: number;
}

export interface ClientCoreGetRenderCell {
  type: 'clientCoreGetRenderCell';
  sheetId: string;
  x: number;
  y: number;
  id: number;
}

export interface CoreClientGetRenderCell {
  type: 'coreClientGetRenderCell';
  cell: JsRenderCell | undefined;
  id: number;
}

export interface ClientCoreGetRenderCodeCells {
  type: 'clientCoreGetRenderCodeCells';
  sheetId: string;
  id: number;
}

export interface CoreClientGetRenderCodeCells {
  type: 'coreClientGetRenderCodeCells';
  codeCells: JsRenderCodeCell[];
  id: number;
}

export interface ClientCoreCellHasContent {
  type: 'clientCoreCellHasContent';
  sheetId: string;
  x: number;
  y: number;
  id: number;
}

export interface CoreClientCellHasContent {
  type: 'coreClientCellHasContent';
  hasContent: boolean;
  id: number;
}

export interface ClientCoreGetEditCell {
  type: 'clientCoreGetEditCell';
  sheetId: string;
  x: number;
  y: number;
  id: number;
}

export interface CoreClientGetEditCell {
  type: 'coreClientGetEditCell';
  cell: string | undefined;
  id: number;
}

export interface ClientCoreSetCellValue {
  type: 'clientCoreSetCellValue';
  sheetId: string;
  x: number;
  y: number;
  value: string;
  cursor?: string;
}

export interface ClientCoreGetCellFormatSummary {
  type: 'clientCoreGetCellFormatSummary';
  sheetId: string;
  x: number;
  y: number;
  id: number;
}

export interface CoreClientGetCellFormatSummary {
  type: 'coreClientGetCellFormatSummary';
  formatSummary: CellFormatSummary;
  id: number;
}

export interface ClientCoreInitMultiplayer {
  type: 'clientCoreInitMultiplayer';
}

export interface ClientCoreSummarizeSelection {
  type: 'clientCoreSummarizeSelection';
  sheetId: string;
  decimalPlaces: number;
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CoreClientSummarizeSelection {
  type: 'coreClientSummarizeSelection';
  id: number;
  summary:
    | {
        count: number;
        sum: number | undefined;
        average: number | undefined;
      }
    | undefined;
}

export interface ClientCoreSetCellBold {
  type: 'clientCoreSetCellBold';
  sheetId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  bold: boolean;
  cursor?: string;
}

export interface ClientCoreSetCellItalic {
  type: 'clientCoreSetCellItalic';
  sheetId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  italic: boolean;
  cursor?: string;
}

export interface ClientCoreSetCellFillColor {
  type: 'clientCoreSetCellFillColor';
  sheetId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fillColor?: string;
  cursor?: string;
}

export interface ClientCoreSetCellTextColor {
  type: 'clientCoreSetCellTextColor';
  sheetId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  cursor?: string;
}

export interface ClientCoreSetCellAlign {
  type: 'clientCoreSetCellAlign';
  sheetId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  align?: CellAlign;
  cursor?: string;
}

export interface ClientCoreSetCurrency {
  type: 'clientCoreSetCurrency';
  sheetId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  symbol: string;
  cursor?: string;
}

export interface ClientCoreSetPercentage {
  type: 'clientCoreSetPercentage';
  sheetId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  cursor?: string;
}

export interface ClientCoreSetExponential {
  type: 'clientCoreSetExponential';
  sheetId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  cursor?: string;
}

export interface ClientCoreRemoveCellNumericFormat {
  type: 'clientCoreRemoveCellNumericFormat';
  sheetId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  cursor?: string;
}

export interface ClientCoreChangeDecimals {
  type: 'clientCoreChangeDecimals';
  sheetId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  delta: number;
  cursor?: string;
}

export interface ClientCoreClearFormatting {
  type: 'clientCoreClearFormatting';
  sheetId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  cursor?: string;
}

export interface ClientCoreToggleCommas {
  type: 'clientCoreToggleCommas';
  sheetId: string;
  sourceX: number;
  sourceY: number;
  x: number;
  y: number;
  width: number;
  height: number;
  cursor?: string;
}

export interface ClientCoreImportCsv {
  type: 'clientCoreImportCsv';
  sheetId: string;
  x: number;
  y: number;
  id: number;
  file: ArrayBuffer;
  fileName: string;
  cursor?: string;
}

export interface CoreClientImportCsv {
  type: 'coreClientImportCsv';
  id: number;
  error: string | undefined;
}

export interface ClientCoreGetGridBounds {
  type: 'clientCoreGetGridBounds';
  sheetId: string;
  id: number;
  ignoreFormatting: boolean;
}

export interface CoreClientGetGridBounds {
  type: 'coreClientGetGridBounds';
  bounds?: { x: number; y: number; width: number; height: number };
  id: number;
}

export interface ClientCoreDeleteCellValues {
  type: 'clientCoreDeleteCellValues';
  sheetId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  cursor?: string;
}

export interface ClientCoreSetCodeCellValue {
  type: 'clientCoreSetCodeCellValue';
  sheetId: string;
  x: number;
  y: number;
  language: CodeCellLanguage;
  codeString: string;
  cursor?: string;
}

export interface ClientCoreAddSheet {
  type: 'clientCoreAddSheet';
  cursor?: string;
}

export interface CoreClientAddSheet {
  type: 'coreClientAddSheet';
  sheetId: string;
  name: string;
  order: string;
}

export interface CoreClientSheetInfo {
  type: 'coreClientSheetInfo';
  sheetInfo: SheetInfo[];
}

export interface CoreClientSheetFills {
  type: 'coreClientSheetFills';
  sheetId: string;
  fills: JsRenderFill[];
}

export type ClientCoreMessage =
  | ClientCoreLoad
  | ClientCoreGetCodeCell
  | ClientCoreGetRenderCodeCells
  | ClientCoreCellHasContent
  | ClientCoreGetEditCell
  | ClientCoreSetCellValue
  | ClientCoreGetCellFormatSummary
  | ClientCoreInitMultiplayer
  | ClientCoreSummarizeSelection
  | ClientCoreSetCellBold
  | ClientCoreSetCellItalic
  | ClientCoreSetCellFillColor
  | ClientCoreSetCellTextColor
  | ClientCoreSetCellAlign
  | ClientCoreSetCurrency
  | ClientCoreSetPercentage
  | ClientCoreSetExponential
  | ClientCoreRemoveCellNumericFormat
  | ClientCoreChangeDecimals
  | ClientCoreClearFormatting
  | ClientCoreGetRenderCell
  | ClientCoreToggleCommas
  | ClientCoreImportCsv
  | ClientCoreGetGridBounds
  | ClientCoreDeleteCellValues
  | ClientCoreSetCodeCellValue
  | ClientCoreAddSheet;

export type CoreClientMessage =
  | CoreClientGetCodeCell
  | CoreClientGetRenderCodeCells
  | CoreClientGetEditCell
  | CoreClientCellHasContent
  | CoreClientGetCellFormatSummary
  | CoreClientSummarizeSelection
  | CoreClientGetRenderCell
  | CoreClientImportCsv
  | CoreClientGetGridBounds
  | CoreClientAddSheet
  | CoreClientSheetInfo
  | CoreClientSheetFills;
