const mega = require("megajs");
const { File } = require("megajs");
const path = require("path");
const fs = require("fs");

const config = require("../config/index");

const upload = (stream, name) => {
  return new Promise((resolve, reject) => {
    try {
      const storage = new mega.Storage(
        {
          email: config.megaUser,
          password: config.megaPassword,
        },
        () => {
          console.log("Login successfull");
          console.log(`Account name: ${storage.name}`);

          stream.pipe(storage.upload(name));

          storage.on("add", (file) => {
            file.link((err, url) => {
              if (err) throw err;

              resolve(url);
            });
          });
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { upload };
