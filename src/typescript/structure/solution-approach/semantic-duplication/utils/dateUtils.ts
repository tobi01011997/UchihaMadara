export function formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);

    switch (format) {
        case 'MM/DD/YYYY':
            return `${month}/${day}/${year}`;
        case 'DD-MM-YYYY':
            return `${day}-${month}-${year}`;
        default:
            return `${year}-${month}-${day}`;
    }
}
\ No newline at end of file