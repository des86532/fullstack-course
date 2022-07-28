import axios from "axios";
import { Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Patient, Gender } from "../types";
import { apiBaseUrl } from "../constants";

import Entries from './Entries';
import AddPatientEntryModal from '../AddPatientEntryModal';

import { PatientEntryFormValues } from './AddEntryForm';

const PatientDetail = () => {
  const [patient, setPatient] = useState<Patient>({
    id: '',
    name: '',
    occupation: '',
    gender: Gender.Male,
    entries: []
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { id } = useParams<{id: string}>();

  const openModal = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatientEntry = async (values: PatientEntryFormValues) => {
    try {
      const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients/${patient.id}/entries`, values);
      setPatient(data);
      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchPatientDetail = async () => {
      try {
        const { data } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(data);
      } catch (e) {
        console.error(e);
      }
    };    

    void fetchPatientDetail();
  }, []);

  return (
    <>
      <h2>{patient.name}</h2>
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      {patient.entries ? <Entries entries={patient.entries}/> : <p>no entries</p>}
      <AddPatientEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatientEntry}
        error={error}
        onClose={closeModal}
      ></AddPatientEntryModal>
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </>
  );
};

export default PatientDetail;