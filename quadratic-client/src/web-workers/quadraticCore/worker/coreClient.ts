/**
 * Communication between core web worker and main thread.
 *
 * This is a singleton where one instance exists for the web worker and can be
 * directly accessed by its siblings.
 */

import { debugWebWorkers, debugWebWorkersMessages } from '@/debugFlags';
import { JsHtmlOutput, JsRenderBorders, JsRenderCodeCell, JsRenderFill, SheetInfo } from '@/quadratic-core-types';
import { ClientCoreLoad, ClientCoreMessage, CoreClientMessage } from '../coreClientMessages';
import { core } from './core';
import { coreMultiplayer } from './coreMultiplayer';
import { corePython } from './corePython';

declare var self: WorkerGlobalScope &
  typeof globalThis & {
    sendImportProgress: (
      filename: string,
      current: number,
      total: number,
      x: number,
      y: number,
      width: number,
      height: number
    ) => void;
    sendAddSheetClient: (sheetInfo: SheetInfo, user: boolean) => void;
    sendDeleteSheetClient: (sheetId: string, user: boolean) => void;
    sheetInfoUpdate: (sheetInfo: SheetInfo) => void;
    sendSheetInfoClient: (sheetInfo: SheetInfo[]) => void;
    sendSheetFills: (sheetId: string, fills: JsRenderFill[]) => void;
    sendSetCursor: (cursor: string) => void;
    sendSheetOffsetsClient: (
      sheetId: string,
      column: bigint | undefined,
      row: bigint | undefined,
      size: number,
      borders: JsRenderBorders
    ) => void;
    sendSheetHtml: (html: JsHtmlOutput[]) => void;
    sendUpdateHtml: (html: JsHtmlOutput) => void;
    sendGenerateThumbnail: () => void;
    sendSheetBorders: (sheetId: string, borders: JsRenderBorders) => void;
    sendSheetCodeCellRender: (sheetId: string, codeCells: JsRenderCodeCell[]) => void;
  };

class CoreClient {
  start() {
    self.onmessage = this.handleMessage;
    self.sendImportProgress = coreClient.sendImportProgress;
    self.sendAddSheetClient = coreClient.sendAddSheet;
    self.sendDeleteSheetClient = coreClient.sendDeleteSheet;
    self.sendSheetInfoClient = coreClient.sendSheetInfoClient;
    self.sendSheetFills = coreClient.sendSheetFills;
    self.sheetInfoUpdate = coreClient.sendSheetInfoUpdate;
    self.sendSetCursor = coreClient.sendSetCursor;
    self.sendSheetOffsetsClient = coreClient.sendSheetOffsets;
    self.sendSheetHtml = coreClient.sendSheetHtml;
    self.sendUpdateHtml = coreClient.sendUpdateHtml;
    self.sendGenerateThumbnail = coreClient.sendGenerateThumbnail;
    self.sendSheetBorders = coreClient.sendSheetBorders;
    self.sendSheetCodeCellRender = coreClient.sendSheetCodeCellRender;
    if (debugWebWorkers) console.log('[coreClient] initialized.');
  }

  private send(message: CoreClientMessage) {
    self.postMessage(message);
  }

