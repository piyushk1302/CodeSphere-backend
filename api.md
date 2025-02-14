# API lists

## AuthRouter
- POST /signUp
- POST /login
- POST /logout

## ProfileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## ConnectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed
