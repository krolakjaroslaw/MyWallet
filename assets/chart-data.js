const chartData = (labels, data) => {
  return {
    type: 'line',
    data: {
      labels,
      datasets: [
        { // one line graph
          label: 'EUR/PLN',
          data,
          backgroundColor: 'rgba(54,73,93,.5)',
          borderColor: '#36495d',
          borderWidth: 3,
          fill: false,
          hidden: false,
          pointRadius: 1
          // },
          // { // another line graph
          //   label: 'Planet Mass (x1,000 km)',
          //   data: [4.8, 12.1, 12.7, 6.7, 139.8, 116.4, 50.7, 49.2],
          //   backgroundColor: [
          //     'rgba(71, 183,132,.5)' // Green
          //   ],
          //   borderColor: [
          //     '#47b784'
          //   ],
          //   borderWidth: 3
        }
      ]
    },
    options: {
      responsive: true,
      lineTension: 1,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false,
            padding: 25

          },
          gridLines: {
            drawOnChartArea: true
          }
        }],
        xAxes: [{
          type: 'time',
          time: {
            unit: 'month'
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10
          },
          tooltip: {
            mode: 'nearest'
          }
        }]
      }
    }
  }
}

export default chartData
