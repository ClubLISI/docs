<script lang="ts">
import { computed } from '@vue/reactivity'
import { defineComponent } from 'vue'
import { PageData } from '../../../routes'

export default defineComponent({
	name: 'SidebarNavigationItem'
})
</script>

<script lang="ts" setup>
const props = defineProps<{
	page: PageData
}>()

const page = computed(() => props.page)

const children = computed(() =>
	page.value.children
		.sort((a, b) => a.url.localeCompare(b.url))
		.sort((a, b) => a.props.order - b.props.order)
)

const title = computed(
	() => page.value.props.label ?? page.value.props.title ?? page.value.url.replace(/^\//, '')
)
</script>

<template>
	<div class="sidebar-navigation-item">
		<span
			v-if="!page.props.content || page.props.content === '\n' || page.props.noPage"
			class="link nogo"
		>
			{{ title }}
		</span>
		<RouterLink v-else :to="page.url" class="link">
			{{ title }}
		</RouterLink>

		<div v-if="children.length" class="sub-menu">
			<template v-for="child of children">
				<SidebarNavigationItem :page="child" />
			</template>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.sidebar-navigation-item {
	@include flex(column);
	width: 100%;

	border-left: 1px solid transparent;
	transition: all 0.25s;

	.link {
		width: calc(100% - 2em);
		padding: 1em;

		margin-left: 1em;

		border-radius: 5px;
		transition: all 0.25s;

		flex-shrink: 0;
		text-transform: capitalize;

		color: rgb(239, 239, 239);
		text-decoration: none;

		&.nogo {
			width: 100%;
			border: 2px solid rgb(239, 239, 239);
		}
	}

	.link:not(.nogo):hover,
	& > .router-link-exact-active,
	& > .router-link-active:not(.router-link-exact-active) {
		background-color: rgb(239, 239, 239);
		color: #676778;
	}

	& > .router-link-exact-active,
	& > .router-link-active:not(.router-link-exact-active) {
		width: 100%;
	}

	.sub-menu {
		@include flex(column);
		width: 100%;
		row-gap: 1em;
		padding: 1em 0px;
		padding-left: 1em;
	}
}
</style>
