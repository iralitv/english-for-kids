import builtHtmlElement from './templateHelper';
import cards from '../../../data/cards';

class Menu {
  constructor() {
    this.elements = {
      menuContainer: null,
      menuItems: cards[0],
      menuNodes: null,
      modeItem: null,
      burgerButton: null,
      breadCrumbs: null,
    };

    this.props = {
      activeItem: localStorage.getItem('category') || cards[0][0],
      mode: localStorage.getItem('mode') || 'train',
    };
  }

  init() {
    this.elements.menuContainer = builtHtmlElement({
      tagName: 'nav',
      classList: ['menu', 'burger-menu__nav'],
    });

    this.elements.burgerButton = builtHtmlElement({
      tagName: 'div',
      classList: ['burger-menu__button'],
    });

    this.elements.breadCrumbs = builtHtmlElement({
      tagName: 'p',
      classList: ['bread-crumbs'],
    });

    this.elements.modeItem = builtHtmlElement({
      tagName: 'div',
      classList: ['switch-field'],
    });

    this.elements.burgerButton.innerHTML = '<span class="burger-menu__lines"></span>';
    this.elements.breadCrumbs.innerText = `${localStorage.getItem('category')}`;

    this.elements.modeItem.innerHTML = `
      <input type="radio" id="radio-one" name="switch" value="train" checked/>
      <label for="radio-one">Train</label>
      <input type="radio" id="radio-two" name="switch" value="play"/>
      <label for="radio-two">Play</label>
    `;

    this.elements.menuContainer.appendChild(this.createItems());

    const HEADER = document.querySelector('header');
    const fragment = document.createDocumentFragment();

    fragment.appendChild(this.elements.burgerButton);
    fragment.appendChild(this.elements.menuContainer);
    fragment.appendChild(this.elements.breadCrumbs);
    fragment.appendChild(this.elements.modeItem);
    HEADER.appendChild(fragment);

    this.elements.modeItem.querySelectorAll('input[name=switch]').forEach((item) => {
      if (item.value === localStorage.getItem('mode')) {
        item.setAttribute('checked', true);
      }
    });

    HEADER.addEventListener('click', (event) => {
      if (event.target.classList.contains('menu__link')) {
        localStorage.setItem('category', event.target.textContent);
      }

      if (event.target.closest('.burger-menu__button')) {
        this.elements.burgerButton.classList.toggle('burger-menu__button--active');
        this.elements.menuContainer.classList.toggle('burger-menu--active');
      } else {
        this.elements.burgerButton.classList.remove('burger-menu__button--active');
        this.elements.menuContainer.classList.remove('burger-menu--active');
      }
    });

    this.elements.menuNodes = this.elements.menuContainer.querySelectorAll('.menu__link');
  }

  createItems() {
    const fragment = document.createDocumentFragment();

    this.elements.menuItems.forEach((item) => {
      const menuElement = builtHtmlElement({
        tagName: 'a',
        classList: ['menu__link'],
        attrs: {
          href: 'category.html',
        },
      });

      menuElement.textContent = item.name;

      if (menuElement.textContent === this.elements.menuItems[0].name) {
        menuElement.setAttribute('href', 'index.html');
      }

      if (menuElement.textContent === this.props.activeItem) {
        menuElement.classList.add('menu__link--active');
      }

      fragment.appendChild(menuElement);
    });

    return fragment;
  }
}

export default Menu;
