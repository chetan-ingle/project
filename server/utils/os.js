import os from "os";
import { exec } from "child_process";

let path;
let ostype = os.type();

if (ostype === "Linux") {
  exec("pwd", (_, dir) => {
    path = dir;
    console.log(_, os.type(), path);
  });
}

export { path, ostype };
