import Note from "../models/Note.js";

export const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({ title, content, owner: req.user.id });

    res.status(201).json({ success: true, data: note });
  } catch (err) {
    next(err);
  }
};

export const getNotes = async (req, res, next) => {
  try {
    if (req.user && req.user.id) {
      const notes = await Note.find({ owner: req.user.id }).sort({
        createdAt: -1,
      });
      return res.json({ success: true, data: notes });
    }

    return res
      .status(401)
      .json({ message: "Authentication required to view notes" });
  } catch (err) {
    next(err);
  }
};

// Get single note
export const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (String(note.owner) !== String(req.user?.id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({ success: true, data: note });
  } catch (err) {
    next(err);
  }
};
export const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (String(note.owner) !== String(req.user.id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { title, content } = req.body;
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;

    await note.save();

    res.json({ success: true, data: note });
  } catch (err) {
    next(err);
  }
};

// Delete note
export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (String(note.owner) !== String(req.user.id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    await note.remove();

    res.json({ success: true, message: "Note deleted" });
  } catch (err) {
    next(err);
  }
};