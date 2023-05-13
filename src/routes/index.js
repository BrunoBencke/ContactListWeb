import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Ingredientes from '../pages/Ingredientes/Ingredientes';
import Ingrediente from '../pages/Ingredientes/Ingrediente';
import Receitas from '../pages/Receitas/Receitas';

const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <Signin />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route path="/ingredientes" element={<Private Item={Ingredientes} />}></Route>
          <Route path="/ingrediente" element={<Private Item={Ingrediente} />}></Route>
          <Route path="/ingrediente/:id" element={<Private Item={Ingrediente} />}></Route>
          <Route path="/receitas" element={<Private Item={Receitas} />}></Route>
          <Route path="/" element={<Signin />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
