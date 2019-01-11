import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component{
  renderField = (field) =>{
    const { meta:{ error, touched } } = field;
    const inputClass = `form-control ${error && touched ? 'is-invalid':''}`;
    const errorMsgClass = `${error && touched ? 'invalid-feedback':'valid-feedback'}`;
    const inputWrapperClass = `${error && touched ? 'needs-validation':''}`
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
    this.props.createPost(values, ()=>{
      this.props.history.push('/');
    });
  }
  render(){
    const {handleSubmit} = this.props;
    return(
      <div>
      <div className="text-xs-left">
        <Link to="/" className="btn-primary btn">
          Back to Poats
        </Link>
      </div>
        <strong>New post</strong>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            inputType="tex"
            component={this.renderField}
           />
           <Field
             label="Categories"
             inputType="tex"
             name="categories"
             component={this.renderField}
            />
            <Field
              label="Comments"
              inputType="textarea"
              name="content"
              component={this.renderField}
             />
             <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}
function validate(value) {
const error = {}
if(!value.title){
  error.title = "Enter a title!"
}
if(!value.categories){
  error.categories = "Enter a tag!"
}
if(!value.content){
  error.content = "Enter a comments!"
}
return error;
}
export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
