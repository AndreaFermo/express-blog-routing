const express = require("express");
const dotenv = require("dotenv").config();
const postsRouter = require("./routers/posts");

const app = express();

app.use(express.static("public"));

app.get('/', (req, res) => {

    res.send('Benvenuto nel mio blog!');

});

app.use("/posts", postsRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening on port http://localhost:${process.env.PORT}`)
})