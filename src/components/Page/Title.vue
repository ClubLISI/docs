<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'PageTitle'
})
</script>

<script lang="ts" setup></script>

<template>
	<h1 class="page-title">
		<slot />
	</h1>
</template>

<style lang="scss" scoped>
.page-title {
}
</style>
