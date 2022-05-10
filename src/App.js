import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Typography, TextField, Button, Stack, Paper } from '@mui/material';
import DisplayCards from './components/DisplayCards';

function App() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [proName, setProName] = useState('');
  const [proPrice, setProPrice] = useState('');
  const [productFlag, setProductFlag] = useState(false);

  const {register, handleSubmit, formState: { errors }} = useForm();

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(data));
    (data.length === 0) && setProductFlag(false);
  }, [data]);
 
  const onSubmit = (formData) => {
    let user = {
      id: index,
      proName: formData.productName,
      proPrice: formData.productPrice
    }
    
    setData([...data, user]);
    setIndex(index + 1);

    setProName('');
    setProPrice('');
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
            <TextField
              type='text' label="Product Name" variant='outlined' required autoFocus

              error={Boolean(errors?.productName)}
              helperText={errors?.productName && errors.productName.message}

              {...register("productName", { required: "Required" })}
              value={proName}

              onChange={(e) => {setProName(e.target.value)}}
            />

            <TextField 
              type='number' label="Product Price" variant='outlined' required

              error={Boolean(errors?.productPrice)} 
              helperText={errors?.productName ? errors.productName.message : ''} 

              {...register("productPrice", { required: "Product price required!" })} 
              value={proPrice}

              onChange={(e) => {setProPrice(e.target.value)}}
            />

            <Button type='submit' variant='contained' size='small'>Submit</Button>
          </Stack>
        </form>
      </Paper>
      
      <DisplayCards data={data} setData={setData} setProName={setProName} setProPrice={setProPrice} productFlag={productFlag}/>
    </>
  );
}

export default App;