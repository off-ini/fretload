import React, { Component } from "react";
import {connect} from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import VehiculeListItem from './VehiculeListItem';

class AddVehicule extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loading:false,
        validing:false,
        errors:null,
    };
  }

  componentDidMount()
  {
  }

  handleChange = (e) =>
  {
      this.setState({
          [e.target.name]:e.target.value,
          errors:null
      })
  }


  handleSubmit = (e) => {
    this.setState({validing:true});
  }


  render() {
    const { modalOpen, toggleModal, vehicule_all, vehicules, addVehicule, removeVehicule } = this.props;
    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        size="lg"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          Nouveau Vehicule
        </ModalHeader>
          <ModalBody>
              {
                  vehicule_all ?
                  <>
                    {
                        vehicule_all.length > 0 ?
                        <>  
                            {
                                vehicule_all.map((r,i) => {
                                return (
                                  <>
                                  {
                                    vehicules.find(e => e.id === r.id) ?
                                    <VehiculeListItem
                                        key={i} 
                                        data={r} 
                                        addVehicule={addVehicule}
                                        removeVehicule={removeVehicule}
                                        add={true}
                                        checked={true}
                                    />
                                    :
                                    <VehiculeListItem
                                        key={i} 
                                        data={r} 
                                        addVehicule={addVehicule}
                                        removeVehicule={removeVehicule}
                                        add={true}
                                    />
                                  }
                                  </>  
                                )
                                })
                            }    
                        </>
                        :null
                    }  
                    </>
                  :null
              }
          </ModalBody>
        <ModalFooter>
          <Button Color="secondary" outline onClick={toggleModal}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

  
const mapDispatchToProsps = dispatch => {
  return {
    dispatch:dispatch,
  }
}

export default connect(null, mapDispatchToProsps)(AddVehicule);
