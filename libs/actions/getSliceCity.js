function getSliceCity(title) {
  // get content in ()
  const RegexCity = /\(([^)]+)\)/;
  const city = title.match(RegexCity);

  return city ? city[1] : title.split(" ").at(-1).trim();
}

export default getSliceCity;
