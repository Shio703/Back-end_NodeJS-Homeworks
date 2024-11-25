import http from "node:http";
import { spawn } from "node:child_process";

const getTime = () => {
  const timePromise = new Promise((resolve, reject) => {
    // getting current time using spawn
    const time = spawn("time", ["/t"], { shell: true });

    time.stdout.on("data", (data) => {
      const unBuffed = data.toString();

      !unBuffed ? reject("Couldn't Get Time!") : resolve(unBuffed);
    });
  });
  return timePromise;
};

const getFiles = () => {
  const filespromise = new Promise((resolve, reject) => {
    const ls = spawn("dir", ["/s"], { shell: true, cwd: "./" });

    let fileList = "";
    ls.stdout.on("data", (data) => {
      for (let i = 0; i < data.length; i++) {
        fileList += data.toString();
      }
      // console.log("FileList Output:", fileList);
    });

    ls.on("close", resolve(fileList));
    ls.on("error", (error) => {
      console.log(error);
    });
  });
  return filespromise;
};

const server = http.createServer(async (req, res) => {
  console.log("Request recieved on:", req.url);
  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Helloo");
      break;
    case "/current-time":
      try {
        const currentTime = await getTime();

        res.writeHead(200, { "content-type": "text/plain" });
        res.end("Current Time: " + currentTime);
      } catch (error) {
        res.writeHead(500, { "content-type": "text/plain" });
        res.end(
          "Code: 500 Server-Side Error During Retrieving the time",
          console.log(error)
        );
      }
      break;

    case "/files":
      const fileList = await getFiles();
      res.writeHead(200, { "content-type": "text/plain" });
      res.end("List: " + fileList);
      break;
    default:
      res.writeHead(200, { "content-type": "text/plain" });
      res.end("404 Page Not Found!");
      break;
  }
});

server.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
