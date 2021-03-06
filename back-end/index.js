const express = require("express");
const mongoose = require("mongoose");
const configs = require("./database/database.js");
const BlogModel = require("./models/model.js");
var cors = require("cors");
const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());

const { PrometheusExporter } = require("@opentelemetry/exporter-prometheus");
const { MeterProvider } = require("@opentelemetry/sdk-metrics-base");

// Add your port and startServer to the Prometheus options
const options = { port: 9464, startServer: true };
const exporter = new PrometheusExporter(options);

// Register the exporter
const meter = new MeterProvider({
  exporter,
  interval: 1000,
}).getMeter("demo-prometheus");

// Now, start recording data
const counter = meter.createCounter("count_database", {
  description: "count database",
});




mongoose.Promise = global.Promise;
mongoose.connect(configs.mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/database", async (req, res) => {
  counter.add(1, { service_name: "testservice" });
  counter.add(1, { service_name: "testservice", status: "success", path: "/database" });
  counter.add(1, { service_name: "testservice", status: "failure", path: "/database" });
  counter.add(1, { service_name: "testservice", status: "data not found", path: "/database" });

  try {
    const result = await BlogModel.find();
    const filtered = result.filter(
      (data) => data.faculty_name == req.body.faculity
    );
    console.log(filtered);
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
