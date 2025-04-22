import express from 'express';
const app = express();
app.use(express.json());

const schoolRoutes = require("../src/routes/schools.routes");

app.use("/educase", schoolRoutes);

app.listen(8080, () => console.log("Listening on http://localhost:8080 🚀"));