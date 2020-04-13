function rotateCard(item) {
  item.querySelector('.front').classList.toggle('hidden');
  item.querySelector('.back').classList.toggle('hidden');
  item.classList.toggle('is-flipped')
}

const playAudio = (url) => new Audio(url).play();

export { rotateCard, playAudio }
