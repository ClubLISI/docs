<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'App'
})
</script>

<script lang="ts" setup>
const route = useRoute()
</script>

<template>
	<div class="app">
		<Sidebar />

		<RouterView :key="route.path" />
	</div>
</template>

<style lang="scss" scoped>
.app {
	@include flex(row);
}
</style>
