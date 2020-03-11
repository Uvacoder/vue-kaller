Array.prototype.findKey = async function(find, key = name) {
  // Use 'this' to access the array.
  let result;
  for await (const element of this) {
    if (element[key] === find) {
      console.log("ELEMENT FOUND", element);
      result = element;
    }
  }
  return result;
};