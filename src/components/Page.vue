<script lang="ts">
import hljs from 'highlight.js'
import { marked } from 'marked'
import { computed, defineComponent, nextTick, onBeforeMount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'Page'
})
</script>

<script lang="ts" setup>
const router = useRouter()
const props = defineProps<{
	content: string
	title?: string
	filePath?: string
	pageTitle?: string
}>()

const html = computed(() =>
	marked(props.content, {
		highlight(code, lang) {
			return hljs.highlight(code, {
				language: lang
			}).value
		}
	})
)

const content = ref<HTMLElement>()

function setTitle() {
	if (props.title) document.title = `${props.title} - @clublisi/docs`
	else document.title = '@clublisi/docs'
}

function applyScroll() {
	if (router.currentRoute.value.hash) {
		const selected = content.value?.querySelector(router.currentRoute.value.hash)

		if (selected) {
			selected.scrollIntoView()
			selected.classList.add('highlight')
		}
	} else document.scrollingElement?.scrollTo(0, 0)
}

function applyLinks() {
	const links = content.value?.querySelectorAll('a')
	if (links) links.forEach(hookLink)
}

function hookLink(element: HTMLAnchorElement) {
	const href = element.getAttribute('href')
	if (!href) return
	else if (href.startsWith('http')) {
		element.setAttribute('target', '_blank')
		return
	}

	element.addEventListener('click', event => {
		event.preventDefault()
		router.push(href)
	})
}

onBeforeMount(() => setTitle())

watch(
	html,
	() =>
		nextTick(() => {
			applyScroll()
			applyLinks()
		}),
	{ immediate: true }
)
</script>

<template>
	<main class="page">
		<PageHeader :file-path="props.filePath">
			<template #title>
				{{ props.pageTitle ?? props.title }}
			</template>
		</PageHeader>

		<div ref="content" class="content" v-html="html" />
	</main>
</template>

<style lang="scss" scoped>
.page {
	@include flex(column);
	width: 100%;
	min-height: 100vh;
	padding: 3em 15%;

	background-color: rgb(239, 239, 239);
	line-height: 1.75em;

	:deep(code) {
		line-height: 1.5em;
	}

	.content {
		width: 100%;
	}
}
</style>
