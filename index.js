const { addonBuilder } = require("stremio-addon-sdk");
const express = require("express");
const fs = require("fs");

const streams = JSON.parse(fs.readFileSync("./links.json"));

const addon = new addonBuilder({
  id: "org.david.custom",
  version: "1.0.0",
  name: "Addon Prueba",
  description: "Mis links privados",
  catalogs: [],
  resources: ["stream"],
  types: ["movie", "series"],
});

addon.defineStreamHandler((args) => {
  const id = args.id;
  return Promise.resolve({ streams: streams[id] || [] });
});

const app = express();

app.use("/", addon.getInterface());
app.listen(3000, () => console.log("Addon funcionando en puerto 3000"));
