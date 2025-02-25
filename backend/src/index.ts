import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

const PORT = process.env.PORT || 3000;

connectToDatabase()
    .then(()=>{
        app.listen(PORT , ()=> console.log(`App Listening on ${PORT} and connected to Database`));
    })
    .catch((err) => console.log(err));