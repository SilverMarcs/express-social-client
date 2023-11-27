# express-social-client

This is the web frontend for a social network using a ExpressJS backend server (linked below) <br>
Based on Ed Roh's Full Stack Course with my own additions such as a refined **Comments section**, **User search** from searchbar, **Cloud hosting for images** and fixes.

[**Link**](https://github.com/SilverMarcs/express-social-server) to backend repository <br>
[**Link**](https://github.com/SilverMarcs/express-social-react-native) to react native frontend repository

## Demo

A **demo** of this frontend is available [**here**](https://express-social.vercel.app) <br>
\*Requires sign-up but feel free to use the dummy email and password. <br>
**Sample account**: ``tester@tester.com`` and ``12345678``

## Screenshots:

<img width="1385" alt="Screenshot 2023-11-28 at 1 05 08 AM" src="https://github.com/SilverMarcs/express-social-client/assets/77480421/541c0c12-dc52-435d-aa25-4edb0698ef34">

<img width="1382" alt="Screenshot 2023-11-28 at 1 07 25 AM" src="https://github.com/SilverMarcs/express-social-client/assets/77480421/67575fe6-0690-4376-87a3-e97e2405f7f9">



### Stack used:

- **Create React App**
- **MUI (MaterialUI)** for Styling/Styled Components
- **Redux** & **Redux Toolkit** for state management


## Running locally

- Git clone the repository from terminal

```
git clone https://github.com/SilverMarcs/express-social-client.git
```

- Move to the cloned folder

```
cd express-social-client
```

- Install node dependencies and wait until they get installed

```
npm install
```

- Rename .env.example file to .env and input ``http://localhost:3001`` as REACT_APP_API_URL (default for the ExpressJS server referenced in this project)

- Start the project. It should start running at http://localhost:3000 and open in your browser automatically.

```
npm run start
```

<br>
