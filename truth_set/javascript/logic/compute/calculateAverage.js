function calculateAverage(scores) {
    var total = scores.reduce(function (sum, score) { return sum + score; }, 0);
    return Math.floor(total / scores.length);
}
var scores = [85, 90, 78, 92, 88];
console.log(calculateAverage(scores));