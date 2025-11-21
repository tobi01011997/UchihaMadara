function proc(u: any): any {
    if (!u || !u.nm) {
        throw new Error("Invalid input");
    }

    u.a = u.nm.toUpperCase();

    return u;
}

let userData = {
    nm: "john doe",
    a: ""
};

let result = proc(userData);
console.log(result);
\ No newline at end of file