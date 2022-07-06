---
{
	"order": 3,
	"title": "Authentication"
}
---
# Authentication

Related
: [`UserData`](/types/UserData)
: [`JWTModule`](/types/JWTModule)
: [`AuthTokenAPIRoute`](/types/AuthTokenAPIRoute)
: [`AuthTokenRefreshAPIRoute`](/types/AuthTokenRefreshAPIRoute)

---

Authenticating with the API via a external application is done using a long-lived `key` issued to a specific `user` ([`UserData`](/types/UserData)) to request a short-lived `token`([`JWTModule.Token`](/types/JWTModule#token)). This `key` should be treated as a secret and not be included in any user-facing code such as the browser. The `token` that is produced using the `key` expires after one hour of being issued.

Before it expires, `token.signature` can be used to authorize as the `user` the `key` was issued for. Calls take on the roles and permissions of said `user` too. This means if they are a admin, they can make admin requests. If they are not, those calls will get rejected or altered to match what the `user` has permission to see. 

## Process
- make a `POST` call to `auth/token` passing [`AuthTokenAPIRoute.Body`](/types/AuthTokenAPIRoute#body)
- responds [`AuthTokenAPIRoute.Result`](/types/AuthTokenAPIRoute#result)(`token`, `user`)
	- `token` expires an hour after `token.issued` exactly at `token.expires`
- set the `Authorization` header to `token.signature`
	- calls to the API are now authorized as `user`

### Refreshing
- make a `POST` call to `auth/token/refresh` passing [`AuthTokenRefreshAPIRoute.Body`](/types/AuthTokenRefreshAPIRoute#body) 
- responds [`JWTModule.Token`](/types/JWTModule#token)(`token`)

## Example
```typescript
type Token = JWTModule.Token
type AuthResult = AuthTokenAPIRoute.Result
type RefreshResult = AuthTokenAPIRoute.RefreshResult

let token: Token | null = null
const api = axios.create({
	baseURL: 'http://my-site.com/api'
})

const clearToken = () => setToken(null)
function setToken(data: JWTModule.Token | null) {
	token = data

	if(token) api.defaults.headers.common['Authorization'] = token.signature
	else delete api.defaults.headers.common['Authorization']
}

export function authenticate(key: string) {
	return api.post<AuthResult>('auth/token', { key })
		.then(result => {
			setToken(result.data.token)
			return result.data.user
		})
}

export function refresh() {
	if(token === null) throw new Error('token missing')
	return api.post<RefreshResult>('auth/token/refresh', { token })
		.then(result => setToken(result.data))
		.catch(clearToken)
}
```
