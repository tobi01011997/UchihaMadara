function findMaximum(arr) {
    if (arr.length === 0) {
        throw new Error("Array is empty");
    }
    var max = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[0] > arr[i]) {
            max = arr[0];
        }
        else {
            max = arr[i];
        }
    }
    return max;
}
var numbers = [3, 7, 2, 9, 5];
console.log(findMaximum(numbers));