function mapingTimeSector(content = "") {
  // Regex for time
  const RegexTime = /\d{2}:\d{2}\s+a\d{2}:\d{2}/g;
  // split , and .
  const RegexSector = /[.,/]/;
  const sectors = content.split(RegexSector);
  const timeAndSectors = {};

  let isNewTime = false;
  let lastTime = "";

  for (let sector of sectors) {
    // find time
    const timeInLine = sector.match(RegexTime);

    if (timeInLine) {
      timeAndSectors[timeInLine] = [];
      lastTime = timeInLine;

      let noSpace = sector.trim();
      let capitalize = noSpace.toLocaleLowerCase();
      let parts = capitalize.split(RegexTime);

      timeAndSectors[lastTime].push(parts.at(-1));
    } else if (lastTime !== "") {
      let noSpace = sector.trim();
      let capitalize = noSpace.toLocaleLowerCase();
      timeAndSectors[lastTime].push(capitalize);
    }
  }

  // mapping time and sectors
  const mapping = Object.entries(timeAndSectors).map((item) => {
    let [time, sectors] = item;
    sectors = sectors.filter((sector) => sector.length > 3);
    return {
      time,
      sectors,
    };
  });

  return mapping;
}

export default mapingTimeSector;
