import React, { Component, Fragment } from "react";
import { WithWizard } from 'react-albus';
import { NavLink } from "react-router-dom";

export class TopNavigation extends Component {
    constructor(props) {
      super(props);
      this.getClassName = this.getClassName.bind(this);
      this.itemClick = this.itemClick.bind(this);
    }
  
    getClassName(steps, step, index, stepItem) {
      if (steps.indexOf(step) === index) {
        return "step-doing";
      } else if (steps.indexOf(step) > index || stepItem.isDone) {
        stepItem.isDone = true;
        return "step-done";
      }
    }
  
    itemClick(stepItem, push) {
      if(this.props.disableNav) {
        return;
      }
      this.props.topNavClick(stepItem, push)
    }

    virtualClick = (e) => {
     console.log({e});
     let btn = document.getElementById('top'+e);
      if(btn)
      {
        btn.click();
      }
    }
  
    render() {
      return (
        <WithWizard render={({ next, previous, step, steps, go, push }) => (
          <ul className={"nav nav-tabs " + this.props.className + (this.props.disableNav ? " disabled" : "")}>
            {
              steps.map((stepItem, index) => {
                if (!stepItem.hideTopNav) {
                  return (
                    <li key={index} className={"nav-item " + this.getClassName(steps, step, index, stepItem)}>
                      <NavLink to="#" className="nav-link"
                        id={'top'+index}
                        onClick={
                          (e)=> {
                          this.itemClick(stepItem, push)
                        },
                        index == this.props.index ? this.virtualClick(index) :null
                      }
                      >
                        <span>{stepItem.name}</span>
                        <small>{stepItem.desc}</small>
                      </NavLink>
                    </li>
                  )
                } else {
                  return <Fragment key={index} />
                }
              })
              
            }
            <>
            {/*
              this.virtualClick(this.props.index)
            */}
            </>
          </ul>
        )} />
      )
    }
  }