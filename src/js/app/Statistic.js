import cards from '../../../data/cards';
import builtHtmlElement from './templateHelper';

const Statistic = () => {
  const statisticFragment = document.createDocumentFragment();

  const statisticData = cards.slice(1);
  const fragment = document.createDocumentFragment();

  statisticData.forEach((category, index) => {
    const categorySection = builtHtmlElement({
      tagName: 'section',
      classList: ['statistic__category', 'category'],
    });
    const categoryName = builtHtmlElement({
      tagName: 'p',
      classList: ['category__name'],
    });

    categoryName.innerText = cards[0][index + 1].name;

    const categoryFragment = document.createDocumentFragment();

    category.forEach((item) => {
      const row = builtHtmlElement({
        tagName: 'div',
        classList: ['statistic__row', 'row'],
      });
      row.innerHTML = `
         <p class="row__word">${item.word}</p>
         <p class="row__translation">${item.translation}</p>
      `;

      categoryFragment.appendChild(row);
    });

    categorySection.append(categoryName, categoryFragment);
    fragment.appendChild(categorySection);
  });

  statisticFragment.appendChild(fragment);

  return statisticFragment;
};

export default Statistic;
