import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ComfirmFieldModal({
                            title="Comfirma tus cambios",
                            message="Para poder continuar ingresa tu contraseña, y confirmaremos los cambios",
                            messageBold="",
                            messageButton="Aceptar",
                            onActivated=f=>f,
                            activated=false,
                            valueField = "",
                            setValueField=f=>f,
                            onAcepted=f=>f,
                            typefield="password",
                            typefieldtitle="Contraseña"
                        }) {

  const handleClose = () => {
    onActivated(false);
    setValueField(valueField);
  };

  const handleValuePassword =(e)=>{
    setValueField(e.target.value);
  }

  return (
    <div>
      <Dialog open={activated} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
          <DialogContentText sx={{fontWeight: "bold"}}>
            {messageBold && messageBold}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={typefieldtitle}
            type={typefield}
            fullWidth
            variant="standard"
            value={valueField}
            onChange={handleValuePassword}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onAcepted}>{messageButton}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
