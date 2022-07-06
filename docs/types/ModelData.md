---
{
	"title": "ModelData",
	"label": "ModelData"
}
---
# ModelData

```typescript
export interface ModelData {
	created: string
	updated: string | null
	deleted: string | null
}
```

## ModelUUIDData
```typescript
export interface ModelUUIDData extends ModelData {
	uuid: string
}
```
