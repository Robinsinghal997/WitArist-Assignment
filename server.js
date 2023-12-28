import app from "./app.js";
var port = process.env.Port;


app.listen(port, () => {
  console.log(`server is running on ${port} in Mode ${process.env.NODE_ENV}`);
});