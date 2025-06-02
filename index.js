const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.get('/paises', async (req, res) => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const datos = response.data.map(p => ({
      nombre: p.name.common,
      capital: p.capital?.[0] || "N/A",
      poblacion: p.population
    }));
    res.json(datos.slice(0, 10));
  } catch (error) {
    res.status(500).send('Error al consultar la API');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => console.log('✅ Servidor corriendo en http://localhost:3000'));
//comentario para activar actions
// trigger docker hub login
