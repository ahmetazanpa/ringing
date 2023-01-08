import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Add, Delete } from "@mui/icons-material"; //AudioFile
//import * as yup from 'yup';
//import { useFormik } from 'formik';
import axios from "axios";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/tr";

const maxInputFields = 10;
const defaultNumberOfFields = 1;

// const validationSchema = yup.object({
//     text: yup.array().of(
//         yup.object().shape({
//             text: yup
//                 .string("Etüt Dersini Giriniz")
//                 .required('*Etüt Dersi Alanı Zorunlu'),
//             time: yup
//             .string('Zamanı Giriniz')
//             .required('*Zaman Alanı Zorunlu'),
//         }),
//     ),
// });

const DynamicInput = ({ title, days }) => {
  const [numberOfFields, setNumberOfFields] = useState(defaultNumberOfFields);
  const [formValues, setFormValues] = useState([{ lessonname: "", notificationfile: "", starttime: new Date(), endtime: new Date() }]);
  const username = JSON.parse(localStorage.getItem("loginuser")).username;
  // const validationSchema = yup.object({
  //     notificationfile: yup
  //         .string('Ses Dosyasını Seçiniz')E
  //         .required('*Ses Dosyası Alanı Zorunlu'),
  // });

  // const formik = useFormik({
  //     initialValues: {
  //         notificationfile: '',
  //     },
  //     validationSchema: validationSchema,
  // });

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    if (numberOfFields < maxInputFields) {
      setFormValues([
        ...formValues,
        { lessonname: "", notificationfile: "", starttime: new Date(), endtime: new Date() },
      ]);
      setNumberOfFields(numberOfFields + 1);
    }
  };

  let removeFormFields = (i) => {
    if (i > 0) {
      let newFormValues = [...formValues];
      newFormValues.splice(i, 1);
      setFormValues(newFormValues);
      setNumberOfFields(numberOfFields - 1);
    }
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/programs/program", { title, days, username })
      .then((res) => {
        if (res) {
          let programid = res.data.id;
          axios
          .post("http://localhost:3001/programdetails/programdetails", { programid, formValues })
          .then((resdetails) => {
            if (resdetails) {
              console.log(resdetails.data.message);
            }
          });
          console.log(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      {formValues.map((element, index) => (
        <div style={{ textAlign: "center" }} key={index}>
          <TextField
            required
            margin="normal"
            fullWidth
            id="lessonname"
            //name={`element.${index}.text`}
            name="lessonname"
            type="text"
            label={"Ders " + (index + 1)}
            value={element.lessonname}
            onChange={(e) => handleChange(index, e)}
          />
           {/* <div style={{ display: "flex",  marginTop: 15,  marginBottom: 15, }}
          >
            <Button
              fullWidth
              margin="normal"
              color="primary"
              variant="outlined"
              aria-label="upload audio"
              component="label"
              startIcon={<AudioFile fontSize="large" />}
            >
              <input
                required
                hidden
                accept=".mp3, .mov, .mp4"
                type="file"
                name="notificationfile"
                value={element.notificationfile}
                onChange={(e) => handleChange(index, e)}
              />
               <p style={{ fontSize: 11 }}>
                { element.notificationfile === ""
                  ? "Ses Dosyasını Seçiniz"
                  : element.notificationfile
                }
              </p>
            </Button>
          </div> */}
          <TextField
            required
            margin="normal"
            fullWidth
            id="notificationfile"
            name="notificationfile"
            type="text"
            label={"Ses Dosyası URL adresi"}
            value={element.notificationfile}
            onChange={(e) => handleChange(index, e)}
          />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={"tr"}
            >
              <TimePicker
                id="starttime"
                name="starttime"
                type="time"
                inputFormat={"HH:mm"}
                label="Etüt Başlangıç Saati"
                value={element.starttime}
                onChange={(newValue) => {
                  const event = {  target: { name: "starttime", value: newValue }, };
                  handleChange(index, event);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    fullWidth
                    margin="normal"
                    id="starttime"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </LocalizationProvider>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={"tr"}
            >
              <TimePicker
                id="endtime"
                name="endtime"
                type="time"
                inputFormat={"HH:mm"}
                label="Etüt Bitiş Saati"
                value={element.endtime}
                onChange={(newValue) => {
                  const event = {
                    target: { name: "endtime", value: newValue },
                  };
                  handleChange(index, event);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    fullWidth
                    margin="normal"
                    id="endtime"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          {
            <Button
              variant="contained"
              sx={{ ml: 2, mt: 2, mb: 2 }}
              color="primary"
              onClick={() => addFormFields()}
            >
              <Add />
            </Button>
          }
          {index > 0 && (
            <Button
              variant="contained"
              sx={{ ml: 2, mt: 2, mb: 2 }}
              color="error"
              onClick={() => removeFormFields(index)}
            >
              <Delete />
            </Button>
          )}
        </div>
      ))}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        OLUŞTUR
      </Button>
    </form>
  );
};

export default DynamicInput;
