import { KeyboardArrowRight } from '@mui/icons-material';
import { Container, Box ,TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import DisplayCards from './components/DisplayCards';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [name, setName] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(data));
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();

    let user = {
      id: index,
      name: name,
      comments: comments
    }
    
    setData([...data, user]);
    setIndex(index + 1);

    setName('');
    setComments('');
  }

  return (
    <Container>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <Box
            sx={{
              height: 300,
              width: 300,
              padding: 2,
              border: 2
            }}
          >
            <TextField label="Full name" value={name} variant='outlined' color='primary' required onChange={(e) => {setName(e.target.value)}} />
            <TextField label="Comments" value={comments} variant='outlined' color='primary' required onChange={(e) => {setComments(e.target.value)}} />
            <Button type='submit' variant='contained' endIcon={<KeyboardArrowRight />}>Submit</Button>
          </Box>
        </form>
        <DisplayCards data={data} setData={setData} />
    </Container>
  );
}

export default App;
