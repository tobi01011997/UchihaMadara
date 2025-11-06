function getUserName(userId) {
    if (userId === 1) {
        return { name: "Alice", error: null };
    }
    else {
        return { name: null, error: "User not found." };
    }
}
var result = getUserName(2);
console.log("User Name:", result.name.toUpperCase());