import React, { Component } from 'react';
import '../App.css';
import  {connect} from 'react-redux';
import {  Modal,  Button } from 'react-bootstrap';
import Menu from '../components/Menu';

import {  Pagination } from 'react-bootstrap';
import SelectForUsers from '../components/SelectForUsers';



class UsersTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
               showModalWindow: false,
               userId: null,
               userName: null
        };


        this.showModal = this.showModal.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.handleSelectActivePage = this.handleSelectActivePage.bind(this);
        this.setUsersPerPage = this.setUsersPerPage.bind(this);
    }

    // componentWillMount(){
    //
    //     console.log('hello table mount');
    //     console.log('this.props.users');
    //     console.log(this.props.users);
    //     this.props.renderTable(this.props.users);
    //
    //
    // }


    setUsersPerPage(e){
        if(!e){
            return this.props.setUsersPerPage('default', this.props.users);
        }
        this.props.setUsersPerPage(e.value, this.props.users);
    }



    handleSelectActivePage(currentPage) {
        this.props.setActivePage(currentPage, this.props.users)
    }



    showModal(userId, userName){
        this.setState( () => ({
            showModalWindow: true,
            userId: userId,
            userName: userName
        }));
    }

    hideModal(){
        this.setState( () => ({
            showModalWindow: false
        }));
    }

    deleteUser(){
        this.hideModal();
        let userId = this.state.userId;
        let users = this.props.users.filter(item =>item.id!== userId);
        this.props.deleteUser(userId, users);
    }


    render() {

        let templateModal ;

        if(this.state.showModalWindow){
            templateModal = (
                <div >
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Deleting a user</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            Do you want to delete <span className="userName"> {this.state.userName}</span>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.hideModal.bind(this)}>Cancel</Button>
                            <Button bsStyle="primary" onClick={this.deleteUser.bind(this)}>Delete user</Button>
                        </Modal.Footer>

                    </Modal.Dialog>
                </div>
            );
        }



        var data = this.props.usersToShow;
        var newsTemplate;

        if(data.length > 0){
            newsTemplate = data.map( (item, index) => {
                return (

                    <tr key={item.id} >
                        <td> {item.name} </td>
                        <td> {item.email}  </td>
                        <td> {item.phone} </td>
                        <td> {item.company.name}  </td>
                        <td> <button
                            className='btn btn-danger'
                            onClick={this.showModal.bind(this,item.id, item.name)}
                        > delete </button>  </td>
                    </tr>

                )
            });
        }else{
            newsTemplate = (
                <tr>
                    <td>
                        <p>no users</p>
                    </td>
                </tr>
            )
        }

        return (
        <div className="container">
            <Menu/>
            <div className="news">
                <h1>Users</h1>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Work place</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {newsTemplate}
                    </tbody>

                </table>
                {templateModal}
            </div>
            <div className="users-Select">
                <SelectForUsers
                    usersPerPage={this.props.usersPerPage}
                    setUserPerPage={this.setUsersPerPage}
                />
            </div>
            <div className="Users-Table-Pagination">
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={this.props.pages}
                    maxButtons={5}
                    activePage={this.props.activePage}
                    onSelect={this.handleSelectActivePage}/>
            </div>
        </div>

        )
    }
}



export default connect(
    state => ({
        users: state.users,
        usersToShow: state.UsersTablePagination.usersToShow,
        pages: state.UsersTablePagination.pages,
        activePage: state.UsersTablePagination.activePage,
        usersPerPage: state.UsersTablePagination.usersPerPage
    }),
    dispatch => ({
        onAddTrack: (newTrack)=>{
            dispatch({type:'ADD_USERS', payload: newTrack})
        },
        deleteUser: (userId, users )=>{
            dispatch({type:'DELETE_USER', userId: userId});
            dispatch({type:'CALCULATE_PAGINATION', payload: users})
        },
        setActivePage: (activePage, users)=>{
            dispatch({
                type:'SET_ACTIVE_PAGE',
                payload:{
                    activePage: activePage,
                    users: users
                }
            })
        },
        setUsersPerPage: (usersPerPage, users)=>{
            dispatch({
                type:'SET_USERS_PER_PAGE',
                payload:{
                    usersPerPage: usersPerPage,
                    users: users
                }
            })
        }
    })
)(UsersTable);

