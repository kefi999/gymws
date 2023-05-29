const express = require("express");
const router = express.Router();
const Member = require("../models/member");
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

router.get("/new", (req, res) => {
  res.render("members/new", { member: new Member() });
});

router.post("/", async (req, res) => {
  const fileName = req.file != null ? req.file.filename : null;
  const member = new Member({
    name: req.body.name,
    lastName: req.body.lastName,
    joinDate: new Date(req.body.joinDate),
    plan: req.body.plan,
    image: fileName,
  });
  saveImage(member, req.body.imageFile);
  try {
    const newMember = await member.save();
    console.log(newMember);
    console.log(req.body);
    res.redirect("member/new");
  } catch (error) {
    console.log(error);
  }
});

function saveImage(member, imageEncoded) {
  if (imageEncoded == null) return;

  try {
    const image = JSON.parse(imageEncoded);
    if (image != null && imageMimeTypes.includes(image.type)) {
      member.image = new Buffer.from(image.data, "base64");
      member.imageType = image.type;
    }
  } catch (error) {
    console.log("Error parsing image data:", error);
  }
}

module.exports = router;
