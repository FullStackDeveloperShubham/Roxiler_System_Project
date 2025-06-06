import mongoose,{Schema} from 'mongoose';


const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    address:{
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
})

const user = mongoose.model.userSchema || new mongoose.model('userSchema', userSchema);
export default user;