<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Sidebar'
})
</script>

<script lang="ts" setup></script>

<template>
	<aside class="sidebar">
		<header>
			<h1>docs.clublisi.dev</h1>
		</header>

		<SidebarNavigation />
	</aside>
</template>

<style lang="scss" scoped>
.sidebar {
	@include flex(column);
	height: 100vh;

	position: sticky;
	left: 0px;
	top: 0px;
	z-index: 999;

	background-color: #676778;
	color: white;

	header {
		padding: 1em 4em;
	}
}
</style>
