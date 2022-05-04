# FetchRewards web-service

The coding exercise includes: 
1. The ability for Fetch Rewards participating companies to reward points to users.
2. The ability for users to spend points awarded to them.

### Prerequisites
-   NodeJs https://nodejs.org/en/ 
-   Postman https://www.postman.com/

### Usage

1. Download or clone the project
2. Go to the directory
3. Run the command `npm install`
4. Run the command `npm run start`
5. WEB service will start on 8000 port

## API

### GET Points Balance

`GET` `http://localhost:8000/point`

```
GET /point HTTP/1.1
Host: localhost:8000
```

### Reward Points

`POST` `http://localhost:8000/point`

```
POST /point HTTP/1.1
Host: localhost:8000
Content-Type: application/x-www-form-urlencoded
Content-Length: 59

payer=DANNON&points=1000&timestamp=2020-11-02T14%3A00%3A00Z
```
### Spend Points

`POST` `http://localhost:8000/point/spend`

```
POST /point/spend HTTP/1.1
Host: localhost:8000
Content-Type: application/x-www-form-urlencoded
Content-Length: 11

points=1000
```


