
export const Card = ({ word, translation, image, audioSrc }) => {
  return `
    <div class="card">
      <img src="data/${image}" class="card__img"/>
      <p class="card__word">${word}</p>
      <p class="card__translation">${translation}</p>
      <audio src="data/${audioSrc}" controls></audio>
    </div>
  `
}