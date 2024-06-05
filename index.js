const express = require('express');
const Blockchain = require('./blockchain/blockchain');
const bodyParser = require('body-parser');
const { PORT } = require('./util/config');

//creating express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

//started with blockchain, genesis block added to chain
const blockchain = new Blockchain();

//GET request to fetch blockchain data
app.get('/api/readBlockchain', (req, res) => {
    res.json(blockchain.chain);
});

//POST request to add new block
app.post('/api/mineBlock', (req, res) => {
    const data =  req.body.data;
    blockchain.addBlock({data});
    res.json(blockchain.chain);
});

//setting server port
app.listen(PORT, () => {
    console.log(`listening at localhost:${PORT}`);
})