export default {
  getQuestions: () => fetch('https://opentdb.com/api.php?amount=50').then((response) => response.json()),
};
