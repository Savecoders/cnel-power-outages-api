// format date to DD/MM/YYYY

const findDate = (date) => {
  const dateRegex = /\d{2}\/\d{2}\/\d{4}/g;
  const dateFound = date.match(dateRegex);
  return dateFound ? dateFound[0] : "";
};

export default findDate;
