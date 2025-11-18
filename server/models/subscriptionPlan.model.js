import mongoose, { Schema } from "mongoose"

const planSchema = new Schema(
  {
    name: String,
    price: Number,
    maxInterviews: Number,
    maxUsers: Number,
    isCustomizable: Boolean,
  },
  { timestamps: true }
);

const SubscriptionPlan = mongoose.model("SubscriptionPlan", planSchema);

export default SubscriptionPlan;
