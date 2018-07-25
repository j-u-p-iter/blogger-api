const createMongooseDBProvider = ({
  dbProviders: { mongoose },
  configs: { DB_PORT, DB_HOST, DB_NAME },
}) => {
  const connect = callback => mongoose.connect(
    `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    { useNewUrlParser: true },
    callback,
  );

  return { connect };
};


export default createMongooseDBProvider;
