import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide a title for the template."],
            maxlength: [100, "Title cannot be more than 100 characters"],
        },
        slug: {
            type: String,
            required: [true, "Please provide a slug for the template."],
            unique: true,
            lowercase: true,
            index: true,
        },
        description: {
            type: String,
            required: [true, "Please provide a description."],
        },
        price: {
            type: String,
            default: "$0",
        },
        plan: {
            type: String,
            enum: ["Free", "Pro", "Premium"],
            default: "Free",
        },
        features: {
            type: [String],
            default: [],
        },
        livePreviewUrl: {
            type: String,
            required: [true, "Please provide a live preview URL."],
        },
        image: {
            type: String,
            default: "", // Placeholder image path
        },
        rating: {
            type: Number,
            default: 0,
        },
        reviews: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Template || mongoose.model("Template", TemplateSchema);
