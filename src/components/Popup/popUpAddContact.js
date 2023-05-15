import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  Grid,
  MenuItem,
  Typography,
  FormLabel,
  TextField,
} from '@mui/material';
import Iconify from '../Icon/Iconify';
import Close from '../Button/close';
import Accept from '../Button/accept';
import Back from '../Button/back';
import { v4 as uuidv4 } from 'uuid';

export const PopUpAddContact = (props) => {
  const {
    openPopupAddContact,
    setOpenPopupAddContact,
    addContact,
    verifyIndex,
    person,
    setErrorProp,
  } = props;
  const [contact, setContact] = useState({
    id: '',
    personId: '',
    type: '',
    value: '',
  });
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [error, setError] = useState('');

  useEffect(() => {
    if (!openPopupAddContact) {
      setContact({ id: '', personId: '', type: '', value: '' });
      setError('');
      return;
    }

    setContact({ id: uuidv4(), personId: person.id, type: '', value: '' });
  }, [openPopupAddContact]);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const HandleAddContact = () => {
    if (contact.type === '') {
      setError('Ops, um contato deve ser selecionado.');
      return;
    }

    if (contact.value === '') {
      setError('Ops, acho que você esqueceu de colocar o contato.');
      return;
    }

    if (verifyIndex(contact.type)) {
      setError('Esta pessoa já possui este contato.');
      return;
    }

    setError('');
    addContact(contact);
    setOpenPopupAddContact(false);
  };

  const HandleClose = () => {
    setOpenPopupAddContact(false);
    setContact({ id: '', personId: '', type: '', value: '' });
    setError('');
  };

  return (
    <div>
      <Dialog
        maxWidth="xlg"
        open={openPopupAddContact}
        style={{ height: windowSize.innerHeight }}
      >
        <div>
          <DialogTitle>
            <div style={{ display: 'flex' }}>
              <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                Contatos
              </Typography>
              <Close onClick={() => HandleClose()}>
                <Iconify icon="fa:close" />
              </Close>
            </div>
          </DialogTitle>
          <DialogContent>
            <Grid container sx={{ alignItems: 'center' }}>
              <FormLabel sx={{ marginLeft: 2 }}>Contato:</FormLabel>
              <Select
                id="contactSelect"
                size="small"
                sx={{ width: 140, marginLeft: 2 }}
                value={contact.type}
                onChange={(e) =>
                  setContact({ ...contact, type: e.target.value })
                }
              >
                <MenuItem key={0} value={0}>
                  Telefone
                </MenuItem>
                <MenuItem key={1} value={1}>
                  E-mail
                </MenuItem>
                <MenuItem key={2} value={2}>
                  WhatsApp
                </MenuItem>
              </Select>
              <FormLabel sx={{ marginLeft: 2 }}>Valor:</FormLabel>
              <TextField
                size="small"
                sx={{ width: 120, marginLeft: 2 }}
                value={contact.value}
                onChange={(e) =>
                  setContact({ ...contact, value: e.target.value })
                }
              />
            </Grid>
            <Accept
              variant="contained"
              type="button"
              style={{ marginTop: '3vh', marginBottom: '4vh', height: '5vh' }}
              onClick={() => HandleAddContact()}
            >
              <Iconify icon="line-md:confirm" sx={{ width: 25, height: 25 }} />
            </Accept>
            <Back
              variant="outlined"
              type="button"
              style={{
                marginTop: '3vh',
                marginBottom: '4vh',
                marginLeft: '4vh',
                height: '5vh',
              }}
              onClick={() => HandleClose()}
            >
              <Iconify
                icon="clarity:cancel-line"
                sx={{ width: 25, height: 25 }}
              />
            </Back>
            <FormLabel style={{ marginLeft: '3vh' }}>{error}</FormLabel>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};
