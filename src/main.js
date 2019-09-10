import {dates} from "./data";
import TripController from "./components/trip-controller";
import {routePoints} from "./data";
import {
  Route,
  Menu,
  Filter,
  Price
} from "./components/index";
import {
  createElement,
  appendSection,
  addSection
} from "./utils/dom";


const routePlace = document.querySelector(`.trip-main__trip-info`);
const menuPlace = document.querySelector(`.trip-controls h2:first-child`);
const filtersPlace = document.querySelector(`.trip-controls h2:last-child`);

const renderRoute = (routeMock) => {
  const route = new Route(routeMock, `section`, [`board`, `container`]);
  return route.getTemplate();
};

const renderPrice = () => {
  const totalPrice = new Price();
  addSection(routePlace, totalPrice.getTemplate(), `beforeend`);
};

const renderMenu = () => {
  const menu = new Menu();
  addSection(menuPlace, menu.getTemplate(), `afterend`);
};

const renderFilter = () => {
  const filter = new Filter();
  addSection(filtersPlace, filter.getTemplate(), `afterend`);
};

const route = routePoints.map(renderRoute).join(`\n`);
const routeBlock = createElement(route, `div`, [`trip-info__main`]);
appendSection(routePlace, routeBlock);

renderPrice();
renderMenu();
renderFilter();

const contentPlace = document.querySelector(`.trip-events`);

const tripController = new TripController(contentPlace, dates);
tripController.init();

