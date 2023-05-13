import React, { useState, useEffect, useCallback } from "react";
import { Dialog, DialogTitle, DialogContent, InputAdornment, OutlinedInput, Typography, FormLabel } from '@mui/material';
import Iconify from '../../components/Icon/Iconify';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import Close from "../../components/Button/close";
import Accept from "../../components/Button/accept";
import Back from "../../components/Button/back";

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'description', headerName: 'Descrição', width: 280 },
  { field: 'quantity', headerName: 'Quantidade', width: 130 }
];

export const PopupIngredientes = (props) => {

  const { openPopupIngredientes, setOpenPopupIngredientes, addItemToRecipe, verifyIndex, setErrorProp } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [ingredientes, setIngredientes] = useState([]);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [selectionModel, setSelectionModel] = useState([]);
  const [busca, setBusca] = useState('');
  const [error, setError] = useState("");
  const lowerBusca = busca.toLowerCase();

  const ingredientesFiltrados = Array.isArray(ingredientes) ? ingredientes.filter((ingrediente) => ingrediente.description.toLowerCase().includes(lowerBusca)) : []

  useEffect(() => {

    if (!openPopupIngredientes) {
      setIsLoading(true);
      setIngredientes([]);
      setSelectionModel([]);
      setErrorProp("");
      return;
    }

    const token = localStorage.getItem('user_token');

    const requestInfo = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
    };

    fetch(process.env.REACT_APP_BASE_URL + "/ingredients", requestInfo)
      .then(resposta => resposta.json())
      .then((json) => {
        setIngredientes(json);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [openPopupIngredientes]);

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

  const confirmaSelecao = () => {
    if (selectionModel.length === 0 || selectionModel.length > 1) {
      setError("Selecione um Ingrediente!");
      return;
    }

    if (verifyIndex(selectionModel)) {
      setError("Ingrediente já se encontra na receita!");
      return;
    }

    setError("");
    addItemToRecipe(ingredientesFiltrados.filter((ingrediente) => ingrediente.id === selectionModel));
    setOpenPopupIngredientes(false);
  }

  const setId = useCallback((id) => {
    setSelectionModel(id);
  }, [setSelectionModel]);

  const fechar = () => {
    setIngredientes([]);
    setOpenPopupIngredientes(false);
    setError("");
  }

  const handleSelection = useCallback((selection, details) => {
    if (selection.length > 1) {
      const result = selection.filter((s) => selectionModel !== s);
      setId(result.findLast(x => true));
    } else if (selection.length === 0) {
      setId([]);
    } else {
      setId(selection.findLast(x => true));
    }
  }
    , [setId, selectionModel]);

  return (
    <div>
      <Dialog maxWidth="xlg" open={openPopupIngredientes} style={{ height: windowSize.innerHeight }}>
        <div>
          <DialogTitle>
            <div style={{ display: 'flex' }}>
              <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                Ingredientes
              </Typography>
              <Close
                onClick={() => fechar()}><Iconify icon="fa:close" />
              </Close>
            </div>
          </DialogTitle>
          <DialogContent >
            <OutlinedInput
              fullWidth
              placeholder="Pesquisar ingredientes..."
              style={{
                marginBottom: '20px'
              }}
              value={busca}
              onChange={(ev) => setBusca(ev.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              } />

            <DataGrid style={{ height: 450, width: 550 }}
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              checkboxSelection
              rows={ingredientesFiltrados}
              columns={columns}
              pageSize={6}
              rowsPerPageOptions={[6]}
              loading={isLoading}
              selectionModel={selectionModel}
              onSelectionModelChange={handleSelection}
            />
            <Accept variant="contained" type="button" style={{ marginTop: '3vh', marginBottom: '4vh', height: '5vh' }}
              onClick={() => confirmaSelecao()}>
              <Iconify icon="line-md:confirm" sx={{ width: 25, height: 25 }} />
            </Accept>
            <Back variant="outlined" type="button" style={{ marginTop: '3vh', marginBottom: '4vh', marginLeft: '4vh', height: '5vh' }}
              onClick={() => fechar()}>
              <Iconify icon="clarity:cancel-line" sx={{ width: 25, height: 25 }} />
            </Back>
            <FormLabel style={{ marginLeft: '3vh' }}>{error}</FormLabel>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  )
}