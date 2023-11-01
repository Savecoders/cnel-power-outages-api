function sliceLocation(title) {
  // get content in ()
  title = title.toLowerCase();
  const RegexCity = /\(([^)]+)\)/;
  const location = title.match(RegexCity);

  return location ? location[1] : title.split(" ").at(-1).trim();
}

export default sliceLocation;
