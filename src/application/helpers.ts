import { format, subHours } from "date-fns";

export function arrayCountValues(array: any) {
    return array.reduce((pItem: any, cItem: any) => (pItem[cItem] = ++pItem[cItem] || 1, cItem), {});
}

export function formatToTime(date: Date): string {
    return format(subHours(date, 5), 'HH:mm');
}