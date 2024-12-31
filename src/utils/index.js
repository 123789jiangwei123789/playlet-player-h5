/**
 * px to rem
 * 设计稿：375 1rem=50px
 */
export const pxToRem = (size, baseSize = 50) => {
    if (!size) return size
    return size / baseSize + 'rem'
}