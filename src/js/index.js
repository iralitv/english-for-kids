import '../sass/style.scss';
import Menu from './app/Menu';
import Game from './app/Game';

const menu = new Menu();
menu.init();

const cards = new Game();
cards.init();
