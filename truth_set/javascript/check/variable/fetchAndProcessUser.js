async function fetchAndProcessUser(userId) {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    const data = await response.json();
    const user = data;

    console.log(`User Name: ${user.name.toUpperCase()}`);
    console.log(`User Email: ${user.email.toLowerCase()}`);
}

fetchAndProcessUser(1).catch(error => console.error("Fetch Error:", error));
\ No newline at end of file