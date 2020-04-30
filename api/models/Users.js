import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Users = mongoose.model('User', new Schema({ 
    email: String,
    password: String,
    salt: String,
}));

export default Users;