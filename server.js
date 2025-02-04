const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const adminPrincipalRouter = require('./routes/admin-principalRoutes');
const employesRoutes = require('./routes/employesRoutes');
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//routes
app.use('/adminprincal', adminPrincipalRouter);
app.use('/employes',employesRoutes );


app.listen(port, () => {
    console.log("Server running on port" + port);
});