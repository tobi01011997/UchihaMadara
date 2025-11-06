function createUser(name, age) {
    var user = {
        id: generateUniqueId(),
        name: name,
        age: age,
        isActive: true
    };
    database.save(user);
    return user;
}
function addUser(name, age) {
    var user = {
        id: generateUniqueId(),
        name: name,
        age: age,
        isActive: true
    };
    database.save(user);
    return user;
}
function updateUserEmail(userId, email) {
    var user = database.findUserById(userId);
    if (user) {
        user.email = email;
        user.updatedAt = new Date();
        user.hasEmailChanged = true;
        database.save(user);
    }
}
function updateUserPhone(userId, phone) {
    var user = database.findUserById(userId);
    if (user) {
        user.phone = phone;
        user.updatedAt = new Date();
        user.hasPhoneChanged = true;
        database.save(user);
    }
}
function isAdult(age) {
    return age >= 18;
}
function canVote(age) {
    if (age >= 18) {
        return true;
    }
    return false;
}
function canDrink(age) {
    if (age >= 21) {
        return true;
    }
    return false;
}
function calculateDiscount(price) {
    var discountRate = 0.1;
    return price * discountRate;
}
function calculateTax(price) {
    var taxRate = 0.1;
    return price * taxRate;
}
var database = {
    save: function (user) {
        console.log("User ".concat(user.id, " saved."));
    },
    findUserById: function (id) {
        return undefined;
    }
};
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}