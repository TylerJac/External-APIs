import express from 'express';
import bodyParser from 'body-parser';
import { axios } from 'axios';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/fetch-data', async (req, res) => {
  const userInput = req.body.userInput;

  try {
    const apiResponse = await axios.get(`YOUR_API_ENDPOINT_HERE?query=${userInput}&apiKey=YOUR_API_KEY_HERE`);
    const data = apiResponse.data;

    // Process and format data as needed
    const formattedData = {
      // format your data here
    };

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from API' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
