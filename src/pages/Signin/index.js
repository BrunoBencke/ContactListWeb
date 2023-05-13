import React, { useState } from 'react';
import '../../pages/Signin/styles.css';
import Logo from '../../components/Imagens/splash.png';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { TextField, CircularProgress } from '@mui/material';
import Accept from '../../components/Button/accept';

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleLogin() {
    if (!email && !senha) {
      setError('Preencha todos os campos');
      return;
    }

    if (!email) {
      setError('Preencha seu e-mail');
      return;
    }

    if (!senha) {
      setError('Preencha sua senha');
      return;
    }

    setIsLoading(true);

    const res = await signin(email, senha);

    if (!res) {
      setError('Dados incorretos');
      setIsLoading(false);
      return;
    }

    navigate('/home');
  }

  return (
    <div className="div">
      <div className="Container">
        <div className="Content">
          <img src={Logo} width={250} height={250} alt="Logo" />
          <TextField
            id="email"
            label="E-mail"
            type="email"
            placeholder="Digite seu E-mail"
            value={email}
            fullWidth
            onChange={(e) => [setEmail(e.target.value), setError('')]}
          />
          <TextField
            id="senha"
            label="Senha"
            type="password"
            placeholder="Digite sua Senha"
            value={senha}
            fullWidth
            onChange={(e) => [setSenha(e.target.value), setError('')]}
          />
          <div className="labelError">{error}</div>
          <Accept
            className="btn-button"
            variant="contained"
            type="button"
            onClick={handleLogin}
          >
            Entrar
            {isLoading ? (
              <CircularProgress
                color="inherit"
                size="1rem"
                sx={{ marginLeft: 2 }}
              />
            ) : (
              <></>
            )}
          </Accept>
        </div>
      </div>
      <div className="right" />
    </div>
  );
};

export default Signin;
