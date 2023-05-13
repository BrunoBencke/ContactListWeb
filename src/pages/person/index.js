import React from "react";
import Topnav from "../../components/NavBar/Topnav";
import Iconify from '../../components/Icon/Iconify';
import Accept from "../../components/Button/accept";
import { DataGrid, ptBR } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { Status } from "../../components/Status/Status";
import { PopupExcluirReceita } from "../../components/Popup/popUpExcluirReceita";
import { PopupReceita } from "../../components/Popup/popUpReceita";
import { PopUpTokenExpirado } from "../../components/Popup/popUpTokenExpirado";
import { IconButton as ImageButton, OutlinedInput, InputAdornment } from '@mui/material';
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

  const [receitas, setReceitas] = React.useState([]);
  const [receita, setReceita] = React.useState({ id: "", description: "", version: "" });
  const [loading, setLoading] = React.useState(true);
  const [openPopupExcluirReceita, setOpenPopupExcluirReceita] = React.useState(false);
  const [openPopupReceita, setOpenPopupReceita] = React.useState(false);
  const [receitaExcluir, setReceitaExcluir] = React.useState('');
  const [openPopupToken, setOpenPopupToken] = React.useState(false);
  const [busca, setBusca] = React.useState('');
  const lowerBusca = busca.toLowerCase();

  const receitasFiltradas = Array.isArray(receitas) ? receitas.filter((receita) => receita.name.toLowerCase().includes(lowerBusca)) : []

  React.useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const token = localStorage.getItem('user_token');

    const requestInfo = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'/*,
        'Authorization': `Bearer ${token}`*/
      }),
    };

    fetch(process.env.REACT_APP_BASE_URL + "/person", requestInfo)
      .then(resposta => {
        if (resposta.status === 401) {
          setOpenPopupToken(true);
        }
        setLoading(false);
        return resposta.json();
      })
      .then((json) => {
        setReceitas(json);
         console.log(json)
        })
      .catch((error) => console.log(error));
  }

  const abrirPopupExcluirReceita = (params) => {
    setReceitaExcluir(params);
    setOpenPopupExcluirReceita(true);
  };

  const abrirPopupReceita = (params) => {
    if (params !== undefined) {
      setReceita(params);
    }
    setOpenPopupReceita(true);
  };

  const columns = [
    { field: 'name', headerName: 'Nome', width: 230 },
    { field: 'lastName', headerName: 'Sobrenome', width: 130 },
    {
      field: 'status', headerName: 'Status', width: 130,
      renderCell: () =>
        <Status
          color={('success')}
        >
          {'ATIVA'}
        </Status>
    },
    {
      field: 'opcoes', headerName: 'Opções', width: 140,
      renderCell: (params) =>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ImageButton onClick={() => { abrirPopupReceita(params.row); }}><Iconify icon="akar-icons:edit" /></ImageButton>
          <ImageButton onClick={() => { abrirPopupExcluirReceita(params.row); }}><Iconify icon="ep:delete" /></ImageButton>
        </Stack>
    },
  ];

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Topnav />
      <div style={{ height: '60%', width: '45%', marginLeft: '27%' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} marginTop="30px">
          <Typography variant="h4" gutterBottom>
            Pessoas
          </Typography>
          <Accept onClick={() => { abrirPopupReceita() }} startIcon={<Iconify icon="eva:plus-fill" />}>Adicionar</Accept>
        </Stack>

        <SearchStyle placeholder="Pesquisar Pessoas..."
          style={{
            marginBottom: '20px',
            marginTop: '-30px',
            width: '100%'
          }}
          value={busca}
          onChange={(ev) => setBusca(ev.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          } />

        <DataGrid
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          rows={receitasFiltradas}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          loading={loading}
        />

        <PopUpTokenExpirado openPopup={openPopupToken} />
      </div>
      <div>
        <PopupExcluirReceita
          openPopupExcluirReceita={openPopupExcluirReceita}
          setOpenPopupExcluirReceita={setOpenPopupExcluirReceita}
          receitaExcluir={receitaExcluir}
          setOpenPopupToken={setOpenPopupToken}
          fetchData={fetchData}
        >
        </PopupExcluirReceita>
      </div>
      <div>
        <PopupReceita
          openPopupReceita={openPopupReceita}
          setOpenPopupReceita={setOpenPopupReceita}
          receita={receita}
          setReceita={setReceita}
          setOpenPopupToken={setOpenPopupToken}
          fetchData={fetchData}
        >
        </PopupReceita>
      </div>
    </div>
  );
}

export default Person;