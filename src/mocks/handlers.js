import { rest } from 'msw';

import { baseURL } from '../utils/httpRequests';

export const handlers = [
  rest.get(`${baseURL}/newstories.json`, (req, res, ctx) => {
    return res(ctx.json([[[123123], 234234, 345345]]));
  }),

  rest.get(`${baseURL}/item/292198.json`),
];
