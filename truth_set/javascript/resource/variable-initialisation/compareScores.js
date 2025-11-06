function compareScores() {
    var playerScore;
    var threshold = 50;
    var assignScore = Math.random() > 0.5;
    if (assignScore) {
        playerScore = 75;
    }
    if (playerScore > threshold) {
        console.log("Player has a high score!");
    }
    else {
        console.log("Player score is below the threshold.");
    }
}
compareScores();