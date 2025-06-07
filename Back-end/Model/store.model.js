import mongoose, { Schema } from "mongoose";

const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
},{
  timestamps:true
});

const Store =
  mongoose.model.storeSchema || mongoose.model("Store", storeSchema);
export default Store;
