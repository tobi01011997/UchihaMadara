function processOrder(isValidOrder) {
    if (isValidOrder)
        console.log("Processing order...");
    console.log("Order processed successfully.");
}
function authenticateUser(user) {
    if (user.isActive)
        if (user.isAdmin)
            console.log("Granting admin privileges.");
        else
            console.log("Denying access.");
}
function applyDiscount(isMember, discountAvailable, purchaseAmount) {
    if (isMember && discountAvailable || purchaseAmount > 100) {
        console.log("Discount applied.");
    }
}
function calculateTotalPrice(basePrice, taxRate, discount) {
    var total = basePrice + taxRate * discount;
    console.log("Total price is: ".concat(total));
}