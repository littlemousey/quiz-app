export default function(array, arrayLength) {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  const newArray = shuffledArray.slice(0, arrayLength);
  return newArray;
}
