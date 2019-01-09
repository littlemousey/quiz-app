export default {
    getQuestions: () => {
      return fetch('https://opentdb.com/api.php?amount=50')
      .then((response)=> {
        return response.json();
      })
    }
  }