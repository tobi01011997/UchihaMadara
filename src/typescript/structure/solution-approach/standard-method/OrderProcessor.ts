class OrderProcessor {
    applyDiscounts(orderTotal: number, discountsApplied: number): number {
        if (discountsApplied > 5) {
            throw new Error("Too many discounts applied.");
        }

        if (orderTotal > 100) {
            orderTotal -= 10;
        } else if (orderTotal > 50) {
            orderTotal -= 5;
        }

        return orderTotal;
    }
}

const processor = new OrderProcessor();
try {
    const finalTotal = processor.applyDiscounts(120, 6);
    console.log(`Final Total: $${finalTotal}`);
} catch (error) {
    console.error(error.message);
}
\ No newline at end of file