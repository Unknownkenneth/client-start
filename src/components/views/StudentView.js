/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */


import { Link } from 'react-router-dom';


const StudentView = (props) => {
  //const classes = useStyles();
  const { student } = props;
  return (
    <div >
   

      <h1>{student.firstname + " " + student.lastname}</h1>
      {student.campus != null ?
      <Link to={`/campus/${student.campus.id}`}>
      <h3>{student.campus.name}</h3>
    </Link>
      
      : 
      <h2> This student is not enrolled in a campus</h2>
      }
      <h3>{student.email}</h3>
      <img src={student.imageUrl} alt = "https://i.picsum.photos/id/690/200/200.jpg?hmac=DN6slU20ktSeMSXbM6U8BG_YHhebxEl3S70qNurkzk8"/>
      {student.gpa != null ?
      <h3> GPA: {student.gpa} </h3> 
      : 
      <br></br>
      }
      <div>
      <Link to={`/editstudent/${student.id}`}>
          <button>Edit Student</button>
        </Link>
      </div>  
    </div>
  );

};

export default StudentView;