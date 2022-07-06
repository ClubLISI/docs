<script lang="ts">
import { computed } from '@vue/reactivity'
import { defineComponent } from 'vue'
import { pages, PageData } from '../../routes'

export default defineComponent({
	name: 'SidebarNavigation'
})
</script>

<script lang="ts" setup>
const routes = computed(() => sortPages(Array.from(pages)))

function sortPages(pages: PageData[]) {
	return pages
		.sort((a, b) => a.url.localeCompare(b.url))
		.sort((a, b) => a.props.order - b.props.order)
}
</script>

<template>
	<nav class="sidebar-navigation">
		<template v-for="route of routes">
			<SidebarNavigationItem :page="route" />
		</template>
	</nav>
</template>

<style lang="scss" scoped>
.sidebar-navigation {
	@include flex(column);
	row-gap: 1em;

	width: 100%;
	flex: 1;

	overflow: hidden;
	overflow-y: auto;
}
</style>
