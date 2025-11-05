function processOrder(isValidOrder) {
    if (isValidOrder)
        console.log("Processing order...");
    console.log("Order processed successfully."); // This line executes regardless of the if condition
}


function authenticateUser(user) {
    if (user.isActive)
        if (user.isAdmin)
            console.log("Granting admin privileges.");
        else
            console.log("Denying access."); // Ambiguous which if this else belongs to
}


function applyDiscount(isMember, discountAvailable, purchaseAmount) {
    if (isMember && discountAvailable || purchaseAmount > 100) {
        console.log("Discount applied.");
    }
}


function calculateTotalPrice(basePrice, taxRate, discount) {
    let total = basePrice + taxRate * discount;
    console.log(`Total price is: ${total}`);
}
\ No newline at end of file