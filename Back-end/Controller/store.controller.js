import mongoose from "mongoose";
import Store from "../Model/store.model.js";

// create store
const createStore = async (req, res) => {
  const { name, email, address, rating } = req.body;

  // Validate input
  if (!name || !email || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Check if the store already exists
  const existingStore = await Store.findOne({ email });
  if (existingStore) {
    return res.status(400).json({ message: "Store already exists" });
  }

  // validate rating should be a number between 0 and 5
  if (
    rating !== undefined &&
    (typeof rating !== "number" || rating < 0 || rating > 5)
  ) {
    return res
      .status(400)
      .json({ message: "Rating must be a number between 0 and 5" });
  }

  // Create new store
  const newStore = new Store({
    name,
    email,
    address,
    rating: rating || 0,
  });

  // save into data
  await newStore.save();

  res.status(201).json({
    message: "Store created successfully",
    success: true,
    newStore,
  });
};

// update store
const updateStore = async (req, res) => {
  const { id } = req.params; // or req.body.id if sent in the body
  const { name, email, address, rating } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid store ID" });
  }

  const updatedStore = await Store.findByIdAndUpdate(
    id,
    { name, email, address, rating },
    { new: true }
  );

  if (!updatedStore) {
    return res.status(404).json({ message: "Store not found" });
  }

  // store into database
  await updatedStore.save();

  res.status(200).json({
    message: "Store updated successfully",
    success: true,
    updatedStore,
  });
};

// get all store
const getAllStores = async (req, res) => {
  try {
    // get all store
    const allStores = await Store.find({}).sort({createdAt:-1});
    console.log("Al stores", allStores);

    res.status(201).json({
      message: "All stores fetched",
      success: true,
      allStores,
    });
  } catch (error) {
    res.status(400).json({
      message:"Error while fetching all stores",
      success:false,
    })
  }
};

export { createStore, updateStore , getAllStores };
