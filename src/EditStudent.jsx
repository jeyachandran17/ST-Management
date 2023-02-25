import { useState } from 'react';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Student } from './Student';

const formValidationSchema = yup.object({
  name : yup.string().required().min(3),
  profile : yup.string().required().min(4).url(),
  medium : yup.string().required().min(3),
  address : yup.string().required().min(10),

})

export function EditStudent() {
  const { id } = useParams();
  const [student, setstudent] = useState(null)
  
  useEffect(() => {
    fetch(`https://63f8e09e6978b1f91063d681.mockapi.io/Student/${id}`)
      .then((data) => data.json())
        .then((data)=>setstudent(data))
  }, [id])
  console.log(student);
  return (
    student ? <EditUserForm student={student} /> :  <div className='loading'><CircularProgress /></div>
  );
}

function EditUserForm({ student }) {
  const navigate = useNavigate();
    const {handleBlur,handleChange,handleSubmit,values,touched,errors} = useFormik({
    initialValues: {
      name: student.name,
      profile:student.profile,
      medium: student.medium,
      address: student.address,
    },
    validationSchema : formValidationSchema,
    onSubmit : (updatestudent) => {
      console.log("Form values",values);
      editStudent(updatestudent);
    }
    });
    const editStudent = async (updatestudent) => {
    
   await fetch(`https://63f8e09e6978b1f91063d681.mockapi.io/Student/${student.id}`, {
      method : "PUT",
      body: JSON.stringify(updatestudent),
      headers: {
        "Content-Type": "application/json",
      },
    })
    navigate("/student")

        console.log(updatestudent); 
      }
    return (
     <form onSubmit={handleSubmit} className="add-student-form">
       <TextField error={errors.name && touched.name} helperText={errors.name && touched.name ? errors.name : null } value={values.name} name="name" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="Name" variant="outlined" />
       <TextField error={errors.profile && touched.profile} helperText={errors.profile && touched.profile ? errors.profile : null } value={values.profile} name="profile" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="profile" variant="outlined" />
       <TextField error={errors.medium && touched.medium} helperText={errors.medium && touched.medium ? errors.medium : null } value={values.medium} name="medium" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="medium" variant="outlined" />
       <TextField error={errors.address && touched.address} helperText={errors.address && touched.address ? errors.address : null } value={values.address} name="address" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="address" variant="outlined" />
       <Button variant='outlined' color='success' type='submit'>Save</Button>
     </form>
  );
}