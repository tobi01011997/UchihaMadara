package compute
func calculateAverage(scores []int) int {
    total := 0
    for _, score := range scores {
        total += score
    }
    return total / len(scores)
}
\ No newline at end of file