import React, { useState, useEffect } from "react";
//import { refrescos } from "../bd/datos";
import Axios from "../services/Axios";
import { useNavigate } from "react-router-dom";

//import {toast} from "react-hot-toast";
import { toast } from "react-toastify";

function TableProductos() {
  const datos = {
    id: "",
    nombre: "",
    precio: "",
    cantidad: "",
    descripcion: "",
    image: "",
  };

  const urlImages = "http://localhost:4001/images/";

  const [saveDatos, setSaveDatos] = useState(datos);
  const [almacenarDatos, setAlmacenarDatos] = useState([]);
  const [show, setShow] = useState(false);
  const [carga, setCarga] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setSaveDatos({ ...saveDatos, [name]: value });
  };

  const GuardarDatos = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formu = document.getElementById("form-producto");
    const formData = new FormData(formu);
    //const data = Object.fromEntries(formData);

    await Axios.post("producto/guardarProducto", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress(progressEvent) {
        const { loaded, total } = progressEvent;
        const porcentaje = parseInt((loaded * 100) / total);
        setCarga(porcentaje);
        // console.log(porcentaje);
      },
    }).then(() => {
      toast.success("Datos guardados correctamente!!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
    console.log();
    consultarInformacion();
    setSaveDatos(datos);
  };

  const consultarInformacion = async () => {
    const consultar = await Axios.get("producto/consultarProducto");
    setAlmacenarDatos(consultar.data);
    console.log(consultar);
  };

  const Eliminar = async (id) => {
    if (window.confirm("¿Realmente estas seguro de eliminar el producto?")) {
      const eliminar = await Axios.delete(
        `producto/eliminarProducto/${id}`
      ).then(() => {
        toast.error("Datos eliminados correctamente!!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
      //console.log("Los datos se eliminaron correctamente: ");
    }
    consultarInformacion();
  };

  useEffect(() => {
    consultarInformacion();
  }, []);

  const abrirModal = () => {
    setShow({ ...!show });
  };

  const listaProducto = almacenarDatos.map((producto, index) => {
    return (
      <tbody>
        <tr className="text-center">
          <th scope="row">{index + 1}</th>
          <td>{producto.nombre}</td>
          <td>$&nbsp;{producto.precio}.00</td>
          <td>{producto.cantidad}</td>
          <td>{producto.descripcion}</td>
          <td>
            <img
              src={urlImages + producto.image/*.filename*/}
              class="img-thumbnail"
              alt="..."
              style={{ width: "50px" }}
            />
          </td>
          <td>
            <button
              className="btn btn-info"
              onClick={() => navigate(`/admin/editar/${producto._id}`)}
            >
              <i className="bi bi-pencil"></i>
            </button>
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => Eliminar(producto._id)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    );
  });

  return (
    <div>
      <div className="section">
        <button
          type="button"
          class="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Agregar producto...
        </button>
      </div>
      <table class="table">
        <thead>
          <tr className="text-center">
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Imagen</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>

        {listaProducto}
      </table>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Registro de productos
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              ></button>
            </div>
            <div class="modal-body">
              <form
                class="row g-3"
                onSubmit={GuardarDatos}
                id="form-producto"
                encType="multipart/form-data"
              >
                <div class="col-md-12">
                  <label for="validationDefault01" class="form-label">
                    Nombre del producto
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="nombre"
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
                    id="precio"
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
                    id="cantidad"
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
                    id="descripcion"
                    placeholder="Redacta una descripción"
                    name="descripcion"
                    value={saveDatos.descripcion}
                    onChange={onChange}
                    required
                  />
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
                    Guardar
                  </button>
                </div>
                {loading && (
                  <div className="col-12">
                    <div
                      class="progress"
                      role="progressbar"
                      aria-label="Example with label"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        class="progress-bar"
                        style={{ width: `${carga}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableProductos;
