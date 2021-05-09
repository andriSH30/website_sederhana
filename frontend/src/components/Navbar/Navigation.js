/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import {Link} from 'react-router-dom';


const Navigation = () => {
    const global = useSelector(state => state);
    const [isOpen, setIsOpen] = useState(false);
    // const [isAdmin, setIsAdmin] = useState(false);

    // const user = global.dataUser.user;
    // if(user){
    //   if(user.role === "admin"){
    //     setIsAdmin(true)
    //   }
    // }

    const toggle = () => setIsOpen(!isOpen);

    return (
    <div>
      <Navbar style={{paddingLeft:"30px",paddingRight:"30px"}} color="dark" dark expand="md">
        <NavbarBrand tag={Link} to="/">Website Sederhana</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/customers">List Customer</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/login">Login</NavLink>
            </NavItem>
            <NavItem>
            <NavLink tag={Link} to="/register">Register</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    )
}

export default Navigation
