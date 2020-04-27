import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Meals = mongoose.model('Meal', new Schema({ 
    name: String,
    desc: String,
}));

export default Meals;