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
    expirationDate: addDays(new Date(req.body.joinDate), 30),
    plan: req.body.plan,
    image: fileName,
  });
  saveImage(member, req.body.imageFile);

  try {
    const newMember = await member.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    res.render("members/view", { member: member });
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id/edit", async (req, res) => {
  const member = await Member.findById(req.params.id);
  res.render("members/edit", { member: member });
});
router.put("/:id", async (req, res) => {
  let member;
  try {
    member = await Member.findById(req.params.id);
    member.name = req.body.name;
    member.lastName = req.body.lastName;
    member.expirationDate = req.body.expirationDate;
    member.plan = req.body.plan;

    if (req.body.imageFile != null && req.body.imageFile != "") {
      console.log("here");
      saveImage(member, req.body.imageFile);
    }
    await member.save();
    res.redirect(`/member/${member.id}`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});
router.delete("/:id", async (req, res) => {
  let member;
  try {
    member = Member.findById(req.params.id);
    await member.deleteOne();
    res.redirect("/");
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
function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
module.exports = router;
