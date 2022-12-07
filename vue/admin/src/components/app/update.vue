<script>
/* 强制刷新
    import Update from '@/components/app/update.vue'
    需要刷新时：
 */
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'Update'
})
</script>
<script setup>
import { ref,defineExpose } from 'vue'
const isRefresh = ref(true)
const emits = defineEmits(['refresh'])

</script>
<template>
    <div v-if="isRefresh">
      <slot />
    </div>
</template>
<style>
</style>