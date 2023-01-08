import React, { useState } from 'react'
import { Box, Grid, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import PasswordChange from '../../components/passwordchange';
import UserInformationChange from '../../components/userinformationchange';

const Settings = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ maxWidth: 1, typography: 'body1' }}>
            <TabContext value={value}>
                <Box>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="ŞİFRE DEĞİŞTİR" value="1" />
                        <Tab label="BİLGİLERİ GÜNCELLE" value="2" />
                    </TabList>
                    <TabPanel value="1">
                        <Grid item>
                          <PasswordChange />
                        </Grid>
                    </TabPanel>
                    <TabPanel value="2">
                        <Grid item>
                          <UserInformationChange />
                        </Grid>
                    </TabPanel>
                </Box>
            </TabContext>
        </Box>
    )
}

export default Settings
