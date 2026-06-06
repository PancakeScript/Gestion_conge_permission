// require('dotenv').config()
// const http = require('http')

// const body = JSON.stringify({
//   nom_utilisateur: 'Rakoto',
//   prenom: 'Jean',
//   mail: 'jean3@example.com',
//   mdp: 'motdepasse123',
//   telephone_employe: '0341234567',
//   adresse_employe: 'Antananarivo',
//   nom_departement: 'Informatique'
// })

// const opts = {
//   hostname: 'localhost',
//   port: 3000,
//   path: '/api/employes',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Content-Length': Buffer.byteLength(body)
//   }
// }

// const req = http.request(opts, res => {
//   let data = ''
//   res.on('data', chunk => data += chunk)
//   res.on('end', () => {
//     console.log('STATUS:', res.statusCode)
//     console.log('RESPONSE:', data)
//   })
// })

// req.on('error', e => console.error('ERREUR:', e.message))
// req.write(body)
// req.end()
