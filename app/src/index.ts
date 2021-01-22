import fastify from 'fastify'

import QuerystringSchema from './schemas/querystring.json'
import HeadersSchema from './schemas/headers.json'

import { QuerystringSchema as IQuerystringSchema } from './types/querystring'
import { HeadersSchema as IHeaderSchema } from './types/headers'

const server = fastify()

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.get('/auth', {
    schema: {
      querystring: QuerystringSchema,
      headers: HeadersSchema
    },
    preValidation: async (request, reply, done) => {
      const { username, password } = request.query as IQuerystringSchema
      done(username !== 'admin' ? new Error('Must be admin') : undefined)
    }
  }, async (request, reply) => {
  const { username, password } = request.query as IQuerystringSchema
  const customerHeader = request.headers['H-Custom']

  return 'logged in!';
})

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})


