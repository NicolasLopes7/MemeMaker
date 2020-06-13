import React, { useState, useEffect } from "react";
import { Wrapper, Card, Templates, Form, Button } from "./styles";
import logo from "../../assets/logo.svg";
export default function Home() {
  return (
    <Wrapper>
      <img src={logo} alt="logo" />
      <Card>
        <h2>Select a template</h2>
        <Templates>
          <button type="button">
            <img src="" alt="Template"></img>
          </button>
        </Templates>
        <h2>Texts</h2>
        <Form>
          <input placeholder="Texto" />
        </Form>
        <Button type="submit">Make My Meme!</Button>
      </Card>
    </Wrapper>
  );
}
