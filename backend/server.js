const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connecté'))
    .catch(err => console.error('Erreur:', err));

app.get('/', (req, res) => {
    res.send('Backend Express & Mongoose fonctionne 🚀');
});

app.listen(PORT, () => {
    console.log(`Serveur sur ${PORT}`);
});
