TypeScript code examples that demonstrate common defects where computations produce incorrect results. These defects can arise from issues such as implementing the wrong formula, incorrect order of operations, variable misuse, and data type-related problems.

Each example includes:

1. **A faulty implementation**
2. **An explanation of the defect**
3. **A corrected version to illustrate the proper approach**

---

### 1. Implementing the Wrong Formula

**Issue:** Using an incorrect formula to calculate the area of a circle.

```typescript
function calculateCircleArea(radius: number): number {
    // Mistake: Using diameter instead of radius in the formula
    const diameter = radius * 2;
    return Math.PI * diameter * diameter;
}

// Usage
const radius = 5;
console.log(calculateCircleArea(radius)); // Incorrectly outputs 314.159... instead of 78.5398...
```

**Explanation:**  
The correct formula for the area of a circle is \( \pi \times \text{radius}^2 \). However, the function mistakenly calculates the area using the diameter (\( 2 \times \text{radius} \)) instead of the radius. This results in an area that is four times larger than it should be since \( \pi \times (\text{diameter})^2 = \pi \times (2r)^2 = 4\pi r^2 \).

**Correct Approach:**

```typescript
function calculateCircleAreaCorrectly(radius: number): number {
    return Math.PI * radius * radius;
    // Alternatively, using exponentiation:
    // return Math.PI * Math.pow(radius, 2);
}

// Usage
const correctRadius = 5;
console.log(calculateCircleAreaCorrectly(correctRadius)); // Correctly outputs 78.5398...
```

---

### 2. Incorrect Order of Operations

**Issue:** Misusing parentheses leading to incorrect calculation of compound interest.

```typescript
function calculateCompoundInterest(principal: number, rate: number, timesCompounded: number, years: number): number {
    // Mistake: Incorrect order of operations due to misplaced parentheses
    return principal * (1 + rate) ** (timesCompounded * years);
}

// Usage
const principal = 1000;
const rate = 0.05; // 5%
const timesCompounded = 12;
const years = 10;
console.log(calculateCompoundInterest(principal, rate, timesCompounded, years)); // Incorrectly outputs 16470.091
```

**Explanation:**  
The standard compound interest formula is \( A = P \times \left(1 + \frac{r}{n}\right)^{n \times t} \), where:
- \( P \) = principal
- \( r \) = annual interest rate
- \( n \) = number of times interest is compounded per year
- \( t \) = number of years

In the faulty function, the rate is not divided by the number of times compounded per year (\( \frac{r}{n} \)), leading to an inflated interest rate in the calculation.

**Correct Approach:**

```typescript
function calculateCompoundInterestCorrectly(principal: number, rate: number, timesCompounded: number, years: number): number {
    return principal * Math.pow((1 + rate / timesCompounded), timesCompounded * years);
    // Alternatively, using exponentiation:
    // return principal * (1 + rate / timesCompounded) ** (timesCompounded * years);
}

// Usage
console.log(calculateCompoundInterestCorrectly(principal, rate, timesCompounded, years)); // Correctly outputs ~1647.009
```

---

### 3. Variable Misuse in Calculations

**Issue:** Using the wrong variable in a salary calculation, leading to incorrect total compensation.

```typescript
interface Employee {
    baseSalary: number;
    bonusPercentage: number;
    taxPercentage: number;
}

function calculateTotalCompensation(employee: Employee): number {
    // Mistake: Applying tax to bonus instead of base salary
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

console.log(calculateTotalCompensation(employee)); // Incorrectly outputs 50000 + 5000 - 1000 = 49000
// The correct tax should be on the total of base salary and bonus: (50000 + 5000) * 0.20 = 11000
// So total should be 50000 + 5000 - 11000 = 44000
```

**Explanation:**  
The function incorrectly applies the tax only to the bonus instead of the total compensation (base salary + bonus). This results in a tax calculation that is lower than intended, thereby inflating the total compensation.

**Correct Approach:**

```typescript
function calculateTotalCompensationCorrectly(employee: Employee): number {
    const bonus = employee.baseSalary * employee.bonusPercentage;
    const totalBeforeTax = employee.baseSalary + bonus;
    const tax = totalBeforeTax * employee.taxPercentage;
    return totalBeforeTax - tax;
}

// Usage
console.log(calculateTotalCompensationCorrectly(employee)); // Correctly outputs 50000 + 5000 - 11000 = 44000
```

---

### 4. Integer Division Leading to Loss of Precision

**Issue:** Performing integer division where floating-point division is intended, causing loss of precision.

```typescript
function calculateAverage(scores: number[]): number {
    const total = scores.reduce((sum, score) => sum + score, 0);
    // Mistake: Using integer division by casting to integers
    return Math.floor(total / scores.length);
}

// Usage
const scores = [85, 90, 78, 92, 88];
console.log(calculateAverage(scores)); // Incorrectly outputs 86 instead of 86.6
```

**Explanation:**  
The function uses `Math.floor` to round down the average to the nearest integer, resulting in the loss of the decimal component. This is inappropriate when a precise average is required.

**Correct Approach:**

```typescript
function calculateAveragePrecisely(scores: number[]): number {
    const total = scores.reduce((sum, score) => sum + score, 0);
    return total / scores.length;
    // Optionally, to round to two decimal places:
    // return Math.round((total / scores.length) * 100) / 100;
}

// Usage
console.log(calculateAveragePrecisely(scores)); // Correctly outputs 86.6
```

---

### 5. Floating Point Precision Errors

**Issue:** Accumulating floating-point errors in financial calculations.

