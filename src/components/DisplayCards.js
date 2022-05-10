import { useState } from 'react';
import {
  Typography, Button, IconButton,
  Container, Grid,
  Card, CardHeader, CardMedia, CardContent,
  Menu, MenuItem,
  Dialog, DialogActions, DialogTitle,
} from '@mui/material';
import MoreVertIcon  from '@mui/icons-material/MoreVert';
import ProductImage from '../assets/product-picture.jpg';

const DisplayCards = ({ data, setData, setName, setComments, productFlag }) => {
  const [clickIndex, setClickIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // for alert
  const [openPop, setOpenPop] = useState(false);

  const handleClickOpenPop = () => {setOpenPop(true)};

  const cancelClosePop = () => {setOpenPop(false)};

  const yesClosePop = () => {deleteCard(); setOpenPop(false);}

  const handleClick = (event, index) => {setAnchorEl(event.currentTarget); setClickIndex(index);};

  const handleClose = () => {setAnchorEl(null)};
  
  const deleteCard = () => {
      setData(data.filter((user) => {
          return user.id !== clickIndex;
      }));
      console.log(data);
      handleClose();
  }

  const editCard = () => {
    data.forEach(user => {
        if(user.id === clickIndex) {
            setName(user.name);
            setComments(user.comments);
        }
    });
    setData(data.filter((user) => {
        return user.id !== clickIndex;
    }));
    console.log(data);
    handleClose();
}

  return (
      <>
      <Container sx={{ padding: '1rem'}}>
      {productFlag && <Typography variant="h4" component="h4" className='product-section-title'>Products List</Typography>}
      <Grid container spacing={3} sx={{ margin: '2rem 0'}}>
        {data.map((user) => {
            return (
              <Grid key={user.id} item md={3}>
                <Card elevation={2}>
                    <CardHeader
                        action={
                            <IconButton id="options-button" onClick={(event) => {handleClick(event, user.id)}}
                                aria-controls={open ? 'options-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                              <MoreVertIcon />
                            </IconButton>
                        }
                        title={user.name}
                    />
                    <CardMedia
                        component="img"
                        height="200vh"
                        image={ProductImage}
                        alt="Product Picture"
                    />
                    <CardContent>
                        <Typography variant='body'>
                            {user.name + ' price is $' + user.comments}
                        </Typography>
                    </CardContent>
                </Card>
                </Grid>
            );
        })}
        </Grid>
      </Container>


      <Menu id="options-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{'aria-labelledby': 'options-button'}}>
        <MenuItem onClick={editCard}>Edit</MenuItem>
        <MenuItem onClick={handleClickOpenPop}>Delete</MenuItem>
      </Menu>

      <Dialog open={openPop} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Are you sure want to delete?"}</DialogTitle>
        <DialogActions>
          <Button onClick={cancelClosePop} autoFocus>Cancel</Button>
          <Button variant='contained' onClick={yesClosePop}>Yes</Button>
        </DialogActions>
      </Dialog>
      </>
  );
}

export default DisplayCards;