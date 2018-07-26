import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


const createModel = (modelName, schema) => {
  schema.plugin(uniqueValidator);

  const model = mongoose.model(modelName, schema);


  const create = data => model.create(data);

  const readAll = () => model.find();

  const update = (id, data) => model.findByIdAndUpdate(id, data, { new: true });

  const deleteOne = id => model.findByIdAndDelete(id);

  return {
    readAll,
    create,
    update,
    deleteOne,
  };
};


export default createModel;