  private handleMessage = async (e: MessageEvent<ClientCoreMessage>) => {
    if (debugWebWorkersMessages) console.log(`[coreClient] message: ${e.data.type}`);

    switch (e.data.type) {
      case 'clientCoreLoad':
        this.send({
          type: 'coreClientLoad',
          id: e.data.id,
          ...(await core.loadFile(e.data as ClientCoreLoad, e.ports[0])),
        });
        break;

      case 'clientCoreGetCodeCell':
        this.send({
          type: 'coreClientGetCodeCell',
          id: e.data.id,
          cell: await core.getCodeCell(e.data.sheetId, e.data.x, e.data.y),
        });
        break;

      case 'clientCoreGetRenderCell':
        this.send({
          type: 'coreClientGetRenderCell',
          id: e.data.id,
          cell: await core.getRenderCell(e.data.sheetId, e.data.x, e.data.y),
        });
        break;

      case 'clientCoreCellHasContent':
        this.send({
          type: 'coreClientCellHasContent',
          id: e.data.id,
          hasContent: await core.cellHasContent(e.data.sheetId, e.data.x, e.data.y),
        });
        break;

      case 'clientCoreSetCellValue':
        await core.setCellValue(e.data.sheetId, e.data.x, e.data.y, e.data.value, e.data.cursor);
        break;

      case 'clientCoreGetEditCell':
        this.send({
          type: 'coreClientGetEditCell',
          id: e.data.id,
          cell: await core.getEditCell(e.data.sheetId, e.data.x, e.data.y),
        });
        break;

      case 'clientCoreGetCellFormatSummary':
        this.send({
          type: 'coreClientGetCellFormatSummary',
          id: e.data.id,
          formatSummary: await core.getCellFormatSummary(e.data.sheetId, e.data.x, e.data.y),
        });
        break;

      case 'clientCoreInitMultiplayer':
        coreMultiplayer.init(e.ports[0]);
        break;

      case 'clientCoreSummarizeSelection':
        this.send({
          type: 'coreClientSummarizeSelection',
          id: e.data.id,
          summary: await core.summarizeSelection(e.data),
        });
        break;

      case 'clientCoreSetCellBold':
        await core.setCellBold(
          e.data.sheetId,
          e.data.x,
          e.data.y,
          e.data.width,
          e.data.height,
          e.data.bold,
          e.data.cursor
        );
        break;

      case 'clientCoreSetCellItalic':
        await core.setCellItalic(
          e.data.sheetId,
          e.data.x,
          e.data.y,
          e.data.width,
          e.data.height,
          e.data.italic,
          e.data.cursor
        );
        break;

      case 'clientCoreSetCellTextColor':
        await core.setCellTextColor(
          e.data.sheetId,
          e.data.x,
          e.data.y,
          e.data.width,
          e.data.height,
          e.data.color ?? '',
          e.data.cursor
        );
        break;

      case 'clientCoreSetCellFillColor':
        await core.setCellFillColor(
          e.data.sheetId,
          e.data.x,
          e.data.y,
          e.data.width,
          e.data.height,
          e.data.fillColor ?? '',
          e.data.cursor
        );
        break;

      case 'clientCoreToggleCommas':
        await core.toggleCommas(
          e.data.sheetId,
          e.data.sourceX,
          e.data.sourceY,
          e.data.x,
          e.data.y,
          e.data.width,
          e.data.height,
          e.data.cursor
        );
        break;

      case 'clientCoreSetCurrency':
        await core.setCurrency(
          e.data.sheetId,
          e.data.x,
          e.data.y,
          e.data.width,
          e.data.height,
          e.data.symbol,
          e.data.cursor
        );
        break;

      case 'clientCoreImportCsv':
        try {
          const error = await core.importCsv(
            e.data.sheetId,
            e.data.x,
            e.data.y,
            e.data.file,
            e.data.fileName,
            e.data.cursor
          );
          this.send({ type: 'coreClientImportCsv', id: e.data.id, error });
        } catch (error) {
          this.send({ type: 'coreClientImportCsv', id: e.data.id, error: error as string });
        }
        break;

      case 'clientCoreGetGridBounds':
        const bounds = await core.getGridBounds(e.data);
        this.send({ type: 'coreClientGetGridBounds', id: e.data.id, bounds });
        break;

      case 'clientCoreDeleteCellValues':
        await core.deleteCellValues(e.data.sheetId, e.data.x, e.data.y, e.data.width, e.data.height, e.data.cursor);
        break;

      case 'clientCoreSetCodeCellValue':
        await core.setCodeCellValue(
          e.data.sheetId,
          e.data.x,
          e.data.y,
          e.data.language,
          e.data.codeString,
          e.data.cursor
        );
        break;

      case 'clientCoreAddSheet':
        await core.addSheet(e.data.cursor);
        break;

      case 'clientCoreDeleteSheet':
        await core.deleteSheet(e.data.sheetId, e.data.cursor);
        break;

      case 'clientCoreMoveSheet':
        await core.moveSheet(e.data.sheetId, e.data.previous, e.data.cursor);
        break;

      case 'clientCoreSetSheetName':
        await core.setSheetName(e.data.sheetId, e.data.name, e.data.cursor);
        break;

      case 'clientCoreSetSheetColor':
        await core.setSheetColor(e.data.sheetId, e.data.color, e.data.cursor);
        break;

      case 'clientCoreDuplicateSheet':
        await core.duplicateSheet(e.data.sheetId, e.data.cursor);
        break;

      case 'clientCoreUndo':
        await core.undo(e.data.cursor);
        break;

      case 'clientCoreRedo':
        await core.redo(e.data.cursor);
        break;

      case 'clientCoreUpgradeGridFile':
        const { grid, version } = await core.upgradeGridFile(e.data.grid, e.data.sequenceNumber);
        this.send({ type: 'coreClientUpgradeGridFile', id: e.data.id, grid, version });
        break;

      case 'clientCoreExport':
        this.send({ type: 'coreClientExport', id: e.data.id, grid: await core.export() });
        break;

      case 'clientCoreSearch':
        const results = await core.search(e.data.search, e.data.searchOptions);
        this.send({ type: 'coreClientSearch', id: e.data.id, results });
        break;

      case 'clientCoreHasRenderCells':
        const hasRenderCells = await core.hasRenderCells(
          e.data.sheetId,
          e.data.x,
          e.data.y,
          e.data.width,
          e.data.height
        );
        this.send({ type: 'coreClientHasRenderCells', id: e.data.id, hasRenderCells });
        break;

      case 'clientCoreSetCellAlign':
        await core.setCellAlign(
          e.data.sheetId,
          e.data.x,
          e.data.y,
          e.data.width,
          e.data.height,
          e.data.align,
          e.data.cursor
        );
        break;

      case 'clientCoreCopyToClipboard':
        const result = await core.copyToClipboard(e.data.sheetId, e.data.x, e.data.y, e.data.width, e.data.height);
        this.send({ type: 'coreClientCopyToClipboard', id: e.data.id, ...result });
        break;

      case 'clientCoreCutToClipboard':
        const cutResult = await core.cutToClipboard(
          e.data.sheetId,
          e.data.x,
          e.data.y,
          e.data.width,
          e.data.height,
          e.data.cursor
        );
        this.send({ type: 'coreClientCutToClipboard', id: e.data.id, ...cutResult });
        break;

      case 'clientCorePasteFromClipboard':
        await core.pasteFromClipboard(
          e.data.sheetId,
          e.data.x,
          e.data.y,
          e.data.plainText,
          e.data.html,
          e.data.special,
          e.data.cursor
        );
        break;

      case 'clientCoreSetRegionBorders':
        await core.setRegionBorders(
          e.data.sheetId,
          e.data.x,
          e.data.y,
          e.data.width,
          e.data.height,
          e.data.selection,
          e.data.style,
          e.data.cursor
        );
        break;

      case 'clientCoreSetCellRenderResize':
        await core.setCellRenderResize(e.data.sheetId, e.data.x, e.data.y, e.data.width, e.data.height, e.data.cursor);
        break;

      case 'clientCoreAutocomplete':
        await core.autocomplete(
          e.data.sheetId,
          e.data.x,
          e.data.y,
          e.data.width,
          e.data.height,
          e.data.fullX,
          e.data.fullY,
          e.data.fullWidth,
          e.data.fullHeight,
          e.data.cursor
        );
        break;

      case 'clientCoreExportCsvSelection':
        const csv = await core.exportCsvSelection(e.data.sheetId, e.data.x, e.data.y, e.data.width, e.data.height);
        this.send({ type: 'coreClientExportCsvSelection', id: e.data.id, csv });
        break;

      case 'clientCoreGetColumnsBounds':
        this.send({
          type: 'coreClientGetColumnsBounds',
          id: e.data.id,
          bounds: await core.getColumnsBounds(e.data.sheetId, e.data.start, e.data.end, e.data.ignoreFormatting),
        });
        break;

      case 'clientCoreGetRowsBounds':
        this.send({
          type: 'coreClientGetRowsBounds',
          id: e.data.id,
          bounds: await core.getRowsBounds(e.data.sheetId, e.data.start, e.data.end, e.data.ignoreFormatting),
        });
        break;

      case 'clientCoreFindNextColumn':
        this.send({
          type: 'coreClientFindNextColumn',
          id: e.data.id,
          column: await core.findNextColumn(e.data),
        });
        break;

      case 'clientCoreFindNextRow':
        this.send({
          type: 'coreClientFindNextRow',
          id: e.data.id,
          row: await core.findNextRow(e.data),
        });
        break;

      case 'clientCoreCommitTransientResize':
        await core.commitTransientResize(e.data.sheetId, e.data.transientResize, e.data.cursor);
        break;

      case 'clientCoreCommitSingleResize':
        await core.commitSingleResize(e.data.sheetId, e.data.column, e.data.row, e.data.size, e.data.cursor);
        break;

      case 'clientCoreInitPython':
        corePython.init(e.ports[0]);
        break;

      default:
        console.warn('[coreClient] Unhandled message type', e.data);
    }
  };

