<script>
/* 
    上传一张图片
 */
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'Upload'
})
</script>
<script setup>
console.log(import.meta.env.VUE_APP_BASE_API + '/svideo/Media/upload', 'klk;kl;')
import { useAuth } from '@/hooks'
import { ref, defineExpose } from 'vue'
import { baseConfig } from '@/config'
const { state } = useAuth()
const isRefresh = ref(true)
const url = import.meta.env.VUE_APP_BASE_API + '/svideo/Media/upload'

const headers = {
	UserToken: state.agenttoken
}
const props = defineProps({
	imgurl: {
		type: String,
		default: ''
	}
})
console.log(props.imgurl)
const imgurlRef = ref(props.imgurl)

const handleSuccess = (response, uploadFile) => {
	imgurlRef.value = URL.createObjectURL(uploadFile.raw)
	emits('getImg', imgurlRef.value)
}

const beforeUpload = (rawFile) => {
	if (rawFile.type.indexOf('image') == -1) {
		ElMessage.error('请上传图片')
		return false
	} else if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error(' picture size can not exceed 2MB!')
		return false
	}
	return true
}
const emits = defineEmits(['getImg'])
</script>
<template>
	<div>
		<el-upload
			class="uploader"
			:action="url"
			:headers="headers"
			:show-file-list="false"
			:on-success="handleSuccess"
			:before-upload="beforeUpload"
		>
			<img v-if="imgurlRef" :src="imgurlRef" class="upload-img" />
			<i v-else class="upload-icon el-icon-plus"></i>
		</el-upload>
	</div>
</template>
<style>
.uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.uploader .el-upload:hover {
	border-color: #409eff;
}
.upload-icon {
	font-size: 28px;
	color: #8c939d;
	width: var(--app-inline-box-wh);
	height: var(--app-inline-box-wh);
	line-height: var(--app-inline-box-wh);
	text-align: center;
}
.upload-img {
	width: var(--app-inline-box-wh);
	height: var(--app-inline-box-wh);
	display: block;
}
</style>
