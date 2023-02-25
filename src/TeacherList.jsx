
import { useState } from "react";
import { useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { Teacher } from './Teacher';

export function TeacherList() {
  const navigate = useNavigate();
  const [teacherList, setteacherList] = useState([])

  const getteacher = () => {
    fetch("https://63f80001cbdb951097599b22.mockapi.io/Teacher", {
        method: "GET",
      })
      .then((data) => data.json())
        .then((data)=>setteacherList(data))
  }
  
  useEffect(() => getteacher(), [])
  
  const deleteteacher = (id) => {
    console.log("deleting the teacher,id");
    fetch(`https://63f80001cbdb951097599b22.mockapi.io/Teacher/${id}`, {
      method: "DELETE"
    }).then(() => getteacher());
  }
  return (
    <div>
      <div className="teacher-list">
        {teacherList.map((td) => (<Teacher key={td.id} teacher={td} id ={td.id} deleteButton={<IconButton sx={{marginLeft:"auto"}} color="error" onClick={()=>deleteteacher(td.id)}><DeleteIcon/></IconButton>} editButton={<IconButton sx={{marginLeft:"auto"}} color="secondary" onClick={()=>navigate(`/teacher/edit/${td.id}`)}><EditIcon/></IconButton>} />))}
      </div>
    </div>
  );
}
