import React, { Component } from "react";
import axios from 'axios';
import { Row, Card, CardTitle } from "reactstrap";
import { NavLink } from "react-router-dom";

import { Colxx } from "../../components/common/CustomBootstrap";
import RegisterWizard from "../../containers/wizard/RegisterWizard";
import APIModel from "../../models/APIModel";
import * as msg from '../../utils/messages';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      f_name: null,
      day: null,
      mounth: null,
      year: null,
      sexe: null,
      pays: null,
      ville: null,
      phone: null,
      phone_code: null,
      email: null,
      adresse: null,
      username: null,
      password: null,
      c_password: null,
      pays_all:null,
      loading:false,
      validing:false,
      errors:null,
      success:false,
    };
    //msg.appTitle('Inscription');
  }

  componentDidMount()
  {
    this.pays();
  }

  pays = () => {
    this.setState({loading:true});
    axios.get(APIModel.HOST + "pays")
          .then(res => {
            this.setState({pays_all:res.data.data}, () => {
                this.setState({pays: this.state.pays_all.find(e => e.id === 218)},() => {
                  this.setState({phone_code:this.state.pays.phone_code})
                })
            });
          })
          .catch(e => {
            msg.errorHandler(e,null,null)
          })
          .finally(() => this.setState({loading:false}));
  }

  handleChange = (e) =>
  {
      this.setState({
          [e.target.name]:e.target.value
      })
  }

  handleChangeLabelOver = (data,e) => {
    this.setState({ [e.name]:data });
  };

  handleSubmit = (e) => {
    this.setState({validing:true});

    const year = this.state.year ? this.state.year.value:null;
    const month = this.state.mounth ? this.state.mounth.value:null;
    const date = this.state.day ? this.state.day.value:null;

    const options = {
      name: this.state.name,
      f_name: this.state.f_name,
      naissance: year && month && date ? year+'-'+month+'-'+date : null,
      sexe: this.state.sexe?this.state.sexe.value:null,
      ville: this.state.ville?this.state.ville.id:null,
      phone: this.state.phone,
      email: this.state.email,
      adresse: this.state.adresse,
      username: this.state.username,
      password: this.state.password,
      c_password: this.state.c_password,
      url:APIModel.APP_URL,
    };
    axios.post(APIModel.HOST + "register", options)
          .then(res => {
            this.setState({
              success:true
            })
            msg.successHandler(null, msg.REGISTER_SUCCESS);
          })
          .catch(e => {
            msg.errorHandler(e,null,null, msg.ERROR_TITLE, msg.REGISTER_ERROR);
            this.setState({errors:e});
          })
          .finally(() => this.setState({validing:false}));
  }

  /*onUserRegister() {
    if (this.state.email !== "" && this.state.password !== "") {
      this.props.history.push("/");
    }
  }*/

  loadingRender = () => {
    return (
      <div className="h-100 w-100 ">
         <div className="loading" style={{marginBottom:'-7', marginLeft:'7'}} />
      </div>
     
    )
  }

  render() {
    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              {/*<p className="text-white h2">LA MAGIE EST DANS LES DÉTAILS</p>
              <p className="white mb-0">         
                Veuillez utiliser ce formulaire pour vous inscrire. <br />
                Si vous êtes membre, veuillez vous{" "}
                <NavLink to={`/login`} className="white">
                  Connecter
                </NavLink>
                .
              </p>
            */}
            </div>
            <div className="form-side" style={{height:'450px'}}>
              {
                this.state.success ?
                <CardTitle className="mb-4">
                  <h2>Verifier vos mails pour activer votre compte</h2>
                </CardTitle>
                :
                <>
                  <CardTitle className="mb-4">
                    <h2>Inscrivez vous !</h2>
                  </CardTitle>
                  {
                    this.state.validing ?
                      this.loadingRender()
                    : <RegisterWizard 
                        handleChange={this.handleChange}
                        handleChangeLabelOver={this.handleChangeLabelOver} 
                        handleSubmit={this.handleSubmit}
                        {... this.props}
                        {... this.state}
                    />
                  }
                </>
              } 
            </div>
          </Card>
        </Colxx>
      </Row>
    
    );
  }
}
/*const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};*/

export default Register;
