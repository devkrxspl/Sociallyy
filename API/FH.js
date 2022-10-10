//Constants
const FS = require("fs")

//Functions
function exists(dir, name) {
  if (name.length > 1) {
    if (FS.existsSync(dir + "/" + name[0])) {

      temp = name;
      name.shift();

      return exists(dir + "/" + temp[0], name);

    } else {
      return false;
    }
  } else {

    return FS.existsSync(dir + "/" + name);
  } 
}

//Main
module.exports.existsFile = (dir, name) => {
  return FS.existsSync(dir + name);
}