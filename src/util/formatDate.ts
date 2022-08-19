/**
 * Takes a Date Object and returns a string in the form of
 * Month/Day/Year at Hours:Minutes(AM/PM)
 * @param {Date} date - The Date Object to format.
 * @throws {TypeError} - When a non-Date Object is passed.
 * @return {string}
 */
const formatDate = (date: Date): string => {
    if (!(date instanceof Date)) {
        throw new TypeError("Argument 'date' must be of type Date")
    }

    const day: string = addZero(date.getDate())
    const hours: string = (() => {
        const h = date.getHours()
        if (h > 12) {
            return addZero(h - 12)
        } else if (h === 0) {
            return "12"
        }
        return addZero(h)
    })()
    const mins: string = addZero(date.getMinutes())
    const month: string = addZero(date.getMonth() + 1)
    const period: string = date.getHours() > 12 ? "pm" : "am"
    const year: string = date.getFullYear().toString().slice(2)

    return `${month}/${day}/${year} at ${hours}:${mins}${period}`
}
/**
 * Adds a leading 0 to a number if it is only on one digit.
 * @param {number} num - The number to add the leading 0 to.
 * @return {String}
 */
const addZero = (num: number): string => (num < 10 ? `0${num}` : num.toString())

export default formatDate
