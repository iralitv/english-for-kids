import { buildCard } from './cardTemplate';
import cards from "../../../data/cards";
import builtHtmlElement from "./templateHelper";
import {isMenuCategory, isTrainMode} from "./flags";
import {playAudio, rotateCard, shuffleArray} from "./heplers";

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
      currentCardIndex: null,
    };

    this.game = {
      shuffleAudio: null,
      isStart: false,
      currentAudio: null,
      currentAudioIndex: null,
      guessArray: [],
    };

    this.data = {
      audio: [],
    };
  }

  init() {
    this.elements.cardContainer = builtHtmlElement({
      tagName: 'div',
      classList: ['card__container'],
    });

    this.elements.startButton = builtHtmlElement({
      tagName: 'button',
      classList: ['button', 'button--start', 'hidden'],
    });

    this.elements.cardContainer.appendChild(this.createItems());
    this.elements.main.appendChild(this.elements.cardContainer);
    this.elements.main.appendChild(this.elements.startButton);

    if(!isTrainMode(localStorage.getItem('mode'))) {
      this.elements.cardContainer.childNodes.forEach(item => item.classList.add('card--play'));
      (!isMenuCategory) && this.elements.startButton.classList.remove('hidden');
    }

    document.querySelector('.switch-field').addEventListener('click',
      (event) => this.changeMode(event));

    this.elements.cardContainer.addEventListener('click', (e) => this.selectCard(e));
    this.elements.startButton.addEventListener('click', (e) => this.startGame(e));
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
    const currentChild = event.target.closest('.card__face') && event.target.closest('.card__face').parentNode;
    this.props.currentCardIndex = [...event.currentTarget.childNodes].indexOf(currentChild);

    if(this.props.currentCardIndex !== -1) {
      if (isTrainMode(localStorage.getItem('mode'))){
        (!event.target.classList.contains('card__desc--button'))
          ? playAudio(`data/${this.data.audio[this.props.currentCardIndex]}`)
          : rotateCard(event.currentTarget.children[this.props.currentCardIndex]);
      } else {
        if (this.game.isStart){
          if (this.game.currentAudioIndex !== this.props.currentCardIndex) {
            playAudio('data/audio/error.mp3');
            this.game.guessArray.push('error');
          } else {
            this.game.guessArray.push('cool');
            currentChild.classList.add('blur');
            playAudio('data/audio/correct.mp3');
            this.game.currentAudio = this.game.shuffleAudio.splice(0, 1)[0];
            this.game.currentAudioIndex = this.data.audio.indexOf(this.game.currentAudio);
            setTimeout(() => playAudio(`data/${this.game.currentAudio}`), 500);
          }

          console.log(this.game.shuffleAudio);
          console.log('audio: ', this.game.currentAudioIndex);
          console.log('card: ', this.props.currentCardIndex)
          console.log('guess: ', this.game.guessArray)
        }

      }
    }
  }

  changeMode(event) {
    localStorage.setItem('mode', event.target.value);

    if(isTrainMode(event.target.value)) {
      this.elements.cardContainer.childNodes.forEach(item => item.classList.remove('card--play'));
      this.elements.startButton.classList.add('hidden');
    }

    if(!isTrainMode(event.target.value)){
      this.elements.cardContainer.childNodes.forEach(item => item.classList.add('card--play'));
      (!isMenuCategory) && this.elements.startButton.classList.remove('hidden');
    }
  }

  startGame(event) {
    this.game.isStart = true;
    if(!event.target.classList.contains('button--repeat')) {
      this.game.shuffleAudio = shuffleArray(this.data.audio);
      this.game.currentAudio = this.game.shuffleAudio.splice(0, 1)[0];
      this.game.currentAudioIndex = this.data.audio.indexOf(this.game.currentAudio);
    }
    event.currentTarget.classList.add('button--repeat');
    playAudio(`data/${this.game.currentAudio}`);
  }
}

export default Game;
