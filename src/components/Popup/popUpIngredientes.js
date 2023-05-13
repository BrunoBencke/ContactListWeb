import React, { useState, useEffect, useCallback } from "react";
import { Dialog, DialogTitle, DialogContent, Select, MenuItem, Typography, FormLabel, TextField } from '@mui/material';
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
  const [contact, setContact] = useState({ personId: "", type: "", sequence: "", value: "" })
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [selectionModel, setSelectionModel] = useState([]);
  const [busca, setBusca] = useState('');
  const [error, setError] = useState("");
  const lowerBusca = busca.toLowerCase();

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
    addItemToRecipe(ingredientes.filter((ingrediente) => ingrediente.id === selectionModel));
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
                Contatos
              </Typography>
              <Close
                onClick={() => fechar()}><Iconify icon="fa:close" />
              </Close>
            </div>
          </DialogTitle>
          <DialogContent >
            <FormLabel sx={{ marginLeft: 2 }}>Contato:</FormLabel>
            <Select id="contactSelect" size="small" sx={{ width: 140, marginLeft: 2 }} value={contact.type}
              onChange={e => setContact({ ...contact, type: e.target.value })}>
              <MenuItem key={0} value={0}>Telefone</MenuItem>
              <MenuItem key={1} value={1}>E-mail</MenuItem>
              <MenuItem key={2} value={2}>WhatsApp</MenuItem>
            </Select>
            <FormLabel sx={{ marginLeft: 2 }}>Valor:</FormLabel>
            <TextField size="small" sx={{ width: 120, marginLeft: 2 }}
              value={contact.value}
              onChange={e => setContact({ ...contact, value: e.target.value })}>
            </TextField>
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