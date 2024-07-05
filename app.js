import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/fetch-data', async (req, res) => {
  const userInput = req.body.userInput;

  const options = {
    method: 'GET',
    url: 'https://covid-19-data.p.rapidapi.com/country/code',
    params: {
      format: 'json',
      code: userInput // Uses the user input here
    },
    headers: {
      'x-rapidapi-key': '3631084a8emsh06e96aaabb6ae57p1ec123jsn68bcd520c6c7',
      'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
    }
  };

  try {
    const apiResponse = await axios.request(options);
    const data = apiResponse.data;

    // Process and format data as needed
    const formattedData = {
      country: data[0].country,
      confirmed: data[0].confirmed,
      deaths: data[0].deaths,
      recovered: data[0].recovered
    };

    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from API' });
    }
console.log(data);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
