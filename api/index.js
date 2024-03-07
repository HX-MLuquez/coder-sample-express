const { app } = require("./src/app");

const port = 8001;

const server = app.listen(port, async () => {
  console.log(`o|O_O|o robot Σωκράτης listening at http://localhost:${port}`);
});
