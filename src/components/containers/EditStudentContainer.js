/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from "./Header";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import EditStudentView from "../views/EditStudentView";
import { fetchStudentThunk, editStudentThunk } from "../../store/thunks";

class EditStudentContainer extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      campusId: null,
      gpa: null,
      redirect: false,
      redirectId: null,
    };
  }

  // Get student data from back-end database
  componentDidMount() {
    //getting student ID from url
    this.props.fetchStudent(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.student !== prevProps.student) {
      this.setState((prev) => {
        return {
          ...prev,
          ...this.props.student,
        };
      });
    }
  }

  // Capture input data when it is entered
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Take action after user click the submit button
  handleSubmit = async (event) => {
    event.preventDefault(); // Prevent browser reload/refresh after submit.

    let student = {
      id: this.state.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      ...(this.state.campusId !== ""
        ? { campusId: this.state.campusId }
        : { campusId: null }),
      ...(this.state.gpa !== "" ? { gpa: this.state.gpa } : { gpa: null }),
    };

    // Edit new student in back-end database
    await this.props.editStudent(student);

    // Update state, and trigger redirect to show the new student
    this.setState((prev) => {
      return {
        ...prev,
        redirect: true,
        redirectId: student.id,
      };
    });
  };

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditStudentView
          student={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    student: state.student,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    editStudent: (student) => dispatch(editStudentThunk(student)),
  };
};

export default connect(mapState, mapDispatch)(EditStudentContainer);
