export const reorderList = (
  list: any[],
  startIndex: number,
  endIndex: number
) => {
  const listCopy = [...list];
  const [removed] = listCopy.splice(startIndex, 1);
  listCopy.splice(endIndex, 0, removed);
  return listCopy;
};
