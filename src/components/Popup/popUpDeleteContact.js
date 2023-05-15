import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import Iconify from '../Icon/Iconify';
import Close from '../Button/close';
import Accept from '../Button/accept';
import Back from '../Button/back';
import * as C from './styles';

export const PopUpDeleteContact = (props) => {
  const { openPopupDelete, setOpenPopupDelete, personDelete, fetchData } =
    props;

  const [erro, setErro] = React.useState('');

  async function excluirReceita(id) {
    const requestInfo = {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    };
    await fetch(process.env.REACT_APP_BASE_URL + '/recipe/' + id, requestInfo)
      .then((resposta) => {
        return resposta.json();
      })
      .then((json) => {
        if (json.retorno === 'erro') {
          setErro(json.detalhes);
          return;
        }
        //setOpenPopupExcluirReceita(false);
        fetchData();
      })
      .catch((error) => console.log(error));
  }

  const fechar = () => {
    setErro('');
    //setOpenPopupExcluirReceita(false);
  };

  return (
    <div>
      <Dialog maxWidth="xlg" open={openPopupDelete} style={{ height: 550 }}>
        <div>
          <DialogTitle>
            <div style={{ display: 'flex' }}>
              <Typography
                variant="h6"
                component="div"
                style={{ flexGrow: 1, width: 550 }}
              >
                Deseja realmente excluir esta receita ?
              </Typography>
              <Close onClick={() => fechar()}>
                <Iconify icon="fa:close" />
              </Close>
            </div>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" component="div">
              {personDelete?.Name}
            </Typography>
            <C.labelError>{erro}</C.labelError>
            <div>
              <Accept
                variant="contained"
                type="button"
                style={{ marginTop: '2vh', height: '5vh' }}
                onClick={() => excluirReceita(personDelete.id)}
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
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};
