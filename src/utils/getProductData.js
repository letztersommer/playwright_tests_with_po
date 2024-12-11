export function getProductNames(products) {
    const names = products.map((product) => product.name);
    // console.log(names);
    return names;
}

export function getProductDescriptions(products) {
    const descriptions = products.map((product) => product.description);
    // console.log(descriptions);
    return descriptions;
}

export function getProductPrices(products) {
    const prices = products.map((product) => product.price);
    // console.log(prices);
    return prices;
}
