export default function (array, arrayLength) {
    const shuffledArray = array.sort(() => .5 - Math.random());
    let newArray = shuffledArray.slice(0, arrayLength);
    return newArray;
  }