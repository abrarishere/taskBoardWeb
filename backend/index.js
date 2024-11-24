const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const ConnectToDb = require("./utils/ConnectToDb");
const taskBoardRoutes = require("./routes/taskBoard.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/task-board", taskBoardRoutes);
app.use("/api/task", taskRoutes);

app.listen(PORT, () => {
  ConnectToDb();
  console.log(`Server is running on port ${PORT}`);
});
