/* eslint-disable space-before-function-paren */
export default function(min, max) {
  const randomNumber = Math.random() * (max - min) + min;

  return Math.floor(randomNumber);
}
