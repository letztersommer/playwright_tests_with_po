export function countArraySum(...args) {
    const sum = [0];
    for (const arg of args) sum[0] += arg;
    return sum;
}
