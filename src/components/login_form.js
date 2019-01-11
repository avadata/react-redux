import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { loginUser } from '../actions';

class LoginForm extends Component{
    renderField = (field) =>{
        const { meta:{ error, touched } } = field;
        const inputClass = `form-control ${error && touched ? 'is-invalid':''}`;
        const errorMsgClass = `${error && touched ? 'invalid-feedback':'valid-feedback'}`;
        let inputWrapperClass = `${error && touched ? 'needs-validation':''}`
        inputWrapperClass = field.inputType === 'checkbox' ? `${inputWrapperClass} checkbox`:inputWrapperClass
        console.log(error, touched)
        return (
          <div className={inputWrapperClass}>
            <label>{field.label}</label>
            <input type={field.inputType} className={inputClass} {...field.input} />
            <div className={errorMsgClass}>
              {field.meta.touched ? field.meta.error:''}
            </div>
          </div>
        )
    }
    onSubmit(values) {
        console.log(values)
        this.props.loginUser(values, ()=>{
            this.props.history.push('/dashboard');
        });
    }
    render(){
        const {handleSubmit} = this.props;
        return(
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-pop">
                            <div className="card-body">
                                <div className="text-xs-left">
                                    <h3>Login user</h3>
                                </div>
                                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                <Field
                                    label="User Name"
                                    name="username"
                                    inputType="text"
                                    component={this.renderField}
                                />
                                <Field
                                    label="Password"
                                    inputType="password"
                                    name="password"
                                    component={this.renderField}
                                />
                                <Field
                                    label="Accept Terms & Conditions"
                                    inputType="checkbox"
                                    name="accept"
                                    component={this.renderField}
                                />
                                <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        )
    }
}

function validate(value) {
    const error = {}
    if(!value.username){
      error.username = "Enter a username!"
    }
    if(!value.password){
      error.password = "Enter a password !"
    }
    if(!value.accept){
      error.accept = "Accept terms & conditions !"
    }
    return error;
}

export default reduxForm({
    validate,
    form: 'LoginForm'
})(
    connect(null, { loginUser })(LoginForm)
);