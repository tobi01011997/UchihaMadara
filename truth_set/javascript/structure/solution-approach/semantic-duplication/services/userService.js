"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
var dateUtils_1 = require("../utils/dateUtils");
var UserService = /** @class */ (function () {
    function UserService() {
        this.users = [];
    }
    UserService.prototype.addUser = function (name) {
        var newUser = {
            id: this.users.length + 1,
            name: name,
            registrationDate: new Date(),
        };
        this.users.push(newUser);
        console.log("User Added: ".concat(newUser.name, ", Registered On: ").concat((0, dateUtils_1.formatDate)(newUser.registrationDate, 'MM/DD/YYYY')));
    };
    UserService.prototype.listUsers = function () {
        this.users.forEach(function (user) {
            console.log("ID: ".concat(user.id, ", Name: ").concat(user.name, ", Registration Date: ").concat((0, dateUtils_1.formatDate)(user.registrationDate)));
        });
    };
    return UserService;
}());
exports.UserService = UserService;