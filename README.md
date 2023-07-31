### Setup the project

- Clone this project
- Inside both frontend and backend folder execute the following command:
```
  npm install
```
- In the backend folder create a `.env` file and add the following env variable
    ```
        PORT=<port number of your choice>
        MONGO_URL=<Your mongodb url>
        JWT_KEY=<Give any key of your choice>
    ```

- To run the frontend, execute the below command inside the frontend folder:
 ```
 npm run start
 ```
 - To run the backend, execute the below command inside the backend folder:
 ```
 nodemon index.js
 ```