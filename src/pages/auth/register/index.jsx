import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Avatar, Button, CssBaseline, InputAdornment, IconButton, TextField, Grid, Box, Typography, Container } from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import Copyright from '../../../components/copyright';
import { db } from "../../../firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";


const validationSchema = yup.object({
  companyname: yup
  .string('Kurum Adını Giriniz')
  .required('*Kurum Adı Alanı Zorunlu'),
  username: yup
  .string('Kullanıcı Adını Giriniz')
  .required('*Kullanıcı Adı Alanı Zorunlu'),
  email: yup
  .string('Mail Adresinizi Giriniz')
  .email('Geçersiz E-Mail Adresi')
  .required('*E-Mail Alanı Zorunlu'),
  password: yup
    .string('Parolanızı Giriniz')
    .min(5, 'Parola minimum 5 karakter olmalı')
    .required('*Parola Alanı Zorunlu'),
  passwordRepeat: yup
    .string('Parola Tekrarını Giriniz')
    .oneOf([yup.ref('password'), null], 'Parolalar aynı olmalıdır')
    .required('*Parola Alanı Zorunlu'),
  licenseKey: yup
    .string('Lisans Key Giriniz')
    .min(14, 'Parola minimum 14 karakter olmalı')
    .required('*Lisans Key Alanı Zorunlu'),
});

const Register = () => {
  let navigate = useNavigate();

  const notify_err_license_key = () => {
    toast.error("Lisans Key Hatalı !");
  };

  const notify_err_account = (message) => {
    toast.error(message);
  };

  const notify_success_account = (message) => {
    toast.success(message);
  };

  async function keys(licenseKey){
    return await getDocs(collection(db, "keys")).then(key => {
      return key.docs.map((document) => {
        const license = document.data().uuid.find(element => element.key === licenseKey && element.licenseCount > 0);
        return license;
      })
    })
  }

  async function licenseUpdateCount(licenseKey){
    return await getDocs(collection(db, "keys")).then(key => {
      return key.docs.map((document) => {
        const license = document.data().uuid.find(element => element.key === licenseKey);
        if(license !== null || undefined){
          updateDoc(doc(db, "keys", document.id), { 'uuid': [{key: license.key, licenseCount: license.licenseCount - 1 }] })
        }
        return license;
      })
    })
  }

  const formik = useFormik({
    initialValues: {
      companyname: '',
      username: '',
      email: '',
      password: '',
      passwordRepeat: '',
      licenseKey: '',
      showPassword: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { licenseKey, companyname, username, email, password } = values;
      keys(licenseKey).then(result => {
        if (result.length > 0 && result[0] !== undefined){
            axios.post("http://localhost:3001/auth/control", { email, username })
            .then((controlRes) => {
              if (controlRes.data.isRegister) {
                axios.post('http://localhost:3001/auth/register', { companyname, username, email, password })
                .then((registerRes) => {
                  if(registerRes.data){
                    notify_success_account(registerRes.data.message);
                    licenseUpdateCount(licenseKey)
                    navigate("/login")
                  }
                }).catch((err) => { console.error(err)  })
              }else {
                console.log(controlRes.data.message);
                notify_err_account(controlRes.data.message);
              }
            }).catch((err) => { console.error(err); })
          }
          else{
            console.error("Lisans Key Hatalı!");
            notify_err_license_key();
          }
      });
    }
  });

  const handleClick = () => {
    formik.setValues({ "showPassword": !formik.values.showPassword });
  }

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Kaydol
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            autoFocus
            fullWidth
            id="licenseKey"
            label="Lisans Key"
            name="licenseKey"
            autoComplete="licenseKey"
            inputMode="licenseKey"
            value={formik.values.licenseKey}
            onChange={formik.handleChange}
            error={formik.touched.licenseKey && Boolean(formik.errors.licenseKey)}
            helperText={formik.touched.licenseKey && formik.errors.licenseKey}
          />
          <TextField
            margin="normal"
            fullWidth
            id="companyname"
            label="Kurum Adı"
            name="companyname"
            autoComplete="companyname"
            inputMode="text"
            value={formik.values.companyname}
            onChange={formik.handleChange}
            error={formik.touched.companyname && Boolean(formik.errors.companyname)}
            helperText={formik.touched.companyname && formik.errors.companyname}
          />
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Kullanıcı Adı"
            name="username"
            autoComplete="username"
            inputMode="text"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="E-Mail Adresi"
            name="email"
            autoComplete="email"
            inputMode="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            fullWidth
            id="password"
            name="password"
            label="Parola"
            type={formik.values.showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            autoComplete="current-password"
            inputMode="text"
            InputProps={{ // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClick}
                    onMouseDown={handleClick}
                  >
                    {formik.values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="passwordRepeat"
            name="passwordRepeat"
            label="Parola (Tekrar)"
            type={formik.values.showPassword ? "text" : "password"}
            value={formik.values.passwordRepeat}
            onChange={formik.handleChange}
            error={formik.touched.passwordRepeat && Boolean(formik.errors.passwordRepeat)}
            helperText={formik.touched.passwordRepeat && formik.errors.passwordRepeat}
            autoComplete="current-password-repeat"
            InputProps={{ // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClick}
                    onMouseDown={handleClick}
                  >
                    {formik.values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            KAYDOL
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link to="/login" variant="body2">
                {"Hesabın var mı? Giriş Yap"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Box>
    </Container >
  );
}

export default Register;
