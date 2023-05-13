import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";
import GlobalStyle from "./styles/global";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => (
  <AuthProvider>
    <DndProvider backend={HTML5Backend}>
    <RoutesApp />
    <GlobalStyle />
    </DndProvider>
  </AuthProvider>
);

export default App;
