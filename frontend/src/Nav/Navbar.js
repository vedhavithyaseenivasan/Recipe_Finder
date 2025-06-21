import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './components/Navbar.css';  // Make sure the CSS file is imported

const NavBar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Navbar
      expand="lg"
      className="sticky-top"
      style={{
        backgroundColor: '#121212', // Dark theme background
        color: '#ffffff',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', // Soft shadow
        transition: 'all 0.3s ease',
        margin: 0, // Remove any outer margin
        padding: 0, // Remove any outer padding
      }}
    >
      <Container fluid>
      <Navbar.Brand
          href="/"
          style={{
            color: '#ff7b54', // Brand color
            fontWeight: 'bold',
            fontSize: '1.5em',
            transition: 'color 0.3s ease',
            display: 'inline-block',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#ffab76')}
          onMouseLeave={(e) => (e.target.style.color = '#ff7b54')}
        >
          Recipe Finder
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          style={{
            borderColor: 'transparent', // Remove any border on the icon button
            color:'white' , // Set icon color to white
          }} 
        />
        <Navbar.Collapse 
        id="basic-navbar-nav"
        style={{
            color:'white' , // Set icon color to white
          }}
        >
          <Nav className="ml-auto">
            <Nav.Link
              href="/"
              style={{
                color: '#ffffff',
                fontSize: '1.1em',
                padding: '8px 15px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#ffab76')}
              onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/search"
              style={{
                color: '#ffffff',
                fontSize: '1.1em',
                padding: '8px 15px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#ffab76')}
              onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
            >
              Search
            </Nav.Link>
            <Nav.Link
                href="/chatbot"
                style={{
                  color: '#ffffff',
                  fontSize: '1.1em',
                  padding: '8px 15px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#ffab76')}
                onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
              >
                RecipeChatbot
              </Nav.Link> 
            <Nav.Link
              href="/admin"
              style={{
                color: '#ffffff',
                fontSize: '1.1em',
                padding: '8px 15px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#ffab76')}
              onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
            >
              Admin
            </Nav.Link>
             
            {user ? (
              <NavDropdown
                title={
                  <span style={{ color: '#ff7b54' }}>
                    {user.username} 
                    <span style={{ color: '#ffab76' }}> ▼</span> {/* Triangle icon */}
                  </span>
                }
                id="user-dropdown"
                style={{
                  color: '#ffffff',
                  transition: 'all 0.3s ease',
                }}
              >
               {/* <NavDropdown.Item
                  href="/chatbot"
                  style={{
                    backgroundColor: '#121212',
                    color: '#ff7b54',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#ffab76')}
                  onMouseLeave={(e) => (e.target.style.color = '#ff7b54')}
                >
                  RecipeChatbot
                </NavDropdown.Item> */}

                
                <NavDropdown.Item
                  onClick={handleLogout}
                  style={{
                    backgroundColor: '#121212',
                    color: '#ff4e50',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#ff7675')}
                  onMouseLeave={(e) => (e.target.style.color = '#ff4e50')}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link
                href="/login"
                style={{
                  color: '#ffffff',
                  fontSize: '1.1em',
                  padding: '8px 15px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#ffab76')}
                onMouseLeave={(e) => (e.target.style.color = '#ffffff')}
              >
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
