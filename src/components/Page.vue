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

onBeforeMount(() => {
	if (props.title) document.title = `${props.title} - @clublisi/docs`
	else document.title = '@clublisi/docs'
})

watch(
	html,
	() =>
		nextTick(() => {
			if (router.currentRoute.value.hash) {
				const selected = content.value?.querySelector(router.currentRoute.value.hash)

				if (selected) {
					selected.scrollIntoView()
					selected.classList.add('highlight')

					// setTimeout(() => selected.classList.remove('highlight'), 3000)
				}
			} else document.scrollingElement?.scrollTo(0, 0)

			const links = content.value?.querySelectorAll('a')

			console.log(links)
			links?.forEach(a => {
				const href = a.getAttribute('href')
				if (!href) return
				else if (href.startsWith('http')) {
					a.setAttribute('target', '_blank')
					return
				}

				a.addEventListener('click', event => {
					event.preventDefault()
					router.push(href)
				})
			})
		}),
	{ immediate: true }
)
</script>

<template>
	<main class="page">
		<div ref="content" class="content" v-html="html" />
	</main>
</template>

<style lang="scss" scoped>
.page {
	@include flex(row, center);
	width: 100%;
	min-height: 100vh;
	padding: 3em;

	background-color: rgb(239, 239, 239);
	line-height: 1.75em;

	:deep(code) {
		line-height: 1.5em;
	}

	.content {
		width: 100%;
		max-width: 800px;
	}
}
</style>
