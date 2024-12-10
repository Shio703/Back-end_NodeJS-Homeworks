const fetcher = async () => {
  try {
    const res = await fetch("http://localhost:3000/files");
    if (res.status === 200) {
      const data = await res.text();
      console.log(data);
    } else {
      console.log("Status Code:", res.status);
    }
  } catch (error) {
    console.log("Fetch Error:", error);
  }
};
fetcher();
