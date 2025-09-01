import React from "react";
import MainRoutes from "./components/MainRoutes";
import {Toaster} from 'sonner'

function App() {
  return (
    <>
      <MainRoutes />
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
