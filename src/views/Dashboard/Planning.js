import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import moment from 'moment';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import APIModel from '../../models/APIModel';
import * as actions from '../../store/actions/type';
import * as actionsCreator from '../../store/actions/MissionActions';

import * as msg from '../../utils/messages';

class Planning extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            schedulerData:null,
            loading:false,
        }
    }

    componentDidMount = () => {
        this.all();
    }

    all()
    {
      this.setState({loading:true});
        let { dispatch ,history } = this.props
        axios.get(APIModel.HOST + "missions/get/all").then(res => {
            let missions = res.data.data;
            let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Week);
            //set locale moment to the schedulerData, if your locale isn't English. By default, Scheduler comes with English(en, United States).
            moment.locale('en');
            schedulerData.setLocaleMoment(moment);

            //set resources here or later
            let resources = [];
            missions.map(e => {
                resources = [...resources, {
                    id: `r${e.id}`,
                    name: e.title,
                }];
            });
            schedulerData.setResources(resources);
            //set events here or later, 
            //the event array should be sorted in ascending order by event.start property, otherwise there will be some rendering errors
            let events = [];

            missions.map((e,i) => {
                events = [... events, {
                    id: i,
                    start: e.date_depart_pre,
                    end: e.date_arriver_pre,
                    resourceId: `r${e.id}`,
                    title: e.title,
                    bgColor: '#D9D9D9'
                }];
            });

            schedulerData.setEvents(events);
            this.setState({
                schedulerData:schedulerData
            });


        }).catch(e => msg.errorHandler(e, dispatch, history))
        .finally(() => this.setState({loading:false}));
    }
    
    render() {
        const { schedulerData } = this.state;
        return (
            <>
                {
                    schedulerData != null ?
                    <Scheduler 
                        schedulerData={schedulerData}
                        prevClick={() => {}}
                        nextClick={() => {}}
                        onSelectDate={() => {}}
                        onViewChange={() => {}}
                        eventItemClick={() => {}}
                    /> 
                    :null
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
      missions: state.MissionReducer.missions,
      user: state.AuthReducer.user
    }
  }
    
  const mapDispatchToProsps = dispatch => {
    return {
      dispatch:dispatch,
      all: (n) => actionsCreator.all(n),
      deleted: (id) => actionsCreator.deleted(id)
    }
  }

export default connect(mapStateToProps, mapDispatchToProsps)(Planning);
