const express = require("express");
const webpush = require("web-push");
const path = require("path");
const fs = require("fs");

const publicVapidKey =
  "BC59LJE37LuEnZfeWK0yw3X4mYJIEORo7Cy3EEgX1bdoalbtRw556NItgVbxMElPPLkuspwYiMElUqBZcFzrKRs";
const privateVapidKey = "u4xAeqECGDrgujxoCH4kE5Gl1s3Rlk-IK8BbOsKU6dM";

// Replace with your email
webpush.setVapidDetails(
  "mailto:val@karpov.io",
  publicVapidKey,
  privateVapidKey
);

const app = express();

app.use(express.static(path.join(__dirname, "client")));

app.use(require("body-parser").json());

app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: "Notificação ContrataSol" });
  
  fs.writeFile(__dirname + "meutxt.txt", JSON.stringify(subscription), function(
    erro
  ) {
    if (erro) {
      throw erro;
    }

    console.log("Arquivo salvo");
  });

  webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error.stack);
  });
});

app.listen(5000, console.log);
