import AbstractComponent from "./abstract-component";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {groupedPointsByType} from "../data";
import {duration} from "./point-date";

class Statistics extends AbstractComponent {

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
    const labelsDuration = groupedPointsByType.map((item) => duration.getDuration(item.duration));

    const moneyGraph = new Chart(statMoney, getOptions(groupedPointsByType.map((item) => item.type), groupedPointsByType.map((item) => item.price), `MONEY`, moneyFormatter));
    const TransportGraph = new Chart(statTransport, getOptions(groupedPointsByType.map((item) => item.type), groupedPointsByType.map((item) => item.number), `TRANSPORT`, transportFormatter));
    const timeGraph = new Chart(statTime, getOptions(groupedPointsByType.map((item) => item.type), groupedPointsByType.map((item) => item.duration), `TIME SPENT`, timeSpentFormatter));

  }
}

export default Statistics;
