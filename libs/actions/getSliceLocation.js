function getSliceLocation(title) {
  // get content in ()
  const RegexCity = /\(([^)]+)\)/;
  const location = title.match(RegexCity);

  return location ? location[1] : title.split(" ").at(-1).trim();
}

export default getSliceLocation;
