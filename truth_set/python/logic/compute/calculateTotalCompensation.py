def calculateTotalCompensation(employee):
    bonus = employee.baseSalary * employee.bonusPercentage
    tax = bonus * employee.taxPercentage
    return employee.baseSalary + bonus - tax

# Usage
class Employee:
    def __init__(self):
        self.baseSalary = 50000
        self.bonusPercentage = 0.10  # 10%
        self.taxPercentage = 0.20    # 20%

employee = Employee()
print(calculateTotalCompensation(employee))
\ No newline at end of file