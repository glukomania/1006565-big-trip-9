import {points} from "./data";
import TripController from "./components/trip-controller";

const contentPlace = document.querySelector(`.trip-events`);

const tripController = new TripController(contentPlace, points);
tripController.init();
