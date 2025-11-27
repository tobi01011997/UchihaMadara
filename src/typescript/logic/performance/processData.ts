function processData(data: number[]): number[] {
    const newData = [...data];
    for (let i = 0; i < newData.length; i++) {
        newData[i] *= 2;
    }
    return newData;
}

const numbers = Array.from({ length: 1000000 }, (_, i) => i);
const processedArray = processData(numbers);