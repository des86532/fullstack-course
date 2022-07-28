import express from 'express';
import diagnosesRouter from './src/routes/diagnose'
import patientRouter from './src/routes/patient'

const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => res.send('pong'))
app.use('/api/diagnoses', diagnosesRouter)
app.use('/api/patients', patientRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});