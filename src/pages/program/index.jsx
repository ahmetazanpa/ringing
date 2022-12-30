import React from 'react'
import { Box, Grid, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import DataTable from '../../components/table';
import ProgramAdd from '../../components/programadd';

const Program = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ maxWidth: 1, typography: 'body1' }}>
            <TabContext value={value}>
                <Box>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Program Ekle" value="1" />
                        <Tab label="Oluşturulmuş Programlar" value="2" />
                    </TabList>
                    <TabPanel value="1">
                        <Grid item>
                            <ProgramAdd />
                        </Grid>
                    </TabPanel>
                    <TabPanel value="2">
                        <Grid item>
                            <DataTable />
                        </Grid>
                    </TabPanel>
                </Box>
            </TabContext>
        </Box>
    )
}

export default Program
