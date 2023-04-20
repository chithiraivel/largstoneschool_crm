









import { Box, Button, Grid } from '@mui/material';
import React from 'react'
import { useRef } from 'react';
import ReactToPrint from 'react-to-print'
import a from '../assets/images/logo.png'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
const PrintPage = () => {
    const params = useParams()
    let componentRef = useRef();
    const [PrintPageForm,setPrintPage]=useState('')

    let total=PrintPageForm.AdmissionFee*((PrintPageForm.Discount)/100);
    const [row1,setrow]=useState([])
   useEffect(()=>{
    getpage()
   },[])
   const getpage=()=>{
    axios.post("http://localhost:8000/invoice/viewselect",{invoiceid:parseInt(params.id)}).then((res) =>{
    setPrintPage(res.data.result.message.message[0])
    setrow(res.data.result.message.message)
   })
   }

   const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },]
    const columns = [
        { field: 'invoiceid', headerName: 'ID', width: 90 },
        {
          field: 'StudentName',
          headerName: 'StudentName',
          width: 150,
        
        },
        {
          field: 'CourseName',
          headerName: 'CourseName',
          width: 130,
          editable: true,
        },{
          field: 'BatchName',
          headerName: 'BatchName',
          width: 130,
          editable: true,
        },{
          field: 'Term',
          headerName: 'Term',
          width: 130,
          editable: true,
        },{
          field: 'AdmissionFee',
          headerName: 'AdmissionFee',
          width: 150,
          editable: true,
        }
      ]
  return (
   <div className='card'>

    <div style={{display:'flex',justifyContent:'space-between'}}>
        <div><img src={a} height="80px" width="270px"></img></div>
        <div><h1 style={{fontSize:'40px'}}>INVOICE</h1></div>
    </div>

<div style={{display:'flex',justifyContent:'space-between'}}>
    <div>
        <h5>Bill To</h5>
        <p>StudentName : {PrintPageForm.StudentName}</p>
        <p>CourseName : {PrintPageForm.CourseName}</p>
        <p>BatchName : {PrintPageForm.BatchName}</p>
    </div>
    <div>
        <p>InvoiceDate : {PrintPageForm.InvoiceDate}</p>
        <p>Discount : {PrintPageForm.Discount}</p>
        <p>TotalAmount : {PrintPageForm.TotalAmount}</p>
    </div>
    </div>
     
    <Box sx={{  width: '100%' }}>
      <DataGrid
       sx={{
        border: "none", ".MuiDataGrid-cell": { border: "none" },
        "& .MuiDataGrid-columnHeaders": { borderBottom: "none" },
        "& .super-app-theme--header": { backgroundColor: "rgb(250,250,251)" },
        ".&  .MuiDataGrid-iconButtonContainer css-ltf0zy-MuiDataGrid-iconButtonContainer ": { visibility: "hidden" },'.MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '&.MuiDataGrid-root': {
            border: 'none',
          }, '.MuiDataGrid-iconButtonContainer': {
visibility: 'hidden',
},
'.MuiDataGrid-sortIcon': {
opacity: 0,
visibility: 'hidden',
},'& .MuiDataGrid-row':{},fontSize:'16px',
    }}
        rows={row1}
        columns={columns}
       autoHeight
       getRowId={row=>row.invoiceid}
        disableRowSelectionOnClick
        disableColumnFilter
                disableColumnMenu
                disableColumnSelector
                disableDensitySelector
                disableVirtualization
             
                hideFooterPagination
              
      />
    </Box>

    <Grid container sx={{lineHeight:'30px'}}>
      <Grid item md={8}>

      </Grid>
      <Grid item md={4}>
        <p>Discount : {PrintPageForm.Discount}</p>
        <p>TotalAmount : {total}</p>
        {/* <p style={{textDecoration:'underline',width:'300px',border:'1px solid',color:'gray'}}></p> */}
      </Grid>

      <div >
      <Button variant='contained' color="primary">Print</Button>
      <Button variant='contained' color="secondary" sx={{marginLeft:'20px'}}>Cancel</Button>
    </div>
    </Grid>

    
   </div>
    
  )
}

export default PrintPage