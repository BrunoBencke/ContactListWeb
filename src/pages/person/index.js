import React from 'react';
import Topnav from '../../components/NavBar/Topnav';
import Iconify from '../../components/Icon/Iconify';
import Accept from '../../components/Button/accept';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { Status } from '../../components/Status/status';
import { PopUpDeleteContact } from '../../components/Popup/popUpDeleteContact';
import { PopupContact } from '../../components/Popup/popUpContact';
import {
  IconButton as ImageButton,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import { Stack, Typography } from '@mui/material';

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 782,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

const Person = () => {
  const [persons, setPersons] = React.useState([]);
  const [person, setPerson] = React.useState({
    id: '',
    name: '',
    lastName: '',
  });
  const [loading, setLoading] = React.useState(true);
  const [openPopupDelete, setOpenPopupDelete] = React.useState(false);
  const [openPopupContact, setOpenPopupContact] = React.useState(false);
  const [personDelete, setPersonDelete] = React.useState('');
  const [search, setSearch] = React.useState('');
  const lowersearch = search.toLowerCase();

  const personsFilter = Array.isArray(persons)
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(lowersearch)
      )
    : [];

  React.useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const requestInfo = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    };

    fetch(process.env.REACT_APP_BASE_URL + '/person', requestInfo)
      .then((resposta) => {
        setLoading(false);
        return resposta.json();
      })
      .then((json) => {
        setPersons(json);
      })
      .catch((error) => console.log(error));
  }

  const abrirPopupExcluirperson = (params) => {
    //setpersonExcluir(params);
    setOpenPopupDelete(true);
  };

  const handleOpenPopupContact = (params) => {
    if (params !== undefined) {
      setPerson(params);
    }
    setOpenPopupContact(true);
  };

  const columns = [
    { field: 'name', headerName: 'Nome', width: 230 },
    { field: 'lastName', headerName: 'Sobrenome', width: 130 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: () => <Status color={'success'}>{'ATIVA'}</Status>,
    },
    {
      field: 'opcoes',
      headerName: 'Opções',
      width: 140,
      renderCell: (params) => (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <ImageButton
            onClick={() => {
              handleOpenPopupContact(params.row);
            }}
          >
            <Iconify icon="akar-icons:edit" />
          </ImageButton>
          <ImageButton
            onClick={() => {
              abrirPopupExcluirperson(params.row);
            }}
          >
            <Iconify icon="ep:delete" />
          </ImageButton>
        </Stack>
      ),
    },
  ];

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Topnav />
      <div style={{ height: '60%', width: '45%', marginLeft: '27%' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          marginTop="30px"
        >
          <Typography variant="h4" gutterBottom>
            Pessoas
          </Typography>
          <Accept
            onClick={() => {
              handleOpenPopupContact();
            }}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Adicionar
          </Accept>
        </Stack>

        <SearchStyle
          placeholder="Pesquisar Pessoas..."
          style={{
            marginBottom: '20px',
            marginTop: '-30px',
            width: '100%',
          }}
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />

        <DataGrid
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          rows={personsFilter}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          loading={loading}
        />
      </div>
      <div>
        <PopUpDeleteContact
          openPopupDelete={openPopupDelete}
          setOpenPopupDelete={setOpenPopupDelete}
          personDelete={personDelete}
          fetchData={fetchData}
        ></PopUpDeleteContact>
      </div>
      <div>
        <PopupContact
          openPopupContact={openPopupContact}
          setOpenPopupContact={setOpenPopupContact}
          person={person}
          setPerson={setPerson}
          fetchData={fetchData}
        ></PopupContact>
      </div>
    </div>
  );
};

export default Person;
