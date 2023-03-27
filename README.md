# Monorepo for Formula1 Exercise

Full-stack Typescript exercise in express.js / react.


## Minimal requirements

- Node v18 (v18.15.0 was used for development, current LTS)
- Yarn
- Only tested on macOS, shouldn't have any problems on other systems


## Commands

You can install the backend and frontend project by running `yarn` in both project root dirs


### Backend

- `yarn start` simply build and start the backend
- `yarn dev` start the backend in dev mode, restarting on code changes
- `yarn test` run endpoint tests for backend


### Frontend

- `yarn start` build and start the frontend in dev mode


## Notes

- The main goal was to achieve the required functionality with the simplest / most readable code possible
- The frontend is accessible at the "/drivers" route as per the requirements, though no routing was used (why for a SPA...?) - so also at the root :)
- AFAIK two extra features were implemented: backend endpoint tests and showing the flags on the UI.
