import mongoose,{Schema} from 'mongoose';

const administratorSchema = new Schema({
    name: {
        type:String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

const AdministratorSchema = mongoose.models.administrator || mongoose.model('administrator', administratorSchema);
export default AdministratorSchema;