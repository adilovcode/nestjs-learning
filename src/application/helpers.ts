export function arrayCountValues(array: any) {
    return array.reduce((pItem: any, cItem: any) => (pItem[cItem] = ++pItem[cItem] || 1, cItem), {});
}