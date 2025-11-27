interface User {
    id: number;
    email: string;
}

const users: User[] = Array.from({ length: 100000 }, (_, i) => ({
    id: i + 1,
    email: `user${i + 1}@example.com`,
}));

const emailsToFind = ['user100@example.com', 'user200@example.com', 'user300@example.com'];

emailsToFind.forEach(email => {
    const user = users.find(u => u.email === email);
    if (user) {
        console.log(user.id);
    }
});
\ No newline at end of file