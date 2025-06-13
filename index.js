const express = require("express");
const app = express();
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require('./routes/user');

const { handleGivenId } = require("./controllers/url");
const { connectMongoDB } = require("./connection");
const path = require("path");
const Url = require('./models/url')

connectMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("mongodb Connected!");
});
// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use("/url", urlRoute);
app.use("/",staticRoute);
app.use("/user",userRoute)
app.get("/:shortId", handleGivenId);

// Test Routes
app.get("/url/test", async (req, res) => {
    const allUrls = await Url.find({});
  return  res.render('homePage',{
        urls:allUrls,
    });

  });

 


  app.get("/", (req, res) => {
    return res.json({ message: "URL Shortener API is running" }); // Better welcome message
  });

const PORT = 8001;
app.listen(PORT, () => console.log(`Server Started at Port ${PORT}`));
