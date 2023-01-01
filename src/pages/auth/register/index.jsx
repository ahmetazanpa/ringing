import * as React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Avatar, Button, CssBaseline, InputAdornment, IconButton, TextField, Grid, Box, Typography, Container } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from '../../../components/copyright';

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
});

const Register = () => {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      companyname: '',
      username: '',
      email: '',
      password: '',
      passwordRepeat: '',
      showPassword: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { companyname, username, email, password, passwordRepeat } = values;
      if (companyname.length > 0 && username.length > 0 && email.length > 0 && password === passwordRepeat) {
        let userControl = axios.post("http://localhost:3001/auth/control", { email, username })
        .then((res) => {
          if (res) {
            console.log(res.data.message);
            return true;
          }else return false;
        })

        if(!userControl){
          axios.post('http://localhost:3001/auth/register', { companyname, username, email, password})
            .then(res => {
              if(res){
                console.log(res)
                navigate("/login")
              }
            }).catch((err) => console.error(err))
        }
      }
    },
  });

  const handleClick = () => {
    formik.setValues({ ...formik.values, "showPassword": !formik.values.showPassword });
  }

  return (
    <Container component="main" maxWidth="xs">
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Kaydol
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="companyname"
            label="Kurum Adı"
            name="companyname"
            autoComplete="companyname"
            inputMode="text"
            autoFocus
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
