import mongoose, { Schema } from "mongoose"

const companySchema = new Schema(
  {
    name: { type: String, required: true },
    logo: String,
    website: String,
    description: String,
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
