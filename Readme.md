# Todo List Backend App

## Endpoints

### User Management

- `POST "/"`: Register user baru
- `POST "/login"`: Autentikasi untuk mendapatkan JWT token
- `PUT "/"`:  Update data user
- `DELETE "/"`: Hapus data user
- `GET "/"` : Dapatkan data user

#### Requests and Responses

##### POST Register

###### Request

`localhost:10000/api/v1/user`

```json
{
    "username":"user-1",
    "password":"pass-1"
}
```

**Response:**

```json
{
    "status": true,
    "data": {
        "affectedRows": 1,
        "insertId": 6,
        "warningStatus": 0
    }
}
```

##### POST Login

###### Request

`localhost:10000/api/v1/user/login`

```json
{
    "username":"user-1",
    "password":"pass-1"
}
```

###### Response

```json
{
    "status": true,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTY5MjYxMzI5MSwiZXhwIjoxNjkyNjE2ODkxfQ.T7tdh3BpOGSxlgvhbFrg-lmBE8fO_SM2g4s6oT2zqys"
    }
}
```
##### PUT Update

###### Request

`localhost:10000/api/v1/user`

```json
{
    "id":"1",
    "username":"user-1",
    "password":"pass-1"
}
```

###### Response

```json
{
    "status": true,
    "data": {
        "affectedRows": 1,
        "insertId": 0,
        "warningStatus": 0
    }
}
```

##### DELETE Delete

###### Request

`localhost:10000/api/v1/user`

```json
{
    "id":"1"
}
```

###### Response

```json
{
    "status": true,
    "data": {
        "affectedRows": 1,
        "insertId": 0,
        "warningStatus": 0
    }
}
```

##### GET Get User

###### Request

`localhost:10000/api/v1/user`

###### Response

```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "username": "user-1",
            "password": "pass-1"
        },
        {
            "id": 2,
            "username": "user-2",
            "password": "pass-2"
        }
    ]
}
```

### Task Management

- `GET "/"`: Dapatkan daftar todo
- `POST "/"`: Tambahkan todo
- `PUT "/"`:  Update todo
- `DELETE "/"`: Hapus todo

#### Requests and Responses

##### GET Get Task

###### Request

`localhost:10000/api/v1/task`

###### Response

```json
{
    "status": true,
    "data": [
        {
            "id": 8,
            "items": "Task A",
            "createdAt": "2023-08-21 13:28:49",
            "updatedAt": "2023-08-21 13:37:02"
        },
        {
            "id": 9,
            "items": "Task 3",
            "createdAt": "2023-08-21 13:28:54",
            "updatedAt": "2023-08-21 13:28:54"
        },
        {
            "id": 10,
            "items": "Task A",
            "createdAt": "2023-08-21 13:36:40",
            "updatedAt": "2023-08-21 13:36:40"
        }
    ]
}
```

##### POST Add Todos

###### Request

`localhost:10000/api/v1/task/`

```json
{
    "item":"Task A"
}
```

###### Response

```json
{
    "status": true,
    "data": [
        1,
        "Task A"
    ]
}
```

##### PUT Update Todos

###### Request

`localhost:10000/api/v1/task/`

```json
{
    "id":"1",
    "item":"Task B"
}
```

###### Response

```json
{
    "status": true,
    "data": [
        "10",
        "Task B"
    ]
}
```

##### DELETE Delete Todos

###### Request

`localhost:10000/api/v1/task`

```json
{
    "id":"10"
}
```

###### Response

```json
{
    "status": true,
    "data": {
        "affectedRows": 1,
        "insertId": 0,
        "warningStatus": 0
    }
}
```
