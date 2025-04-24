import { Layout, Form, Button, Input, Alert } from "antd";

import { useState } from "react";
import { backendUrl } from "../../config";
const { Content } = Layout;

const Counter = () => {
  const [char, setChar] = useState("");
  const [count, setCount] = useState(null);
  const [error, setError] = useState(false);
  const fetchCitysCount = async () => {
    if (char.length !== 1) {
      setError(true);
      return;
    }
    setError(false);

    try {
      const response = await fetch(`${backendUrl}/city-count?letter=${char}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const count = await response.json();
      setCount(count);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Layout>
      <Layout.Header style={{ display: "flex", alignItems: "center" }}>
        <h1 className="logo">City Counter App</h1>
      </Layout.Header>
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            minHeight: 280,
            padding: 24,
          }}
        >
          {error && (
            <Alert
              message="Error"
              description="Please validate your Input"
              type="error"
              showIcon
            />
          )}
          <br />{" "}
          <Form layout="inline">
            <Form.Item label="Enter a Letter">
              <Input
                placeholder="input"
                maxLength={1}
                value={char}
                onChange={(e) => setChar(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={fetchCitysCount}>
                Submit
              </Button>
            </Form.Item>
          </Form>
          <br />
          {count !== null && (
            <Alert
              message="Success"
              description={`Total City Count is ${count}`}
              type="success"
              showIcon
            />
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default Counter;
