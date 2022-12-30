import React from 'react'
import { TextField, InputLabel, FormControl, Select, MenuItem, FormHelperText, OutlinedInput } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import DynamicInput from '../dynamicinput';

const validationSchema = yup.object({
    name: yup
        .string('Program Adını Giriniz')
        .min(3, 'Program Adı alanı minimum 3 karakter olmalı')
        .required('*Program Adı Alanı Zorunlu'),
    days: yup
        .string('Programın Gününü Seçiniz')
        .required('*Programın Günü Alanı Zorunlu'),
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const days = [
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
    'Pazar',
  ];

const ProgramAdd = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            days: [],
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            localStorage.setItem("user", { name: values.name, days: values.days })
        },
    });

    return (
        <div style={{ height: 400, width: '37%' }}>
            <TextField
                autoFocus
                fullWidth
                margin="normal"
                id="name"
                label="Program Adı"
                name="name"
                autoComplete="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />
            <FormControl margin="normal" fullWidth>
                <InputLabel id="days-label" htmlFor='days-label' error={!formik.touched.days ? false : true}>Program Günü</InputLabel>
                <Select
                    required
                    fullWidth
                    //multiple
                    labelId="days-label"
                    id="days"
                    name='days'
                    label="Programın Günü"
                    autoComplete="days"
                    value={formik.values.days}
                    onChange={formik.handleChange}
                    error={formik.touched.days && Boolean(formik.errors.days)}
                    input={<OutlinedInput label="Tag" />}
                    //renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                {
                    days.map((day) => (
                      <MenuItem key={day} value={day}>
                          {/* <Checkbox checked={formik.values.days.indexOf(day) > -1} /> */}
                          {/* {<ListItemText primary={day} /> */}
                          { day }
                      </MenuItem>
                    ))
                }
                </Select>
                <FormHelperText htmlFor='name' error>{formik.touched.days && formik.errors.days}</FormHelperText>
            </FormControl>
            <DynamicInput title={formik.values.name} days={formik.values.days} />
        </div>
    )
}

export default ProgramAdd
