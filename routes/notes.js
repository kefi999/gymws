const express = require("express");
const router = express.Router();
const Note = require("../models/notes");

router.get("/", async (req, res) => {
  let notes;
  try {
    notes = await Note.find({});
    res.render("notes/notes", { notes: notes });
  } catch (error) {}
});

router.post("/new", async (req, res) => {
  try {
    const notes = new Note({
      name: req.body.name,
      textarea: req.body.description,
    });
    await notes.save();
    res.redirect("/notes");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
