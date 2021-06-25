const express = require("express");
const api_helper = require("./API_helper");
const ZipStream = require("zip-stream");
const request = require("request");
const axios = require("axios");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Endpoint inválido!"));

app.get("/produto1/url/:url", function (req, res) {
  axios("https://api.mercadolibre.com/items/MLB" + req.params.valor).then(
    function (response) {
      // handle success
      res.send(response.data);
    }
  );
});

app.get("/imagens/", (req, res) => {
  var zip = new ZipStream();
  zip.pipe(res);
  var queue = [
    {
      name: "one.jpg",
      url: "http://mlb-s1-p.mlstatic.com/980593-MLB31199590138_062019-O.jpg"
    },
    {
      name: "dois.jpg",
      url: "http://mlb-s1-p.mlstatic.com/766027-MLB29951333684_042019-O.jpg"
    }
  ];

  function addNextFile() {
    var elem = queue.shift();
    var stream = request(elem.url);
    zip.entry(stream, { name: elem.name }, (err) => {
      if (err) throw err;
      if (queue.length > 0) addNextFile();
      else zip.finalize();
    });
  }

  addNextFile();
});

app.get("/users", function (req, res) {
  axios("https://api.mercadolibre.com/trends/MLB").then(function (response) {
    // handle success
    res.send(response.data);
  });
});

app.get("/usuarios", function (req, res) {
  axios("https://jsonplaceholder.typicode.com/users").then(function (response) {
    // handle success
    res.send(response.data);
  });
});

app.get("/posts/id/:id", function (req, res) {
  axios("https://jsonplaceholder.typicode.com/posts/" + req.params.id).then(
    function (response) {
      // handle success
      res.send(response.data);
    }
  );
});

app.get("/produto/url/:url", function (req, res) {
  const valor = req.params.url.match(/\d{6,}/);
  axios("https://api.mercadolibre.com/items/MLB" + valor).then(function (
    response
  ) {
    // handle success
    res.send(response.data);
  });
});

app.get("/url/:url", function (req, res) {
  const valor = req.params.url.match(/\d{6,}/);
  axios("https://api.mercadolibre.com/items/MLB" + valor[0]).then(function (
    response
  ) {
    // handle success
    res.send(response.data);
  });
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry cant find that!");
});

app.get("/posts", function (req, res) {
  axios("https://jsonplaceholder.typicode.com/posts").then(function (response) {
    res.send(response.data);
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
