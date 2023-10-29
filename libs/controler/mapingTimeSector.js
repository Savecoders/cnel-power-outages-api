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
    const time = sector.match(RegexTime);

    if (time && !isNewTime) {
      timeAndSectors[time] = [];
      isNewTime = true;
      lastTime = time;
    } else if (lastTime !== "") {
      let noSpace = sector.trim();
      let capitalize =
        noSpace.charAt(0).toUpperCase() + noSpace.toLocaleLowerCase().slice(1);
      timeAndSectors[lastTime].push(capitalize);
      isNewTime = false;
    }
  }

  // mapping time and sectors
  const mapping = Object.entries(timeAndSectors).map((item) => {
    const [time, sectors] = item;
    return {
      time,
      sectors,
    };
  });

  return mapping;
}

export default mapingTimeSector;
