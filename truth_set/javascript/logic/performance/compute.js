function compute(x) {
    var result = 0;
    for (var i = 0; i < 1000000; i++) {
        result += Math.sqrt(x + i);
    }
    return result;
}
var numbers = [10, 20, 30];
numbers.forEach(function (num) {
    console.log("Value: ".concat(compute(num)));
    console.log("Double: ".concat(compute(num) * 2));
    console.log("Half: ".concat(compute(num) / 2));
});