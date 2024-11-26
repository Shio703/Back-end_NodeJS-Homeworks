const factoFunc = (num) => {
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
};

process.on("message", (message) => {
  process.send(factoFunc(message));
  process.exit(0);
});