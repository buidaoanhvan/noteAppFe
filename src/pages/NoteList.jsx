import React from "react";
import { Flex, List, Typography } from "antd";
import { Link } from "react-router-dom";
import { FileTextOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import NoteNew from "./NoteNew";
dayjs.extend(relativeTime);

function NoteList() {
  const [notes, setNotes] = React.useState([]);
  const [loadingListNote, setLoadingListNote] = React.useState(true);

  React.useEffect(() => {
    setLoadingListNote(true);
    fetch("https://api.hub.id.vn/list/note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setNotes)
      .then(setLoadingListNote(false));
  }, []);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Typography.Title level={2}>Danh sách ghi chú</Typography.Title>
        <NoteNew />
      </div>
      <List
        dataSource={notes}
        itemLayout="horizontal"
        loading={loadingListNote}
        style={{
          height: "calc(100vh - 190px)",
          overflow: "auto",
        }}
        renderItem={(note) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <FileTextOutlined
                  style={{ fontSize: "48px", color: "#1677ff" }}
                />
              }
              title={<Link to={`/note/${note.id}`}>{note.title}</Link>}
              description={`${dayjs(note.createdAt).format(
                "HH:mm DD/MM/YYYY"
              )} (${dayjs(note.createdAt).fromNow()})`}
            />
          </List.Item>
        )}
      />
    </>
  );
}

export default NoteList;
