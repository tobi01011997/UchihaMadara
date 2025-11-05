function processUserAge(age: any): void {
    const numericAge = Number(age);
    if (numericAge >= 18) {
        console.log("User is an adult.");
    } else {
        console.log("User is a minor.");
    }
}

processUserAge("twenty");
processUserAge(null);
\ No newline at end of file