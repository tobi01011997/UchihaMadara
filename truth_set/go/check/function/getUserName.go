package function

type UserResult struct {
    Name  *string
    Error *string
}

func getUserName(userId int) UserResult {
    if userId == 1 {
        name := "Alice"
        return UserResult{Name: &name, Error: nil}
    }
    errMsg := "User not found."
    return UserResult{Name: nil, Error: &errMsg}
}

func main() {
    result := getUserName(2)
    userName := *result.Name
    println("User Name:", userName)
}
\ No newline at end of file