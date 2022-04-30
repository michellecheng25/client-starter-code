import "./App.css";

//Router
import { Switch, Route } from "react-router-dom";
//Components
import {
  HomePageContainer,
  CampusContainer,
  StudentContainer,
  AllCampusesContainer,
  NewCampusContainer,
  AllStudentsContainer,
  NewStudentContainer,
  EditCampusContainer,
  EditStudentContainer,
} from "./components/containers";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// if you create separate components for adding/editing
// a student or campus, make sure you add routes to those
// components here

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePageContainer} />
        <Route exact path="/campuses" component={AllCampusesContainer} />
        <Route exact path="/campus/:id" component={CampusContainer} />
        <Route exact path="/campus/:id/edit" component={EditCampusContainer} />
        <Route exact path="/newcampus" component={NewCampusContainer} />
        <Route exact path="/students" component={AllStudentsContainer} />
        <Route exact path="/newstudent" component={NewStudentContainer} />
        <Route exact path="/student/:id" component={StudentContainer} />
        <Route
          exact
          path="/student/:id/edit"
          component={EditStudentContainer}
        />
      </Switch>

      <ToastContainer hideProgressBar={true} />
    </div>
  );
};

export default App;
