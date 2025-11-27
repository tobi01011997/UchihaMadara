function createUser(name: string, age: number): User {
    const user: User = {
        id: generateUniqueId(),
        name: name,
        age: age,
        isActive: true
    };
    database.save(user);
    return user;
}

function addUser(name: string, age: number): User {
    const user: User = {
        id: generateUniqueId(),
        name: name,
        age: age,
        isActive: true
    };
    database.save(user);
    return user;
}

function updateUserEmail(userId: string, email: string): void {
    const user = database.findUserById(userId);
    if (user) {
        user.email = email;
        user.updatedAt = new Date();
        user.hasEmailChanged = true;
        database.save(user);
    }
}

function updateUserPhone(userId: string, phone: string): void {
    const user = database.findUserById(userId);
    if (user) {
        user.phone = phone;
        user.updatedAt = new Date();
        user.hasPhoneChanged = true;
        database.save(user);
    }
}

function isAdult(age: number): boolean {
    return age >= 18;
}

function canVote(age: number): boolean {
    if (age >= 18) {
        return true;
    }
    return false;
}

function canDrink(age: number): boolean {
    if (age >= 21) {
        return true;
    }
    return false;
}

function calculateDiscount(price: number): number {
    const discountRate = 0.1;
    return price * discountRate;
}

function calculateTax(price: number): number {
    const taxRate = 0.1;
    return price * taxRate;
}

interface User {
    id: string;
    name: string;
    age: number;
    isActive: boolean;
    email?: string;
    phone?: string;
    updatedAt?: Date;
    hasEmailChanged?: boolean;
    hasPhoneChanged?: boolean;
}

const database = {
    save: (user: User) => {
        console.log(`User ${user.id} saved.`);
    },
    findUserById: (id: string): User | undefined => {
        return undefined;
    }
};

function generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
}
\ No newline at end of file