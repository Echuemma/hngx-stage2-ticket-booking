import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const Navbar = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        {/* Logo Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Logo>
            <Typography variant="h6">🎟️ ticz</Typography>
          </Logo>

          {/* Navigation Links */}
          <NavLinks>
            <NavItem>Events</NavItem>
            <NavItem>My Tickets</NavItem>
            <NavItem>About Project</NavItem>
          </NavLinks>
        </Box>

        {/* My Tickets Button */}
        <StyledButton variant="contained">MY TICKETS →</StyledButton>
      </Toolbar>
    </StyledAppBar>
  );
};

/* Styled Components */
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

const NavLinks = styled(Box)({
  display: 'flex',
  gap: '20px',
});

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
