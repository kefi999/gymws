const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  joinDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expirationDate: {
    type: Date,
  },
  plan: {
    type: String,
    require: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
  imageType: {
    type: String,
    required: true,
  },
});

//this one is for the access not the ones above.
memberSchema.virtual("coverPath").get(function () {
  if (this.image != null && this.imageType != null) {
    return `data:${this.imageType};charset=utf-9;base64,${this.image.toString(
      "base64"
    )}`;
  }
});

module.exports = mongoose.model("Member", memberSchema);
