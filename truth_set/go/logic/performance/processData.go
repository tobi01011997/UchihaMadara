package performance

func processData(data []int) []int {
    newData := make([]int, len(data))
    copy(newData, data)
    
    for i := range newData {
        newData[i] *= 2
    }
    return newData
}

func processDataMain() {
    numbers := make([]int, 1000000)
    for i := range numbers {
        numbers[i] = i
    }
    
    processedArray := processData(numbers)
    _ = processedArray
}
\ No newline at end of file