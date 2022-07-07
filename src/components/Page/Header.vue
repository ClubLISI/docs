<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'PageHeader'
})
</script>

<script lang="ts" setup>
const props = defineProps<{
	filePath?: string
}>()

const githubURL = computed(() => {
	if (!props.filePath) return null
	return `https://github.com/ClubLISI/docs/blob/main/${props.filePath}`
})
</script>

<template>
	<header class="page-header">
		<PageTitle>
			<slot name="title" />
		</PageTitle>

		<aside>
			<a v-if="githubURL" :href="githubURL" target="_blank">
				<img src="/github.png" />
			</a>
		</aside>
	</header>
</template>

<style lang="scss" scoped>
.page-header {
	@include flex(row, space-between, center);
	width: 100%;

	aside {
		img {
			width: 35px;
			height: 35px;
		}
	}
}
</style>
