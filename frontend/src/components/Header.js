import React, { useState } from 'react'
import {AppBar, Box, Button, Tab, Tabs, Toolbar, Typography} from '@mui/material'
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';

const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state=> state.isLoggedIn);

    const [value,setValue] =useState(0);
    return (
    <AppBar
    position="sticky"
        sx={{
         background:
         "linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)",
         }}
         >
        <Toolbar>
            <Typography variant="h4">BlogsApp</Typography>
            { isLoggedIn && <Box display="flex" marginLeft={'auto'} marginRight="auto">
                <Tabs
                    textColor="inherit"
                    value={value}
                     onChange={(e,val)=>setValue(val)}>
                   <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
                   <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
                   <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs" />
                </Tabs>
            </Box>
            }
            <Box display="flex" marginLeft="auto">
              {  !isLoggedIn &&( <> <Button LinkComponent={Link} to="/auth"
                 variant="contained"
                 sx={{ margin: 1, borderRadius: 10 }}
                 color="warning">Login</Button>

                <Button LinkComponent={Link} to="/auth"
                 variant="contained"
                 sx={{ margin: 1, borderRadius: 10 }}
                 color="warning">SignUp</Button> </>)}

                 { isLoggedIn && (
                     <Button
                      onClick={()=>dispatch(authActions.logout())}
                      LinkComponent={Link}
                       to="/auth"
                     variant="contained"
                     sx={{ margin: 1, borderRadius: 10 }}
                     color="warning"
                     >
                        Logout
                        </Button>)}
            </Box> 
        </Toolbar>
    </AppBar>
    );
};

export default Header
