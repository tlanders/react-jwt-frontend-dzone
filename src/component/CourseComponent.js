import React, {Component} from 'react';
import CourseDataService from "../service/CourseDataService";
import {Formik, Form, Field, ErrorMessage} from "formik";

const INSTRUCTOR = 'in28minutes';

class CourseComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            description: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        const id = this.state.id;
        console.log('course component: ' + id);

        if(id == -1) {
            return;
        }

        CourseDataService.retrieveCourse('in28minutes', id)
            .then(response => {
                console.log('description for id=' + id + ', val=' + response.data.description);
                this.setState({description: response.data.description});
            });
    }

    onSubmit(values) {
        let course = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        };

        if(this.state.id == -1) {
            CourseDataService.createCourse(INSTRUCTOR, course)
                .then(() => this.props.history.push('/courses'));
        } else {
            CourseDataService.updateCourse(INSTRUCTOR, this.state.id, course)
                .then(() => this.props.history.push('/courses'));
        }
        console.log(values);
    }

    validate(values) {
        let errors = {}
        if(!values.description) {
            errors.description = 'Enter a Description';
        } else if(values.description.length < 5) {
            errors.description = 'Enter a Description that is at least 5 characters long';
        }

        return errors;
    }

    render() {
        let {id, description} = this.state;
        console.log('render - id=' + id + ', desc=' + description);

        return (
            <div>
                <h3>Course</h3>
                <div className="container">
                    <Formik
                        initialValues={{ id, description }}
                        onSubmit={this.onSubmit}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name={'description'} component='div' className={'alert alert-warning'}/>
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="text" name="id" disabled />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        );
    }
}

export default CourseComponent;