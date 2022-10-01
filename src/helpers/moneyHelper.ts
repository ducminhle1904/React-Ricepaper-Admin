export function generateCurrency(value: number) {
    return new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "VND",
    }).format(Number(value));
}
