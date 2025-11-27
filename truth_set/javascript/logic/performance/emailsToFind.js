var users = Array.from({ length: 100000 }, function (_, i) { return ({
    id: i + 1,
    email: "user".concat(i + 1, "@example.com"),
}); });
var emailsToFind = ['user100@example.com', 'user200@example.com', 'user300@example.com'];
emailsToFind.forEach(function (email) {
    var user = users.find(function (u) { return u.email === email; });
    if (user) {
        console.log(user.id);
    }
});