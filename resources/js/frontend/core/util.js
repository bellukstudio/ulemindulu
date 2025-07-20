/**
 * Format a given number as Indonesian Rupiah currency string.
 *
 * @param {number} number The number to format.
 * @returns {string} The formatted string.
 */
export function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(number);
}
