import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";

const columns2 = [
  { field: "lessonname", headerName: "Ders Adı", width: 200 },
  { field: "starttime", headerName: "Başlangıç Saati", width: 150 },
  { field: "endtime", headerName: "Bitiş Saati", width: 150 },
  { field: "notificationfile", headerName: "Zil Sesi", width: 350 },
];

const columns = [
  { field: "programname", headerName: "Program Adı", width: 150 },
  { field: "programday", headerName: "Program Günleri", width: 250 },
  { field: "username", headerName: "Oluşturan Kişi", width: 150 },
  { field: "action", headerName: "İşlem", width: 150 },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DataTable() {
  const [data, setData] = useState([]);
  const [childData, setChildData] = useState([]);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [actionData, setActionData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/programs/allprogram").then((res) => {
      if (res) {
        let programs = [];
        res.data.map((r) => {
          return programs.push(JSON.parse(Object.getOwnPropertyDescriptor(r, Object.keys(r)).value));
        });
        setData(programs);
      }
    });
  }, [open]);

  const handleOpen = (row) => {
    setActionData(row)
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleDelete = (programid) => {
    axios.delete(`http://localhost:3001/programs/program/${programid}`).then((res) => {
      if (res) {
        setOpen(false);
        setShow(false);
      }
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", }} >
      <div style={{ height: 400, width: "40%" }}>
        {
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: '100%' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {
                    columns.map((col) => {
                      return(
                        <TableCell key={col.field}>{col.headerName}</TableCell>
                      )
                    })
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => {setChildData(row.programdetails); setShow(true);}}
                  >
                    <TableCell component="th" scope="row">{row.programname}</TableCell>
                    <TableCell>{row.programday}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell><Button color="error" variant="contained" onClick={() => handleOpen(row)}>SİL</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{actionData.programname}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {actionData.programday} gününe ait programı silmek istediğinize emin misiniz ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => { handleDelete(actionData.id) }}>SİL</Button>
          <Button color="info" onClick={handleClose}>İPTAL</Button>
        </DialogActions>
      </Dialog>
      {
        show && (
          <div style={{ height: 400, width: "53%" }}>
            <DataGrid
              rows={childData}
              columns={columns2}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        )
      }
    </div>
  );
}
