<script>
// 选择弹窗列表页（选择员工等）
import { defineComponent, onMounted } from 'vue'
import { Search, Close } from '@element-plus/icons-vue'
export default defineComponent({
	name: 'ChooseDialogue'
})
</script>
<script setup>
const emits = defineEmits(['getChooseData'])
import { toRaw } from '@vue/reactivity'
import { ref, defineExpose } from 'vue'
const dialogVisible = ref(false)
const isLoading = ref(true)
const isLoadingSelect = ref(true)
const dialogueName = ref()
const searchVal = ref('')
const title = ref('')
const nameTitleMap = {
	staff: '员工',
	tag: '标签'
}
// 传递过来的数据
const total = ref(0)
const dataList = ref([])

let selectIds = ref([])
let listIds = ref([])
let currentSelectBool = ref([])
const selectData = ref([])
// 选择
const selectAll = ref(false)

const show = (name, val) => {
	dialogVisible.value = true
	dialogueName.value = name
	isLoading.value = true
	isLoadingSelect.value = true
	if (val) {
		selectIds._value = toRaw(val)
		console.log(selectIds.value, val, '父页面传递过来的ids,')
	}
	title.value = nameTitleMap[name]
	setTimeout(() => {
		getDataList()
		getDataByIds()
	}, 5)
}

