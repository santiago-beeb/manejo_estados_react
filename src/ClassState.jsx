import React from "react";

const SECURITY_CODE = "paradigma";

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      error: false,
      loading: false,
    };
  }

  componentDidUpdate() {
    if (!!this.state.loading) {
      setTimeout(() => {
        console.log("haciendo validacion");

        if (SECURITY_CODE === this.state.value) {
          this.setState({ error: false, loading: false });
        } else {
          this.setState({ error: true, loading: false });
        }

        console.log("terminando validacion");
      }, 2000);
    }
  }

  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>

        <p>Por favor escribe el codigo de seguridad</p>

        {(this.state.error && !this.state.loading) && <p>Error: el codigo es incorrecto</p>}

        {this.state.loading && <p>Cargando ...</p>}

        <input
          type="text"
          placeholder="Codigo de seguridad"
          value={this.state.value}
          onChange={(event) => {
            this.setState({ value: event.target.value });
          }}
        />
        <button onClick={() => this.setState({ loading: true })}>
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
