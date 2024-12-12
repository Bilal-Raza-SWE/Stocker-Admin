const express = require('express');
const app = express();
const module1Routes=require("./routes/Module1Routes")
const connection = require('./config/db'); 
const module3Routes = require("./routes/Module3Routes");
const module2Routes=require("./routes/Module2Routes")

app.use(express.json());

app.use("/api/stock", module1Routes)
app.use("/api/shipments", module3Routes);
app.use("/api/item", module2Routes);


const PORT = 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
