import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import * as yup from "yup";
import axios from "axios";
import Copyright from "../../../components/copyright";

const validationSchema = yup.object({
  email: yup
    .string("Mail Adresinizi Giriniz")
    .email("Geçersiz E-Mail Adresi")
    .required("*E-Mail Alanı Zorunlu"),
  password: yup
    .string("Parolanızı Giriniz")
    .min(5, "Parola minimum 5 karakter olmalı")
    .required("*Parola Alanı Zorunlu"),
});

const SignIn = () => {
  let navigate = useNavigate();

  const notify_err_login = (message) => {
    toast.error(message);
  };

  const notify_success_login = (message) => {
    toast.success(message);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      showPassword: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { email, password } = values;

      axios.post("http://localhost:3001/auth/login", { email, password })
        .then((res) => {
          if (res.data) {
            console.log(res.data.message);
            notify_success_login(res.data.message);
            localStorage.setItem("loginuser", JSON.stringify({ id: res.data.id, companyname: res.data.companyname, username: res.data.username, email: res.data.email }) );
            navigate('/home')
          }
        })
        .catch((err) => { console.error(err.response.data.message); notify_err_login(err.response.data.message) });
    },
  });

  const handleClick = () => {
    formik.setValues({ ...formik.values, "showPassword": !formik.values.showPassword });
  }

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
      <CssBaseline />
      <Box
        sx={{
          marginTop: "40%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Giriş Yap
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="E-Mail Adresi"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email || ""}
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
            value={formik.values.password || ""}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            GİRİŞ YAP
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2">
                {"Şifreni Unuttun mu?"}
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Hesabın yok mu? Kayıt Ol"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Box>
    </Container>
  );
};

export default SignIn;
