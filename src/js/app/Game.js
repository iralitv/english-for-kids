import { buildCard } from './cardTemplate';
import cards from "../../../data/cards";
import builtHtmlElement from "./templateHelper";
import {isTrainMode} from "./flags";
import {playAudio, rotateCard} from "./heplers";

class Game {
  constructor() {
    this.elements = {
      cardContainer: null,
      card: null,
      startButton: null,
      main: document.querySelector('.main'),
    };

    this.props = {
      category: localStorage.getItem('category') || cards[0][0],
      mode: localStorage.getItem('mode') || 'train',
    };

    this.data = {
      audio: [],
    }
  }

  init() {
    this.elements.cardContainer = builtHtmlElement({
      tagName: 'div',
      classList: ['card__container'],
    });

    this.elements.cardContainer.appendChild(this.createItems());
    this.elements.main.appendChild(this.elements.cardContainer);

    this.elements.startButton = builtHtmlElement({
      tagName: 'button',
      classList: ['card__button--start'],
    });

    this.elements.startButton.innerText = 'Start';

    if(!isTrainMode(localStorage.getItem('mode'))) {
      this.elements.main.appendChild(this.elements.startButton);
      this.elements.cardContainer.childNodes.forEach(item => item.classList.add('card--play'));
    }

    document.querySelector('.switch-field').addEventListener('click',
      (event) => this.changeMode(event));

    this.elements.cardContainer.addEventListener('click', (e) => this.selectCard(e));
  }

  createItems() {
    const fragment = document.createDocumentFragment();
    const categoryIndex = cards[0].indexOf(this.props.category);

    const dataCards = cards[categoryIndex];
    dataCards.forEach(item => {
      const card = buildCard(item, this.props.mode);
      this.data.audio.push(item.audioSrc);
      fragment.appendChild(card);
    });

    return fragment;
  }

  selectCard(event) {
    const cardIndex = [].indexOf.call(event.currentTarget.children, event.target.parentNode.parentNode);
    if(cardIndex !== -1) {
      if (isTrainMode(this.props.mode)){
        if (!event.target.classList.contains('card__button')) {
          playAudio(`data/${this.data.audio[cardIndex]}`);
        } else {
          rotateCard(event.currentTarget.children[cardIndex]);
        }
      } else {
        console.log('lalalaaa')
      }
    }
  }

  changeMode(event) {
    localStorage.setItem('mode', event.target.value);

    if(isTrainMode(event.target.value)) {
      this.elements.main.removeChild(this.elements.startButton);
      this.elements.cardContainer.childNodes.forEach(item => item.classList.remove('card--play'));
    }

    if(!isTrainMode(event.target.value)){
      this.elements.main.appendChild(this.elements.startButton);
      this.elements.cardContainer.childNodes.forEach(item => item.classList.add('card--play'));
    }
  }
}

export default Game;
