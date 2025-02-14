import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Logo>
              <Typography variant="h6">🎟️ ticz</Typography>
            </Logo>

            <NavLinks>
              <NavItem>Events</NavItem>
              <NavItem>My Tickets</NavItem>
              <NavItem>About Project</NavItem>
            </NavLinks>
          </Box>

          <StyledButton variant="contained" sx={{ display: { xs: 'none', sm: 'block' } }}>
            MY TICKETS →
          </StyledButton>

          <IconButton 
            edge="end" 
            color="inherit" 
            onClick={() => setDrawerOpen(true)} 
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            <Menu size={24} color="white" />
          </IconButton>
        </Toolbar>
      </StyledAppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 250 }}>
          {['Events', 'My Tickets', 'About Project'].map((text) => (
            <ListItem button key={text} onClick={() => setDrawerOpen(false)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <ListItem button onClick={() => setDrawerOpen(false)}>
            <StyledButton variant="contained" fullWidth>
              MY TICKETS →
            </StyledButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'rgba(19, 78, 74, 0.5)',
  borderRadius: '12px',
  padding: '4px 20px',
  boxShadow: 'none',
  border: '1px solid #1E2A32',
});

const Logo = styled(Box)({
  fontSize: '22px',
  fontWeight: 'bold',
  color: '#A1B5C1',
  display: 'flex',
  alignItems: 'center',
  marginRight: '30px',
});

const NavLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '20px',
  [theme.breakpoints.down('sm')]: {
    display: 'none', 
  },
}));

const NavItem = styled(Typography)({
  fontSize: '14px',
  color: '#A1B5C1',
  cursor: 'pointer',
  '&:hover': {
    color: '#ffffff',
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#ffffff',
  color: '#0F171D',
  fontWeight: 'bold',
  borderRadius: '20px',
  padding: '6px 18px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
});

export default Navbar;
