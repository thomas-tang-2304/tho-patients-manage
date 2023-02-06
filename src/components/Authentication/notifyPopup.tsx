import React from 'react'
import { Stack, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export default function notifyPopup({ title, state }: any) {
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Stack className="m-2 absolute right-0" spacing={2} sx={{ width: '300px' }}>
      <Snackbar open={open} autoHideDuration={2000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {title}
        </Alert>
      </Snackbar>
      <Alert severity={state}>{title}</Alert>
    </Stack>
  );
}
