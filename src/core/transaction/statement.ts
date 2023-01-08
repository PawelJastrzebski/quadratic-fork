import { Cell, CellFormat } from '../gridDB/gridTypes';

// Everything that modifies Sheet must go through a Statement
export type Statement =
  | {
      type: 'SET_CELL';
      data: {
        position: [number, number];
        value: Cell | undefined;
      };
    }
  | {
      type: 'SET_CELL_DEPENDENCIES';
      data: {
        position: [number, number];
        dependencies: [number, number][] | null;
      };
    }
  | {
      type: 'SET_CELL_FORMAT';
      data: {
        position: [number, number];
        value: CellFormat | undefined;
      };
    };
