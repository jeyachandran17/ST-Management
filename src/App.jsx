import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Home } from './Home'
import { PageNotFound } from './PageNotFound'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {useNavigate} from "react-router-dom"
import { Routes, Route, Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import { StudentList } from './StudentList'
import { AddStudent } from './AddStudent'
import { EditStudent } from './EditStudent'
import { TeacherList } from './TeacherList'
import { AddTeacher } from './AddTeacher'
import { EditTeacher } from './EditTeacher'


function App() {
  const navigate = useNavigate();
  const bgstyle = {
    borderRadius: "0px",
    minHeight:"100vh",
  }
  const [show, setshow] = useState(true)
  const darkTheme = createTheme({
    palette: {
      mode: show ? 'dark' : 'light',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Paper elevation={4} sx={bgstyle} >
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" onClick={()=>navigate("/")} >Home</Button>
              <Button color="inherit" onClick={() => navigate("/student")} >student</Button>
              <Button color="inherit" onClick={()=>navigate("/teacher")} >teacher</Button>
              <Button color="inherit" onClick={() => navigate("/student/add")} >Add student</Button>
              <Button color="inherit" onClick={() => navigate("/teacher/add")} >Add teacher</Button>
              <Button sx={{marginLeft:"auto"}} color="inherit" onClick={() => setshow(!show)} >{show ? <BrightnessHighIcon/> : <Brightness4Icon/> }{ show ? 'Light Mode' : 'Drak Mode'}</Button>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student" element={<StudentList />} />
            <Route path="/student/add" element={<AddStudent />} />
            <Route path="/student/edit/:id" element={<EditStudent />} />
            <Route path="/teacher" element={<TeacherList />} />
            <Route path="/teacher/add" element={<AddTeacher />} />
            <Route path="/teacher/edit/:id" element={<EditTeacher />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Paper>
    </ThemeProvider>
  )
}

export default App


