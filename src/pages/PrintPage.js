import { Box, Button, Divider, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
// import AppBreadcrumbs from '../breadCrumbs/breadcrumbs';
import InvoiceImage from '../assets/images/github-logo.webp';
// import AxiosInstance from '../../axiosinstance';
// import InvoiceDatagrid from '../table/InvoiceDatagrid';
import instace from '../host'
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import moment from 'moment';
import Signature from '../assets/images/sign.png';
import { Link, useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

export default function PrintPage() {

    // const [InvoiceGenDate, setInvoiceGenDate] = useState(" ");
    // const [StudentName, setStudentName] = useState("");
    // const [InvoiceNumber, setInvoiceNumber] = useState("");
    // const [CourseName, setCourseName] = useState("");
    // const [GuardianNumber, setGuardianNumber] = useState("");
    // const [Term, setTerm] = useState("");
    // const [TermFees, setTermFees] = useState("");
    // const [Discount, setDiscount] = useState("");
    // const [AdditionalDiscountName, setAdditionalDiscountName] = useState("");
    // const [AdditionalDiscountAmount, setAdditionalDiscountAmount] = useState("");
    // const [TotalAmount, setTotalAmount] = useState("");
    const [Address, setAddress] = useState([{"doornum": "", "street": "", "place":""}]);
    const [row1,setrow]=useState([])
    const [PrintPageForm,setPrintPage]=useState('')
    const [BatchName,setBatchName]=useState('')
    const [CourseName,setCourseName]=useState('')
    console.log(CourseName);
    const [paymentMethod,setpaymentMethod]=useState('')
    const [TotalAmount,setTotalAmount]=useState('')
    const [StudentName,setStudentName]=useState('')
    const [Term,setTerm]=useState('')
    const [InvoiceDate,setInvoiceDate]=useState('')
    const [AdmissionFee,setAdmissionFee]=useState('')
    const [Discount,setDiscount]=useState('')
    const params = useParams();
    const OfficeAddress = (
        <Box>
            <Typography>Largstone School of Technology,</Typography>
            <Typography>No-78(20), Maharaja Nagar,</Typography>
            <Typography>Elathur Main Road, Kuthukalvalasai,</Typography>    
            <Typography>Tenkasi-627803.</Typography>
        </Box>
    );

    const Read = ()=>{
        instace.post("invoice/viewselect",{invoiceid:parseInt(params.id)}).then((res) =>{
            setPrintPage(res.data.result.message.message[0])
            setrow(res.data.result.message.message)
            setStudentName(res.data.result.message.message[0].StudentName)
            setCourseName(res.data.result.message.message[0].CourseName)
            setBatchName(res.data.result.message.message[0].BatchName)
            setAdmissionFee(res.data.result.message.message[0].AdmissionFee)
            setDiscount(res.data.result.message.message[0].Discount)
            setTerm(res.data.result.message.message[0].Term)
            setTotalAmount(res.data.result.message.message[0].TotalAmount)
            setpaymentMethod(res.data.result.message.message[0].paymentMethod)
            setInvoiceDate(res.data.result.message.message[0].InvoiceDate)
            console.log(res.data.result.message.message[0]);
           })
    };

    // const SubTotal = TotalAmount - AdditionalDiscountAmount;
    // const GSTAmount = ((12/100) * SubTotal);
    // const GrandTotal = (GSTAmount + SubTotal);

    // const columns = [
    //     {
    //         field: "id",
    //         headerName: "No",
    //         width: 40,
    //         editable: false,
    //         headerAlign: "left", 
    //         align: "left",
    //         sortable:false,
    //         valueFormatter: params => (params.id <=2) ? params.id : ""
    //     },
    //     {
    //         field : "Description",
    //         headerName:"Description",
    //         width: 250,
    //         editable: false,
    //         headerAlign: "left", 
    //         align: "left",
    //         sortable:false,
    //     },
    //     {
    //         field : "Term",
    //         headerName:"Paying Term",
    //         width: 210,
    //         editable: false,
    //         headerAlign: "left", 
    //         align: "left",
    //         sortable:false,
    //     },
    //     {
    //         field:"UnitPrice",
    //         headerName:"Unit Price",
    //         width: 200,
    //         editable: false,
    //         headerAlign: "left", 
    //         align: "left",
    //         sortable:false,
    //     },
    //     {
    //         field:"Discount",
    //         headerName:"Discount(%)",
    //         width: 250,
    //         editable: false,
    //         headerAlign: "left", 
    //         align: "left",
    //         sortable:false,
    //     },
    //     {
    //         field:"Total",
    //         headerName:"Total Amount",
    //         width: 130,
    //         editable: false,
    //         headerAlign: "left",
    //         align: "left",
    //         sortable:false,
    //         valueFormatter: params => (params.id === 5) ? `${params.value}` : params.value
    //     },
    // ];

    // const rows = [{id:1,CourseName :CourseName, Term: Term, Discount: Discount, Total: TotalAmount}, {id: 2, CourseName : CourseName, Total: TotalAmount}, {id:3, CourseName: "Sub Total", Total: TotalAmount}, {id:4, CourseName: "GST 12%", Total: TotalAmount}, {id:5, CourseName: "Total", Total: TotalAmount}]
    const rows = [{invoiceid:1,StudentName:StudentName, CourseName :CourseName, Term: Term, Discount: Discount, AdmissionFee: AdmissionFee},{invoiceid:'', Discount: Discount, Total: TotalAmount},{invoiceid:'', Term:'Discount',AdmissionFee: Discount, Total: TotalAmount},{invoiceid:''},{invoiceid:'', Discount: Discount,Term:'TotalAmount', AdmissionFee: TotalAmount}]
    let componentRef = useRef();

    useEffect(()=>{
        Read()
    },[])

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
        field: 'Term',
        headerName: 'Term',
        width: 130,
        editable: true,
      },{
        field: 'AdmissionFee',
        headerName: 'Amount',
        width: 150,
        editable: true,
      }
    ]
   
  return (
    <div className="backImg">
        {/* <AppBreadcrumbs crntPage='Invoice' prevPage="Invoices Table" path='/invoice'/> */}
        <Box ref={(elem) => componentRef = elem} className="backImg" sx={{background:"#fff", borderRadius :"20px",  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", py:3,}}>
            <Grid container justifyContent = "space-between">
                <Grid item xs={8}>
                    <Box sx={{pl:4}}>
                        <Typography sx={{fontSize:"45px",verticalAlign:"center", pb:0.5, fontWeight:"bold"}}>Invoice</Typography>
                        {OfficeAddress}
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box component='img' src={InvoiceImage} sx={{height:"90%", width:"100%", pr:2}} alt='invoice' />
                </Grid>
            </Grid>
             {/*main  */}
            <Grid container justifyContent="end" sx={{mt:3, p:4}}>
                {/* First Column */}
                <Grid item xs={6} >
                    <Box >
                        <Typography sx={{fontSize:"30px", fontWeight:"700"}}>Bill to </Typography>
                        <Typography>{PrintPageForm.StudentName},</Typography>
                        <Typography>{(Address.map((val)=> val.doornum)) == "" ? "(Door Number) N/A" : `# ${Address.map((val)=> val.doornum)}` }</Typography>
                        <Typography>{(Address.map((val)=> val.street)) == "" ? "(Street) N/A" : Address.map((val)=> val.street)}</Typography>
                        <Typography>{(Address.map((val)=> val.place)) == "" ? "(Place Name) N/A" : Address.map((val)=> val.place)}</Typography>
                    </Box>
                </Grid>
                {/* Second Column */}
                <Grid item xs={6}>
                    <Grid sx={{mt:5.5}} container>
                        <Grid item xs={8}>
                            <Box>
                                <Typography sx={{fontWeight:"700"}}>Invoice#</Typography>
                                <Typography sx={{fontWeight:"700"}}>Invoice Date : {PrintPageForm.InvoiceDate}</Typography>
                                <Typography sx={{fontWeight:"700"}}>Contact Number : 8682039296</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box>
                                {/* <Typography>{InvoiceNumber}</Typography>
                                <Typography>{InvoiceGenDate}</Typography>
                                <Typography>{GuardianNumber}</Typography> */}
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} sx={{px:4}} >
                    {/* <InvoiceDatagrid columns={columns} rows={rows} id='id' /> */}
                    <Box>
      <DataGrid sx={{
        border: 0, 
        '.MuiDataGrid-columnSeparator': { display: 'none' },
        '& .MuiDataGrid-row:nth-child(2)':{ borderBottom:"1px solid black",},
        '& .MuiDataGrid-row:nth-child(3)':{ fontWeight:"bold"},
        '& .MuiDataGrid-row:nth-child(4)':{ borderBottom:"1px solid black", fontWeight:"bold"},
        '& .MuiDataGrid-row:nth-child(5)':{  fontWeight:"bold", fontSize:"18px"},
        '.MuiDataGrid-cell': { border: 'none', }, //tableCell
        '& .MuiDataGrid-columnHeaders': { borderBottom: "none", backgroundColor: 'rgb(250,250,251)', color:"#455560", fontSize:"14px", }, //tableHeader
        '& .MuiDataGrid-columnHeaderTitle':{fontWeight:"bold"},
        '& .MuiDataGrid-main': { mb: 2, mt:4 },  //table
      }}
        autoHeight
        disableColumnMenu
        GridColDef={false}
        hideFooter={true}
        rows={rows}
        getRowId={(row)=> row.invoiceid}
        disableColumnFilter
        disableColumnSelector
        disableRowSelectionOnClick
        disableMultipleRowSelection
        disableDensitySelector
        columns={columns}
      />
    </Box>
                </Grid>
            </Grid>
            <Grid container sx={{ mt:10, px:4}} justifyContent="space-between">
                <Grid item xs={4}>
                    <Box>                        
                        <Typography sx={{fontWeight:"bold", fontSize:"20px"}}>Bank Details</Typography>
                        <Typography sx={{mt:1}}><b>Name:</b> Chithirai vel</Typography>
                        <Typography sx={{mt:0.5}}><b>Bank :</b>TMB</Typography>
                        <Typography sx={{mt:0.5}}><b>Branch :</b>VEMBAR</Typography>
                        <Typography sx={{mt:0.5}} ><b>ACC No. :</b>311183767763273</Typography>
                        <Typography sx={{mt:0.5}}><b>IFSC Code :</b>TMBL043</Typography>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box>
                        <Typography sx={{fontWeight:"bold", fontSize:"20px"}}>Terms and Conditions</Typography>
                        {/* <ul style={{listStyleType: "disc", marginLeft:"20px"}}>
                            <li style={{marginTop:"8px",fontSize:'13px'}}>Use of simple, polite, and straightforward language.</li>
                            <li style={{marginTop:"4px",fontSize:'13px'}}>Mentioning the complete details of the firm and the client.</li>
                            <li style={{marginTop:"4px",fontSize:'13px'}}>Complete details of the product or service, including taxes or discounts.</li>
                            
                        </ul> */}
                    </Box>
                </Grid>
                <Grid item xs={2.5}>
                    <Box sx={{ display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <Box component= "img" width="200px" src={Signature} alt="Signature"/>
                        <Typography>Full Stack Developer</Typography>
                        <Typography>Tenkasi</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        <Box sx={{display:"flex", justifyContent:"end", my:4, pr:4}}>
            <ReactToPrint 
            trigger={() =>
                <Button endIcon={<PrintOutlinedIcon/>} sx={{"@media print" : {display:"none"}}} style={{ backgroundColor:"#4daaff", marginRight:"20px"}} disableElevation disableRipple  variant='contained'>Print</Button>}
            content={()=> componentRef}
            />
            <Link to = "/InvoiceTable"><Button sx={{"@media print" : {display:"none"}}} style={{backgroundColor: "#ff726f",}} disableElevation disableRipple  variant='contained'>Back</Button></Link>
        </Box>
    </div>
  )
}