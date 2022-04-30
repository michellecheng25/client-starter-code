/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link, useHistory } from "react-router-dom";

const StudentView = (props) => {
  const { student } = props;
  const history = useHistory();

  if (!student) return <h1>No student found</h1>;

  // Render a single Student view
  return (
    <div style={{ marginTop: "20px" }}>
      <img src={student.imageUrl} alt="student-img" height="200px" />
      <h1>{student.firstname + " " + student.lastname}</h1>
      <button
        onClick={() => {
          history.push(`/student/${student.id}/edit`);
        }}
      >
        Edit Student Info
      </button>
      <h3>{student.email}</h3>

      {student.campus ? (
        <Link to={`/campus/${student.campus.id}`}>{student.campus.name}</Link>
      ) : (
        <p>No Campus Listed</p>
      )}
      {student.gpa && <h3>GPA: {student.gpa}</h3>}
    </div>
  );
};

export default StudentView;
