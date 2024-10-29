import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  optionsSuccessStatus: 200,
  credentials: true,
  origin: function (origin, callback) {
    return callback(null, true);
  },
};
