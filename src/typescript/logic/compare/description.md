TypeScript code examples that demonstrate common comparison mistakes, including:

1. **Comparing the Wrong Element**
2. **Missing a Required Comparison**
3. **Using the Wrong Type of Comparison**

Each example includes a brief explanation to help you understand the issue.

---

### 1. Comparing the Wrong Element

**Issue:** The code mistakenly compares the wrong variables or array elements, leading to incorrect logic.

```typescript
function findMaximum(arr: number[]): number {
    if (arr.length === 0) {
        throw new Error("Array is empty");
    }

    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        // Mistake: Comparing arr[0] instead of arr[i]
        if (arr[0] > arr[i]) {
            max = arr[0];
        } else {
            max = arr[i];
        }
    }

    return max;
}

// Usage
const numbers = [3, 7, 2, 9, 5];
console.log(findMaximum(numbers)); // Incorrectly outputs 5 instead of 9
```

**Explanation:**  
In the `findMaximum` function, the intention is to iterate through the array and update `max` with the largest value found. However, the comparison `arr[0] > arr[i]` mistakenly always compares the first element (`arr[0]`) with the current element (`arr[i]`). This prevents the function from correctly identifying the maximum value in the array.

---

### 2. Missing a Required Comparison

**Issue:** A necessary comparison is omitted, causing the conditional logic to behave incorrectly.

```typescript
function isAdult(age: number): boolean {
    // Mistake: Missing comparison operator
    if (age) {
        return true;
    } else {
        return false;
    }
}

// Usage
console.log(isAdult(16)); // Incorrectly returns true
console.log(isAdult(0));  // Returns false
```

**Explanation:**  
The `isAdult` function is intended to determine if a person is an adult based on their age (commonly 18 or older). However, the condition `if (age)` only checks if `age` is a truthy value (non-zero), not whether it meets the adult threshold. As a result, `isAdult(16)` incorrectly returns `true`.

**Correct Approach:**

```typescript
function isAdult(age: number): boolean {
    if (age >= 18) {
        return true;
    } else {
        return false;
    }
}

// Usage
console.log(isAdult(16)); // Returns false
console.log(isAdult(20)); // Returns true
```

---

### 3. Using the Wrong Type of Comparison

There are several ways to use the wrong type of comparison, such as using assignment instead of comparison operators or comparing incompatible types.

#### a. Assignment Instead of Comparison

**Issue:** Using the assignment operator (`=`) instead of a comparison operator (`==` or `===`).

```typescript
function areNumbersEqual(a: number, b: number): boolean {
    // Mistake: Using '=' assigns b to a instead of comparing
    if (a = b) {
        return true;
    } else {
        return false;
    }
}

// Usage
console.log(areNumbersEqual(5, 5)); // Always returns true, but unintentionally assigns b to a
console.log(areNumbersEqual(3, 4)); // Returns true after assigning 4 to a
```

**Explanation:**  
In the `areNumbersEqual` function, the condition `if (a = b)` uses the assignment operator, which assigns the value of `b` to `a` and then evaluates to the assigned value. Since non-zero numbers are truthy, this condition often returns `true` regardless of whether `a` and `b` were initially equal.

**Correct Approach:**

```typescript
function areNumbersEqual(a: number, b: number): boolean {
    // Use '===' for strict equality
    if (a === b) {
        return true;
    } else {
        return false;
    }
}

// Usage
console.log(areNumbersEqual(5, 5)); // Returns true
console.log(areNumbersEqual(3, 4)); // Returns false
```

#### b. Comparing Incompatible Types

**Issue:** Comparing values of different and incompatible types, leading to unexpected behavior.

```typescript
function compareStringAndNumber(a: string, b: number): boolean {
    // Mistake: Comparing a string with a number
    return a > b;
}

// Usage
console.log(compareTypes("10", 2));  // Returns false (NaN comparison)
console.log(compareTypes("3", 2));   // Returns false (NaN comparison)
console.log(compareTypes("abc", 2)); // Returns false (NaN comparison)
```

**Explanation:**  
Comparing a string with a number using relational operators like `>` can lead to unexpected results because TypeScript (and JavaScript) attempt to coerce types, often resulting in `NaN` (Not-a-Number) comparisons, which are always `false`.

**Correct Approach:**

Ensure both variables are of the same type before comparing:

```typescript
function compareNumbers(a: number, b: number): boolean {
    return a > b;
}

// Or, if comparing strings numerically:
function compareNumericStrings(a: string, b: string): boolean {
    const numA = Number(a);
    const numB = Number(b);
    if (isNaN(numA) || isNaN(numB)) {
        throw new Error("Invalid number format");
    }
    return numA > numB;
}

// Usage
console.log(compareNumbers(10, 2));               // Returns true
console.log(compareNumericStrings("10", "2"));    // Returns true
```

#### c. Using Loose Equality Instead of Strict Equality

**Issue:** Using `==` instead of `===`, leading to type coercion and potential bugs.

```typescript
function isEqual(a: any, b: any): boolean {
    // Mistake: Using '==' allows type coercion
    return a == b;
}

// Usage
console.log(isEqual('5', 5));  // Returns true due to type coercion
console.log(isEqual(0, false)); // Returns true
```

**Explanation:**  
Using `==` compares values after performing type coercion, which can lead to unexpected `true` results even when types differ. For example, `'5' == 5` returns `true` because the string `'5'` is coerced to the number `5`.

**Correct Approach:**

Use strict equality `===` to avoid type coercion:

```typescript
function isStrictlyEqual(a: any, b: any): boolean {
    return a === b;
}

// Usage
console.log(isStrictlyEqual('5', 5));  // Returns false
console.log(isStrictlyEqual(0, false)); // Returns false
console.log(isStrictlyEqual(5, 5));     // Returns true
```

---

### Summary

These examples highlight common pitfalls when performing comparisons in TypeScript:

1. **Comparing the Wrong Element:** Always ensure you're comparing the intended variables or array elements.
2. **Missing a Required Comparison:** Explicitly define the conditions you want to check to avoid unintended truthy or falsy evaluations.
3. **Using the Wrong Type of Comparison:** Be cautious with operators to prevent assignments instead of comparisons and avoid comparing incompatible types. Prefer strict equality (`===`) over loose equality (`==`) to ensure both value and type match.
\ No newline at end of file