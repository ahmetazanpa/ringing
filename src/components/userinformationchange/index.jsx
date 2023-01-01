import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, } from "@mui/material";
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
});

const UserInformationChange = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: JSON.parse(localStorage.getItem("loginuser")).id,
      companyname: JSON.parse(localStorage.getItem("loginuser")).companyname,
      username: JSON.parse(localStorage.getItem("loginuser")).username,
      email: JSON.parse(localStorage.getItem("loginuser")).email,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleOpen()
    },
  });

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleUpdate = () => {
    const { id, companyname, username, email } = formik.values;
    axios.post("http://localhost:3001/auth/control", { id, companyname, username, email })
    .then((res) => {
      if(res.data){
        axios.put("http://localhost:3001/auth/userinformation", { id, companyname, username, email })
        .then((res) => {
          if (res.data) {
            console.log(res.data.message)
            localStorage.removeItem("loginuser");
            navigate('/login')
          }
        }).catch((err) => console.error(err.data.message));
      }
    }).catch((err) => console.error(err.data.message));
  }

  return (
    <div style={{ height: 400, width: "37%" }}>
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
        <DialogTitle>Bilgileri Güncelleme</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Güncelleme işlemini yaptıktan sonra oturum sonlanacaktır.Tekrardan giriş yapmanız gerekmektedir.Güncellemek istiyor musunuz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="warning" onClick={() => { handleUpdate() }}>GÜNCELLE</Button>
          <Button color="info" onClick={handleClose}>İPTAL</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserInformationChange;
