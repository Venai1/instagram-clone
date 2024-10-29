import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import "./model.css"
import "./App.css";
import { signOut } from 'firebase/auth';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// model.js
export default function BasicModal({ 
    username, 
    email, 
    password, 
    setUsername, 
    setEmail, 
    setPassword,
    signUp,
    user,
    auth
  }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <div>
        {user ? (
            <Button onClick={() => signOut(auth).then(() => setOpen(false)).catch((error) => console.error("Error signing out:", error))}>
            Log Out
            </Button>
        ): (
            <Button onClick={handleOpen}>Sign Up</Button>
        )}
        
        <Modal
          open={open}
          onClose={handleClose}
        >
        <Box sx={style}>

            <form className = "modal__signup">
                
                <img 
                    className="modal__Image"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt=""
                />
    
                <Input
                    placeholder='username'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
    
                <Input
                    placeholder='email'
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
    
                <Input
                    placeholder='password'
                    type="password"  // Changed to password type for security
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
    
                <Button onClick={signUp}>Sign Up</Button>
                
            </form>

        </Box>
        </Modal>
      </div>
    );
  }