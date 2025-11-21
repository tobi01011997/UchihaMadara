package compute

type Employee struct {
    BaseSalary      float64
    BonusPercentage float64
    TaxPercentage   float64
}

func calculateTotalCompensation(employee Employee) float64 {
    bonus := employee.BaseSalary * employee.BonusPercentage
    tax := bonus * employee.TaxPercentage
    return employee.BaseSalary + bonus - tax
}