  sendImportProgress = (
    filename: string,
    current: number,
    total: number,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    // self.postMessage({ type: 'coreClientProgress', current, total });
    console.log(filename, current, total, x, y, width, height);
  };

  sendAddSheet = (sheetInfo: SheetInfo, user: boolean) => {
    this.send({ type: 'coreClientAddSheet', sheetInfo, user });
  };

  sendDeleteSheet = (sheetId: string, user: boolean) => {
    console.log('sendDeleteSheet', sheetId, user);
    this.send({ type: 'coreClientDeleteSheet', sheetId, user });
  };

  sendSheetInfoClient = (sheetInfo: SheetInfo[]) => {
    this.send({ type: 'coreClientSheetInfo', sheetInfo });
  };

  sendSheetFills = (sheetId: string, fills: JsRenderFill[]) => {
    this.send({ type: 'coreClientSheetFills', sheetId, fills });
  };

  sendSheetInfoUpdate = (sheetInfo: SheetInfo) => {
    this.send({ type: 'coreClientSheetInfoUpdate', sheetInfo });
  };

  sendSetCursor = (cursor: string) => {
    this.send({ type: 'coreClientSetCursor', cursor });
  };

  sendSheetOffsets = (
    sheetId: string,
    column: bigint | undefined,
    row: bigint | undefined,
    size: number,
    borders: JsRenderBorders
  ) => {
    this.send({
      type: 'coreClientSheetOffsets',
      sheetId,
      column: column === undefined ? undefined : Number(column),
      row: row === undefined ? undefined : Number(row),
      size,
      borders,
    });
  };

  sendSheetHtml = (html: JsHtmlOutput[]) => {
    this.send({ type: 'coreClientHtmlOutput', html });
  };

  sendUpdateHtml = (html: JsHtmlOutput) => {
    this.send({ type: 'coreClientUpdateHtml', html });
  };

  sendGenerateThumbnail = () => {
    this.send({ type: 'coreClientGenerateThumbnail' });
  };

  sendSheetBorders = (sheetId: string, borders: JsRenderBorders) => {
    this.send({ type: 'coreClientSheetBorders', sheetId, borders });
  };

  sendSheetCodeCellRender = (sheetId: string, codeCells: JsRenderCodeCell[]) => {
    this.send({ type: 'coreClientSheetCodeCellRender', sheetId, codeCells });
  };
}

export const coreClient = new CoreClient();
