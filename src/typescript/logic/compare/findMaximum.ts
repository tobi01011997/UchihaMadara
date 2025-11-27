function findMaximum(arr: number[]): number {
    if (arr.length === 0) {
        throw new Error("Array is empty");
    }

    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[0] > arr[i]) {
            max = arr[0];
        } else {
            max = arr[i];
        }
    }

    return max;
}

const numbers = [3, 7, 2, 9, 5];
console.log(findMaximum(numbers));
\ No newline at end of file