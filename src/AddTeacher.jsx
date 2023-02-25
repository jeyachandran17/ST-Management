import { useState } from 'react';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";

const formValidationSchema = yup.object({
  name : yup.string().required().min(3),
  image : yup.string().required().min(4).url(),
  department : yup.string().required().min(3),
  address : yup.string().required().min(10),

})


export function AddTeacher() {
  const navigate = useNavigate();
    const {handleBlur,handleChange,handleSubmit,values,touched,errors} = useFormik({
    initialValues: {
      name: " ",
      image: " ",
      department: " ",
      address: " ",
    },
    validationSchema : formValidationSchema,
    onSubmit : (newteacher) => {
      console.log("Form values",values);
      addTeacher(newteacher);
    }
  }); 
  
  const addTeacher = async(newteacher) => {

    
    await fetch("https://63f80001cbdb951097599b22.mockapi.io/Teacher", {
      method: "POSt",
      body: JSON.stringify(newteacher),
      headers: {
        "Content-Type": "application/json"
      }
    })
    navigate("/teacher")
        console.log(newteacher);
      }

  return (
    <form onSubmit={handleSubmit} className="add-teacher-form">
      <TextField error={errors.name && touched.name} helperText={errors.name && touched.name ? errors.name : null } value={values.name} name="name" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="Name" variant="outlined" />
      <TextField error={errors.image && touched.image} helperText={errors.image && touched.image ? errors.image : null } value={values.image} name="image" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="image" variant="outlined" />
      <TextField error={errors.department && touched.department} helperText={errors.department && touched.department ? errors.department : null } value={values.department} name="department" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="department" variant="outlined" />
      <TextField error={errors.address && touched.address} helperText={errors.address && touched.address ? errors.address : null } value={values.address} name="address" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="address" variant="outlined" />
      <Button variant='outlined' type='submit'>Add Teacher</Button>
    </form>
  );
}
