import builtHtmlElement from "./templateHelper";
import cards from "../../../data/cards";

class Menu {
  constructor() {
    this.elements = {
      menuContainer: null,
      menuItems: cards[0],
      menuNodes: null,
      modeItem: null,
    };

    this.props = {
      activeItem: localStorage.getItem('category') || cards[0][0],
      mode: localStorage.getItem('mode') || 'train',
    }
  }

  init() {
    this.elements.menuContainer = builtHtmlElement({
      tagName: 'nav',
      classList: ['menu'],
    });

    this.elements.modeItem = builtHtmlElement({
      tagName: 'div',
      classList: ['switch-field']
    });

    this.elements.modeItem.innerHTML = `
      <input type="radio" id="radio-one" name="switch" value="train" checked/>
      <label for="radio-one">Train</label>
      <input type="radio" id="radio-two" name="switch" value="play"/>
      <label for="radio-two">Play</label>
    `;

    this.elements.menuContainer.appendChild(this.createItems());
    document.querySelector('header').appendChild(this.elements.menuContainer);
    document.querySelector('header').appendChild(this.elements.modeItem);

    this.elements.modeItem.querySelectorAll('input[name=switch]').forEach(item => {
      if(item.value === localStorage.getItem('mode')) {
        item.setAttribute('checked', true)
      }
    });

    this.elements.menuContainer.addEventListener('click',
      (event) => localStorage.setItem('category', event.target.textContent));

    this.elements.menuNodes = this.elements.menuContainer.querySelectorAll('.menu__link')
  }

  createItems() {
    const fragment = document.createDocumentFragment();

    this.elements.menuItems.forEach(item => {
      const menuElement = builtHtmlElement({
        tagName: 'a',
        classList: ['menu__link'],
        attrs: {
          href: 'category.html',
        },
      });

      menuElement.textContent = item;

      if(menuElement.textContent === this.elements.menuItems[0]) {
        menuElement.setAttribute('href', 'index.html');
      }

      if(menuElement.textContent === this.props.activeItem) {
        menuElement.classList.add('menu__link--active')
      }

      fragment.appendChild(menuElement);
    });

    return fragment;
  }

}

export default Menu;