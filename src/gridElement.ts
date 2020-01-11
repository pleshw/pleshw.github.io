class GridElement {
  rows: number;
  cols: number;

  cWidth: number;
  cHeight: number;

  constructor(rows: number, cols: number, cellWidth = 1, cellHeight = 1) {
    this.rows = cols;
    this.cols = rows;

    this.cWidth = cellWidth;
    this.cHeight = cellHeight;
  }

  get cellWidth(): number {
    return this.cWidth;
  }

  get cellHeight(): number {
    return this.cHeight;
  }
}