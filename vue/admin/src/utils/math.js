/**
 * 四舍五入，Number.toFixed 是四舍六入五取偶
 * @param {Number|String} num     [待处理数字]
 * @param {Number} decimal [需要保留的小数位]
 */
export function roundNumber(num, decimal = 2) {
	const n = Number(num)
	if (isNaN(n)) {
		return 0
	}
	const p1 = Math.pow(10, decimal + 1)
	const p2 = Math.pow(10, decimal)
	return Math.round((n * p1) / 10) / p2
}
