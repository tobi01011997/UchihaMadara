function calculateDiscount(isMember) {
    var discount;
    if (isMember) {
        discount = 10; // 10% discount for members
    }
    var finalPrice = 100 - discount;
    return finalPrice;
}
console.log(calculateDiscount(true));
console.log(calculateDiscount(false));