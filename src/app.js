const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const playground = require('graphql-playground-middleware-express').default;
const schema = require('./modules/schema');
const root = require('./modules/resolvers');
const config = require('../config');

const app = express();

app.use('/graphql', createHandler({
  schema,
  rootValue: root,
}));

app.get('/playground', playground({ endpoint: '/graphql' }));

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
