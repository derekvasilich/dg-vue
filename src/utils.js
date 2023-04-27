const formatter = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export function formatCurrency(value) {
    return formatter.format( value )
}

export function formatVIN(value) {
    return value?.toUpperCase()
}

export function formatPriceRange(range) {
    if (range.low === range.high) {
        return formatCurrency(range.low)
    }
    return formatCurrency(range.low) + ' - ' + formatCurrency(range.high)
}