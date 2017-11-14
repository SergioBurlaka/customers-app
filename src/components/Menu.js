import React, { Component } from 'react';
import  { Link } from 'react-router';
// import { Link } from 'react-router-dom';
import '../App.css';

class Menu extends Component {
    render() {
        return (

            <div className="wrapper text-center">
                <div className="btn-group">
                    <Link  className="btn btn-info"  role="button" to="/">Users list</Link>
                    <Link  className="btn btn-info"  role="button" to="/addUser">Add user</Link>
                    <Link  className="btn btn-info"  role="button" to="/currencyCalculator">Currency calculator</Link>
                </div>
            </div>

        );
    }
}

export default Menu;
