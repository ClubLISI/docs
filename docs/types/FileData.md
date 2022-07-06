---
{
	"title": "FileData",
	"label": "FileData"
}
---
# FileData

Related
: [`ModelUUIDData`](/types/ModelData#modeluuiddata)

---

```typescript
export interface FileData extends ModelUUIDData {
	name: string
	encoding: string
	mimetype: string
	type: string | null
	filename: string
	size?: number
	url?: string
}
```
