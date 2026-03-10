const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
require('dotenv').config({ path: 'variables.env' });
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const jwt = require('jsonwebtoken');


const conectarDB = require('./config/db');

// Conectar a la base de datos
conectarDB();

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    console.log('[context] Authorization:', token ? 'presente' : 'vacío');

    if (token) {
      try {
        const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA);
        console.log('[context] JWT decodificado:', usuario);
        return { usuario };
      } catch (error) {
        console.log('Error al verificar el token:', error.message);
      }
    }

    return {};
  }
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
}); 