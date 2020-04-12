import { buildCard } from './cardTemplate';
import cards from "../../../data/cards";
import builtHtmlElement from "./templateHelper";

class Game {
  constructor() {
    this.elements = {
      cardContainer: null,
      card: null,
    }

    this.props = {
      category: null,
    }
  }

  init() {
    this.elements.cardContainer = builtHtmlElement({
      tagName: 'div',
      classList: ['card__container'],
    });

    this.elements.cardContainer.appendChild(this.createItems());
    document.querySelector('.main').appendChild(this.elements.cardContainer);
  }

  createItems() {
    const fragment = document.createDocumentFragment();
    this.props.category = localStorage.getItem('category') || cards[0][0];
    const categoryIndex = cards[0].indexOf(this.props.category);

    const dataCards = cards[categoryIndex];
    dataCards.forEach(item => {
      const card = buildCard(item);
      fragment.appendChild(card);
    })
    return fragment;
  }
}

export default Game;
