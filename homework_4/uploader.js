import { createReadStream } from "fs";

const getPromise = new Promise((resolve, reject) => {
  let dataCont = "";
  const readStream = createReadStream("./public/test.txt");
  readStream.on("data", (data) => {
    !data ? reject("Error Happened:", data) : (dataCont += data);
  });

  readStream.on("close", () => {
    resolve(dataCont);
  });
}).then((data) => {
  const uploader = async () => {
    await fetch("http://localhost:3000/uploads", {
      method: "POST",
      body: data,
    });
  };
  console.log(data);
  uploader();
});
