interface Employee {
    baseSalary: number;
    bonusPercentage: number;
    taxPercentage: number;
}

function calculateTotalCompensation(employee: Employee): number {
    const bonus = employee.baseSalary * employee.bonusPercentage;
    const tax = bonus * employee.taxPercentage;
    return employee.baseSalary + bonus - tax;
}

// Usage
const employee: Employee = {
    baseSalary: 50000,
    bonusPercentage: 0.10, // 10%
    taxPercentage: 0.20   // 20%
};

console.log(calculateTotalCompensation(employee));
\ No newline at end of file