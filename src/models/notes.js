const { Schema, model, Model } = require("mongoose");

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    public: {
        type: String,
        requried: true
    }
}, {
    timestamps: true
})

module.exports = model("Note", NoteSchema, "Notes");