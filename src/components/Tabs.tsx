import { Box, Paper } from "@mui/material";
import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Tab from '@mui/material/Tab';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubTab from "./GitHubTab";

function Tabs() {
  const [value, setValue] = useState('1');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{height:'90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position:'relative', zIndex:10, p:4, border:'2px solid white' }}>
      <Paper sx={{ width: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} style={{
        position: "relative",
        zIndex: 10
      }} >
        <TabContext value={value} >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList textColor="inherit" onChange={handleChange} aria-label="lab API tabs example">
              <Tab sx={{ textTransform: 'capitalize' }} icon={<GitHubIcon />} label="GitHub" value="1" />
              <Tab sx={{ textTransform: 'capitalize' }} icon={<LinkedInIcon />} label="LinkedIn" value="2" />
              {/* <Tab label="Item Three" value="3" /> */}
            </TabList>
          </Box>
          <TabPanel value="1">
            <GitHubTab />
          </TabPanel>
          <TabPanel value="2">Under Construction</TabPanel>
          {/* <TabPanel value="3">Item Three</TabPanel> */}
        </TabContext>
      </Paper>
    </Box>
  );
}

export default Tabs;