const chartData = (labels, data) => {
  return {
    type: 'line',
    data: {
      labels,
      datasets: [
        { // one line graph
          label: '',
          data,
          backgroundColor: 'rgba(54,73,93,.5)',
          borderColor: '#36495d',
          borderWidth: 3,
          fill: false,
          hidden: false,
          lineTension: 0,
          pointRadius: 1
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      responsive: true,
      lineTension: 1,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false,
            padding: 10

          },
          gridLines: {
            drawOnChartArea: true
          }
        }],
        xAxes: [{
          type: 'time',
          time: {
            unit: 'day'
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
            padding: 10
          }
        }]
      }
    }
  }
}

export default chartData
