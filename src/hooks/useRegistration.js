import { useState } from 'react';
import {
  registerCitizen,
  registerLawyer,
  uploadDocument,
} from '../modules/Citizen-Lawyer-Registration/axios/registrationApi';

export default function useRegistration() {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  const handle = async (fn) => {
    setStatus('loading');
    setMessage('');
    try {
      await fn();
      setStatus('success');
      setMessage('Submitted successfully. Status: PENDING');
    } catch (err) {
      setStatus('error');
      setMessage(err?.response?.data?.message || 'An error occurred.');
    }
  };

  return {
    status,
    message,
    registerCitizen: (data) => handle(() => registerCitizen(data)),
    registerLawyer:  (data) => handle(() => registerLawyer(data)),
    uploadDocument:  (data) => handle(() => uploadDocument(data)),
    reset: () => { setStatus(null); setMessage(''); },
  };
}
