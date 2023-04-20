
import { Breadcrumbs } from '@mui/material';
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const AppBreadcrumbs = () => {

    const location = useLocation();
    console.log(location.pathname.split('/'));
    let crumbLink="";
    const crumPath=location.pathname.split('/').filter((path) => path !== "").map((crump)=> {
      console.log(crump);
          
      if(crump == 'edit' || crump == 'view' || crump>=0 && crump<=100){
          return
      }else{
            crumbLink +=`/${crump}`
      }
            return <Link to={crumbLink}>{crump}</Link>
    })
  return (
    <div>
        
        <Breadcrumbs aria-label="breadcrumb" sx={{fontSize:'20px',marginTop:'10px',fontFamily:'roboto',fontWeight:500}}>
            {crumPath}
        </Breadcrumbs>
    </div>
  )
}

export default AppBreadcrumbs