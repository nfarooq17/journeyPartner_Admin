import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    
      title: 'Dashboard',
      path: '/Details',
      icon: <FaIcons.FaCartPlus />,
      cName: 'nav-text'
    },
  {
    title: 'Register',
    path: '/RegisterNew',
    icon: <FaIcons.FaUserPlus />,
    cName: 'nav-text'
  },
  
  {
    title: 'Route Removals',
    path: '/',
    icon: <FaIcons.FaEraser />,
    cName: 'nav-text'
  },
  
  
  {
    title: 'Account Approvals',
    path: '/AccountR',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },

 
  
];
