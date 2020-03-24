import './unswedifyString';

Array.prototype.findKey = async function (find, key = name) {
  // Use 'this' to access the array.
  let result;
  for await (const element of this) {
    if (find) {
      // console.log('findKey',element,find,key)
      if (element[key].unSwedify().toLocaleLowerCase() === find.unSwedify().toLocaleLowerCase()) {
        // console.log("ELEMENT FOUND", element);
        result = element;
      }
    }
  }
  return result;
};



