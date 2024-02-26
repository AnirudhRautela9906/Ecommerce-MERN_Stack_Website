import * as React from 'react';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Success Alert
export  function SuccessAlert ({open,title,setOpen}) {
//   const [open, setOpen] = React.useState(false);

//   const handleClick = () => {
//     setOpen(true);
//   };

  const handleClose = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return;
    // }
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '80%' }}>
      
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} spacing={2} sx={{ width: '50%' }} anchorOrigin={{vertical:"bottom",horizontal:"center"}}>
        <Alert  onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {`${title}`}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
  );
}

// Error Alert
export  function ErrorAlert ({open,title,setOpen}) {
  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <Stack>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} spacing={2} sx={{ width: '50%' }} anchorOrigin={{vertical:"bottom",horizontal:"center"}}>
        <Alert  onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {`${title}`}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

// Info Alert
export  function InfoAlert ({open,title,setOpen}) {
  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <Stack>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} spacing={2} sx={{ width: '50%' }} anchorOrigin={{vertical:"bottom",horizontal:"center"}}>
        <Alert  onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          {`${title}`}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
