import useClipboard from 'vue-clipboard3'

function clipboardSuccess() {
	ElMessage({ message: '复制成功', type: 'success', duration: 1500 })
}

function clipboardError() {
	ElMessage({ message: '复制失败', type: 'error', duration: 2000 })
}

const { toClipboard } = useClipboard()

export const setClipboard = async (text, options) => {
	try {
		await toClipboard(text)
		options?.success ? options.success() : clipboardSuccess()
	} catch (e) {
		options?.error ? options.error(e) : clipboardError()
	}
}
