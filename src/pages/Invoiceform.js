import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Grid, TextField, Typography, Box, Button, InputAdornment, MenuItem, Autocomplete } from "@mui/material";
import { styled } from "@mui/system";
import Invoice from '../assets/JsonData/invoiceform.json'
import { Link } from "react-router-dom";
import AppBreadcrumbs from "./BreadCrumps";
import moment from "moment";
import { useEffect } from "react";
import axios from "axios";
import { Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";
import instace from '../host'
// import Apps from "../../pages/breedcrumbs";
  


export default function Invoiceform() {

    
    const one=()=>{
        localStorage.setItem('isLogin',true)
        
        
    }
   
    const params=useParams()
    console.log(params.id);
    const [Register, RegisterChange] = useState({});
    const [edit,setEdit]=useState()
    console.log(Register);
    const [Batchlist,setBatchlist]=useState([])
    const [entrolled,setEntrolled]=useState('')
    const [BatchName,setBatchName]=useState('')
    const [CourseName,setCourseName]=useState('')
    console.log(CourseName);
    const [paymentMethod,setpaymentMethod]=useState('')
    const [TotalAmount,setTotalAmount]=useState('')
    const [StudentName,setStudentName]=useState('')
    const [Term,setTerm]=useState('')
    console.log(Term);
    const [InvoiceDate,setInvoiceDate]=useState('')
    const [AdmissionFee,setAdmissionFee]=useState('')
    const [Discount,setDiscount]=useState('')
    const [BatchStartingDate, setBatchStartingDate] = useState((moment(new Date()).format('YYYY-MM-DD')));
    const [invoiceid,setid]=useState(parseInt(params.id))
    Register.StudentName=entrolled.StudentName
    Register.CourseName=entrolled.CourseName
    Register.BatchName=entrolled.BatchName
    Register.AdmissionFee=entrolled.AdmissionFee
    Register.InvoiceDate=BatchStartingDate
    Register.Discount=Discount
    Register.InvoiceDate=BatchStartingDate
    Register.paymentMethod=paymentMethod
    let a=AdmissionFee*(parseInt(Discount)/100)
    let total=AdmissionFee-a;
    Register.TotalAmount=total
    Register.Term=Term

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    let obj={AdmissionFee,CourseName,BatchName,Discount,InvoiceDate,StudentName,Term,TotalAmount,paymentMethod,invoiceid}
    console.log(obj);
    const OnSubmit = (data) => {
        
        if(params.action == 'edit'){
            console.log('hii');
        instace.post("invoice/update",obj)
        }else{
        instace.post("invoice/create",Register)
        }
    }
   
    useEffect(()=>{
        instace.post("StudentRegister/view").then((res)=>setBatchlist(res.data.result.message.message))

        if(params.action == 'edit'){
            instace.post("invoice/viewselect",{invoiceid:parseInt(params.id)}).then((res) =>{
                setEdit(res.data.result.message.message[0])
                setStudentName(res.data.result.message.message[0].StudentName)
                setCourseName(res.data.result.message.message[0].CourseName)
                setBatchName(res.data.result.message.message[0].BatchName)
                setAdmissionFee(res.data.result.message.message[0].AdmissionFee)
                setDiscount(res.data.result.message.message[0].Discount)
                setTerm(res.data.result.message.message[0].Term)
                setTotalAmount(res.data.result.message.message[0].TotalAmount)
                setpaymentMethod(res.data.result.message.message[0].paymentMethod)
                setInvoiceDate(res.data.result.message.message[0].InvoiceDate)
            });
            }else if(params.action == 'view'){
            //   setTua(localStorage.getItem('tua'))
              instace.post("invoice/viewselect",{invoiceid:parseInt(params.id)}).then((res) =>{
                // setEdit(res.data.result.message.message[0]);
                setStudentName(res.data.result.message.message[0].StudentName)
                setCourseName(res.data.result.message.message[0].CourseName)
                setBatchName(res.data.result.message.message[0].BatchName)
                setAdmissionFee(res.data.result.message.message[0].AdmissionFee)
                setDiscount(res.data.result.message.message[0].Discount)
                setTerm(res.data.result.message.message[0].Term)
                setTotalAmount(res.data.result.message.message[0].TotalAmount)
                setpaymentMethod(res.data.result.message.message[0].paymentMethod)
                setInvoiceDate(res.data.result.message.message[0].InvoiceDate)
console.log(res.data.result.message.message);

             
            });
            }
            console.clear('all')
    },[])

    const handlesubmit = (e) => {
        e.preventDefault();

    }
    const StyledTextField = styled(TextField, {
        name: "StyledTextField",
    })({
        width: 300,
        height: 40

    });
    const form = (
        <form onSubmit={handleSubmit(OnSubmit)} style={{ marginTop: '20px' }}>

            
            <Grid container spacing={3} sx={{ p: 2 }}>

            <Grid item xs={10} md={4}>
                    
                    <Autocomplete
               
                    onChange={(e,newValue)=> {
                        if(newValue!=null){
                        setEntrolled(newValue)
                        }else{
                        setEntrolled('')
                        }
                    }
                    }
                      options={Batchlist}
                    //   InputLabelProps={{shrink:true}}
                      getOptionLabel={(option) => option.StudentName}
                      value={{StudentName:entrolled.StudentName || StudentName}}
                    id="combo-box-demo"

                    size='small'
                     renderInput={(params) => <TextField multiline InputLabelProps={{shrink:true}} value={StudentName} fullWidth size="small" {...params} label="Name" />}
                    >     
                        </Autocomplete>
                   </Grid>

                   <Grid item xs={10} md={4}>
                            <TextField name='CourseName' InputLabelProps={{shrink:true}} value={entrolled.CourseName || CourseName} multiline  fullWidth onChange={(e)=>setCourseName(e.target.value)} size='small' label="Course Name" />
                        </Grid>
                        <Grid item xs={10} md={4}>
                            <TextField name='Batch' InputLabelProps={{shrink:true}} value={entrolled.BatchName || BatchName} multiline  fullWidth onChange={(e)=>setBatchName(e.target.value)} size='small' label="Batch" />
                        </Grid>
                        <Grid item xs={10} md={4}>
                            <TextField name='Amount' InputLabelProps={{shrink:true}} value={entrolled.AdmissionFee || AdmissionFee} multiline  fullWidth onChange={(e)=>setAdmissionFee(e.target.value)} size='small' label="Amount" />
                        </Grid>
                        <Grid item xs={10} md={4}>
                            <TextField name='Discount' InputLabelProps={{shrink:true}} value={Discount} multiline  fullWidth onChange={(e)=>setDiscount(e.target.value)} size='small' label="Discount" />
                        </Grid>
                        <Grid item xs={10} md={4}>
                            <TextField name='TotalAmount' InputLabelProps={{shrink:true}} value={total || "" || TotalAmount} multiline  fullWidth onChange={(e)=>setTotalAmount(e.target.value)} size='small' label="TotalAmount" />
                        </Grid>
                        <Grid item xs={10} md={4}>
                            <TextField name='Term' select InputLabelProps={{shrink:true}} value={Term} multiline  fullWidth onChange={(e)=>setTerm(e.target.value)} size='small' label="Term" >
                                <MenuItem value="FirstTerm">FirstTerm</MenuItem>
                                <MenuItem value="SecondTerm">SecondTerm</MenuItem>
                                <MenuItem value="ThirdTerm">ThirdTerm</MenuItem>

                            </TextField>
                        </Grid>
                

<Grid item xs={10} md={4}>
                        <TextField name='InvoiceDate' multiline type='date' value={BatchStartingDate} onChange={(e)=>setBatchStartingDate(e.target.value)} fullWidth label="InvoiceDate" size="small" />
                    </Grid>
                    <Grid item xs={10} md={4}>
                            <TextField name='Paymentmethod' InputLabelProps={{shrink:true}} value={paymentMethod} {...register("Paymentmethod", {required: "Enter the paymentmethod",pattern:{value:/^\S*$/,message:'Starting space not allowed'}})} error={Boolean(errors.Paymentmethod)} helperText={errors.Paymentmethod?.message} multiline  fullWidth onChange={(e)=>setpaymentMethod(e.target.value)} size='small' label="Paymentmethod" />
                        </Grid>
            </Grid>

            <Button variant="contained" color="primary" type='submit' disableRipple disableElevation sx={{  width: "100px", my: 4, mx: 2 }}>Add</Button>
            <Link to='/InvoiceTable'>
                <Button variant="contained" color="secondary" type='submit' disableRipple disableElevation sx={{  width: "100px",mx:4 }}>Back</Button>
            </Link>

        </form>

    )

    return (
        <Box className="card">

            {form}
            <Link to='/login'><button onClick={one}> logout</button></Link>
        </Box>


    )
}