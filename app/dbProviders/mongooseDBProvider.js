import mongoose from 'mongoose';


export const createMongooseDBProvider = ({
  configs: { DB_PORT, DB_HOST, DB_NAME },
}) => {
  let dbConnection;

  const connect = async (callback) => {
    dbConnection = await mongoose.connect(
      `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      { useNewUrlParser: true },
      callback,
    );

    return dbConnection;
  };

  const close = () => mongoose.connection.close();

  return { connect, close };
};
