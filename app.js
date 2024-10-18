if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const port = 8080;
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressErrors = require("./utils/ExpressError");
// const { listingSchema, reviewSchema } = require("./schema");
const listingRouter = require("./routers/listing");
const reviewRouter = require("./routers/review");
const userRouter = require("./routers/user");

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const Listing = require("./models/listing");
const Review = require("./models/review");
const User = require("./models/user");

//MONGODB ATLAS
// const dburl = process.env.ATLASDB_URL;
const dburlLocal = "mongodb://127.0.0.1:27017/wanderlast";

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

const sessionOption = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};
main()
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dburlLocal);
}

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;

  next();
});

//middleware validate server side data

app.use("/listing", listingRouter);
app.use("/listing/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.all("*", (req, res, next) => {
  next(new ExpressErrors(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let { message = "something went wrong", statusCode = 500 } = err;
  res.status(statusCode).render("error", { message });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// //for database tests only
// app.get("/schematest", async (req, res) => {
//   let sample = new Listing({
//     title: "My new Villa",
//     description: "this is a sample description",
//     price: 150000,
//     location: "New York, NY",
//     country: "bd",
//   });
//   await sample.save();
//   console.log("saved successfully!");
//   res.send("Saved successfully!");
// });
