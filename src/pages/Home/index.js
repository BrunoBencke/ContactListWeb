import * as React from 'react';
import Logo from '../../components/Imagens/home.png';
import * as C from './styles';
import Topnav from '../../components/NavBar/Topnav';
import { Stack, Typography } from '@mui/material';
import GraficoVendas from '../../components/Dashboard/graficoVendas';

const Home = () => {
  return (
    <div>
      <Topnav/>
      <C.Content>
        <img
          src={Logo}
          width={1000}
          height={1000}
          alt="Logo"
        />
      </C.Content>
    </div>
  );
};

export default Home;
