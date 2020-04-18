import cards from '../../../data/cards';

const isTrainMode = (mode) => mode === 'train';
const isMenuCategory = localStorage.getItem('category') === cards[0][0].name;
const isStatisticCategory = localStorage.getItem('category') === 'Statistic';

export { isTrainMode, isMenuCategory, isStatisticCategory };
