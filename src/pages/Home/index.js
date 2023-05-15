import * as React from 'react';
import Logo from '../../components/Imagens/home.png';
import * as C from './styles';
import Topnav from '../../components/NavBar/Topnav';

const Home = () => {
  return (
    <div>
      <Topnav/>
      <C.Content>
        <img
          src={Logo}
          width={800}
          height={800}
          alt="Logo"
        />
      </C.Content>
    </div>
  );
};

export default Home;
