function rotateCard(item) {
  item.classList.toggle('is-flipped')
}

const playAudio = (url) => new Audio(url).play();

export { rotateCard, playAudio }
