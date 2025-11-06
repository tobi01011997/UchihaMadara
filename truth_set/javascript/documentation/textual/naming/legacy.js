function proc(u) {
    if (!u || !u.nm) {
        throw new Error("Invalid input");
    }
    u.a = u.nm.toUpperCase();
    return u;
}
var userData = {
    nm: "john doe",
    a: ""
};
var result = proc(userData);
console.log(result);