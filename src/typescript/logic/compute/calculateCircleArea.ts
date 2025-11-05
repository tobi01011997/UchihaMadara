function calculateCircleArea(radius: number): number {
    const diameter = radius * 2;
    return Math.PI * diameter * diameter;
}

const radius = 5;
console.log(calculateCircleArea(radius));
\ No newline at end of file