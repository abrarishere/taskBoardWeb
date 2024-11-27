const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const ConnectToDb = require("./utils/ConnectToDb");
const taskBoardRoutes = require("./routes/taskBoard.routes");
const taskRoutes = require("./routes/task.routes");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL, // Set this to your frontend URL
  credentials: true,
}));
app.use(cookieParser());

app.use("/api/task-board", taskBoardRoutes);
app.use("/api/task", taskRoutes);

app.listen(PORT, () => {
  ConnectToDb();
  console.log(`Server is running on port ${PORT}`);
});
  