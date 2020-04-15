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
      <div class="card__face card__face--front">
        <img src="data/${item.image}" alt="" class="card__img"/>
        <div class="card__desc">
          <p class="card__desc--word">${item.word}</p>
          <button class="card__desc--button">Hint</button>
        </div>
      </div>
      <div class="card__face card__face--back">
        <img src="data/${item.image}" alt="" class="card__img"/>
        <p class="card__translation">${item.translation}</p>
      </div>`;
  } else {
    card.innerHTML = `
      <a href="category.html" class="card__link">${item}</a>
    `;
    card.addEventListener('click', () => {
      localStorage.setItem('category', item);
    })
  }

  return card;
};


