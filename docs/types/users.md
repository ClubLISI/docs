---
{
	"order": 1,
	"title": "User Types",
	"label": "Users"
}
---
Related
: [`ModelData`](/types/ModelData)
: [`FileData`](/types/FileData)

---

```typescript
export interface UserData extends ModelData {
	name: string
	email: string
	display_name: string
	roles: UserRole[] | string[]
	avatar: FileData | null
	parent?: UserData
	children?: UserData[]
	meta?: UserMeta[]
}
```

## UserMeta

```typescript
export interface UserMetaData extends ModelData {
	name: string
	value: any
	private: boolean
	userName: string
	user?: UserData
}
```

## UserRole

```typescript
export interface UserRoleData extends ModelData {
	name: Name
	display_name: string
	users?: UserData[]
}
```

## UserProfile
```typescript
export interface UserProfileData {
	username: string
	email: string
	display_name: string
	first_name: string
	last_name: string
	full_name: string
	phone_number: string
	parentName: string | null
	avatarUUID: string | null
	avatar?: FileData
}
