const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  textarea: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Note", noteSchema);
