const path = require('path');
const helmet = require('helmet');
const Sentry = require('@sentry/node');
const cors = require('cors');
const morgan = require('morgan');
const nocache = require('nocache');
const express = require('express');
const session = require('express-session');
const compress = require('compression');
const serveFavicon = require('serve-favicon');
const methodOverride = require('method-override');

const routes = require('../api/routes/v1');
const error = require('../api/middlewares/error');
const { corsOptions } = require('./cors');
const { logs, env, secret } = require('./vars');

/**
 * Express instance
 * @public
 */
const app = express();

if (env === 'production') {
  // eslint-disable-next-line global-require
  require('./instrument');
  Sentry.setupExpressErrorHandler(app);
}

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

app.use(serveFavicon(path.join(__dirname, '../../public/favicon.ico')));
app.use(express.static(path.join(__dirname, '../../public')));

// using the express session middleware
app.set('trust proxy', 1);
app.use(
  session({
    store: new session.MemoryStore(),
    secret,
    cookie: {
      domain: 'merca.ai',
      httpOnly: true,
      secure: true, // only send cookie over https
      maxAge: 1000 * 15, // set cookie expiry length in ms
    },
    proxy: true,
    resave: false,
    saveUninitialized: true,
  }),
);

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'merca.ai'],
      objectSrc: ["'none'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      upgradeInsecureRequests: [],
    },
  }),
);
app.use(helmet.hidePoweredBy());

app.use(nocache());

// enable CORS - Cross Origin Resource Sharing
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// app.use(apiLimiterGlobal);

// mount api v1 routes
app.use('/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
