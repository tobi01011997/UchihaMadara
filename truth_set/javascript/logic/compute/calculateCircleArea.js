function calculateCircleArea(radius) {
    var diameter = radius * 2;
    return Math.PI * diameter * diameter;
}
var radius = 5;
console.log(calculateCircleArea(radius));