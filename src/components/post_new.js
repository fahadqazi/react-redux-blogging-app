import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
    constructor(props){
        super(props)

        this.inputValidator = this.inputValidator.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    inputValidator = (field) => {
        return `form-group ${field.touched && field.invalid ? 'has-danger' : ''}`;
    }

    onSubmit = (props) => {
        this.props.createPost(props)
            .then(() => {
                this.context.router.push('/')
            })
    }

    render(){
        const { fields: {title, categories, content }, handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit(this.onSubmit)}>

                <h3>Create a New Post</h3>
                <div className={this.inputValidator(title)}>
                    <label>Title</label>
                    <input type="text" className="form-control" {...title}/>
                    <div className="text-help">
                        { title.touched ? title.error : '' }
                    </div>
                </div>

                <div className={this.inputValidator(categories)}>
                    <label>Categories</label>
                    <input type="text" className="form-control" {...categories}/>
                    <div className="text-help">
                        { categories.touched ? categories.error : ''}
                    </div>
                </div>

                <div className={this.inputValidator(content)}>
                    <label>Content</label>
                    <textarea className="form-control" {...content}></textarea> 
                    <div className="text-help">
                        { content.touched ? content.error : '' }
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values){
    const errors = {};

    if (!values.title) {
        errors.title = 'Please Enter a title'
    }

    if (!values.categories) {
        errors.categories = 'Please Enter a category or two!'
    }

    if (!values.content) {
        errors.content = 'We\'re going to need some content here!'
    }

    return errors;
}

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);