import express from 'express';
import patientsService from '../services/patientService';
import { NewPatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.post('/', (req, res) => {
  const patient = req.body as NewPatient;
  const newPatient = patientsService.addPatient(
    patient
  );
  res.json(newPatient);
});

export default router;