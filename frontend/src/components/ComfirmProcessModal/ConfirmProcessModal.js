import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ComfirmProcessModal({
                            title="Confirma tus cambios",
                            message="",
                            messageBold="",
                            messageButton="Aceptar",
                            onActivated=f=>f,
                            activated=false,
                            onAcepted=f=>f,
                        }) {

  const handleClose = () => {
    onActivated(false);
  };


  return (
    <div>
      <Dialog open={activated} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message && message}
          </DialogContentText>
          <DialogContentText sx={{fontWeight: "bold"}}>
            {messageBold && messageBold}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{display:"flex", justifyContent:"space-around"}}>
          <Button onClick={onAcepted} variant="contained" color="success" >{messageButton}</Button>
          <Button onClick={handleClose} variant="contained" color="error" >Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
