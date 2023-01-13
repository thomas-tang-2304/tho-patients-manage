import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: 0,
    pt: 2,
    px: 4,
    pb: 3,
};


export default function NestedModal({ component }: any) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const addData: any = {
        "AddCategory":"Category",
        "AddAdmin" : "Admin",
        "AddCustomer" : "Customer",
    }
    return (
        <div>
            <Button className={`text-white`} onClick={handleOpen}>+ Add</Button>
            <Modal
                open={open}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 700 }}>
                    {component}
                    <Stack spacing={2} direction="row" className={`w-50 mt-10 flex flex-col justify-end content-end`}>
                        <Button onClick={handleClose} variant="outlined">Cancel</Button>
                        <Button variant="contained">Save</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}