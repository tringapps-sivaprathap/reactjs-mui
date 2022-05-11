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

const DisplayCards = ({ data, setData, setProName, setProPrice, listTitleFlag, setUpdateFlag, setUpdateIndex }) => {
  const [clickIndex, setClickIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const open = Boolean(anchorEl);

  // options threedot button click
  const optionsClick = (event, index) => {setAnchorEl(event.currentTarget); setClickIndex(index);};
  
  // edit menu option click
  const editCard = () => {
    setUpdateFlag(true);
    setUpdateIndex(clickIndex);

    data.forEach(product => {
        if(product.proId === clickIndex) {
            setProName(product.proName);
            setProPrice(product.proPrice);
        }
    });

    handleClose();
  }

  // to close the menu
  const handleClose = () => {setAnchorEl(null)};

  // delete menu option click
  const deleteClick = () => {setOpenPopUp(true)};
  
  // yes option clicked in popup
  const yesPopUpClick = () => {deleteCard(); setOpenPopUp(false);}

  // delete the card
  const deleteCard = () => {
    setData(data.filter((product) => {
        return product.proId !== clickIndex;
    }));
    
    handleClose();
  }

  // cancel option clicked in popup
  const cancelPopUpClick = () => {setOpenPopUp(false)};

  return (
    <>
      <Container sx={{ padding: '1rem'}}>
        {listTitleFlag && <Typography variant="h4" component="h4" className='product-section-title'>Products List</Typography>}
        
        <Grid container spacing={3} sx={{ margin: '2rem 0'}}>
          {data.map((product) => {
            return (
              <Grid key={product.proId} item md={3}>
                <Card elevation={2}>
                    <CardHeader
                      action={
                          <IconButton id="options-button" onClick={(event) => {optionsClick(event, product.proId)}}
                            aria-controls={open ? 'options-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                          >
                            <MoreVertIcon />
                          </IconButton>
                      }
                      title={product.proName}
                    />

                    <CardMedia
                      component="img"
                      height="200vh"
                      image={ProductImage}
                      alt="Product Picture"
                    />

                    <CardContent>
                      <Typography variant='body'>{product.proName + ' price is $' + product.proPrice}</Typography>
                    </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <Menu id="options-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{'aria-labelledby': 'options-button'}}>
        <MenuItem onClick={editCard}>Edit</MenuItem>
        <MenuItem onClick={deleteClick}>Delete</MenuItem>
      </Menu>

      <Dialog open={openPopUp} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Are you sure want to delete?"}</DialogTitle>

        <DialogActions>
          <Button onClick={cancelPopUpClick} autoFocus>Cancel</Button>
          <Button onClick={yesPopUpClick} variant='contained'>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DisplayCards;