import { Student } from "./Student";
import { useState } from "react";
import { useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

export function StudentList() {
  const navigate = useNavigate();
  const [studentList, setstudentList] = useState([])

  const getStudent = () => {
    fetch("https://63f8e09e6978b1f91063d681.mockapi.io/Student", {
        method: "GET",
      })
      .then((data) => data.json())
        .then((data)=>setstudentList(data))
  }
  
  useEffect(() => getStudent(), [])
  
  const deleteStudent = (id) => {
    console.log("deleting the student,id");
    fetch(`https://63f8e09e6978b1f91063d681.mockapi.io/Student/${id}`, {
      method: "DELETE"
    }).then(() => getStudent());
  }

  return (
    <div>
      <div className="student-list">
        {studentList.map((sd) => (<Student key={sd.id} students={sd} id ={sd.id} deleteButton={<IconButton sx={{marginLeft:"auto"}} color="error" onClick={()=>deleteStudent(sd.id)}><DeleteIcon/></IconButton>} editButton={<IconButton sx={{marginLeft:"auto"}} color="secondary" onClick={()=>navigate(`/student/edit/${sd.id}`)}><EditIcon/></IconButton>} />))}
      </div>
    </div>
  );
}
