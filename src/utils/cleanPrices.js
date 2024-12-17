export function cleanedPrices(prices) {
    return prices.map((price) => parseFloat(String(price).replace(/[^0-9.]/g, '')));
}
