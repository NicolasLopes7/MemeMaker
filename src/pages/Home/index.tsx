import React, { useState, useEffect } from "react";
import { Wrapper, Card, Templates, Form, Button } from "./styles";
import logo from "../../assets/logo.svg";
import { api } from "../../services/api";

export default function Home() {
  interface TemplateInterface {
    id: number;
    url: string;
    name: string;
    box_count: number;
  }
  const [templates, setTemplates] = useState<TemplateInterface[]>([]);
  const [
    selectedTemplate,
    setSelectedTemplate,
  ] = useState<TemplateInterface | null>(null);

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
            <button
              key={template.id}
              type="button"
              onClick={() => setSelectedTemplate(template)}
              className={template.id === selectedTemplate?.id ? "selected" : ""}
            >
              <img src={template.url} alt={template.name} />
            </button>
          ))}
        </Templates>
        {selectedTemplate && (
          <>
            <h2>Texts</h2>
            <Form>
              {new Array(selectedTemplate.box_count)
                .fill("")
                .map((_, index) => (
                  <input
                    key={String(Math.random())}
                    placeholder={`Text #${index}`}
                  />
                ))}
            </Form>
          </>
        )}
        <Button type="submit">Make My Meme!</Button>
      </Card>
    </Wrapper>
  );
}
