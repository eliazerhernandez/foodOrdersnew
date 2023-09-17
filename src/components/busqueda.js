function Busqueda() {
  return (
    <div>
      <div className="input-group flex-nowrap p-2">
        <input
          type="text"
          class="form-control"
          placeholder="Escriba el producto"
          aria-label="Username"
          aria-describedby="addon-wrapping"
        />
        <span className="input-group-text" id="addon-wrapping">
          <i className="bi bi-search"></i>
        </span>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
        <label class="form-check-label" for="flexCheckDefault">
          Seleccionar productos
        </label>
      </div>
    </div>
  );
}

export default Busqueda;
