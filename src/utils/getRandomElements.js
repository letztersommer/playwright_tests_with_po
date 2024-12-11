export function getRandomProducts(productsElements, count) {
    const shuffled = productsElements.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
