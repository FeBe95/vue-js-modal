/**
 * @param {Number} from  Lower limit
 * @param {Number} to    Upper limit
 * @param {Number} value Checked number value
 *
 * @return {Number} Either source value itself or limit value if range limits
 * are exceeded
 */
export const inRange = (from, to, value) => {
  return value < from ? from : value > to ? to : value
}
