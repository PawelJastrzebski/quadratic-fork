// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { CellRef } from "./CellRef";
import type { CellRefCoord } from "./CellRefCoord";

export type RangeRef = { "type": "RowRange", start: CellRefCoord, end: CellRefCoord, } | { "type": "ColRange", start: CellRefCoord, end: CellRefCoord, } | { "type": "CellRange", start: CellRef, end: CellRef, } | { "type": "Cell", pos: CellRef, };