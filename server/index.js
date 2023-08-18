const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.post("/api/fetch-songs", async (req, res) => {
  try {  
    const { post, page, single_page, per_page, categories, user } = req.body;

    const response = await axios.post("https://staging2.syncorstream.com/api/fetch_music_json", {
      post,
      page,
      single_page,
      per_page,
      categories,
      user,
    });

    const songsData = response.data;

    res.json(songsData);
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ error: "An error occurred while fetching songs." });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

 