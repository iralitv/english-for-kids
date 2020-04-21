const rotateCard = (item) => item.classList.toggle('is-flipped');

const playAudio = (url) => new Audio(url).play();

const shuffleArray = (array) => array
  .map((item) => [Math.random(), item]) // return arrays with random first item = [0, 1]
  .sort((a, b) => a[0] - b[0]) // sort ascending first item of returned arrays
  .map((item) => item[1]); // return second item of sorted arrays


export { rotateCard, playAudio, shuffleArray };
