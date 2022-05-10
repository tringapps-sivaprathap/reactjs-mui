import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Typography, TextField, Button, Stack, Paper } from '@mui/material';
import DisplayCards from './components/DisplayCards';

function App() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [name, setName] = useState('');
  const [comments, setComments] = useState('');
  const [productFlag, setProductFlag] = useState(false);

  const {register, handleSubmit, formState: { errors }} = useForm();

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(data));
    (data.length === 0) && setProductFlag(false);
  }, [data]);
 
  const onSubmit = (formData) => {
    let user = {
      id: index,
      name: formData.productName,
      comments: formData.productPrice
    }
    
    setData([...data, user]);
    setIndex(index + 1);

    setName('');
    setComments('');
    setProductFlag(true);
  }

  return (
    <>
      <Typography variant="h3" component="h3">
        Add Products
      </Typography>

      <Paper sx={{padding: '2rem', width: '30vw'}} elevation={2}>
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Stack direction='column' spacing={2}>
            <TextField error={Boolean(errors?.productName)} helperText={errors?.productName && errors.productName.message} {...register("productName", { required: "Required" })} type="text" label="Product Name" value={name} variant='outlined' color='primary' required autoFocus onChange={(e) => {setName(e.target.value)}}  />
            <TextField error={Boolean(errors?.productPrice)} helperText={errors?.productName ? errors.productName.message : ''} {...register("productPrice", { required: "Required" })} type="text" label="Product Price" value={comments} variant='outlined' color='primary' required onChange={(e) => {setComments(e.target.value)}} />
            <Button type='submit' variant='contained' size='small'>Submit</Button>
          </Stack>
        </form>
      </Paper>
      
      <DisplayCards data={data} setData={setData} setName={setName} setComments={setComments} productFlag={productFlag}/>
    </>
  );
}

export default App;