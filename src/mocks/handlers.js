import { rest } from 'msw'

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get('http://localhost:3030/', (req, res, ctx) => res(
    ctx.json({
      code: 0,
      result: 'hello',
    }),
  )),
]
