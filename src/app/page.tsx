"use client";
import axios from "axios";
import Image from "next/image";
import styles from "./page.module.css";
import React, { useEffect, useState, useContext, useRef } from "react";
import {
  DeleteOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

import {
  Button,
  message,
  Upload,
  Tooltip,
  Form,
  Input,
  Select,
  Row,
  Col,
  Radio,
  Collapse,
} from "antd";
const { TextArea } = Input;
import type { RadioChangeEvent } from "antd";
import classNames from "classnames";

export default function Home() {
  const refInputCoverImage = useRef<any>(null);
  const [postId, setPostId] = useState();
  const [value, setValue] = useState<any>();
  const [uploadedImage, setUploadedImage] = useState<any>(null);
  const [status, setStatus] = useState(false);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const handleImgUpload = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      // const fd = new FormData();

      // // fd.append("about", userDetails?.about || "");
      // // fd.append("email", userDetails?.email || "");
      // fd.append("image", event.target.files[0]);
      setUploadedImage(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (status == true) {
      message.success("Thank You!");
      setTimeout(() => {
        location.reload();
      }, 1500);
    }
  }, [status]);

  const onFinish = async (values: {
    full_name: string;
    email: string;
    schoolNameAndYear: string;
    natureEvents: string;
    lawEnforcements: string;
    relevantInformationAndQuestions: string;
    // confirmPassword: string;
    // referralCode: string;
  }) => {
    const formData = new FormData();
    formData.append("full_name", values.full_name);
    formData.append("email", values.email);
    formData.append("schoolNameAndYear", values.schoolNameAndYear);
    formData.append("natureEvents", values.natureEvents);
    formData.append("lawEnforcements", values.lawEnforcements);
    formData.append(
      "relevantInformationAndQuestions",
      values.relevantInformationAndQuestions
    );
    formData.append("confidentially", value);
    formData.append("file", uploadedImage);

    const resp = await axios
      .post(
        "https://pqqbikrh72.us-east-1.awsapprunner.com/user/add",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            // Authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setStatus(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className={styles.main}>
      <h1>Campus Antisemitism Intake Form</h1>
      <p className={styles.sub_title}>
        Our mission is to help uncover and eliminate antisemitism on campus.
      </p>
      <p className={styles.sub_title_2}>
        If you would like to have somebody help you fill out this form, please
        contact us at:
      </p>
      <div className={styles.form}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            name="full_name"
            rules={[{ required: true, message: "This field is required" }]}
            style={{ marginBottom: 15 }}
          >
            <Input placeholder="Full Name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "This field is required",
              },
            ]}
            style={{ marginBottom: 15 }}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <div className={styles.custom_form}>
            <label>Upload Form (To attach videos, documents, images)</label>
            <Button
              style={{
                position: "relative",
                cursor: "pointer",
              }}
            >
              <UploadOutlined /> Add file{" "}
              <input
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  zIndex: 999,
                }}
                className="upload_input"
                type="file"
                accept="image/*"
                onChange={handleImgUpload}
              />
            </Button>
          </div>

          <Form.Item
            label="School Name and Graduation Year"
            name="schoolNameAndYear"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
            style={{ marginBottom: 15 }}
          >
            <Input
              placeholder="School Name and Graduation Year
"
            />
          </Form.Item>
          <div className={styles.custom_form}>
            <label>
              <span>*</span>Please describe the nature of the events.
            </label>
            <p>The best answers include:</p>
            <ul>
              <li>Date of the event</li>
              <li>Did the event happen to you or somebody else?</li>
              <li>
                Who was involved in the event (students, faculty, etc.; names
                not necessary)?
              </li>
              <li>
                Was the event off-campus or on-campus (incl. university
                affiliated housing)?
              </li>
              <li>Was physical violence involved? If so, of what nature?</li>
            </ul>
          </div>
          <Form.Item
            // label="Please describe the nature of the events."
            name="natureEvents"
            rules={[{ required: true, message: "This field is required" }]}
            style={{ marginBottom: 15 }}
          >
            <Input placeholder="Please Re-Enter Your Password" />
          </Form.Item>
          <div className={styles.custom_form}>
            <label>
              <span>*</span> Have you reached out to the administration or law
              enforcement and, if so, how?
            </label>
            <p>The best answers include:</p>
            <ul>
              <li>
                When did you reach out to the administration or law enforcement?
              </li>
              <li>
                How did you reach out to the administration or law enforcement
                (email, phone, etc.)?
              </li>
              <li>What did you include in your outreach?</li>
              <li>What kind of response did you get, if any?</li>
            </ul>
          </div>
          <Form.Item
            // label=""
            name="lawEnforcements"
            rules={[{ required: true, message: "This field is required" }]}
            style={{ marginBottom: 15 }}
          >
            <Input placeholder="Referral Code" />
          </Form.Item>
          <div className={styles.custom_form}>
            <label>
              Do you want or need to talk to somebody confidentially about the
              way the events have impacted you?
            </label>
            <Radio.Group onChange={onChange} value={value}>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </div>

          <Form.Item
            label="Any other relevant information, context, or questions you may have."
            name="relevantInformationAndQuestions"
            rules={[
              { required: false, message: "Please input referral code!" },
            ]}
            style={{ marginBottom: 15 }}
          >
            <TextArea placeholder="Referral Code"></TextArea>
          </Form.Item>

          <Form.Item className="login_btn_set">
            <Button className="red_btn" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
}
