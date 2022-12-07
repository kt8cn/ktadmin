/**
 * 校验手机号
 * @param {String} phone
 */
export function validatePhoneNumber(phone) {
	const reg = /^1[3-9]{1}\d{9}$/
	return reg.test(phone)
}
