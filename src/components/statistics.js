import AbstractComponent from "./abstract-component";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {duration} from "./point-date";
import {groupeByType} from "../utils/util";

class Statistics extends AbstractComponent {
  constructor() {
    super();
    this._points = null;
    this._moneyGraph = null;
    this._transportGraph = null;
    this._timeGraph = null;
    this._pointsGroupedByType = null;
  }

  getElement(dates) {
    if (dates) {
      this._points = dates;
    }
    if (this._element === null) {
      this._element = document.createElement(`section`);
      this._element.classList.add(`statistics`);
      this._element.classList.add(`visually-hidden`);
      this._element.innerHTML = this.getTemplate();
    }
    return this._element;
  }

  getTemplate() {
    return `
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900" height="300"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900" height="300"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900" height="300"></canvas>
      </div>
    `;
  }

  getCharts() {
    const statMoney = document.querySelector(`.statistics__chart--money`);
    const statTransport = document.querySelector(`.statistics__chart--transport`);
    const statTime = document.querySelector(`.statistics__chart--time`);

    const moneyFormatter = (value) => {
      return value + `$`;
    };

    const transportFormatter = (value) => {
      return value + ` times`;
    };

    const timeSpentFormatter = (value) => {
      return duration.getDuration(value);
    };


    const getOptions = (moneyLabels, moneyData, title, money) => ({
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: moneyLabels,
        datasets: [{
          data: moneyData,
          backgroundColor: `white`,
          hoverBorderWidth: 0,
        }]
      },
      options: {
        plugins: {
          datalabels: {
            formatter: (value) => money(value),
            display: true,
            font: {
              size: 15
            },
            fontColor: `#303030`,
            anchor: `end`,
            align: `start`,
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 15,
            },
            categoryPercentage: 0.7,
            barPercentage: 1.0,
            gridLines: {
              display: false,
              drawBorder: false
            }
          }]
        },
        legend: {
          display: false,
        },
        title: {
          display: true,
          position: `left`,
          text: title,
          fontSize: 20,
        },
      }
    });

    this._pointsGroupedByType = groupeByType(this._points);
    this._moneyGraph = new Chart(statMoney, getOptions(this._pointsGroupedByType.map((item) => item.type), this._pointsGroupedByType.map((item) => item.price), `MONEY`, moneyFormatter));
    this._transportGraph = new Chart(statTransport, getOptions(this._pointsGroupedByType.map((item) => item.type), this._pointsGroupedByType.map((item) => item.number), `TRANSPORT`, transportFormatter));
    this._timeGraph = new Chart(statTime, getOptions(this._pointsGroupedByType.map((item) => item.type), this._pointsGroupedByType.map((item) => item.duration), `TIME SPENT`, timeSpentFormatter));

  }
}

export default Statistics;
