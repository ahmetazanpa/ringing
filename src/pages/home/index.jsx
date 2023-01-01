import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import axios from "axios";
import moment from "moment";
import ReactPlayer from "react-player";

const columns = [
  { field: "lessonname", headerName: "Ders Adı", width: 200 },
  { field: "starttime", headerName: "Başlangıç Saati", width: 120 },
  { field: "endtime", headerName: "Bitiş Saati", width: 120 },
  { field: "notificationfile", headerName: "Zil Sesi", width: 350 },
];

function Home() {
  const [data, setData] = useState([]);
  const [start, setStart] = useState(false);
  const [play, setPlay] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/programs/todayprogram").then((res) => {
      if (res) {
        setData(res.data);
      }
    });
  }, []);

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
          components={{
            NoRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                Bugün için planlanmış program bulunmamaktadır.
              </Stack>
            ),
          }}
        />
      </div>
      {
        data.length > 0 &&
          data.map((lesson) => {
            let timediff = moment().set({hour: lesson.starttime.substring(0, 2), minute: lesson.starttime.substring(3, 5), second: lesson.starttime.substring(6, 8)}).diff(moment(), "seconds");
              timediff > 0 &&
                setTimeout(function () {
                  setStart(true);
                  setPlay(true);
                }, timediff * 1000);
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
