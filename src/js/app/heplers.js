function rotateCard(item) {
  item.classList.toggle('is-flipped')
}

const playAudio = (url) => new Audio(url).play();

const shuffleArray = (array) => array
    .map((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);

export { rotateCard, playAudio, shuffleArray }
