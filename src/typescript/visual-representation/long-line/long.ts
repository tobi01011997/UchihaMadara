interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
}

interface UserDetails extends User {
    preferences: any;
    history: any;
    settings: any;
}

class UserService {
    createUser(username: string, password: string, email: string, firstName: string, lastName: string, age: number, address: string): Promise<User> {
        return this.http.post<User>(`https://api.example.com/users/create?username=${username}&password=${password}&email=${email}&firstName=${firstName}&lastName=${lastName}&age=${age}&address=${address}`, {});
    }

    getUserDetails(userId: number): Promise<UserDetails> {
        return this.http.get<UserDetails>(`https://api.example.com/users/details?userId=${userId}&includePreferences=true&includeHistory=true&includeSettings=true`);
    }

    http = {
        post: <T>(url: string, body: any): Promise<T> => {
            console.log(`POST request to: ${url}`);
            return Promise.resolve(body as T);
        },
        get: <T>(url: string): Promise<T> => {
            console.log(`GET request to: ${url}`);
            return Promise.resolve({} as T);
        },
    };
}

const userService = new UserService();

userService.createUser('john_doe', 'securepassword', 'john@example.com', 'John', 'Doe', 30, '123 Main St')
    .then(user => console.log('User created:', user));

userService.getUserDetails(1)
    .then(details => console.log('User details:', details));
\ No newline at end of file