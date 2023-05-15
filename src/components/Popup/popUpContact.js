import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
  TextField,
  FormLabel,
} from '@mui/material';
import Iconify from '../Icon/Iconify';
import Close from '../Button/close';
import Accept from '../Button/accept';
import Back from '../Button/back';
import Card from '../Card/index';
import { ContainerGrid, CardLine } from './styles';
import contactsContext from '../../contexts/cards';
import produce from 'immer';
import { styled } from '@mui/material/styles';
import { PopUpAddContact } from './popUpAddContact';
import { v4 as uuidv4 } from 'uuid';

export const PopupContact = (props) => {
  const {
    openPopupContact,
    setOpenPopupContact,
    person,
    setPerson,
    fetchData,
  } = props;

  const [openPopupAddContact, setOpenPopupAddContact] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState([
    { id: '', personId: '', type: '', value: '' },
  ]);
  const [removeItens, setRemoveItens] = useState([]);
  const [error, setError] = useState('');

  const RemoveButton = styled(Button)(() => ({
    color: '#FF4F4F',
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#FFFFFF',
      color: '#FF0000',
    },
  }));

  const AddButton = styled(Button)(() => ({
    color: '#1A3D4D',
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#FFFFFF',
      color: '#5671BB',
    },
  }));

  useEffect(() => {
    if (!openPopupContact) {
      setIsLoading(true);
      setPerson({ id: '', name: '', lastName: '' });
      setContacts([]);
      setError('');
      return;
    }

    if (person.id !== '') {
      const requestInfo = {
        method: 'GET',
        headers: new Headers({
          'Content-type': 'application/json',
        }),
      };

      fetch(
        process.env.REACT_APP_BASE_URL + '/Contact/' + person.id,
        requestInfo
      )
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          setContacts(json);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));

      //setContacts(contacts[0]);
    } else {
      setPerson({ id: uuidv4(), Name: '', LastName: '' });
      setContacts([]);
      setIsLoading(false);
    }
  }, [openPopupContact]);

  const fechar = () => {
    setOpenPopupContact(false);
  };

  const handleOpenAddContact = () => {
    setOpenPopupAddContact(true);
  };

  function move(from, to) {
    setContacts(
      produce(contacts, (draft) => {
        const dragged = draft[from];
        draft.splice(from, 1);
        draft.splice(to, 0, dragged);
      })
    );
  }

  function addContact(obj) {
    setContacts([...contacts, obj]);
  }

  function verifyIndex(type) {
    const obj = contacts.filter((x) => x.type == type);

    const lenght = obj.length;

    if (lenght > 0) {
      return true;
    }
    return false;
  }

  function addItemToDelete(obj) {
    setRemoveItens([...removeItens, obj]);
  }

  function removeItemToDelete(obj) {
    setRemoveItens(removeItens.filter((x) => x.id !== obj.id));
  }

  function removecontacts() {
    setContacts(contacts.filter((e) => !removeItens.includes(e)));
    setRemoveItens([]);
  }

  function mapItens() {
    if (contacts[0] != undefined) {
      return (
        <ContainerGrid>
          <CardLine>
            <Grid
              container
              spacing={1}
              sx={{ justifyContent: 'space-between' }}
            >
              <Grid item xs={2} sx={{ textAlign: 'center' }}>
                Selecionar
              </Grid>
              <Grid item xs={2} sx={{ textAlign: 'center' }}>
                Ordenar
              </Grid>
              <Grid item xs={2} sx={{ textAlign: 'center' }}>
                Contato
              </Grid>
              <Grid item xs={2} sx={{ textAlign: 'left' }}>
                Valor
              </Grid>
            </Grid>
          </CardLine>
          {contacts?.map((contact, index) => (
            <Card key={contact.id} index={index} data={contact} />
          ))}
        </ContainerGrid>
      );
    }
  }

  function editName(value) {
    setPerson({ ...person, name: value });
  }

  function editLastName(value) {
    setPerson({ ...person, lastName: value });
  }

  const atualizarperson = () => {
    if (contacts.length === 0) {
      setError('Psiu, adicione um contato!');
      return;
    }

    if (person.name === '') {
      setError('Adicione um nome para a pessoa.');
      return;
    }

    const requestInfo = {
      method: 'POST',
      headers: new Headers({
        'Content-type': 'application/json',
      }),
      body: JSON.stringify({ person, contacts }),
    };

    fetch(process.env.REACT_APP_BASE_URL + '/Person', requestInfo).then(
      (response) => {
        if (response.ok) {
          fetchData();
          setOpenPopupContact(false);
        } else {
          alert('Não foi possível inserir pessoa!');
        }
      }
    );
  };

  return (
    <contactsContext.Provider
      value={{ move, addItemToDelete, removeItemToDelete }}
    >
      <div>
        <Dialog maxWidth="xlg" open={openPopupContact} style={{ height: 800 }}>
          <div>
            <DialogTitle>
              <div style={{ display: 'flex' }}>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ flexGrow: 1, width: 550 }}
                >
                  Pessoa
                </Typography>
                <Close onClick={() => fechar()}>
                  <Iconify icon="fa:close" />
                </Close>
              </div>
            </DialogTitle>
            <DialogContent>
              <Grid container sx={{ alignItems: 'center' }}>
                <FormLabel>Nome:</FormLabel>
                <TextField
                  size="small"
                  sx={{ marginLeft: 2 }}
                  value={person.name}
                  onChange={(description) => editName(description.target.value)}
                />
                <FormLabel sx={{ marginLeft: 2 }}>Sobrenome:</FormLabel>
                <TextField
                  size="small"
                  sx={{ marginLeft: 2 }}
                  value={person.lastName}
                  onChange={(description) =>
                    editLastName(description.target.value)
                  }
                />
              </Grid>
              <ContainerGrid>
                <Grid
                  container
                  spacing={1}
                  sx={{ justifyContent: 'space-between', marginTop: '10px' }}
                >
                  <AddButton
                    onClick={() => {
                      handleOpenAddContact();
                    }}
                    startIcon={
                      <Iconify icon="material-symbols:add-box-outline" />
                    }
                  >
                    Adicionar Contato
                  </AddButton>
                  <RemoveButton
                    onClick={() => {
                      removecontacts();
                    }}
                    startIcon={
                      <Iconify icon="material-symbols:playlist-remove-rounded" />
                    }
                  >
                    Remover Contato
                  </RemoveButton>
                </Grid>
                {isLoading ? (
                  <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
                    <CircularProgress />
                  </Grid>
                ) : (
                  mapItens()
                )}
              </ContainerGrid>
              <Accept
                variant="contained"
                type="button"
                style={{ marginTop: '2vh', height: '5vh' }}
                onClick={() => atualizarperson()}
              >
                <Iconify
                  icon="line-md:confirm"
                  sx={{ width: 25, height: 25 }}
                />
              </Accept>
              <Back
                variant="outlined"
                type="button"
                style={{ marginTop: '2vh', marginLeft: '4vh', height: '5vh' }}
                onClick={() => fechar()}
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
        <div>
          <PopUpAddContact
            openPopupAddContact={openPopupAddContact}
            setOpenPopupAddContact={setOpenPopupAddContact}
            addContact={addContact}
            person={person}
            verifyIndex={verifyIndex}
            setErrorProp={setError}
          ></PopUpAddContact>
        </div>
      </div>
    </contactsContext.Provider>
  );
};
