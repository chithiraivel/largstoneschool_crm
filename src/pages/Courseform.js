import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Autocomplete,
  Dialog,
  Switch,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/system";
import Chip from '@mui/material/Chip';
import Course from "../assets/JsonData/courseform.json";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import useAutocomplete from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// import AppBreadcrumbs from "./BreadCrumps";
// import Apps from "../../pages/breedcrumbs";
const top100Films = [
    { title: 'HTML'},{ title: 'CSS'},{ title: 'JavaScript'},{ title: 'ReactJs'},{ title: 'AngularJs'},{ title: 'NodeJs'},{ title: 'MongoDB'},{ title: 'Mysql'},{ title: 'UI/UX designer'},{ title: 'Manual Testing'},{title:<Button>CREATE COURSE</Button>},
   
    ]
  
  const Label = styled('label')`
    padding: 0 0 4px;
    line-height: 1.5;
    display: block;
  `;
  
  const InputWrapper = styled('div')
  
  function Tag(props) {
    const { label, onDelete, ...other } = props;
    return (
      <div {...other}>
        <span>{label}</span>
        <CloseIcon onClick={onDelete} />
      </div>
    );
  }
  
  Tag.propTypes = {
    label: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
  };
  
  const StyledTag = styled(Tag)
  
  const Listbox = styled('ul')
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
export default function Courseform() {
  const params = useParams();
  console.log(params);
    const fixedOptions = [];
    const [value, setValue] = React.useState([...fixedOptions]);
    
    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
    
        focused,
        setAnchorEl,
      } = useAutocomplete({
        id: 'customized-hook-demo',
        defaultValue: [top100Films[1]],
        multiple: true,
        options: top100Films,
        getOptionLabel: (option) => option.title,
      });
    
      
       
      <div>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>Customized hook</Label>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option, index) => (
            <StyledTag label={option.title} {...getTagProps({ index })} />
          ))}

          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option.title}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </div>
     

    
  const [Register, RegisterChange] = useState({});
  const [Status,setStatus]=useState(true)
  const [Subjects,setSubjects]=useState([])
  const [edit,setEdit]=useState('')
  const [tua,setTua]=useState(false)
  const [Duration,setDuration]=useState('')
  console.log(Duration);
  const [CourseName,setCourseName]=useState('')
  const [Fees,setFees]=useState('')
  const [Description,setDescription]=useState('')
  const [Subject,setSubject]=useState([])

  const [id,setid]=useState(parseInt(params.id))
  console.log(edit);
  
  let c=""
  Subjects.map((data)=> c+=data.SubjectList)
  console.log(c);
  Register.Subject=c
  Register.Status=Status

  const obj={Status,CourseName,Fees,Duration,Subject:c,Description,id}
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(obj);
  const one=()=>{
 console.log('hii');
  if(params.action == 'edit'){
    console.log('pass');
    Register.id=params.id
    axios.post("http://localhost:8000/CourseDetails/update",obj);

  }else{
    axios.post("http://localhost:8000/CourseDetails/create", obj);
  }

  }
  const OnSubmit = (data) => {
    
    
   
  };
  console.log(Register);
  const [view1,setview]=useState([])
  console.log(view1)
  useEffect(() => {
    axios.post("http://localhost:8000/SubjectDetails/view").then((res)=>{
      // setview(res.data.result.message.message)
      setview(res.data.result.message.message)
    });

    if(params.action == 'edit'){
    axios.post("http://localhost:8000/CourseDetails/viewselect",{id:params.id}).then((res) =>{
      setEdit(res.data.result.message.message[0]);
      setCourseName(res.data.result.message.message[0].CourseName)
      setFees(res.data.result.message.message[0].Fees)
      setDuration(res.data.result.message.message[0].Duration)
      setDescription(res.data.result.message.message[0].Description)
      setStatus(res.data.result.message.message[0].Status)
    });
    }else if(params.action == 'view'){
      setTua(localStorage.getItem('tua'))
      axios.post("http://localhost:8000/CourseDetails/viewselect",{id:params.id}).then((res) =>{
        setEdit(res.data.result.message.message[0]);
        setCourseName(res.data.result.message.message[0].CourseName)
        setFees(res.data.result.message.message[0].Fees)
        setDuration(res.data.result.message.message[0].Duration)
        setDescription(res.data.result.message.message[0].Description)
        setStatus(res.data.result.message.message[0].Status)
     
    });
    }
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
  };
  const StyledTextField = styled(TextField, {
    name: "StyledTextField",
  })({
    width: 300,
    height: 40,
  });
  const form = (
    <form onSubmit={handleSubmit(OnSubmit)} style={{ marginTop: "20px" }}>
      {/* <Typography variant="h4" sx={{ borderRadius: "15px", textAlign: "center", fontWeight: "600" }}></Typography> */}
      <Grid container spacing={3} sx={{ p: 2 }}>
      <Grid item sm={6} md={4} xs={12}>
          <TextField
        id="date"
        label="Enter CourseName"
        size="small"
        name="CourseName"
        value={CourseName}
       multiline
        fullWidth
        
        error={Boolean(errors?.CourseName)}
        helperText={errors.CourseName?.message}
        {...register('CourseName',{
          required:'Enter CourseName'
        })}
        onChange={(e) => setCourseName(e.target.value)}
      />
      </Grid>
      <Grid item sm={6} md={4} xs={12}>
          <TextField
        id="date"
        label="Enter Fees"
        size="small"
        name="Fees"
        value={Fees}
       multiline
        fullWidth
        
        error={Boolean(errors?.Fees)}
        helperText={errors.Fees?.message}
        {...register('Fees',{
          required:'Enter Fees'
        })}
        onChange={(e) => setFees(e.target.value)}
      />
      </Grid>
      <Grid item sm={6} md={4} xs={12}>
          <TextField
        id="date"
        label="Enter Duration"
        size="small"
        name="Duration"
        value={Duration}
       multiline
        fullWidth
        select
        error={Boolean(errors?.Duration)}
        helperText={errors.Duration?.message}
        {...register('Duration',{
          required:'Enter Duration'
        })}
        onChange={(e) => setDuration(e.target.value)}
      >
        <MenuItem value="4 months">4 months</MenuItem>
        <MenuItem value="3 months">3 months</MenuItem>
        <MenuItem value="6 months">6 months</MenuItem>

      </TextField>
      </Grid>
        <Grid item sm={6} md={3} xs={12}>
        <Autocomplete
      multiple
      id="fixed-tags-demo"
      size="small"
   
      value={Subjects}
      onChange={(event, newValue) => {
        {console.log(newValue)}
         if(newValue.length >0){
        newValue.map((data)=> {
         
          if(data.SubjectList === "CREATE COURSE"){
            // <Button onClick={handleClickOpen}>Create</Button>
           <h1 style={{color:'red'}}>{data.SubjectList}</h1>
            setOpen(true);

          }
          else{
        setSubjects(newValue)
            setValue([
          ...fixedOptions,
          ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
        ]);
          }
        }
         
        )} else{
        setSubjects(newValue)
          setValue([
          ...fixedOptions,
          ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
          ])
        }  
      }}
      options={view1}
      getOptionLabel={(option) => option.SubjectList}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option.SubjectList}
            {...getTagProps({ index })}
            disabled={fixedOptions.indexOf(option) !== -1}
          />
        ))
      }
      style={{ width: 400 }}
      renderInput={(params) => (
        <TextField {...params} value={Subject} InputLabelProps={{shrink:true}} label="Subjects" size="small" multiline name="Subjects" placeholder="Subjects" />
      )}
    />
        </Grid>

        <Grid item sm={12} md={12} xs={12}>
        <TextField
         label="Course Description"
        size="small"
        name="Description"
        value={Description}
        multiline
        fullWidth
        inputProps={{
            style: {
              height:80,
              padding: '0 14px',
            },
        }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setDescription(e.target.value)}
      />
        </Grid>
        <Grid item sm={12} md={12} xs={12}>
        <div>
            <Typography>Status </Typography>
        <Switch {...label} defaultChecked onChange={(e) => setStatus(!Status)} />
        </div>
        </Grid>
      </Grid>
{tua ? '' 
:
      <Button
      onClick={one}
        variant="contained"
        color="primary"
        type="submit"
        disableRipple
        disableElevation
        sx={{ width: "100px", my: 4, mx: 2 }}
      >
        Add
      </Button>
}
      <Link to="/CourseTable">
        <Button
          variant="contained"
          color="secondary"
          disableRipple
          disableElevation
          sx={{ width: "100px" }}
        >
          Back
        </Button>

      </Link>


    </form>
  );
  // const { onClose, selectedValue, open } = props;
  const [open, setOpen] = React.useState(false);
 

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [SubjectList,setCreate]=useState({})
  const subjectAdd=()=>{
    axios.post("http://localhost:8000/SubjectDetails/create", SubjectList);
    setOpen(false);
  }
  console.log(SubjectList);
  return <Box className="card">
    

     {/* <Dialog onClose={handleClose} open={open}>
     
      <Grid item xs={12} md={12}>
                        <TextField inputProps={{
      style: {
        height:40,
        width:350,
        padding: '0 14px',
      },
  }} name='SubjectList' multiline  variant="standard"
   {...register("SubjectList", {required: "Enter Subject",})} fullWidth  size='small' label="Subject" onChange={(e)=>SubjectList.SubjectList=e.target.value}/>
                    </Grid>

    
  <Button onClick={subjectAdd}>Add Subject</Button>

     </Dialog> */}

<Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Create Subject</DialogTitle>
                                <DialogContent sx={{ display: 'flex', columnGap: '30px' }}>

                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        multiline
                                        id="Subject"
                                        size="small"
                                        label="Subject"
                                        type="Subject"
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e)=>SubjectList.SubjectList=e.target.value}
                                    />

                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={subjectAdd}>Add Subjects</Button>
                                </DialogActions>
                            </Dialog>

    {form}</Box>;
}
