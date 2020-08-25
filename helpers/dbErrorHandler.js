const getErrorMessage = (err) => {
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;
      default:
        message = "Something went wrong";
    }
  } else {
    for (let errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
      }
    }
  }
  return message;
};

const getUniqueErrorMessage = (err) => {
  let output;
  try {
    // console.log("MESSAGE: ", err.message);
    let fieldName = err.message.substring(
      err.message.lastIndexOf("index: ") + 7,
      err.message.lastIndexOf("_1")
    );
    // console.log("FIELDNAME: ", fieldName);
    output =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      " already exists.";
  } catch (ex) {
    output = "Unique field already exists.";
  }
  return output;
};

module.exports = { getErrorMessage };
