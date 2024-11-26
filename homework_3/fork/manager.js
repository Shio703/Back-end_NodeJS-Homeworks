import { fork } from "child_process";
import { exit } from "process";

// Factorial Calculator
const N = process.argv[2];
!N ? (console.log("Provide a number as a first argument"), exit(1)) : "";
N <= 0 ? (console.log("Provide Positive Integer"), exit(1)) : "";

for (let i = 0; i < N; i++) {
  const worker = fork("worker.js");

  worker.on("message", (message) => {
    console.log(`${message} from child script (worker)`);
    worker.disconnect();
  });
  worker.send(N);
}
