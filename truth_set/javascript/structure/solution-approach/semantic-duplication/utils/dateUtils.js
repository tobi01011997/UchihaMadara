"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = formatDate;
function formatDate(date, format) {
    if (format === void 0) { format = 'YYYY-MM-DD'; }
    var year = date.getFullYear();
    var month = ("0".concat(date.getMonth() + 1)).slice(-2);
    var day = ("0".concat(date.getDate())).slice(-2);
    switch (format) {
        case 'MM/DD/YYYY':
            return "".concat(month, "/").concat(day, "/").concat(year);
        case 'DD-MM-YYYY':
            return "".concat(day, "-").concat(month, "-").concat(year);
        default:
            return "".concat(year, "-").concat(month, "-").concat(day);
    }
}