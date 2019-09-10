import AbstractComponent from "./abstract-component";

class Menu extends AbstractComponent {

  getTemplate() {
    return `
    <nav class="trip-controls__trip-tabs trip-tabs">
      <a class="trip-tabs__btn trip-tabs__btn--active" href="#" data-menu="table">Table</a>
      <a class="trip-tabs__btn" href="#" data-menu="stats">Stats</a>
    </nav>
    `;
  }
}

export default Menu;
