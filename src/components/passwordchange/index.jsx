import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, InputAdornment, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const validationSchema = yup.object({
  password: yup
    .string("Kullanılan Parolanızı Giriniz")
    .min(5, "Parola minimum 5 karakter olmalı")
    .required("*Parola Alanı Zorunlu"),
  newPassword: yup
    .string("Yeni Parola Giriniz")
    .min(5, "Yeni Parola minimum 5 karakter olmalı")
    .required("*Yeni Parola Alanı Zorunlu"),
  newPasswordRepeat: yup
    .string("Yeni Parola Tekrarını Giriniz")
    .min(5, "Yeni Parola Tekrar minimum 5 karakter olmalı")
    .oneOf([yup.ref("newPassword"), null], "Yeni Parolalar aynı olmalıdır")
    .required("*Yeni Parola Tekrar Alanı Zorunlu"),
});

const PasswordChange = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: JSON.parse(localStorage.getItem("loginuser")).email,
      password: "",
      newPassword: "",
      newPasswordRepeat: "",
      showPassword: false,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleOpen();
    },
  });

  const handleClick = () => {
    formik.setValues({
      ...formik.values,
      showPassword: !formik.values.showPassword,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    const { email, password, newPassword, newPasswordRepeat } = formik.values;

    if (newPassword === newPasswordRepeat) {
      axios
        .put("http://localhost:3001/auth/changePassword", {
          email,
          password,
          newPassword,
        })
        .then((res) => {
          if (res.data) {
            console.log(res.data.message);
            localStorage.removeItem("loginuser");
            navigate("/login");
          }
        })
        .catch((err) => console.error(err.data.message));
    }
  };

  return (
    <div style={{ height: 400, width: "37%" }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          autoFocus
          margin="normal"
          fullWidth
          id="password"
          name="password"
          label="Kullanılan Parola"
          type={formik.values.showPassword ? "text" : "password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          autoComplete="current-password"
          inputMode="text"
          InputProps={{
            // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClick}
                  onMouseDown={handleClick}
                >
                  {formik.values.showPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal"
          fullWidth
          id="newPassword"
          name="newPassword"
          label="Yeni Parola"
          type={formik.values.showPassword ? "text" : "password"}
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.newPassword && Boolean(formik.errors.newPassword)
          }
          helperText={formik.touched.newPassword && formik.errors.newPassword}
          autoComplete="current-new-password"
          inputMode="text"
          InputProps={{
            // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClick}
                  onMouseDown={handleClick}
                >
                  {formik.values.showPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal"
          fullWidth
          id="newPasswordRepeat"
          name="newPasswordRepeat"
          label="Yeni Parola (Tekrar)"
          type={formik.values.showPassword ? "text" : "password"}
          value={formik.values.newPasswordRepeat}
          onChange={formik.handleChange}
          error={
            formik.touched.newPasswordRepeat &&
            Boolean(formik.errors.newPasswordRepeat)
          }
          helperText={
            formik.touched.newPasswordRepeat && formik.errors.newPasswordRepeat
          }
          autoComplete="current-new-password-repeat"
          InputProps={{
            // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClick}
                  onMouseDown={handleClick}
                >
                  {formik.values.showPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          GÜNCELLE
        </Button>
      </form>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Parola Güncelleme</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Güncelleme işlemini yaptıktan sonra oturum sonlanacaktır.Tekrardan
            giriş yapmanız gerekmektedir.Güncellemek istiyor musunuz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="warning"
            onClick={() => {
              handleUpdate();
            }}
          >
            GÜNCELLE
          </Button>
          <Button color="info" onClick={handleClose}>
            İPTAL
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PasswordChange;
