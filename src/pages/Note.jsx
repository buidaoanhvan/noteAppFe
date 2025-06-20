import React from "react";
import { Typography } from "antd";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useParams } from "react-router-dom";
import { SyncOutlined, FileTextOutlined } from "@ant-design/icons";

function Note() {
  const { id } = useParams();
  const [content, setContent] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [sysn, setSysn] = React.useState(false);

  const handleChange = (newContent) => {
    setSysn(true);
    setContent(newContent);
    fetch("https://api.hub.id.vn/update/note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Number(id), body: newContent }),
    })
      .then((res) => res.json())
      .then(() => {
        setSysn(false);
      })
      .catch(() => {
        setSysn(true);
      });
  };

  React.useEffect(() => {
    fetch("https://api.hub.id.vn/get/note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Number(id) }),
    })
      .then((res) => res.json())
      .then((note) => {
        setTitle(note.title);
        setContent(note.body);
      });
  }, [id]);

  return (
    <>
      <Typography.Title level={2}>
        <FileTextOutlined /> {title}
        {sysn ? (
          <SyncOutlined
            spin
            style={{ fontSize: 20, margin: 5, color: "#ee0033" }}
          />
        ) : (
          ""
        )}
      </Typography.Title>
      <SunEditor
        height="calc(100vh - 250px)"
        setContents={content}
        onChange={handleChange}
        setOptions={{
          buttonList: [
            [
              "undo",
              "redo",
              "font",
              "fontSize",
              "formatBlock",
              "paragraphStyle",
              "blockquote",
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
              "fontColor",
              "hiliteColor",
              "textStyle",
              "removeFormat",
              "outdent",
              "indent",
              "align",
              "horizontalRule",
              "list",
              "lineHeight",
              "table",
              "link",
              "image",
              "video",
              "audio",
              "fullScreen",
              "showBlocks",
              "codeView",
              "preview",
              "print",
              "save",
              "template",
            ],
          ],
        }}
      />
    </>
  );
}
export default Note;
