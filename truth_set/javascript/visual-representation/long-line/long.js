var UserService = /** @class */ (function () {
    function UserService() {
        this.http = {
            post: function (url, body) {
                console.log("POST request to: ".concat(url));
                return Promise.resolve(body);
            },
            get: function (url) {
                console.log("GET request to: ".concat(url));
                return Promise.resolve({});
            },
        };
    }
    UserService.prototype.createUser = function (username, password, email, firstName, lastName, age, address) {
        return this.http.post("https://api.example.com/users/create?username=".concat(username, "&password=").concat(password, "&email=").concat(email, "&firstName=").concat(firstName, "&lastName=").concat(lastName, "&age=").concat(age, "&address=").concat(address), {});
    };
    UserService.prototype.getUserDetails = function (userId) {
        return this.http.get("https://api.example.com/users/details?userId=".concat(userId, "&includePreferences=true&includeHistory=true&includeSettings=true"));
    };
    return UserService;
}());
var userService = new UserService();
userService.createUser('john_doe', 'securepassword', 'john@example.com', 'John', 'Doe', 30, '123 Main St')
    .then(function (user) { return console.log('User created:', user); });
userService.getUserDetails(1)
    .then(function (details) { return console.log('User details:', details); });