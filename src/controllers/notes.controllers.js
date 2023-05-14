const NotesControl = {},
    Note = require("../models/notes")

// Create note
NotesControl.renderNoteForm = (req, res) => {
    res.render("notes/NewNote");
}

NotesControl.createNewNote = async (req, res) => {
    console.log(req.body)
    const { NameNote, NoteInfo, public } = req.body;

    if (NameNote === "", NoteInfo === "") {
        req.flash("error_msg", "Fill in all fields")
        res.redirect("/notes/add");
    }
    else {

        const NewNote = new Note({
            title: NameNote,
            description: NoteInfo,
            user: req.user.id,
            public: public
        })
        await NewNote.save();

        req.flash("success_msg", "The note has been creating...")
        res.redirect("/notes/privates_notes")
    }
}

NotesControl.renderPublicNotes = async (req, res) => {
    const Notes = await Note.find({
        public: "on"
    }).lean()

    res.render("notes/PublicNotes", { Notes })
}

//Get private note
NotesControl.renderPrivateNotes = async (req, res) => {
    const Notes = await Note.find({
        user: req.user.id,
        public: null
    }).lean()

    console.log(Notes)
    res.render("notes/PrivateNotes", { Notes })
}

// Edit note
NotesControl.renderEditForm = async (req, res) => {
    const NoteId = await Note.findById(req.params.id).lean();

    if (NoteId.user != req.user.id) {
        return res.redirect("/notes/privates_notes")
    }

    res.render("notes/EditNotes", { NoteId })
}

NotesControl.updateNote = async (req, res) => {
    const { NameNote, NoteInfo } = req.body

    await Note.findByIdAndUpdate(req.params.id, {
        title: NameNote,
        description: NoteInfo
    })

    req.flash("success_msg", "The note has been updating...")
    res.redirect("/notes/private_notes")
}

// Delete note
NotesControl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);

    req.flash("success_msg", "The note has been deleting...")
    res.redirect("/notes/privates_notes")
}

module.exports = {
    NotesControl: NotesControl
}