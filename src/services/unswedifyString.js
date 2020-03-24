String.prototype.unSwedify = function () {
  return this.replace(/å/g, 'a').replace(/Å/g, 'A').replace(/Ä/g, 'A').replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/Ö/g, 'O').replace(' ', '').replace(' ', '');
};