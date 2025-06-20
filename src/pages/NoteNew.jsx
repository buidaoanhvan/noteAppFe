import React from "react";
import { Button, Modal, Form, Input } from "antd";

function NoteNew() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    setIsLoading(true);
    fetch("https://api.hub.id.vn/new/note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: values.title, body: "" }),
    }).then((res) => {
      res.json();
      setIsLoading(false);
      setIsModalOpen(false);
    });
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Thêm mới
      </Button>
      <Modal
        title="Tạo mới ghi chú"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={isLoading}
      >
        <Form name="basic" onFinish={onFinish} form={form} layout="vertical">
          <Form.Item
            label="Tên ghi chú"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default NoteNew;
