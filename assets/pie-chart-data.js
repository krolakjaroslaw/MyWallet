const pieChartData = (labels, data, colors) => {
  return {
    type: 'pie',
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors
        }
      ]
    },
    options: {
      responsive: true,
      legend: {
        align: 'center',
        labels: {
          fontSize: 20
        },
        position: 'right'
      },
      title: {
        display: false,
        text: 'Chart.js Pie Chart'
      },
      tooltips: {
        bodyFontSize: 20
      }
    }
  }
}

export default pieChartData
