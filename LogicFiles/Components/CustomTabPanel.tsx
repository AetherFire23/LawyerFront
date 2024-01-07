import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Router, { useRouter } from 'next/router';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  navRef: string
}

function CustomTabPanel(props: TabPanelProps) {
  const { navRef, children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Link href={navRef}>
          <Button>
            Test
          </Button>
        </Link>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const router = useRouter()
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function handleNavigation(path: string) {
    router.push(path)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Link href='infopage'>
            <Tab label="Item One" {...a11yProps(0)} onClick={} />
          </Link>

          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />

        </Tabs>
      </Box>
    </Box>
  );
}

function InfoPage() {
  return (
    <div>
      <label> test </label>
    </div>
  )
}