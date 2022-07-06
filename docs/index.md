---
{
	"order": 1,
	"title": "Home",
	"label": "Welcome"
}
---
# Welcome!

This is the documentation site for ClubLISI software and APIs. We are still under construction here, but I hope you enjoy your stay and feel free to report any issues you might come across!

## About

While the API can be interfaced with in any language that supports making HTTP requests, examples throughout this documentation will primarly be written in [TypeScript](https://www.typescriptlang.org/) using types/interfaces (referred to after as just 'types') to describe JSON objects. We also use the library [Axios](https://axios-http.com/) to make HTTP requests.

Most of the time, when working with Axios, we create a dedicated instance for a specific API. Which looks like this:
```typescript
const api = axios.create({
	baseURL: 'https://mycoolsite.com/api'
})
```

We can then make requests using Axios's `get`, `post`, `patch`, etc. methods like so:
```typescript
api.get<UserData>('auth')
	.then(result => result.data)
```
This would send a `GET` request to `https://mycoolsite.com/api/auth`. The [`<UserData>`](/types/UserData) bit is determining the type of `result.data`, which is what the API responds with.

Writing the `api` definition for every example may be tedious. So just understand if we refer to `api`, we are are referring to a Axios instance with the API's base url set.
