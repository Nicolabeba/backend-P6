const { body, validationResult } = require("express-validator");

const validator = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

module.exports = [
  // email must be an email (expressValidator function)
  body("email").isEmail(),
  // password must be at least 5 chars long (expressValidator function)
  body("password").isLength({ min: 5 }),
  validator,
];
