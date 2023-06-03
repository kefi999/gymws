const express = require("express");
const router = express.Router();
const Member = require("../models/member");

router.get("/", async (req, res) => {
  const members = await Member.find();
  res.render("index", { members: members });
});

module.exports = router;
