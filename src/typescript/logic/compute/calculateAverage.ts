function calculateAverage(scores: number[]): number {
    const total = scores.reduce((sum, score) => sum + score, 0);
    return Math.floor(total / scores.length);
}

const scores = [85, 90, 78, 92, 88];
console.log(calculateAverage(scores));
\ No newline at end of file