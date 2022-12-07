// import 'vite/dynamic-import-polyfill'

const pages = import.meta.globEager('./pages/**/*.vue')
// 以 `./` 开头）或绝对路径（以 `/` 开头

export const resolveComponent = (name) => {
	const importPage = pages[name]

	if (!importPage) {
		throw new Error(`Unknown page ${name}. Is it located under Pages with a .vue extension?`)
	}

	// return importPage().then(module => module.default);
	return importPage.default
}
