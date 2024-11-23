import { spawn } from "node:child_process";
import { exit } from "node:process";

const filePath = process.argv[2];
const minSize = process.argv[3];

if (!filePath) {
  console.log("Provide File Path!");
  exit(1);
}

// console.log(filePath);
const ls = spawn("dir", ["/s"], {
  shell: true,
  cwd: filePath,
});

ls.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

ls.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
