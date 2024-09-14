document.addEventListener("DOMContentLoaded", async function() {
    const tableBody = document.getElementById("tickers-body");
    console.log("hello");
    async function fetchTickers() {
      try {
        const response = await fetch('http://localhost:3001/api/tickers');
        const tickers = await response.json();
        tableBody.innerHTML = '';
        tickers.forEach(ticker => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${ticker.name}</td>
            <td>${ticker.last}</td>
            <td>${ticker.buy}</td>
            <td>${ticker.sell}</td>
            <td>${ticker.volume}</td>
            <td>${ticker.base_unit}</td>
          `;
          tableBody.appendChild(row);
        });
      } catch (error) {
        console.error('Error fetching tickers:', error);
      }
    }
    fetchTickers();
  });
  