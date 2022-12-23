import { useState, useEffect, useRef } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Container from '@mui/material/Container';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


export default function ListWordsDialog({open, 
                                        setOpen, 
                                        title="Visualizacion", 
                                        rows=[],
                                        columns=[]}) {

  const [scroll] = useState('paper');

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog open={open}
              onClose={handleClose}
              scroll={scroll}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
              fullWidth={true}
              >

        <Container maxWidth="sm" style={{backgroundColor:"rgb(249, 174, 25)"}} >

            <DialogTitle id="scroll-dialog-title">
                {title}
            </DialogTitle>

            <Button variant="contained" 
                    color="error" 
                    aria-label="close"
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                    onClick={handleClose}
                    >
                    Cerrar
            </Button>
        </Container>


        <DialogContent dividers={scroll === 'paper'} sx={{padding:"0.3em 0.2em"}}>

          <DataGridDemo rows={rows} columns={columns}/>

        </DialogContent>


      </Dialog>
    </div>
  );
}


function DataGridDemo({rows, columns}) {
  return (
    <Box sx={{ height: "80vh", width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection={false}
        disableSelectionOnClick={true}
        disableColumnMenu={true}
        disableColumnResize={false}
      />
    </Box>
  );
}