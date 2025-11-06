function calculateTotalCompensation(employee) {
    var bonus = employee.baseSalary * employee.bonusPercentage;
    var tax = bonus * employee.taxPercentage;
    return employee.baseSalary + bonus - tax;
}
// Usage
var employee = {
    baseSalary: 50000,
    bonusPercentage: 0.10, // 10%
    taxPercentage: 0.20 // 20%
};
console.log(calculateTotalCompensation(employee));