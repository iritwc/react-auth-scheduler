# A Room Scheduler demo Application

This sample demonstrates:

- Logging in to Auth0 using Redirect Mode
- Accessing profile information that has been provided in the ID token
- A full Scheduling of 3 types of rooms. That is a full CRUD for booking a room.
- 2 types of viewing the bookings. One is a booking list and the other is a scheduler.

## Project setup

Use `yarn` or `npm` to install the project dependencies:

```bash
# Using npm..
npm install

# Using yarn..
yarn install
```

### Compiles and hot-reloads for development

```bash
npm start
```

Will run server and client concurrently.

## Deployment

### Compiles and minifies for production

```bash
npm run build
```

### Docker build

To build and run the Docker image, run `exec.sh`, or `exec.ps1` on Windows.

### Run your tests

```bash
npm run test
```

## Issues known

1. Permissions are not handled. That is, any user reschedule any of the existing bookings.
2. There may be an issue with the TZ of an exisitng booking. That is, editting my pop up an overlapping error message.

## Author

Irit Dabush with the help of [Auth0](https://auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](../LICENSE) file for more info.
# react-auth-scheduler
