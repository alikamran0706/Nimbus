import mongoose, { Schema } from "mongoose"

const MessageSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    channel: { type: String, enum: ["email", "message", "whatsapp"], default: "email" },
    company: { type: String },
    subject: { type: String },
    preview: { type: String },
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    starred: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const MessageModel = mongoose.model("Message", MessageSchema);

export default MessageModel;

