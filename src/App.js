import React from "react";
import logo from "./logo.svg";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { id: 1, valor: 0 },
];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: 0,
      valor: 0      
    }
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].valor = dato.valor;        
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  mayor = () => {
    var contadorx = 0;
    var mayor=0;
    var menor=0;
    var acumulado=0;
    var promedio=0.0;
    var arreglo=this.state.data;
    

    arreglo.map((registro) => {
      if (parseInt(contadorx)==0){
          mayor=registro.valor;
          menor=registro.valor;
      }
      if (parseInt(registro.valor)<parseInt(menor)){    
        menor=registro.valor;  
      }

      if (parseInt(registro.valor)>parseInt(mayor)){   
        mayor=registro.valor;   
      }
      
      contadorx=contadorx+1;
      acumulado=parseInt(acumulado)+parseInt(registro.valor);
    });
    promedio=parseFloat(acumulado)/parseFloat(contadorx);
    var opcion = window.confirm("Valor Mayor: "+mayor+
                                ", Valor Menor: "+menor+
                                ", Promedio: "+promedio
                                );
  }

  eliminar = (dato) => {
    var opcion = window.confirm("¿Eliminar "+dato.valor+"?");
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
          <h3>Arreglos</h3>
          <h5>Calcular el Máximo, Mínimo y Promedio</h5>  
          <h5>Por: L.I. Omar Esteban</h5>
          <h6>Contacto: mx.esteban@outlook.com</h6>
          <br />
          
            <p align="right">
            <Button color="primary" onClick={()=>this.mostrarModalInsertar()}>
                 Agregar un Valor +
            </Button>
            </p>
          <Table>
            <thead>
              <tr>
                <th>Cons.</th>
                <th>Valor</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.valor}</td>
                  
                  <td align="right">
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>
                      Borrar
                      </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <p align="right">
            <Button color="success" onClick={()=> this.mayor()}>
              Mostrar Resultado
            </Button>
          </p>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Valor</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Consecutivo:
              </label>            
              <input
                className="form-control"
                readOnly
                type="number"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Valor: 
              </label>
              <input
                className="form-control"
                name="valor"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.valor}
              />
            </FormGroup>                      
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}>
              Guardar Cambio
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Valor</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Consecutivo: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="number"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Valor: 
              </label>
              <input
                className="form-control"
                name="valor"
                type="number"
                onChange={this.handleChange}
              />
            </FormGroup>
                      
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Agregar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
            
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;