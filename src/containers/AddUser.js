import React, { Component } from 'react';
import Menu from '../components/Menu';
import '../App.css';
import  {connect} from 'react-redux';


class AddUser extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: {
                value: '',
                validation: null,
                warningMessage: '',
                hideMessage: true
            },
            email: {
                value: '',
                validation: null,
                warningMessage: '',
                hideMessage: true

            },
            phone: {
                value: '',
                validation: null,
                warningMessage: '',
                hideMessage: true

            },
            workPlace: {
                value: '',
                validation: null,
                warningMessage: '',
                hideMessage: true
            }
        };


        this.handleSubmit        = this.handleSubmit.bind(this);
        this.nameValidation      = this.nameValidation.bind(this);
        this.emailValidation     = this.emailValidation.bind(this);
        this.phoneValidation     = this.phoneValidation.bind(this);
        this.workPlaceValidation = this.workPlaceValidation.bind(this);

    }


    errors = {
        common: {
            fillInput: 'The field must be filled!'
        },
        name: {
            latinLettersOrNumbers: 'Name must be latin letters or numbers',
            restrictionOfLetters: 'Name must contain more than 4 and less than 15 characters',
            loginNotUnique: 'This name is already taken. Try another.',
            notOnlyNumbers: 'The name can not consist only of numbers.'
        },
        email: {
            invalidEmail: 'Invalid email address'
        },
        phone: {
            latinLettersOrNumbers: 'Phone number must consist only of digits',
            restrictionOfLetters: 'Phone must contain more than 4 and less than 25 characters'
        },
        workPlace: {
            latinLettersOrNumbers: 'Work place must be latin letters or numbers'
        }
    };


    stateInit(itIsOwnObj) {
        for (var key in itIsOwnObj) {
            if (itIsOwnObj.hasOwnProperty(key)) {
                this.setState({
                    [key]: {
                        value: '',
                        validation: false,
                        warningMessage: '',
                        hideMessage: true
                    }
                });
            }

        }
    }



    handleSubmit(event){
        event.preventDefault();

        let newUserObject = [{
            name: this.state.name.value,
            email: this.state.email.value,
            phone: this.state.phone.value,
            company: {
                name: this.state.workPlace.value
            },
            id:''+ (new Date()).getTime()
        }];

        let users = [...this.props.users,...newUserObject];

        this.props.addUser(newUserObject, users);
        this.stateInit(this.state);

    }

    setFieldValue(fieldTitle, event) {
        event.preventDefault();

        this.setState({[fieldTitle]: {
            value: event.target.value,
            validation: this.state[fieldTitle].validation,
            warningMessage: this.state[fieldTitle].warningMessage,
            hideMessage: this.state[fieldTitle].hideMessage

        }});
    }



    setWarningMessage(fieldTitle, newWarningMessage, isValid, hideMessage){
        this.setState({ [fieldTitle]: {
            value: this.state[fieldTitle].value,
            validation: isValid,
            warningMessage: newWarningMessage,
            hideMessage: hideMessage
        }})
    }


    nameValidation(event) {
        this.setWarningMessage('name', null, false,true);
        let nameValue = event.target.value;

        if (this.isFieldEmpty(nameValue)) {
            let warningMessage = this.errors.common.fillInput;
            this.setWarningMessage('name', warningMessage, false,false);
            return
        }

        if (!this.isWordInRange(nameValue)) {
            let warningMessage = this.errors.name.restrictionOfLetters;
            this.setWarningMessage('name', warningMessage, false,false);
            return
        }

        if (!this.isUserNameUnique(nameValue)) {
            let warningMessage = this.errors.name.loginNotUnique;
            this.setWarningMessage('name', warningMessage, false,false);
            return
        }

        if (!this.isStringContainWordAndNumbers(nameValue)) {
            let warningMessage = this.errors.name.latinLettersOrNumbers;
            this.setWarningMessage('name', warningMessage,false,false);
            return
        }

        if (!this.isStringContainNotOnlyNumbers(nameValue)) {
            let warningMessage = this.errors.name.notOnlyNumbers;
            this.setWarningMessage('name', warningMessage, false, false);
            return
        }

        this.setWarningMessage('name', null, true, true);

    }




    emailValidation(event) {
        this.setWarningMessage('email', null,false, true);
        let nameValue = event.target.value;

        if (this.isFieldEmpty(nameValue)) {
            let warningMessage = this.errors.common.fillInput;
            this.setWarningMessage('email', warningMessage,false,false);
            return
        }

        if (!this.isEmailValid(nameValue)) {
            let warningMessage = this.errors.email.invalidEmail;
            this.setWarningMessage('email', warningMessage,false,false);
            return
        }
        this.setWarningMessage('email',null,true,true);

    }


    phoneValidation(event) {
        this.setWarningMessage('phone', null, false, true);

        let nameValue = event.target.value;

        if (this.isFieldEmpty(nameValue)) {
            let warningMessage = this.errors.common.fillInput;
            this.setWarningMessage('phone', warningMessage, false, false);
            return
        }

        if (!this.isNumbers(nameValue)) {
            let warningMessage = this.errors.phone.latinLettersOrNumbers;
            this.setWarningMessage('phone', warningMessage, false, false);
            return
        }

        if (!this.isWordInRange(nameValue)) {
            let warningMessage = this.errors.phone.restrictionOfLetters;
            this.setWarningMessage('phone', warningMessage, false, false);
            return
        }

        this.setWarningMessage('phone', null, true, true);

    }


    workPlaceValidation(event) {
        this.setWarningMessage('workPlace', null, false, true);
        let nameValue = event.target.value;

        if (this.isFieldEmpty(nameValue)) {
            let warningMessage = this.errors.common.fillInput;
            this.setWarningMessage('workPlace', warningMessage, false, false);
            return
        }

        if (!this.isStringContainWordAndNumbers(nameValue)) {
            let warningMessage = this.errors.workPlace.latinLettersOrNumbers;
            this.setWarningMessage('workPlace', warningMessage, false, false);
            return
        }

        this.setWarningMessage('workPlace', null, true, true);
    }



    isFieldEmpty(anyFieldValue) {
        return anyFieldValue === ""
    }

    isWordInRange(word) {
        return word.length < 25 && word.length > 4
    }

    isUserNameUnique(newUseName) {
        let allUsers = this.props.users;
        for (var i = 0; i < allUsers.length; i++) {
            if (allUsers[i].name === newUseName) {
                return false
            }
        }
        return true
    }

    isStringContainWordAndNumbers(value) {
        return /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(value);
    }

    isStringContainNotOnlyNumbers(value) {
        return /(?!^\d+$)^.+$/.test(value);
    }

    isEmailValid(email) {
        return /[^@]+@[^@]+\.[^@]+/.test(email);
    }

    isNumbers(numbers) {
        return /^\d+$/.test(numbers);
    }




    render() {

        return (
            <div className="container">
                <Menu/>
                <div className="news" onSubmit={this.handleSubmit}>
                    <h3>Adding user</h3>
                    <form action="" >
                        <div className="form-group">
                            <label>name</label>
                            <p className="alert alert-warning" hidden={this.state.name.hideMessage}>
                                <strong>Warning! </strong>
                                {this.state.name.warningMessage}
                            </p>
                            <input
                                className="form-control"
                                type="text"
                                id="name"
                                placeholder="Name"
                                value={this.state.name.value}
                                onBlur={this.nameValidation}
                                onChange={this.setFieldValue.bind(this, 'name')}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email address</label>
                            <p className="alert alert-warning" hidden={this.state.email.hideMessage}>
                                <strong>Warning! </strong>
                                {this.state.email.warningMessage}
                            </p>
                            <input className="form-control"
                                   type="text"
                                   id="email"
                                   placeholder="Email"
                                   value={this.state.email.value}
                                   onBlur={this.emailValidation}
                                   onChange={this.setFieldValue.bind(this, 'email')}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone number</label>
                            <p className="alert alert-warning" hidden={this.state.phone.hideMessage}>
                                <strong>Warning! </strong>
                                {this.state.phone.warningMessage}
                            </p>
                            <input
                                className="form-control"
                                type="text"
                                id="phone"
                                placeholder="Phone"
                                value={this.state.phone.value}
                                onBlur={this.phoneValidation}
                                onChange={this.setFieldValue.bind(this, 'phone')}
                            />
                        </div>
                        <div className="form-group">
                            <label>Place of work</label>
                            <p className="alert alert-warning"
                               hidden={this.state.workPlace.hideMessage}
                            > <strong>Warning! </strong>
                                {this.state.workPlace.warningMessage}</p>
                            <input
                                className="form-control"
                                type="text"
                                id="work"
                                placeholder="Work place"
                                value={this.state.workPlace.value}
                                onBlur={this.workPlaceValidation}
                                onChange={this.setFieldValue.bind(this, 'workPlace')}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                type="submit"
                                id="AddUser"
                                className="btn btn-info"
                                disabled= {!(this.state.name.validation
                                && this.state.email.validation
                                && this.state.workPlace.validation
                                && this.state.phone.validation)}
                            >Add user</button>
                        </div>

                    </form>

                </div>
            </div>

        )
    }
}


export default connect(
    state => ({
        users: state.users,

    }),
    dispatch => ({
        addUser: (user, users)=>{
            dispatch({type:'ADD_USERS', payload: user});
            dispatch({type:'INIT_PAGINATION', payload: users})
        }
    })
)(AddUser);

