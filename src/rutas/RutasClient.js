import { Routes, Route } from "react-router-dom";

import Home from "../paginas/client/Home";
import ClienteLayout from "../Layout/clientLayout/ClienteLayout";
//import piePagina from "../components/piepagina";

function RutasCliente() {
  return (
   
      <ClienteLayout>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </ClienteLayout>
   
  );
}
export default RutasCliente;