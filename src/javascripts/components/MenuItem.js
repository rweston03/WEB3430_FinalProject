import React from 'react'
import { format } from 'date-fns'
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import  Menu  from './Menu'

export default function MenuItem(props) {
    const m = props.menu;
    return(
      <div className="card col-3 text-dark bg-light mx-2 text-center">
        <div className="card-header">
          <div className="row">
            <div className="col-12">
              <h4 className="text-capitalize">{ m.name }</h4>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-12">{ m.description }</div>
          </div>
        </div>
        <div className="card-footer text-center">
          <Link to={`../items/${m.name}`} className="btn btn-primary">More...</Link>
        </div>
      </div>
    );
}