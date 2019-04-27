import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


const createModel = (modelName, schema) => {
  schema.plugin(uniqueValidator);

  const model = mongoose.model(modelName, schema);

  const create = data => model.create(data);

  const insertMany = data => model.insertMany(data);

  const readAll = () => model.find().enableCache();

  const readAllBy = (data) => model.find(data);

  const readById = (id) => model.findById(id);

  const readOne = (data) => model.findOne(data);

  const update = (id, data) => model.findByIdAndUpdate(id, data, { new: true });

  const deleteOne = id => model.findByIdAndDelete(id);

  const deleteAll = callback => model.deleteMany({}, callback);

  return {
    readAll,
    readOne,
    readById,
    readAllBy,

    create,

    insertMany,
    update,

    deleteOne,
    deleteAll,
  };
};


export default createModel;
