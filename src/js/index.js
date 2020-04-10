import '../sass/style.scss';
import {Card} from './app/Сard';
import Menu from './app/Menu';

const object = {
  word: 'sing',
  translation: 'петь',
  image: 'img/sing.jpg',
  audioSrc: 'audio/sing.mp3'
}

document.querySelector('main').innerHTML = Card(object)

const menu = new Menu();
menu.init();
