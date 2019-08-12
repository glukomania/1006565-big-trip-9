// utility module

// gets all html parts together
const getMarkup = (dataList, generator) => dataList.map(generator).join(`\n`);

// adds a new element to dom
const addSection = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export {
  addSection,
  getMarkup
};
