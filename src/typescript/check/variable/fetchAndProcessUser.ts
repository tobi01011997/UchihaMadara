interface User {
    id: number;
    name: string;
    email: string;
}

async function fetchAndProcessUser(userId: number): Promise<void> {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    const data: any = await response.json();
    const user: User = data;

    console.log(`User Name: ${user.name.toUpperCase()}`);
    console.log(`User Email: ${user.email.toLowerCase()}`);
}

fetchAndProcessUser(1).catch(error => console.error("Fetch Error:", error));
\ No newline at end of file