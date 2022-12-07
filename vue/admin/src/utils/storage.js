// interface StorageOptions {
// 	/**
// 	 * 有效期，毫秒
// 	 */
// 	expired?: number
// 	/**
// 	 * 是否仅存运行时，采用 sesstionStorage
// 	 */
// 	runTime?: boolean
// }

/**
 * 本地存储-存
 * @param {String} k key
 * @param {any} data
 * @param {Object} options StorageOptions
 */
export function setStorage(k, data, options) {
	if (!k) return
	const { expired, runTime } = { ...options }
	const d = JSON.stringify({ t: Date.now(), expired, data })
	runTime ? sessionStorage.setItem(k, d) : localStorage.setItem(k, d)
}

/**
 * 本地存储-取
 * @param {String} k key
 * @param {Object} options StorageOptions
 * @returns any
 */
export function getStorage(k, options) {
	if (!k) return null
	const { runTime, expired } = { ...options }
	let d = runTime ? sessionStorage.getItem(k) : localStorage.getItem(k)
	if (!d) return d
	d = JSON.parse(d)
	const exp = expired || d.expired
	if (exp && Date.now() - d.t > exp) return null
	return d.data
}

/**
 * 移除某一项本地存储
 * @param {String} k key
 * @param {Object} options StorageOptions
 */
export function removeStorage(k, options) {
	const { runTime } = { ...options }
	runTime ? sessionStorage.removeItem(k) : localStorage.removeItem(k)
}

/**
 * 清空本地存储
 * @param {Object} options StorageOptions
 */
export function clearStorage(options) {
	const { runTime } = { ...options }
	runTime ? sessionStorage.clear() : localStorage.clear()
}
