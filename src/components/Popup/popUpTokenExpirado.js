import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import useAuth from "../../hooks/useAuth";
import Accept from "../../components/Button/accept";
import Iconify from '../../components/Icon/Iconify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const PopUpTokenExpirado = (props) => {

  const { openPopup } = props;

  const [open, setOpen] = React.useState(true);
  const { signout } = useAuth();

  const handleClose = () => {
    setOpen(false);
    signout();
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openPopup}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Token Expirado! 
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Para sua segurança, após 24 horas solicitamos que realize seu login novamente.
              Obrigado.
            </Typography>
            <Accept variant="contained" type="button" style={{ marginTop: '3vh', marginBottom: '4vh', height: '5vh' }}
                  onClick={() => handleClose()}>
                      <Iconify icon="line-md:confirm" sx={{ width: 25, height: 25 }}/>
            </Accept> 
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
