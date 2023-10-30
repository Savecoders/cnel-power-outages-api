// import badRequestError: 400 error

import { badRequest } from "@hapi/boom";

// validator handler

// schema is the schema to validate
// property is the property to validate
function validatorHandler(schema, property) {
  // return a middleware
  // closure function
  return (req, res, next) => {
    // validate the data
    const data = req[property];
    // joi default show the first error
    // abortEarly: false show all the errors
    const { error } = schema.validate(data, { abortEarly: false });
    // if error is undefined, the data is valid
    if (error) {
      // pass the error to the next middleware
      next(badRequest(error));
    }
    // pass the control to the next middleware
    next();
  };
}

export { validatorHandler };
