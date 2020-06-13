import React, { useState, useEffect } from "react";
import { Wrapper, Card, Templates, Form, Button } from "./styles";
import logo from "../../assets/logo.svg";
import { api } from "../../services/api";

export default function Home() {
  interface TemplateInterface {
    id: number;
    url: string;
    name: string;
    count: number;
  }
  const [templates, setTemplates] = useState<TemplateInterface[]>([]);

  useEffect(() => {
    (async () => {
      const response = await api.get("/get_memes");
      const {
        data: { memes },
      } = response.data;

      setTemplates(memes);
    })();
  }, []);
  return (
    <Wrapper>
      <img src={logo} alt="logo" />
      <Card>
        <h2>Select a template</h2>
        <Templates>
          {templates.map((template) => (
            <button key={template.id} type="button">
              <img src={template.url} alt={template.name} />
            </button>
          ))}
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
