import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

export function Teacher({ teacher, deleteButton, editButton }) {
  const [show, setshow] = useState(true);
  return (
    <Card className="teacher-container">
      <img src={teacher.image} alt="image" className="teacher-profile" />
      <CardContent>
        <h3>{teacher.name}
          <IconButton color='primary' onClick={() => setshow(!show)}>{show ? <ExpandMoreIcon /> : <ExpandLessIcon />}</IconButton>
        </h3>
        {show ? <p>Department : {teacher.department}</p> : null}
        {show ? <p>Address : {teacher.address}</p> : null}
      </CardContent>
      <CardActions>
        { editButton }{ deleteButton }
      </CardActions>
    </Card>
  );
}
