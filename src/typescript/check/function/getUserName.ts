function getUserName(userId: number): { name: string | null; error: string | null } {
    if (userId === 1) {
        return { name: "Alice", error: null };
    } else {
        return { name: null, error: "User not found." };
    }
}

const result = getUserName(2);
console.log("User Name:", result.name!.toUpperCase());
\ No newline at end of file