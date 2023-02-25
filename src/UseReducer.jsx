//forma declarativa
import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  //actions creators
  const onConfirm = () => dispatch({ type: actionTypes.confirm });
  const onError = () => dispatch({ type: actionTypes.error });
  const onCheck = () => dispatch({ type: actionTypes.check });
  const onDeleted = () => dispatch({ type: actionTypes.delete });
  const onReset = () => dispatch({ type: actionTypes.reset });
  const onWrite = ({ target: { value } }) => {
    dispatch({ type: actionTypes.write, payload: value });
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
          onChange={
            onWrite
            /* //setError(false); cambiar estado cada vez que hayan cambios en el input
            setvalue(event.target.value); */
          }
        />
        <button onClick={onCheck}>Comprobar</button>
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
        <button onClick={onDeleted}>Sí, eliminar</button>
        <button onClick={onReset}>No, me arrepentí</button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h2>Eliminar {name}</h2>
        <p>Eliminado con exito</p>
        <button onClick={onReset}>Volver atrás</button>
      </React.Fragment>
    );
  }
}

//formas de crear un reducer

//se inicia un estado
const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

//actionTypes, sirven para tener los actionTypes dentro de variables y evitar errores de escritura dentro de nuestro codigo
const actionTypes = {
  confirm: "CONFIRM",
  error: "ERROR",
  check: "CHECK",
  delete: "DELETE",
  write: "WRITE",
  reset: "RESET",
};

//se crea una funcion que reciba un estado y una accion
/* const reducer = (state, action) => {

} */

//reducer en dos partes, un reducer con objetos, un reducer que haga la validacion
const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    loading: false,
    error: true,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
  [actionTypes.confirm]: {
    ...state,
    loading: false,
    error: false,
    confirmed: true,
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
  [actionTypes.reset]: {
    ...state,
    confirmed: false,
    deleted: false,
    value: "",
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

//reducer utilizando condicional switch (forma mas popular, facil de entender, intuitiva)
/* const reducerSwitch = (state, action) => {
  switch (action.type) {
    case "ERROR":
      return {
        ...state,
        error: true,
        loading: false,
      };
    case "CHECK":
      return {
        ...state,
        loading: true,
      };
    default:
      return {
        ...state,
      };
  }
}; */

//reducer utilizando condicional if la mas obvia
/* const reducerIf = (state, action) => {
  if(action.type === 'ERROR') {
    return {
      ...state,
      error: true,
      loading: false,
    };
  } else if (action.type === 'CHECK') {
    return {
      ...state,
      loading: true,
    }
  } else {
    return {
      ...state,
    }
  }
} */

export { UseReducer };
