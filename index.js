import express, { json, urlencoded } from "express";
import cors from "cors";
import mongoose from "mongoose";
import collection from "./mongo.js";
import { Review } from "./mongo.js";

const app = express();
app.use(json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", cors(), (req, res) => {
  res.send("Hello World!");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await collection.findOne({
      email: email,
      password: password,
    });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const data = {
    email: email,
    password: password,
  };

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/api/reviews", (req, res) => {
  const { breweryId, email, rating, review } = req.body;

  const newReview = new Review({
    breweryId,
    email,
    rating,
    review,
  });

  newReview
    .save()
    .then((savedReview) => {
      res.status(201).send("Review saved successfully");
    })
    .catch((err) => {
      res.status(500).send("Error saving review");
    });
});

// Express route to retrieve reviews for a specific dish by breweryId
app.get("/api/reviews/:breweryId", async (req, res) => {
  const breweryId = req.params.breweryId;

  try {
    const reviews = await Review.find({ breweryId });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).send("Error fetching reviews");
  }
});
const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mustafa:abdeali52@cluster0.8uq42zv.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("MongoDB is connected!");
  } catch (err) {
    throw err;
  }
};

app.listen(8080, () => {
  connect();
  console.log("Server is running on port 8080");
});
