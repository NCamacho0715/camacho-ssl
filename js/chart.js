import { ALPHABET } from "./analyzer.js";

let chart;

export function drawFrequencyChart(freq) {

  if (chart) chart.destroy();

  chart = new Chart(
    document.getElementById("freqChart"),
    {
      type: "bar",
      data: {
        labels: ALPHABET.split(""),
        datasets: [{
          label: "Frecuencia",
          data: ALPHABET.split("").map(l => freq[l])
        }]
      },
      options: { responsive: true }
    }
  );
}
