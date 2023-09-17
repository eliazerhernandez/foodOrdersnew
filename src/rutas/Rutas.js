import { Routes, Route } from "react-router-dom";

import AdminLayout from "../Layout/adminLayout/AdminLayout";
import HomeAdmin from "../paginas/admin/Home";
import Edicion from "../components/Editar";
//import piePagina from "../components/piepagina";

function Rutas() {
  return (
   
      <AdminLayout>
        <Routes>
          <Route path="/admin/home" element={<HomeAdmin />} />
          <Route path="/admin/editar/:id" element={<Edicion />} />
        </Routes>
      </AdminLayout>
   
  );
}
export default Rutas;
