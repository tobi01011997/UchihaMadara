class UserProfile {
    constructor() {
        this.fetchData();
    }

    async fetchData() {
        this.data = await new Promise(resolve => setTimeout(() => resolve({ name: 'Alice' }), 1000));
        console.log('Data fetched:', this.data);
    }

    printData() {
        console.log('User Data:', this.data);
    }
}

const profile = new UserProfile();
profile.printData();
\ No newline at end of file