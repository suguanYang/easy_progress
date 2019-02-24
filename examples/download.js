const request = require("request");
const progress = require("../index");

const surprise = "https://i.ytimg.com/vi/qDNVr1ucwyE/maxresdefault.jpg";

function getSurprise() {
  let content_length = 0;
  let countChunks = 0;
  request
    .get(surprise)
    .on("response", res => {
      content_length = parseInt(res.headers["content-length"], 10);
    })
    .on("data", chunk => {
      countChunks += chunk.length;
      progress({
        prefix: "",
        suffix: "",
        total: content_length,
        iteration: countChunks,
      });
    });
}

getSurprise();
