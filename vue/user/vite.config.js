import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://github.com/antfu/unplugin-icons
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import legacyPlugin from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/app/base/',
	build: {
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					var info = assetInfo.name.split('.')
					var extType = info[info.length - 1]
					if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
						extType = 'media'
					} else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
						extType = 'img'
					} else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
						extType = 'fonts'
					}
					return `assets/${extType}/[name]-[hash][extname]`
				},
				chunkFileNames: 'assets/js/[name]-[hash].js',
				entryFileNames: 'assets/js/[name]-[hash].js'
			}
		}
	},
	// 开发时请求代理
	server: {
		// proxy: ''
		// proxy: {
		// 	'^/api': {
		// 		target: '',
		// 		changeOrigin: true,
		// 		secure: false
		// 	}
		// }
		proxy: {
			'/base': {
			 target: '',
			pathRewrite: { '^/base': '/base' },
			 changeOrigin: true,
			 secure: false
			}
		}
	},
	resolve: {
		alias: { '@': path.resolve(__dirname, './src') }
	},
	plugins: [
		vue(),
		AutoImport({
			// Generate corresponding .eslintrc-auto-import.json file - https://github.com/antfu/unplugin-auto-import
			// eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
			eslintrc: {
				enabled: true,
				filepath: path.resolve(__dirname, '.eslintrc-auto-import.json'),
				globalsPropValue: true
			},
			resolvers: [
				// 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
				ElementPlusResolver()
			]
		}),
		Components({
			resolvers: [
				// 自动导入 Element Plus 组件
				ElementPlusResolver(),
				// 目前其实用不到自动引入，因为想使用动态图标组件，又不想全量引入
				// 所以都有主动引入，详见components/my-icon/iconify-icon
				IconsResolver({
					prefix: 'iconify'
				})
			]
		}),
		Icons({
			compiler: 'vue3',
			autoInstall: true
		}),
		legacyPlugin({
			targets: ['chrome 52'],  // 需要兼容的目标列表，可以设置多个
			additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11时需要此插件
		})
	]
})
