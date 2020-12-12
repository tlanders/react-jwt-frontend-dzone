import React, {Component} from 'react';
import CourseDataService from "../service/CourseDataService";

class CourseComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            description: ''
        };
    }

    componentDidMount() {
        const id = this.state.id;
        console.log('course component: ' + id);

        if(id == -1) {
            return;
        }

        CourseDataService.retrieveCourse('in28minutes', id)
            .then(response => this.setState({description: response.data.description}));
    }

    render() {
        const {description, id} = this.state;

        return (
            <div>
                <h3>Course Details</h3>
                <div>{id}</div>
                <div>{description}</div>
            </div>
        );
    }
}

export default CourseComponent;