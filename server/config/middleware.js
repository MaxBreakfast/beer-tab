var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser'),
    helpers     = require('./helpers'); // our custom middleware


module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  var userRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static('./client'));


  // ------- START OLD CODE  ------- //

  // what is this doing?
  app.get('/', function (req, res) {
    res.sendfile('./client/index.html');
  });

  // what is this doing?
  app.get('/login', function (req, res) {
    res.send();
  });
  // ------- END OLD CODE ------- //

  app.use('/api/users', userRouter); // use user router for all user requests

  // authentication middleware used to decode token and made available on the request
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject our routers into their respective route files
  require('../users/userRoutes')(userRouter);
};