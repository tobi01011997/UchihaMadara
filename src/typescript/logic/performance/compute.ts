function compute(x: number): number {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
        result += Math.sqrt(x + i);
    }
    return result;
}

const numbers = [10, 20, 30];

numbers.forEach(num => {
    console.log(`Value: ${compute(num)}`);
    console.log(`Double: ${compute(num) * 2}`);
    console.log(`Half: ${compute(num) / 2}`);
});
\ No newline at end of file