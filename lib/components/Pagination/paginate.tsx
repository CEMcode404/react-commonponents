export function paginate(
  currentPage: number,
  itemsCount: number,
  maxItemsPerPage: number,
  noOfPageVisible: number
) {
  if (!isInclusivelyWithinRange(itemsCount, Infinity, 0))
    throw Error(`'itemsCount' must be a whole number.`);

  if (!isInclusivelyWithinRange(maxItemsPerPage, Infinity, 1))
    throw Error(`'maxItermPerPage' must be a counting number.`);

  const pageNoLowerLimit = 1;
  const totalPages = Math.ceil(itemsCount / maxItemsPerPage);

  if (!isInclusivelyWithinRange(currentPage, totalPages, pageNoLowerLimit))
    throw Error("'currentPage' is out of bounds.'");

  if (totalPages === 1) return [1];
  if (totalPages === 2) return [1, 2];

  //prevent noOfPageVisible from going out of bounds
  //min is 3 because 1 and 2 will result in navigational problem navigational problems
  noOfPageVisible = clamp(noOfPageVisible, totalPages, 3);

  let pageNums = [];
  let rightCounter = currentPage + 1;
  let leftCounter = currentPage;

  while (true) {
    if (pageNums.length >= noOfPageVisible) break;
    if (leftCounter >= pageNoLowerLimit) pageNums.unshift(leftCounter--);
    if (pageNums.length >= noOfPageVisible) break;
    if (rightCounter <= totalPages) pageNums.push(rightCounter++);
  }

  return pageNums;
}

export function clamp(entry: number, max: number, min: number) {
  for (let argument of arguments)
    if (!Number.isInteger(argument))
      throw Error("Arguments must be an integer.");

  return Math.max(min, Math.min(entry, max));
}

function isInclusivelyWithinRange(entry: number, max: number, min: number) {
  return entry <= max && entry >= min;
}
