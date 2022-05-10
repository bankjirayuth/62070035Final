const express = require("express");
const mongoose = require("mongoose");
const configs = require("./database/database.js");
const BlogModel = require("./models/model.js");
var cors = require("cors");
const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());

mongoose.Promise = global.Promise;
mongoose.connect(configs.mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/database", async (req, res) => {
  try {
    const result = await BlogModel.find();
    const filtered = result.filter((data) => data.faculty_name == req.body.faculity);
    console.log(filtered)
    res.send(filtered);
  } catch (err) {
    err;
  }
});

// app.post("/insert", async (req, res) => {

//   try {
//     let a = new BlogModel({ title: req.body.title });
//     await a.save();
//   } catch (err) {
//     err;
//   }
// });

app.listen(port, () => {
  console.log(`run on port ${port}`);
});