```typescript
function calculateTotalCost(prices: number[]): number {
    let total = 0;
    for (const price of prices) {
        total += price;
    }
    return total;
}

// Usage
const prices = [0.1, 0.2, 0.3];
console.log(calculateTotalCost(prices)); // Outputs 0.6000000000000001 instead of 0.6
```

**Explanation:**  
Due to the nature of floating-point arithmetic in JavaScript (and TypeScript), adding decimal numbers like 0.1, 0.2, and 0.3 can result in precision errors, leading to a total that slightly deviates from the expected value.

**Correct Approach:**

Use integer-based calculations by representing monetary values in the smallest units (like cents) to avoid floating-point precision issues.

```typescript
function calculateTotalCostPrecisely(prices: number[]): number {
    let totalCents = 0;
    for (const price of prices) {
        totalCents += Math.round(price * 100); // Convert to cents
    }
    return totalCents / 100; // Convert back to dollars
}

// Usage
console.log(calculateTotalCostPrecisely(prices)); // Correctly outputs 0.6
```

Alternatively, using a library like [decimal.js](https://github.com/MikeMcl/decimal.js/) can help manage precise decimal calculations.

---

### 6. Overflow in Computations

**Issue:** Exceeding the maximum safe integer limit in JavaScript/TypeScript, leading to incorrect results.

```typescript
function factorial(n: number): number {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Usage
console.log(factorial(20)); // Outputs 2432902008176640000
console.log(factorial(30)); // Outputs 2.6525285981219103e+32 (incorrect due to precision loss)
```

**Explanation:**  
JavaScript numbers are based on the IEEE 754 double-precision floating-point format, which can accurately represent integers up to \( 2^{53} - 1 \). Calculations like `factorial(30)` exceed this limit, resulting in precision loss and incorrect results.

**Correct Approach:**

Use libraries that support arbitrary-precision arithmetic, such as [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) or external libraries like [big-integer](https://github.com/peterolson/BigInteger.js/).

```typescript
function factorialBigInt(n: number): bigint {
    let result: bigint = 1n;
    for (let i = 2; i <= n; i++) {
        result *= BigInt(i);
    }
    return result;
}

// Usage
console.log(factorialBigInt(20)); // Outputs 2432902008176640000n
console.log(factorialBigInt(30)); // Outputs 265252859812191058636308480000000n
```

**Note:**  
While `BigInt` allows for arbitrary-sized integers, it should be used consistently. Mixing `BigInt` with regular numbers will result in errors.

---

### 7. Incorrect Use of Data Types in Calculations

**Issue:** Using an incorrect data type (e.g., string instead of number) in arithmetic operations, leading to unexpected results.

```typescript
function calculateTotalPrice(price: string, quantity: string): number {
    // Mistake: Adding strings instead of numbers
    return price * quantity;
}

// Usage
const price = "19.99";
const quantity = "3";
console.log(calculateTotalPrice(price, quantity)); // Surprisingly outputs 59.97 due to implicit coercion
```

**Explanation:**  
While JavaScript (and by extension TypeScript) implicitly coerces strings to numbers when using the multiplication operator (`*`), this behavior can lead to unexpected results, especially with other operators like addition (`+`), which concatenates strings instead of performing arithmetic addition.

For example:

```typescript
function calculateTotalWrong(price: string, quantity: string): number {
    return Number(price) + Number(quantity); // Correct for addition
}

function calculateTotalBad(price: string, quantity: string): number {
    // Mistake: Using '+' operator directly on strings leads to concatenation
    return Number(price) + Number(quantity); // If not using Number(), would concatenate
}

console.log(calculateTotalBad("19.99", "3")); // Returns "19.993" if not converted
```

**Correct Approach:**

Always explicitly convert string inputs to numbers before performing arithmetic operations and be cautious with operators that behave differently based on operand types.

```typescript
function calculateTotalPriceCorrectly(price: string, quantity: string): number {
    const numericPrice = parseFloat(price);
    const numericQuantity = parseInt(quantity, 10);

    if (isNaN(numericPrice) || isNaN(numericQuantity)) {
        throw new Error("Invalid input: price and quantity must be numbers.");
    }

    return numericPrice * numericQuantity;
}

// Usage
console.log(calculateTotalPriceCorrectly(price, quantity)); // Correctly outputs 59.97
```

Alternatively, define the function parameters to accept numbers to ensure type safety:

```typescript
function calculateTotalPriceTypeSafe(price: number, quantity: number): number {
    return price * quantity;
}

// Usage
const numericPrice = 19.99;
const numericQuantity = 3;
console.log(calculateTotalPriceTypeSafe(numericPrice, numericQuantity)); // Outputs 59.97
```

---

### Summary

These examples highlight common pitfalls that can lead to incorrect computational results in TypeScript:

1. **Implementing the Wrong Formula:** Always verify that mathematical formulas are correctly implemented.
2. **Incorrect Order of Operations:** Ensure operations are performed in the intended sequence, using parentheses as needed.
3. **Variable Misuse in Calculations:** Use the correct variables in formulas to avoid logical errors.
4. **Integer Division Leading to Loss of Precision:** Use appropriate division methods when precision is critical.
5. **Floating Point Precision Errors:** Utilize integer-based calculations or arbitrary-precision libraries for financial computations.
6. **Overflow in Computations:** Be aware of data type limits and use larger or arbitrary-precision types when necessary.
7. **Incorrect Use of Data Types in Calculations:** Explicitly convert and validate data types to prevent unexpected behaviors.
\ No newline at end of file