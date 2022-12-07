/**
 * 节流函数
 */
export function throttle(fn, wait = 150) {
	let last = 0
	return function (...args) {
		const now = Date.now()
		if (now - last > wait) {
			fn.apply(this, args)
			last = now
		}
	}
}

/**
 * 防抖函数
 */
export function debounce(fn, wait = 200, immediate = false) {
	let timer

	return function (...args) {
		if (timer) clearTimeout(timer)
		if (immediate) {
			timer = null
			return fn.apply(this, args)
		}
		timer = setTimeout(() => fn.apply(this, args), wait)
	}
}

/**
 * 深拷贝
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 是否为空
 */
 export function isEmpty(val) {
	if (val==''){
		return true
	}else if(val==null){
		return true
	}else if (val==undefined){
		return true
	}
  return false
}