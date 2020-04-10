import builtHtmlElement from "./templateHelper";
import cards from "../../../data/cards";

class Menu {
  constructor() {
    this.elements = {
      menuContainer: null,
      menuItems: cards[0],
      menuNodes: null,
      activeItem: localStorage.getItem('category')
    }
  }

  init() {
    this.elements.menuContainer = builtHtmlElement({
      tagName: 'nav',
      classList: ['menu'],
    });

    this.elements.menuContainer.appendChild(this.createItems());

    // this.elements.activeItem && this.elements.activeItem.classList.add('active');
    document.querySelector('header').appendChild(this.elements.menuContainer);

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

      if(menuElement.textContent === localStorage.getItem('category')) {
        menuElement.classList.add('active')
      }

      fragment.appendChild(menuElement);
    });

    return fragment;
  }

}

export default Menu;