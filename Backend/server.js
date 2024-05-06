const connectDb = require("./config/db");
const express = require("express");
const port = 5000;
const app = express();

connectDb();

const {errorHandler} = require('./middleware/errorMiddleware');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/todos', require('./routes/todoRoutes'));  
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler);


app.listen(port, () => {
  console.log(`server is listening at ${port}`);
});


