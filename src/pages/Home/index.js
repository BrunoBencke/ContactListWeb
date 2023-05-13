import * as React from 'react';
import Logo from '../../components/Imagens/marca.png';
import * as C from './styles';
import Topnav from '../../components/NavBar/Topnav';
import { Stack, Typography } from '@mui/material';
import GraficoVendas from '../../components/Dashboard/graficoVendas';

const Home = () => {

  return (
    <div className="Home">
      <Topnav />
      <C.Content>
        <Stack spacing={1} sx={{ mb: -10 }}>
          <Typography variant="h6" color="inherit">
            Faturamento
          </Typography>
        </Stack>
        <GraficoVendas />
      </C.Content>
      <C.Content>
        <img
          src={Logo}
          width={1000}
          height={200}
          alt="Logo"
        />
      </C.Content>
    </div>
  );
};

export default Home;
