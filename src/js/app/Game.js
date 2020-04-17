import buildCard from './cardTemplate';
import cards from '../../../data/cards';
import builtHtmlElement from './templateHelper';
import { isMenuCategory, isTrainMode } from './flags';
import { playAudio, rotateCard, shuffleArray } from './heplers';

class Game {
  constructor() {
    this.elements = {
      cardContainer: null,
      card: null,
      startButton: null,
      main: document.querySelector('.main'),
      modal: document.querySelector('.modal'),
      stars: null,
      starCorrect: null,
      starError: null,
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

    this.elements.stars = builtHtmlElement({
      tagName: 'div',
      classList: ['star__container'],
    });

    this.elements.starCorrect = builtHtmlElement({
      tagName: 'div',
      classList: ['star', 'star--correct'],
    });

    this.elements.starError = builtHtmlElement({
      tagName: 'div',
      classList: ['star', 'star--error'],
    });

    this.elements.cardContainer.appendChild(this.createItems());
    this.elements.main.appendChild(this.elements.stars);
    this.elements.main.appendChild(this.elements.cardContainer);
    this.elements.main.appendChild(this.elements.startButton);

    if (!isTrainMode(localStorage.getItem('mode'))) {
      this.elements.cardContainer.childNodes.forEach((item) => item.classList.add('card--play'));
      if (!isMenuCategory) {
        this.elements.startButton.classList.remove('hidden');
      }
    }

    document.querySelector('.switch-field').addEventListener('click',
      (event) => this.changeMode(event));

    this.elements.cardContainer.addEventListener('click', (e) => this.selectCard(e));
    this.elements.startButton.addEventListener('click', (e) => this.startGame(e));
  }

  createItems() {
    const fragment = document.createDocumentFragment();
    let categoryIndex = 0;
    cards[0].forEach((item, index) => {
      if (item.name === this.props.category) {
        categoryIndex = index;
      }
    });

    const dataCards = cards[categoryIndex];
    dataCards.forEach((item) => {
      const card = buildCard(item, this.props.mode);
      this.data.audio.push(item.audioSrc);
      fragment.appendChild(card);
    });

    return fragment;
  }

  selectCard(event) {
    const currentChild = event.target.closest('.card__face') && event.target.closest('.card__face').parentNode;
    this.props.currentCardIndex = [...event.currentTarget.childNodes].indexOf(currentChild);

    if (this.props.currentCardIndex !== -1) {
      if (isTrainMode(localStorage.getItem('mode'))) {
        if (!event.target.classList.contains('card__desc--button')) {
          playAudio(`data/${this.data.audio[this.props.currentCardIndex]}`);
        } else {
          rotateCard(event.currentTarget.children[this.props.currentCardIndex]);
        }
      } else if (!isTrainMode(localStorage.getItem('mode')) && this.game.isStart) {
        if (this.game.currentAudioIndex !== this.props.currentCardIndex) {
          if (currentChild.classList.contains('blur')) {
            event.stopPropagation();
          } else {
            playAudio('data/audio/error.mp3');
            this.game.guessArray.push('error');
            const cloneStar = this.elements.starError.cloneNode(true);
            this.elements.stars.append(cloneStar);
          }
        } else if (this.game.shuffleAudio.length) {
          const [shuffleItem] = this.game.shuffleAudio.splice(0, 1);
          this.game.currentAudio = shuffleItem;
          this.game.currentAudioIndex = this.data.audio.indexOf(this.game.currentAudio);

          if (currentChild.classList.contains('blur')) {
            event.stopPropagation();
          } else {
            this.game.guessArray.push('cool');
            const cloneStar = this.elements.starCorrect.cloneNode(true);
            this.elements.stars.append(cloneStar);
            playAudio('data/audio/correct.mp3');
            currentChild.classList.add('blur');
          }

          setTimeout(() => playAudio(`data/${this.game.currentAudio}`), 500);
        } else {
          this.checkResult(this.game.guessArray);
          this.game.isStart = false;
          this.game.guessArray.length = 0;
          this.elements.startButton.classList.remove('button--repeat');
          this.elements.cardContainer.childNodes.forEach((item) => item.classList.remove('blur'));
          this.elements.stars.innerHTML = '';
        }
      }
    }
  }

  changeMode(event) {
    localStorage.setItem('mode', event.target.value);

    if (isTrainMode(event.target.value)) {
      this.elements.cardContainer.childNodes.forEach((item) => item.classList.remove('card--play'));
      this.elements.startButton.classList.add('hidden');
    }

    if (!isTrainMode(event.target.value)) {
      this.elements.cardContainer.childNodes.forEach((item) => item.classList.add('card--play'));
      if (!isMenuCategory) {
        this.elements.startButton.classList.remove('hidden');
      }
    }
  }

  startGame(event) {
    this.game.isStart = true;
    if (!event.target.classList.contains('button--repeat')) {
      this.game.shuffleAudio = shuffleArray(this.data.audio);
      const [shuffleItem] = this.game.shuffleAudio.splice(0, 1);
      this.game.currentAudio = shuffleItem;
      this.game.currentAudioIndex = this.data.audio.indexOf(this.game.currentAudio);
    }
    event.currentTarget.classList.add('button--repeat');
    playAudio(`data/${this.game.currentAudio}`);
  }

  checkResult(array) {
    const error = array
      .map((item) => item === 'error')
      .filter(Boolean)
      .length;

    const resultText = this.elements.modal.querySelector('.result__text');
    const resultImage = this.elements.modal.querySelector('.result__img');
    this.elements.modal.addEventListener('click', (event) => {
      if (event.target.classList.contains('modal__close') || event.target === this.elements.modal) {
        this.elements.modal.classList.remove('visible');
      }
    });

    if (!error) {
      playAudio('data/audio/success.mp3');
      resultText.innerText = 'You are COOL! Without errors';
      resultImage.setAttribute('src', 'data/img/success.jpg');
    } else {
      playAudio('data/audio/failure.mp3');
      resultText.innerText = (error === 1)
        ? `Almost! With ${error} error`
        : `You are lalka! With ${error} errors`;
      resultImage.setAttribute('src', 'data/img/failure.jpg');
    }
    this.elements.modal.classList.add('visible');
  }
}

export default Game;
