/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/prefer-as-const */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Stack, Button } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};


export default function NestedModal({ component, action_name, width }: any) {
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

            <Button onClick={handleOpen}>{action_name}</Button>
            <Modal
                open={open}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: {width ?? 700} }}>
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