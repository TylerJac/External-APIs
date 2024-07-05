document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const resultsDiv = document.getElementById('results');
    const countrySpan = document.getElementById('country');
    const confirmedSpan = document.getElementById('confirmed');
    const deathsSpan = document.getElementById('deaths');
    const recoveredSpan = document.getElementById('recovered');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      resultsDiv.style.display = 'none';
      const formData = new FormData(form);
      const userInput = formData.get('userInput');
  
      try {
        console.log(formData.get(' submitted '));
        console.log('Sending request to /fetch-data with userInput:', userInput);
  
        const response = await fetch('/fetch-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ userInput }),
        });
  
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('Received data:', data);
  
        // Display the formatted data
        countrySpan.textContent = data.country;
        confirmedSpan.textContent = data.confirmed;
        deathsSpan.textContent = data.deaths;
        recoveredSpan.textContent = data.recovered;
  
        resultsDiv.style.display = 'block';
      } catch (error) {
        console.error('Error fetching data:', error);
        resultsDiv.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
      }
    });
  });
  