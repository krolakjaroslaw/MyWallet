const polarChartData = (labels, data, colors) => {
  return {
    type: 'polarArea',
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
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Chart.js Polar Area Chart'
        }
      }
    }
  }
}

export default polarChartData
