const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { authenticateToken } = require("./middleware/auth");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:8081", 
      "http://localhost:8082",
      "http://localhost:8083",
      "http://localhost:8084",
      "http://localhost:19006", // Expo web default
      process.env.FRONTEND_URL
    ].filter(Boolean), // Remove undefined values
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/academics", authenticateToken, require("./routes/academics"));
app.use("/api/timetable", authenticateToken, require("./routes/timetable"));
app.use("/api/hostel", authenticateToken, require("./routes/hostel"));
app.use("/api/mess", authenticateToken, require("./routes/mess"));
app.use("/api/events", authenticateToken, require("./routes/events"));
app.use("/api/faculty", authenticateToken, require("./routes/faculty"));
app.use("/api/college", authenticateToken, require("./routes/college"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
