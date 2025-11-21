import { formatDate } from '../utils/dateUtils';

interface User {
    id: number;
    name: string;
    registrationDate: Date;
}

export class UserService {
    private users: User[] = [];

    addUser(name: string): void {
        const newUser: User = {
            id: this.users.length + 1,
            name,
            registrationDate: new Date(),
        };
        this.users.push(newUser);
        console.log(
            `User Added: ${newUser.name}, Registered On: ${formatDate(newUser.registrationDate, 'MM/DD/YYYY')}`
        );
    }

    listUsers(): void {
        this.users.forEach(user => {
            console.log(
                `ID: ${user.id}, Name: ${user.name}, Registration Date: ${formatDate(user.registrationDate)}`
            );
        });
    }
}
\ No newline at end of file