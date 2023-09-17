import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";
import { useNavigate, useParams } from "react-router-dom";

function Editar() {
  const variables = {
    id:"",
    nombre: "",
    precio: "",
    cantidad: "",
    descripcion: "",
    image: "",
    filename:"",
    path:""
  };

  const [saveDatos, setSaveDatos] = useState(variables);

  const params = useParams();
  const navigate=useNavigate();

  const buscarOne = async () => {
    const editar = await Axios.get(`producto/oneProducto/${params.id}`);
    setSaveDatos(editar.data);
    console.log(editar.data);
  };

  const onChange = (e) => {
   const {name,value}=e.target;
   setSaveDatos({...saveDatos,[name]:value})
  };

  const EditarForm = async () => {
    const form=document.getElementById("formedit");
    const formData=FormData(form);
    Axios.patch("producto/updateProducto/" + params.id, formData)
    .then(()=>{
      console.log("Datos actualizados correctamente");
    });
    navigate("/admin/home")
  };

  useEffect(() => {
    buscarOne(params.id);
  }, [params.id]);

  return (
    <div>
      <form class="row g-3" onSubmit={EditarForm} id="formedit" encType="multipart/form-data">
        <div class="col-md-12">
          <label for="validationDefault01" class="form-label">
            Nombre del producto
          </label>
          <input
            type="text"
            class="form-control"
            id="validationDefault01"
            placeholder="Nombre del producto"
            name="nombre"
            value={saveDatos.nombre}
            onChange={onChange}
            required
          />
        </div>
        <div class="col-md-12">
          <label for="validationDefault02" class="form-label">
            Precio
          </label>
          <input
            type="text"
            class="form-control"
            id="validationDefault02"
            placeholder="Precio del producto"
            name="precio"
            value={saveDatos.precio}
            onChange={onChange}
            required
          />
        </div>
        <div class="col-md-12">
          <label for="validationDefault02" class="form-label">
            Cantidad
          </label>
          <input
            type="text"
            class="form-control"
            id="validationDefault02"
            placeholder="Cantidad de productos"
            name="cantidad"
            value={saveDatos.cantidad}
            onChange={onChange}
            required
          />
        </div>
        <div class="col-md-12">
          <label for="validationDefault02" class="form-label">
            Descripcion
          </label>
          <textarea
            type="text"
            class="form-control"
            id="validationDefault02"
            placeholder="Redacta una descripción"
            name="descripcion"
            value={saveDatos.descripcion}
            onChange={onChange}
            required
          />
        </div>
        <div class="col-md-12">
        <img src={'http://localhost:4001/images/'+saveDatos.image.filename} className="img-thumbnail" style={{width:100, height:100}} alt="..." />
            
         
        </div>
        <div class="col-md-12">
          <input
            type="file"
            class="form-control"
            id="image"
            placeholder="Ingresa la imagen"
            name="image"
           value={saveDatos.image}
            onChange={onChange}
            required
          />
        </div>
        <div class="col-12">
          <button class="btn btn-primary" type="submit">
            Editar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Editar;
