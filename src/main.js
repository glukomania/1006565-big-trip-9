import {dates} from "./data";
import TripController from "./components/trip-controller";

const contentPlace = document.querySelector(`.trip-events`);

const tripController = new TripController(contentPlace, dates);
tripController.init();
