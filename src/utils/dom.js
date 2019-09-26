import DOMPurify from 'dompurify';

// utility module

// gets all html parts together
const getMarkup = (dataList, generator) =>
  dataList.map(generator).join(`\n`);

// adds a new element to dom
const addSection = (container, template, place) =>
  container.insertAdjacentHTML(place, template);

// insert a new block inside an existing selector
const appendSection = (container, element) => {
  container.append(element);
};

// creates an element and puts it to the dom
const createElement = (template, selector = `div`, classNames) => {
  const newElement = document.createElement(selector);
  if (classNames) {
    for (let item of classNames) {
      newElement.classList.add(item);
    }
  }
  newElement.innerHTML = DOMPurify.sanitize(template);
  return newElement;
};

// removes the element from dom
const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

export {
  addSection,
  getMarkup,
  appendSection,
  createElement,
  unrender
};
