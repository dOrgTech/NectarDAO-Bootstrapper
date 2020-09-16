import React, { useState } from "react";
import styled from "styled-components";
import { Input, Button } from "@material-ui/core";

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 65px;
  height: 250px;
  justify-content: space-evenly;
  align-items: center;
  background: #172333;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const BeehiveLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    console.log(username, password);
  };

  const onChangeUsername = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    console.log(event);
    setUsername(event.currentTarget.value);
  };

  const onChangePassword = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    console.log(event);
    setPassword(event.currentTarget.value);
  };

  return (
    <PageWrapper>
      <InputsContainer>
        <Input
          placeholder={"Username"}
          value={username}
          onChange={onChangeUsername}
        />
        <Input
          placeholder={"Password"}
          value={password}
          onChange={onChangePassword}
        />
        <Button
          variant={"outlined"}
          color={"primary"}
          onClick={onSubmit}
          fullWidth={true}
        >
          Login
        </Button>
      </InputsContainer>
    </PageWrapper>
  );
};
