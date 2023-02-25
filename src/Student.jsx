import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';


export function Student({ students,deleteButton,editButton }) {
  const [show, setshow] = useState(true);
  return (
    <Card className="student-container">
      <img src={students.profile} alt="image" className="student-profile" />
      <CardContent>
        <h3>{students.name}
          <IconButton color='primary' onClick={() => setshow(!show)}>{show ? <ExpandMoreIcon /> : <ExpandLessIcon />}</IconButton>
        </h3>
        {show ? <p>Medium : {students.medium}</p> : null}
        {show ? <p>Address : {students.address}</p> : null}
      </CardContent>
      <CardActions>
        { editButton }{ deleteButton }
      </CardActions>
    </Card>
  );
}
