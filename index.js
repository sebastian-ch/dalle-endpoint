const express = require("express");
const app = express();
const path = require("path");
const OpenAI = require("openai");

var cors = require("cors");
app.use(cors());
app.use(express.json());

const port = 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.json({ msg: "get" });
});

app.post("/fyz76", (req, res) => {
  if (req.body.apiKey.length > 0 && req.body.prompt.length > 0) {
    async function getImage() {
      const openai = new OpenAI({
        apiKey: req.body.apiKey,
      });
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: req.body.prompt,
        size: "1024x1024",
        //size: "512x512",
        quality: "standard",
        n: 1,
      });
      //console.log(response.data[0].url);
      res.json({ img: response.data[0].url });
    }
    getImage();
  } else {
    res.json({ msg: "missing api key or prompt" });
  }
});
