import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  //funciones actualizadoras del manejo de estado
  const onConfirm = () => {
    setState({
      ...state,
      loading: false,
      error: false,
      confirmed: true,
    });
  };

  const onError = () => {
    setState({
      ...state,
      loading: false,
      error: true,
    });
  };

  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
    });
  };

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    });
  };

  const onDeleted = () => {
    setState({
      ...state,
      deleted: true,
    });
  };

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: "",
    });
  };

  React.useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        state.value === SECURITY_CODE ? onConfirm() : onError();
      }, 3000);
    }
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>

        <p>Por favor escribe el codigo de seguridad</p>

        {state.error && !state.loading && (
          <p>Error : el codigo es incorrecto</p>
        )}

        {state.loading && <p>Cargando ...</p>}

        <input
          type="text"
          placeholder="Codigo de seguridad"
          value={state.value}
          disabled={state.loading}
          onChange={(event) => {
            onWrite(event.target.value);
            /* //setError(false); cambiar estado cada vez que hayan cambios en el input
            setvalue(event.target.value); */
          }}
        />
        <button
          onClick={() => {
            onCheck();
          }}
        >
          Comprobar
        </button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <h2>Eliminar {name}</h2>
        <p>
          Advertencia ⚠️, ¿Estás seguro de querer eliminar esto?
          <span className="red">Es irrecuperable</span>
        </p>
        <button
          onClick={() => {
            onDeleted();
          }}
        >
          Sí, eliminar
        </button>
        <button
          onClick={() => {
            onReset();
          }}
        >
          No, me arrepentí
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h2>Eliminar {name}</h2>
        <p>Eliminado con exito</p>
        <button
          onClick={() => {
            onReset();
          }}
        >
          Volver atrás
        </button>
      </React.Fragment>
    );
  }
}

export { UseState };
