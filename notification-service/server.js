require("dotenv").config();

const express = require("express");
const cors = require("cors");
const alertRoutes = require("./routes/alertRoutes");
const { connectDb } = require("./db");
const { initRabbit } = require("./utils/services");

const app = express();
const port = process.env.PORT || 4005;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/", alertRoutes);

const startServer = async () => {
  try {
    await connectDb();
    await initRabbit();
    app.listen(port, () => {
      console.log(`Notification service running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect notification-service components", error);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
