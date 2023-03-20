import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  id: Number,
  name: String,
  flag: String,
  isoCode: String,
  isVisited: Boolean,
  isBucketList: Boolean,
  isGoing: Boolean,
});

export const Country = mongoose.model("Country", countrySchema);
