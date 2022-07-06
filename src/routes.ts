import { RouteRecordRaw } from 'vue-router'
import Page from './components/Page.vue'

export type PageData = {
	url: string
	children: PageData[]
	props: Record<any, any>
}

function mapFiles(files: Record<string, string>): Array<PageData> {
	return Object.entries(files)
		.map(mapFileToPage)
		.sort((a, b) => a.url.localeCompare(b.url))
}

function mapFileToPage([path, content]: [string, string]): PageData {
	const url = getPageURL(path)
	const props = getPageProps(content)

	props.content = getPageContent(content)
	if (!props.order) props.order = 10

	return {
		url,
		children: [],
		props
	}
}

function getPageURL(docPath: string) {
	const result = /^.*docs(?<url>.*).md$/g.exec(docPath)
	const url = result?.groups?.url
	return url === '/index' ? '/' : typeof url === 'string' ? url.replace('/index', '') : '/unknown'
}

function getPageProps(content: string): Record<any, any> {
	const contentOptionsRegex = /^-{3}\n(?<options>\{(.|\n)*?\})\n-{3}/g
	const results = contentOptionsRegex.exec(content)

	if (results?.groups?.options)
		try {
			return JSON.parse(results.groups.options)
		} catch (error) {
			console.log('failed parsing options', error)
		}

	return {}
}

function getPageContent(content: string): string {
	return content.replace(/(^-{3}(?:.|\n)*?-{3})/g, '')
}

function mapPageToRoute(page: PageData): RouteRecordRaw {
	return {
		path: page.url,
		component: Page,
		props: page.props,
		children: page.children.map(mapPageToRoute)
	}
}

function findPageChildren(pages: Set<PageData>, page: PageData): PageData[] {
	const children = Array.from(pages).filter(
		p =>
			p.url.startsWith(page.url) &&
			p.url !== page.url &&
			!p.url.replace(`${page.url}/`, '').includes('/')
	)

	for (const child of children) {
		pages.delete(child)
		child.children = findPageChildren(pages, child)
	}

	return children
}

const files = import.meta.globEager<string>('../docs/**/*.md', { as: 'raw' })

const pageRecords = new Set(mapFiles(files))
export const pages: PageData[] = []

for (const page of pageRecords) {
	if (page.url !== '/') {
		page.children = findPageChildren(pageRecords, page)
	}

	pages.push(page)
}

const routes: RouteRecordRaw[] = mapFiles(files).map(mapPageToRoute)

console.log(routes, pages)
export default routes
