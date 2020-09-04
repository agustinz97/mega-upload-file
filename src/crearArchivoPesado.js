const fs = require("fs");
const path = require("path");

let txt =
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque minus expedita eum facilis. Aliquam veritatis possimus omnis? Sed debitis amet libero cupiditate facere eos nesciunt ratione! In ullam temporibus, voluptatibus delectus ratione aut nisi magni suscipit blanditiis! Eius ad in eaque praesentium cum, itaque culpa, quod voluptatem, vero sunt cupiditate.";

const pathname = path.join(__dirname, "prueba.txt").toString();
fs.writeFileSync(pathname, txt);

for (let i = 0; i < 99999999999999; i++) {
  fs.appendFileSync(pathname, txt);
}
