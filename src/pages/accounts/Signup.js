import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import axios from "axios";
import { parseErrorMessages } from "utils/forms";

export default function Signup({ history }) {
  // const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});

  const onFinish = async (values) => {
    const { username, password } = values;
    setFieldErrors({});
    const data = { username, password };
    try {
      await axios.post("http://localhost:8000/accounts/signup/", data);

      notification.open({
        message: "회원가입 성공",
        description: "로그인 페이지로 이동합니다.",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      });

      history.push("/accounts/login");
    } catch (error) {
      if (error.response) {
        notification.open({
          message: "회원가입 실패",
          description: "아이디/암호를 확인해주세요.",
          icon: <FrownOutlined style={{ color: "#ff3333" }} />,
        });

        const { data: fieldsErrorMessages } = error.response;
        // fieldsErrorMessages => { username: "m1 m2", password: [] }
        // python: mydict.items()
        setFieldErrors(parseErrorMessages(fieldsErrorMessages));
      }
    }
  };

  return (
    <Form
      {...layout}
      onFinish={onFinish}
      autoComplete={"false"}
      //   onFinishFailed={onFinishFailed}
    >
      {JSON.stringify(fieldErrors)}
      <Form.Item
        label="Username"
        name="username"
        rules={[
          { required: true, message: "Please input your username!" },
          { min: 5, message: "5글자 입력해주세요." },
        ]}
        hasFeedback
        {...fieldErrors.username}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
        {...fieldErrors.password}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
