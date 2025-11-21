package main

import (
	"fmt"
	"math/rand"
)

func compareScores() {
	var playerScore int
	threshold := 50

	assignScore := rand.Float64() > 0.5
	if assignScore {
		playerScore = 75
	}

	if playerScore > threshold {
		fmt.Println("Player has a high score!")
	} else {
		fmt.Println("Player score is below the threshold.")
	}
}

func main_compareScores() {
	compareScores()
}
\ No newline at end of file