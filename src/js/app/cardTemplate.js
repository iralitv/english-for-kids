import builtHtmlElement from "./templateHelper";
import cards from "../../../data/cards";

export const buildCard = (item) => {
  const card = builtHtmlElement({
    tagName: 'div',
    classList: ['card']
  });

  if(localStorage.getItem('category') !== cards[0][0]) {

    card.innerHTML = `
      <div class="front">
        <img src="data/${item.image}" alt="" class="card__img"/>
        <p class="card__word">${item.word}</p>
        <button class="card__button">Hint</button>
      </div>
      <div class="back hidden">
        <img src="data/${item.image}" alt="" class="card__img"/>
        <p class="card__translation">${item.translation}</p>
      </div>`

    card.addEventListener('click', (e) => rotate(e, 'card__button'));
    card.addEventListener('mouseout', (e) => rotate(e, 'is-flipped'));

  } else {
    card.innerHTML = `
      <a href="category.html" class="card__word">${item}</a>
    `;
    card.addEventListener('click', () => {
      localStorage.setItem('category', item);
    })
  }

  return card;
};

function rotate(event, classContains) {
  if (event.target.classList.contains(classContains)) {
    event.currentTarget.querySelector('.front').classList.toggle('hidden');
    event.currentTarget.querySelector('.back').classList.toggle('hidden');
    event.currentTarget.classList.toggle('is-flipped')
  }
}
