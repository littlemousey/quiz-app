export default function(data) {
    return data
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&ouml/g, 'ö'); // there are many more of these (http://www.thesauruslex.com/typo/eng/enghtml.htm)
  }