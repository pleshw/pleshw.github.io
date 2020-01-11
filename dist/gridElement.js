"use strict";
var GridElement = /** @class */ (function () {
    function GridElement(rows, cols, cellWidth, cellHeight) {
        if (cellWidth === void 0) { cellWidth = 1; }
        if (cellHeight === void 0) { cellHeight = 1; }
        this.rows = cols;
        this.cols = rows;
        this.cWidth = cellWidth;
        this.cHeight = cellHeight;
    }
    Object.defineProperty(GridElement.prototype, "cellWidth", {
        get: function () {
            return this.cWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridElement.prototype, "cellHeight", {
        get: function () {
            return this.cHeight;
        },
        enumerable: true,
        configurable: true
    });
    return GridElement;
}());
