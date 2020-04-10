const builtHtmlElement = ({ tagName, classList = [], attrs = {} }) => {
  const newElement = document.createElement(tagName);
  newElement.classList.add(...classList);
  Object.keys(attrs).forEach((key) => newElement.setAttribute(key, attrs[key]));
  return newElement;
};

export default builtHtmlElement;