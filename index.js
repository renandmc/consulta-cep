const express = require('express');
const axios = require('axios');

const port = 3000;
const apiCep = 'https://viacep.com.br/ws/';

const app = express();

app.listen(port, () => console.log(`Server running on port ${port}`));

app.use(express.json());

app.get('/cep/:cep', (req, res) => {
  const { cep } = req.params;
  if (isNaN(cep)) {
    return res.status(400).json({ error: 'CEP must be a number' });
  }
  if (cep.length != 8) {
    return res.status(400).json({ error: 'CEP must be 8 caracters' });
  }
  axios.get(`${apiCep}${cep}/json`)
    .then(response => {
      const { data: address } = response;      
      if (address.erro == 'true') {
        return res.status(404).json({ error: 'CEP not found' });
      }
      if (address.bairro == '') {
        return res.status(400).json({           
          error: 'CEP without neighborhood',
          address 
        });
      }            
      return res.json({
        address
      });            
    })
    .catch(error => {      
      console.error(error);
      return res.status(500).json({ error: 'CEP search error' });
    });
});