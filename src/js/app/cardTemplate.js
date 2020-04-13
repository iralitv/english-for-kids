import builtHtmlElement from "./templateHelper";
import { isMenuCategory } from "./flags";
import {rotateCard} from "./heplers";

export const buildCard = (item) => {
  const card = builtHtmlElement({
    tagName: 'div',
    classList: ['card']
  });

  if(!isMenuCategory) {
    card.innerHTML = `
      <div class="front">
        <img src="data/${item.image}" alt="" class="card__img"/>
        <p class="card__word">${item.word}</p>
        <button class="card__button">Hint</button>
      </div>
      <div class="back hidden">
        <img src="data/${item.image}" alt="" class="card__img"/>
        <p class="card__translation">${item.translation}</p>
      </div>`;
    card.addEventListener('mouseleave', (event) => {
      if(event.target.classList.contains('is-flipped'))
      rotateCard(event.currentTarget)
    });
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


