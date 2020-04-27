import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Orders = mongoose.model('Meal', new Schema({ 
    meal_id: { type: Schema.Types.ObjectId, ref: 'Meal' },
    user_id: String,
}));

export default Orders;