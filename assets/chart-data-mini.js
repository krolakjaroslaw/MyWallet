const miniChartData = (labels, data) => {
  return {
    type: 'line',
    data: {
      labels,
      datasets: [
        { // one line graph
          data,
          backgroundColor: 'rgba(54,73,93,.5)',
          borderColor: '#ff0000',
          borderWidth: 3,
          fill: false,
          hidden: false,
          lineTension: 0,
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
      maintainAspectRadio: false,
      responsive: true,
      lineTension: 1,
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            display: true,
            padding: 50,
            maxTicksLimit: 4,
            maxRotation: 0,
            fontSize: 50,
            precision: 2
          },
          gridLines: {
            color: 'black',
            lineWidth: 3,
            drawOnChartArea: false,
            drawTicks: false
          }
        }],
        xAxes: [{
          type: 'time',
          ticks: {
            display: true,
            padding: 40,
            maxTicksLimit: 3,
            maxRotation: 0,
            fontSize: 50
          },
          gridLines: {
            color: 'black',
            lineWidth: 3,
            drawOnChartArea: false,
            drawTicks: false
          },
          tooltip: {
            mode: 'nearest'
          }
        }]
      }
    }
  }
}

export default miniChartData
