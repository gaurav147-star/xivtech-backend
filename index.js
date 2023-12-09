const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

const apiKey = process.env.openWeatherKey;

app.post("/getWeather", async (req, res) => {
  const { cities } = req.body;
  const weatherData = {};

  for (const city of cities) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      weatherData[city] = `${data.main.temp}°C`; // Accessing temperature from API response
    } catch (error) {
      weatherData[city] = "Not available";
    }
  }

  res.json({ weather: weatherData });
});

app.get("/", (req, res) => {
  res.send("API Running!");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}...`);
});
