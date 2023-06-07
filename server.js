if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const indexRouter = require("./routes/index");
const memberRouter = require("./routes/member");
const notesRouter = require("./routes/notes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");

app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(methodOverride("_method"));

//ROUTERS
app.use("/", indexRouter);
app.use("/member", memberRouter);
app.use("/notes", notesRouter);
//ROUTERS

//MONGOOSE
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => {
  console.log("There is an " + error);
});
db.once("open", () => {
  console.log("Good to go");
});

//MONGOOSE

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening ... " + process.env.PORT);
});
