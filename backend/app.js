const express = require('express');
const cors = require('cors');
require('dotenv').config();
const typeCongeRoutes = require('./routes/typeCongeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');


const authRoutes = require('./routes/authRoutes');
const employeRoutes = require('./routes/employeRoutes');
const demandeRoutes = require('./routes/demandeRoutes');
const notificationRoutes = require('./routes/notificationRoutes'); // ← ajouté
const ferieRoutes = require('./routes/ferieRoutes');
const profilRoutes = require('./routes/profilRoutes');


const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use('/api/types-conge', typeCongeRoutes);
app.use('/api/feries', ferieRoutes);
app.use('/api/profil', profilRoutes);


app.use('/api/dashboard', dashboardRoutes);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employes', employeRoutes);
app.use('/api/demandes', demandeRoutes);
app.use('/api/notifications', notificationRoutes); 

app.get('/', (req, res) => {
  res.json({ message: 'API CongeApp fonctionne !' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

module.exports = app;