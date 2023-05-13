import React from "react";
import { useParams } from "react-router-dom";
import Topnav from "../../components/NavBar/Topnav";
import "../../pages/Ingredientes/styles.css";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { Grid, Container, Box, TextField, Divider, FormLabel, Alert, Tooltip } from '@mui/material';
import Accept from "../../components/Button/accept";
import Back from "../../components/Button/back";
import { PopUpTokenExpirado } from "../../components/Popup/popUpTokenExpirado";

export default function Ingrediente() {

  const { id } = useParams();
  let navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(true);
  const [ingrediente, setIngrediente] = React.useState({
    id: "", description: "", quantity: ""
  });
  const [openPopupToken, setOpenPopupToken] = React.useState(false);
  const [status, setStatus] = React.useState({ type: '', mensagem: '' });

  async function fetchData() {

    const token = localStorage.getItem('user_token');

    const requestInfo = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
    };

    await fetch(process.env.REACT_APP_BASE_URL + "/ingredient/" + id, requestInfo)
      .then(resposta => {
        if (resposta.status === 401) {
          setOpenPopupToken(true);
        }
        return resposta.json();
      })
      .then((json) => {
        setIngrediente(json);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));

  }

  React.useEffect(() => {
    if (id !== undefined) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, []);

  async function validate() {

    let schema = yup.object().shape({
      description: yup.string("Nome do ingrediente não está no padrão esperado!")
        .typeError("Nome do ingrediente não está no padrão esperado!")
        .required("Necessário preencher o nome do ingrediente!"),
      quantity: yup.string("Quantidade do ingrediente não está no formato esperado!")
        .typeError("Quantidade do ingrediente não está no formato esperado!")
        .required("Necessário preencher a quantidade do ingrediente!")
    });

    try {
      await schema.validate(ingrediente);
      return true;
    } catch (err) {
      setStatus({
        type: 'error',
        mensagem: err.errors
      });
      return false;
    }
  }

  const cadastrarIngrediente = async () => {

    if (!(await validate())) return;

    const token = localStorage.getItem('user_token');

    if (id !== undefined) {

      const requestInfo = {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }),
        body: JSON.stringify(ingrediente)
      };

      fetch(process.env.REACT_APP_BASE_URL + "/ingredient/" + id, requestInfo)
        .then(resposta => {
          if (resposta.ok) {
            navigate('/ingredientes');
          } else {
            if (resposta.status === 401) {
              setOpenPopupToken(true);
            }
            alert('Não foi possível atualizar ingrediente!')
          }
        })
    } else {

      const requestInfo = {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }),
        body: JSON.stringify(ingrediente)
      };

      fetch(process.env.REACT_APP_BASE_URL + "/ingredient", requestInfo)
        .then(resposta => {
          if (resposta.ok) {
            navigate('/ingredientes');
          } else {
            if (resposta.status === 401) {
              setOpenPopupToken(true);
            }
            alert('Não foi possível inserir ingrediente!')
          }
        })
    }
  };

  return (
    <div>
      <Topnav />
      <Container style={{ width: '750px' }}>
        {isLoading ? (
          <h2 className="custom-title">Carregando...</h2>
        ) : (
          <Box component="form">
            <h2 className="custom-title">Ingrediente</h2>
            <Divider />
            <PopUpTokenExpirado openPopup={openPopupToken} />
            <Grid className="custom-row">
              <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(1, 1fr)' }}>
                <FormLabel>Descrição*</FormLabel>
              </Box>
            </Grid>

            <Grid className="custom-row">
              <Box>
                <TextField fullWidth variant="outlined" value={ingrediente.description === null ? '' : ingrediente.description} onChange={description => setIngrediente({ ...ingrediente, description: description.target.value })}></TextField>
              </Box>
            </Grid>

            <Grid className="custom-row">
              <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <FormLabel>Quantidade(KG)*</FormLabel>
              </Box>
            </Grid>

            <Grid className="custom-row">
              <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <Tooltip title="Para 500g informar 0,500 ou para 1KG informar 1,000">
                  <TextField value={ingrediente.quantity ? ingrediente.quantity : ''} onChange={quantity => setIngrediente({ ...ingrediente, quantity: quantity.target.value })}></TextField>
                </Tooltip>
              </Box>
            </Grid>

            {status.mensagem.length > 0 &&
              <Grid className="custom-row">
                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(1, 1fr)' }}>
                  <Alert severity="error">{status.mensagem}</Alert>
                </Box>
              </Grid>
            }

            <Accept variant="contained" type="button" style={{ marginTop: '3vh', marginBottom: '4vh' }}
              onClick={() => { cadastrarIngrediente() }}>
              Salvar
            </Accept>
            <Back variant="outlined" type="button" style={{ marginTop: '3vh', marginBottom: '4vh', marginLeft: '4vh' }}
              onClick={() => { navigate('/ingredientes') }}>
              Voltar
            </Back>
          </Box>
        )}
      </Container>
    </div>
  )
}