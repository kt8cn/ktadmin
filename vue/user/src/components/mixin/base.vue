<script>
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'BaseMixin'
})
</script>
<script setup>
import { isEmpty } from '@/utils'
import { toRaw } from '@vue/reactivity';
import { ref,defineExpose } from 'vue'
</script>