import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import moment from "moment";
import ReactPlayer from "react-player";
import CustomNoRowsOverlay from "../../components/styledGridOverlay";

const columns = [
  { field: "lessonname", headerName: "Ders Adı", width: 200 },
  { field: "starttime", headerName: "Başlangıç Saati", width: 120 },
  { field: "endtime", headerName: "Bitiş Saati", width: 120 },
  { field: "notificationfile", headerName: "Zil Sesi", width: 350 },
];

const useStyles = makeStyles({
  skyBlue: {
    backgroundColor: "lightskyblue"
  }
});

function Home() {
  const [data, setData] = useState([]);
  const [start, setStart] = useState(false);
  const [play, setPlay] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    axios.get("http://localhost:3001/programs/todayprogram").then((res) => {
      if (res) {
        setData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    let timediff = moment().set({ hour: 23, minute: 59, second: 59}).diff(moment(), "seconds");
    timediff > 0 &&
      setTimeout(function () {
        axios.get("http://localhost:3001/programs/todayprogram").then((res) => {
          if (res) {
            setData(res.data);
          }
        }, timediff * 1000);
      })
    console.log(timediff);
  }, [])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: "4%",
        alignItems: "center",
      }}
    >
      <div style={{ height: 500, width: "55%", marginRight: "5%" }}>
        <h1>Günün Programı</h1>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7]}
          getRowClassName={(params) => { return moment().isBetween(moment(params.row.starttime, "HH:mm:ss").format("HH:mm"), moment(params.row.endtime, "HH:mm:ss").format("HH:mm")) ? classes.skyBlue : ""; }}
          components={{
            NoRowsOverlay: () => (
              CustomNoRowsOverlay()
            ),
          }}
        />
      </div>
      {
        data.length > 0 &&
          data.forEach((lesson) => {
            let starttimediff = moment().set({hour: lesson.starttime.substring(0, 2), minute: lesson.starttime.substring(3, 5), second: lesson.starttime.substring(6, 8)}).diff(moment(), "seconds");
            let endtimediff = moment().set({hour: lesson.endtime.substring(0, 2), minute: lesson.endtime.substring(3, 5), second: lesson.endtime.substring(6, 8)}).diff(moment(), "seconds");

              starttimediff > 0 &&
                setTimeout(function () {
                  setStart(true);
                  setPlay(true);
                }, starttimediff * 1000);

                endtimediff > 0 &&
                setTimeout(function () {
                  setStart(true);
                  setPlay(true);
                }, endtimediff * 1000);
          })
      }
      {
        start &&
            <ReactPlayer
              playing={play}
              url={`${data[0].notificationfile}`}
              controls={true}
              volume={1}
              width={500}
              height={320}
              onProgress={(state) => state.playedSeconds > 10 && (setPlay(false), setStart(false) )}
              config={{
                youtube: {
                  playerVars: { showinfo: 1 },
                },
                facebook: {
                  appId: "12345",
                },
                file: {},
              }}
            />
      }
    </div>
  );
}

export default Home;
