import React, { Component } from "react";
import {connect} from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import ChauffeurListItem from './ChauffeurListItem';

class AddChauffeur extends Component {
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
    const { modalOpen, toggleModal, chauffeur_all, chauffeurs, addChauffeur, removeChauffeur } = this.props;
    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        size="lg"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          Nouveau Chauffeur
        </ModalHeader>
          <ModalBody>
              {
                  chauffeur_all ?
                  <>
                    {
                        chauffeur_all.length > 0 ?
                        <>  
                            {
                                chauffeur_all.map((r,i) => {
                                return (
                                  <>
                                  {
                                    chauffeurs.find(e => e.id === r.id) ?
                                    <ChauffeurListItem
                                        key={i} 
                                        data={r} 
                                        addChauffeur={addChauffeur}
                                        removeChauffeur={removeChauffeur}
                                        add={true}
                                        checked={true}
                                    />
                                    :
                                    <ChauffeurListItem
                                        key={i} 
                                        data={r} 
                                        addChauffeur={addChauffeur}
                                        removeChauffeur={removeChauffeur}
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

export default connect(null, mapDispatchToProsps)(AddChauffeur);
