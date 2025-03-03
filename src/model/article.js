import mongoose from "mongoose"

export const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    subject: { type: String, required: true },
    author: { type: String, required: true },
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
})
