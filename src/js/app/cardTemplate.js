import builtHtmlElement from './templateHelper';
import { isMenuCategory } from './flags';
import { rotateCard } from './heplers';

const buildCard = (item) => {
  const card = builtHtmlElement({
    tagName: 'div',
    classList: ['card'],
  });

  if (!isMenuCategory) {
    card.innerHTML = `
      <div class="card__face card__face--front">
        <img src="data/${item.image}" alt="" class="card__img"/>
        <div class="card__desc">
          <p class="card__desc--word">${item.word}</p>
          <button class="button card__desc--button">&orarr;</button>
        </div>
      </div>
      <div class="card__face card__face--back">
        <img src="data/${item.image}" alt="" class="card__img"/>
        <p class="card__translation">${item.translation}</p>
      </div>`;
    card.addEventListener('mouseleave', (event) => {
      if (event.target.classList.contains('is-flipped')) { rotateCard(event.currentTarget); }
    });
  } else {
    card.innerHTML = `
      <a href="category.html" class="card__link link">
        <img src="data/${item.image}" alt="" class="link__img"/>
        <p class="link__text">${item.name}</p>
      </a>
    `;
    card.addEventListener('click', () => {
      localStorage.setItem('category', item.name);
    });
  }

  return card;
};

export default buildCard;
