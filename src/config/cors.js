const APIError = require('../api/utils/errors');

const localhosts = [
  'http://localhost:8080',
  'http://localhost:3000',
];

const services = [
  'https://googleapis.com',
  'https://vercel.app',
  'https://netlify.app',
];

const own = [
  'https://smallworld.io',
  'https://bakeri.ai',
  'https://merca.ai',
];

const brands = [
  'https://doodlage.in',
  'https://morataara.com',
  'https://bananaclub.co.in',
  'https://gambol.in',
  'https://fablestreet.com',
  'https://pinkfort.co',
  'https://marchjewellery.com',
  'https://mischalampert.com',
  'https://hedgehouseusa.com',
  'https://labelvarsha.com',
  'https://amala.earth',
  'https://sourceitright.com',
  'https://www.damilano.com',
  'https://saundh.com',
  'https://sunbeamventures.in',
];

const whitelist = [
  ...localhosts,
  ...services,
  ...own,
  ...brands,
];

const corsOptions = {
  exposedHeaders: ['Content-Range'],
  origin(origin, callback) {
    if (
      whitelist.some((allowedOrigin) => (origin
        ? origin.endsWith(allowedOrigin.replace(/https?:\/\/([^/]+).*/, '$1'))
        : true))
    ) {
      callback(null, true);
    } else {
      callback(
        new APIError({
          message: 'Unauthorized access, your IP is being reported.',
        }),
        false,
      );
    }
  },
};

module.exports = {
  whitelist,
  corsOptions,
};
