import { randomInt } from "crypto";

function calcDate(due: String) {
  let now = Date();
  let x = Math.random();
  if (x > 0.5) return 1;
  return -1;
}

export { calcDate };
