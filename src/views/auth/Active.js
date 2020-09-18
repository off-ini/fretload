import React, { Component } from "react";
import axios from 'axios';
import { Row, Card, CardTitle,  Label, Input, Button, Col } from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";

import { Colxx } from "../../components/common/CustomBootstrap";
import APIModel from "../../models/APIModel";
import * as msg from '../../utils/messages';

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link:null,
      role:null,
      code:null,

      role_all:null,
      show_code:false,
      loading:false,
      validing:false,
      errors:null,
      success:false,
    };
    //msg.appTitle('Inscription');
  }

  componentDidMount()
  {
    this.link();
    this.roles();
  }

  link = () => {
    const {match: {params}, history} = this.props;
    this.setState({loading:true});
    axios.get(APIModel.HOST + "links/"+params.code)
          .then(res => {
            this.setState({link:res.data});
          })
          .catch(e => {
            history.push('/register');
          })
          .finally(() => this.setState({loading:false}));
  }

  roles = () => {
    this.setState({loading:true});
    axios.get(APIModel.HOST + "roles")
          .then(res => {
            this.setState({role_all:res.data.data}, () => {
            });
          })
          .catch(e => {
            msg.errorHandler(e,)
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
    if(data.id !== 4){
        this.setState({
            show_code:false
        });
    }else{
        this.setState({
            show_code:true
        });  
    }
  };

  handleSubmit = (e) => {
    this.setState({validing:true});
    const {history} = this.props;

    const options = {
      role: this.state.role ? this.state.role.id :null,
      code: this.state.code ? this.state.code : null,
      user_id: this.state.link ? this.state.link.user.id : null,
    };

    axios.put(APIModel.HOST + "links/"+this.state.link.id, options)
          .then(res => {
            history.push('/app');
          })
          .catch(e => {
            msg.errorHandler(e,null,null, msg.ERROR_TITLE);
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
              <p className="text-white h2">LA MAGIE EST DANS LES DÉTAILS</p>
            </div>
            <div className="form-side" style={{height:'450px'}}>
                <>
                  <CardTitle className="mb-4">
                    <h2>Activer votre compte !</h2>
                  </CardTitle>
                  {
                    this.state.loading ?
                      this.loadingRender()
                    : 
                    <>
                    <Row>
                        <Col sm={12}>
                            <div className="form-group has-float-label">
                                <Select
                                    components={{ Input: CustomSelectInput }}
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    isLoading={this.state.loading}
                                    name="role"
                                    value={this.state.role}
                                    onChange={this.handleChangeLabelOver}
                                    options={this.state.role_all}
                                    placeholder=""
                                />
                                <span>Profile *</span>
                                {
                                msg.fildsMsgHandler(this.state.errors,'role')
                                }
                            </div>
                        </Col>
                        {
                            this.state.show_code ?
                            <Col sm={12}>
                                <Label className="form-group has-float-label">
                                    <Input type="text" name="code" value={this.state.code} onChange={this.handleChange} />
                                    <span>Code *</span>
                                    {
                                    msg.fildsMsgHandler(this.state.errors,'code')
                                    }
                                </Label>
                            </Col>
                            :null
                        }
                    </Row>
                    <Button 
                        Color="primary" 
                        className={`btn-shadow btn-multiple-state ${this.state.validing ? "show-spinner" : ""}`}
                        onClick={() => this.handleSubmit()}>
                        <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                        </span>
                    <span className="label">Activer</span>
                    </Button>
                    </>
                  }
                  
                </>
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

export default Active;
