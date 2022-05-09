import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState } from 'react';
import ProductImage from '../assets/product-picture.jpg';

const DisplayCards = ({ data, setData, setName, setComments }) => {
  const [clickIndex, setClickIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // for alert
  const [openPop, setOpenPop] = useState(false);

  const handleClickOpenPop = () => {
    setOpenPop(true);
  };

  const cancelClosePop = () => {
    setOpenPop(false);
  };

  const yesClosePop = () => {
    deleteCard();
    setOpenPop(false);
  };

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
        {data.map((user) => {
            return (
                <Card key={user.id} sx={{ maxWidth: 345 }}>
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
                        height="194"
                        image={ProductImage}
                        alt="Product Picture"
                    />
                    <CardContent>
                        <Typography variant='body'>
                            {user.comments}
                        </Typography>
                    </CardContent>
                </Card>
            );
        })}

        <Menu id="options-menu" anchorEl={anchorEl} open={open}
            MenuListProps={{
            'aria-labelledby': 'options-button',
            }}
            onClose={handleClose}
        >
        <MenuItem onClick={editCard}>Edit</MenuItem>
        <MenuItem onClick={handleClickOpenPop}>Delete</MenuItem>
      </Menu>

      <Dialog
        open={openPop}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure want to delete?"}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={cancelClosePop} autoFocus>Cancel</Button>
          <Button onClick={yesClosePop}>Yes</Button>
        </DialogActions>
      </Dialog>
      </>
  );
}

export default DisplayCards;



// onClick={() => {deleteCard(user.id)}}