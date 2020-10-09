let express = require('express');
let app = express();
let port = 3001;
let bodyParser = require('body-parser');
const cors = require('cors');

let mongoose = require('mongoose');
let record = require('./models/modelRecord');
let security = require('./models/modelSecurity');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/LoLRecordDb');

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const routes = require('./routes');
routes(app);

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});