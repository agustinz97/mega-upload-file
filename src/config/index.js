require("dotenv").config();

const config = {
  port: process.env.PORT || 3000,
  megaUser: process.env.MEGA_USER,
  megaPassword: process.env.MEGA_PASSWORD,
};

module.exports = config;
