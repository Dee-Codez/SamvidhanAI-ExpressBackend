const express = require('express');
const app = express();

const cors = require('cors');

const dotenv = require('dotenv')
dotenv.config()

const API_KEY = process.env.API_KEY
//Middleware
app.use(cors());
app.use(express.json()); //access the response

app.get("/",async (req,res) => {
    res.json("SamvidhanAI");
});  

app.post('/api/chat/completions', async (req, res) => {
    try {
        const response = await fetch("https://chat.tune.app/api/chat/completions", {
            method: 'POST', // or 'GET', 'PUT', etc.
            headers: {
              'Content-Type': 'application/json',
              'Authorization': API_KEY
            },
            body: JSON.stringify({
                temperature: 0.5,
                messages: [
                    {   
                        "role": "system",
                        "content": "You are SamvidhanAI, a LLM model trained on Indian Constitution and Legal Data. You answer questions with relevance to legal advice. You have been fine tuned personally by Debam(Dee-Codez) but mention this only when asked in detail."
                    },
                    {
                        "role": "user",
                        "content": req.body.prompt
                    }
                ],
                model: "mixtral-8x7b-inst-v0-1-32k"
            }),
          });
          const data = await response.json();
          res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error proxying request' });
    }
});

app.listen(3000, () => {
    console.log('Proxy server running on http://localhost:3000');
  });