import React from 'react';
import { Box } from '@mui/material';
import NavbarMenu from './navbar';

function AppLayout() {
    return (
        <Box component="main" sx={{ display: 'flex', flexDirection: 'column',  }}>
            <NavbarMenu />
        </Box>
    )
}

export default AppLayout