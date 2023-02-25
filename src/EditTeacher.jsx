import { useState } from 'react';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Teacher } from './Teacher'

const formValidationSchema = yup.object({
  name : yup.string().required().min(3),
  image : yup.string().required().min(4).url(),
  department : yup.string().required().min(3),
  address : yup.string().required().min(10),

})

export function EditTeacher() {
  const { id } = useParams();
  const [teacher, setteacher] = useState(null)
  
  useEffect(() => {
    fetch(`https://63f80001cbdb951097599b22.mockapi.io/Teacher/${id}`)
      .then((data) => data.json())
        .then((data)=>setteacher(data))
  }, [id])
  console.log(teacher);
  return (
    teacher ? <EditTeacherForm teacher={teacher} /> :  <div className='loading'><CircularProgress /></div>
  );
}

function EditTeacherForm({ teacher }) {
  const navigate = useNavigate();
    const {handleBlur,handleChange,handleSubmit,values,touched,errors} = useFormik({
    initialValues: {
      name: teacher.name,
      image:teacher.image,
      department: teacher.department,
      address: teacher.address,
    },
    validationSchema : formValidationSchema,
    onSubmit : (updateteacher) => {
      console.log("Form values",values);
      editTeacher(updateteacher);
    }
    });
    const editTeacher = async (updateteacher) => {
    
   await fetch(`https://63f80001cbdb951097599b22.mockapi.io/Teacher/${teacher.id}`, {
      method : "PUT",
      body: JSON.stringify(updateteacher),
      headers: {
        "Content-Type": "application/json",
      },
    })
    navigate("/teacher")

        console.log(updateteacher); 
      }
    return (
     <form onSubmit={handleSubmit} className="add-teacher-form">
       <TextField error={errors.name && touched.name} helperText={errors.name && touched.name ? errors.name : null } value={values.name} name="name" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="Name" variant="outlined" />
       <TextField error={errors.profile && touched.profile} helperText={errors.profile && touched.profile ? errors.profile : null } value={values.profile} name="profile" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="profile" variant="outlined" />
       <TextField error={errors.department && touched.department} helperText={errors.department && touched.department ? errors.department : null } value={values.department} name="department" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="department" variant="outlined" />
       <TextField error={errors.address && touched.address} helperText={errors.address && touched.address ? errors.address : null } value={values.address} name="address" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="address" variant="outlined" />
       <Button variant='outlined' color='success' type='submit'>Save</Button>
     </form>
  );
}