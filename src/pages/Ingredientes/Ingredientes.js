import React from "react";
import Topnav from "../../components/NavBar/Topnav";
import "../../pages/Ingredientes/styles.css";
import Iconify from '../../components/Icon/Iconify';
import Accept from "../../components/Button/accept";
import { Link as RouterLink } from 'react-router-dom';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { PopUpTokenExpirado } from "../../components/Popup/popUpTokenExpirado";
import { PopupExcluirIngrediente } from "../../components/Popup/popUpExcluirIngrediente";
import { IconButton as ImageButton, OutlinedInput, InputAdornment } from '@mui/material';
import { Stack, Typography } from '@mui/material';

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 695,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

export default function Ingredientes() {

  const [ingredientes, setIngredientes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [openPopupToken, setOpenPopupToken] = React.useState(false);
  const [openPopupExcluirIngrediente, setOpenPopupExcluirIngrediente] = React.useState(false);
  const [ingredienteExcluir, setIngredienteExcluir] = React.useState('');
  const [busca, setBusca] = React.useState('');
  const lowerBusca = busca.toLowerCase();

  const ingredientesFiltrados = Array.isArray(ingredientes) ? ingredientes.filter((ingrediente) => ingrediente.description.toLowerCase().includes(lowerBusca)) : []

  React.useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const token = localStorage.getItem('user_token');

    const requestInfo = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
    };

    fetch(process.env.REACT_APP_BASE_URL + "/ingredients", requestInfo)
      .then(resposta => {
        if (resposta.status === 401) {
          setOpenPopupToken(true);
        }
        setLoading(false);
        return resposta.json();
      })
      .then((json) => setIngredientes(json))
      .catch((error) => console.log(error));
  }

  const abrirPopupExcluirIngrediente = (params) => {
    setIngredienteExcluir(params);
    setOpenPopupExcluirIngrediente(true);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'description', headerName: 'Descrição', width: 280 },
    { field: 'quantity', headerName: 'Quantidade', width: 130 },
    {
      field: 'opcoes', headerName: 'Opções', width: 140,
      renderCell: (params) =>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ImageButton component={RouterLink} to={`/ingrediente/${params.row.id}`}><Iconify icon="akar-icons:edit" /></ImageButton>
          <ImageButton onClick={() => { abrirPopupExcluirIngrediente(params.row); }}><Iconify icon="ep:delete" /></ImageButton>
        </Stack>
    },
  ];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <Topnav />
      <div style={{ height: 550, width: '40%', marginLeft: '27%' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} marginTop="30px">
          <Typography variant="h4" gutterBottom>
            Ingredientes
          </Typography>
          <Accept component={RouterLink} to="/ingrediente" startIcon={<Iconify icon="eva:plus-fill" />}>Adicionar</Accept>
        </Stack>

        <PopUpTokenExpirado openPopup={openPopupToken} />

        <SearchStyle placeholder="Pesquisar Ingredientes..."
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
          rows={ingredientesFiltrados}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          loading={loading}
        />
      </div>
      <div>
        <PopupExcluirIngrediente
          openPopupExcluirIngrediente={openPopupExcluirIngrediente}
          setOpenPopupExcluirIngrediente={setOpenPopupExcluirIngrediente}
          ingredienteExcluir={ingredienteExcluir}
          setOpenPopupToken={setOpenPopupToken}
          fetchData={fetchData}
        >
        </PopupExcluirIngrediente>
      </div>
    </div>
  );
}