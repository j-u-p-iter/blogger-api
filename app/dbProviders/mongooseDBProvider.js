import mongoose from 'mongoose';


const createMongooseDBProvider = ({
  configs: { DB_PORT, DB_HOST, DB_NAME },
}) => {
  let dbConnection;

  const connect = (callback) => {
    dbConnection = mongoose.connect(
      `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      { useNewUrlParser: true },
      callback,
    );

    return dbConnection;
  };

  const close = () => dbConnection.close();

  return { connect, close };
};


export default createMongooseDBProvider;
