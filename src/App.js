import { BrowserRouter } from "react-router-dom";
import Rutas from "./rutas/Rutas";
import RutasCliente from "./rutas/RutasClient";

// Toaster para menssajes teporales
import {Toaster} from "react-hot-toast";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Rutas />
        <RutasCliente/>
        <Toaster/>
        <ToastContainer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
