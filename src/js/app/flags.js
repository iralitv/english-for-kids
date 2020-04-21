import cards from '../../../data/cards';

const category = localStorage.getItem('category');

const checkTrainMode = (mode) => mode === 'train';
const isMenuCategory = category === cards[0][0].name;
const isStatisticCategory = category === 'Statistic';
const isGameCategory = category !== 'Main menu'
  && category !== 'Statistic';

export {
  checkTrainMode,
  isMenuCategory,
  isStatisticCategory,
  isGameCategory,
};
