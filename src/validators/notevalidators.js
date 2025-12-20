import { body, validationResult } from "express-validator";
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
export const createNoteValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
  handleValidation,
];
export const updateNoteValidation = [
  // title and content are optional on update but if provided must not be empty
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),
  body("content").optional().notEmpty().withMessage("Content cannot be empty"),
  handleValidation,
];