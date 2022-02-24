## Getting Started

### Installation

1. install the dependencies using `npm install` or `npm i`

2. Rename the file `.env.example` to `.env`, then you need to configure the file `config.js` located in `src/config`

3. Start the app using `npm start`

### Directory Structure

```
├── src
│   ├── api
│   │   ├── auth
│   │   │   ├── controller.js
|   |   ├── posts
│   │   │   ├── controller.js
│   │   │   ├── model.js
│   │   │   └── route.js
│   │   ├── users
│   │   │   ├── controller.js
│   │   │   ├── model.js
│   │   │   └── route.js
│   │   └── index.js
│   ├── config
│   │   ├── config.js
│   │   └── mongo.js
│   └── index.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── uploads
└── encryptedFiles
```

### Available routes

| Method | Resource            | Description                                                                                                                                     |
| :----- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | --- |
| `POST` | `/users/login`      | Sign in with the username, password and role. If it's successful, then generates a token                                                        |
| `POST` | `/posts/add`        | This endpoint use to insert post in DB                                                                                                          | DB                       | Only accessible by admin                                                                           | You need to specify the token in the header with the following format: `authorization: your-token` | DB. |
| `GET`  | `/posts/fetch`      | It returns the list of posts added by admin. You need to specify the token in the header with the following format: `authorization: your-token` | DB                       |
| `PUT`  | `/posts/update/:id` | This endpoint use to update a post.                                                                                                             | Only accessible by admin | You need to specify the token in the header with the following format: `authorization: your-token` | DB                                                                                                 |
| `PUT`  | `/posts/remove/:id` | This endpoint use to delete a post.                                                                                                             | Only accessible by admin | You need to specify the token in the header with the following format: `authorization: your-token` | DB                                                                                                 |

## Postman Collection Link

https://www.getpostman.com/collections/5d41c5c9c6683a4d2896
