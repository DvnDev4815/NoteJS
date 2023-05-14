const router = require("express").Router(),
    {NotesControl}= require("../controllers/notes.controllers")

const {IsLogin} = require("../helpers/validateOut");

// Create notes
router.get("/notes/add", IsLogin , NotesControl.renderNoteForm)
router.post("/notes/addingNote", IsLogin, NotesControl.createNewNote)

// Get public notes
router.get("/notes/public_notes", IsLogin, NotesControl.renderPublicNotes)

// Private Notes
router.get("/notes/privates_notes", IsLogin, NotesControl.renderPrivateNotes)

// Edit notes
router.get("/notes/edit/:id", IsLogin, NotesControl.renderEditForm)
router.put("/notes/editingNote/:id", IsLogin, NotesControl.updateNote)

// Delete notes
router.delete("/notes/delete/:id", IsLogin, NotesControl.deleteNote)

module.exports= router