const getDataList = () => {
	switch (dialogueName.value) {
		case 'staff':
			dataList._value = [
				{
					id: 1,
					name: '21',
					avatar:
						'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fec%2Fca%2Fd8%2Feccad87a334d082b8ff200ae01157e44.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639642180&t=2652a2445af742fc8a4bb6c8e4f18d1e',
					rbacName: '管理员'
				},
				{ id: 2, name: '232421', avatar: '', rbacName: '管理员' }
			]
			console.log('获取员工列表')
			break
		case 'tag':
			dataList._value = [
				{
					id: 1,
					name: '21',
					avatar:
						'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fec%2Fca%2Fd8%2Feccad87a334d082b8ff200ae01157e44.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639642180&t=2652a2445af742fc8a4bb6c8e4f18d1e',
					rbacName: '管理员'
				},
				{ id: 2, name: '232421', avatar: '', rbacName: '管理员' }
			]
			console.log('获取标签列表')
			break
	}
	var ids = []
	dataList.value.forEach((item) => {
		ids.push(item.id)
	})
	listIds._value = ids
	total.value = 100

	var currentBoolArr = []
	dataList.value.forEach((item) => {
		if (selectIds.value.includes(item.id)) {
			currentBoolArr.push(true)
		} else {
			currentBoolArr.push(false)
		}
	})
	currentSelectBool.value = currentBoolArr
	isLoading.value = false
	isNeedCheckAll()
}
const getDataByIds = () => {
	switch (dialogueName.value) {
		case 'staff':
			selectData._value = [
				{
					id: 1,
					name: '21',
					avatar:
						'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fec%2Fca%2Fd8%2Feccad87a334d082b8ff200ae01157e44.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639642180&t=2652a2445af742fc8a4bb6c8e4f18d1e',
					rbacName: '管理员'
				}
			]
			console.log('根据ids获取已选员工列表', selectIds.value, selectData.value)
			isLoadingSelect.value = false
			break
	}
}
const handleCurrentChange = (val) => {
	console.log(`current page: ${val}分页请求接口`)
	getDataList()
}
const handleDele = (index) => {
	const id = selectData.value[index].id
	const json = selectData.value[index]
	const idx = listIds.value.indexOf(id)
	if (idx != -1) {
		currentSelectBool.value[idx] = false
		selectIds.value = selectIds.value.filter((item) => item != id)
		selectData.value = selectData.value.filter((item) => item.id != id)
	} else {
		selectIds.value = selectIds.value.filter((item) => item != id)
		selectData.value = selectData.value.filter((item) => item.id != id)
	}
}
const handleSelectChange = (index, isAll) => {
	const id = dataList.value[index].id
	const json = dataList.value[index]
	if (isAll == 1) {
		if (!selectIds.value.includes(id)) {
			selectIds.value.push(id)
			isLoadingSelect.value = true
			selectData.value.push(json)
			isLoadingSelect.value = false
		}
		return
	}
	if (isAll == 2) {
		if (selectIds.value.includes(id)) {
			selectIds.value = selectIds.value.filter((item) => item != id)
			selectData.value = selectData.value.filter((item) => item.id != id)
		}
		return
	}
	if (selectIds.value.includes(id)) {
		selectIds.value = selectIds.value.filter((item) => item != id)
		selectData.value = selectData.value.filter((item) => item.id != id)
	} else {
		selectIds.value.push(id)
		isLoadingSelect.value = true
		selectData.value.push(json)
		isLoadingSelect.value = false
	}
	if (currentSelectBool.value.indexOf(false) == -1) {
		selectAll.value = true
	} else {
		selectAll.value = false
	}
	isNeedCheckAll()
}
const isNeedCheckAll = () => {
	if (currentSelectBool.value.indexOf(false) == -1) {
		selectAll.value = true
	} else {
		selectAll.value = false
	}
}
const handleSelectAll = () => {
	var arr = toRaw(currentSelectBool.value)
	var selectArr = []
	if (selectAll.value == true) {
		arr.forEach((item, index) => {
			selectArr.push(true)
			handleSelectChange(index, 1)
		})
	} else {
		arr.forEach((item, index) => {
			selectArr.push(false)
			handleSelectChange(index, 2)
		})
	}
	isLoading.value = true
	currentSelectBool._value = selectArr
	isLoading.value = false
}
const onSubmit = () => {
	emits('getChooseData', selectIds.value)
	dialogVisible.value = false
}
const handleClose = () => {
	dialogVisible.value = false
}
defineExpose({
	show
})
</script>
<template>
	<div v-if="dialogVisible">
		<el-dialog
			v-model="dialogVisible"
			:title="'选择' + title"
			width="800px"
			:before-close="handleClose"
			custom-class="publicDialog"
		>
			<div class="app-flex-2-start chooseDia">
				<div class="cho-border">
					<div class="">
						<el-input
							v-model="searchVal"
							class="cho-item-width"
							size="large"
							@input="getDataList"
							placeholder="请输入名称"
							clearable
							:suffix-icon="searchVal.length == 0 ? Search : ''"
						/>

						<div class="cho-left">
							<el-checkbox v-model="selectAll" @change="handleSelectAll" size="large" />
							<div class="cho-margin">全部</div>
						</div>
						<div class="cho-block" v-if="!isLoading">
							<div class="cho-item" v-for="(item, index) in dataList" :key="index">
								<div class="cho-left">
									<el-checkbox v-model="currentSelectBool[index]" @change="handleSelectChange(index)" size="large" />
									<el-avatar
										v-if="dialogueName == 'staff'"
										class="cho-margin"
										shape="square"
										:size="50"
										:src="item.avatar"
									/>
									<div class="cho-margin">
										<div>{{ item.name }}</div>
										<div v-if="dialogueName == 'staff'">{{ item.rbacName }}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<el-pagination
						:pager-count="5"
						class="app-page"
						@current-change="handleCurrentChange"
						background
						layout="prev, pager, next"
						:total="total"
					/>
				</div>

				<div class="cho-margin">
					<div class="cho-sub-title">已选</div>
					<div class="cho-block" v-if="!isLoadingSelect">
						<div class="cho-item" v-for="(selectItem, index) in selectData" :key="index">
							<div class="cho-left">
								<el-avatar
									v-if="dialogueName == 'staff'"
									class="cho-margin"
									shape="square"
									:size="50"
									:src="selectItem.avatar"
								/>
								<div class="cho-margin">
									<div>{{ selectItem.name }}</div>
									<div v-if="dialogueName == 'staff'">{{ selectItem.rbacName }}</div>
								</div>
							</div>
							<div class="cho-right">
								<el-icon @click="handleDele(index)" size="20" class="cho-poniter">
									<Close />
								</el-icon>
							</div>
						</div>
					</div>
				</div>
			</div>
			<template #footer>
				<div class="dialog-footer" style="display: flex; justify-content: center; align-items: center">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="onSubmit">保存</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>
<style lang="scss">
.publicDialog {
	border-radius: 10px !important;
}
.chooseDia {
	.cho-border {
		border-right: 1px solid var(--app-border-color);
	}

	.cho-block {
		width: calc(800px / 2 - 16px);
		padding-right: var(--app-container-padding);
	}
	.cho-item {
		padding: var(--app-block-margin-m) 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.cho-left {
		display: flex;
		justify-content: left;
		align-items: center;
	}
	.cho-margin {
		margin-left: var(--app-block-margin-m);
	}
	.cho-poniter {
		cursor: pointer;
	}
	.cho-sub-title {
		height: 40px;
		line-height: 40px;
		margin-left: var(--app-block-margin-m);
	}
	.cho-margin-r {
		margin-right: var(--app-container-padding);
	}
	.cho-item-width {
		width: calc(800px / 2 - 32px);
	}
}
</style>
