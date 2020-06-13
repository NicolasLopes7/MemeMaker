import React, { useState, useEffect } from "react";
import { Wrapper, Card, Templates, Form, Button } from "./styles";
import logo from "../../assets/logo.svg";
import { api } from "../../services/api";
import qs from "qs";

export default function Home() {
  interface TemplateInterface {
    id: number;
    url: string;
    name: string;
    box_count: number;
  }

  interface CreateMeme {
    template_id: number | undefined;
    username: string;
    password: string;
    boxes: { text: string }[];
  }

  const [templates, setTemplates] = useState<TemplateInterface[]>([]);
  const [
    selectedTemplate,
    setSelectedTemplate,
  ] = useState<TemplateInterface | null>(null);

  const [boxes, setBoxes] = useState<string[]>([]);
  const [generatedMeme, setGeneratedMeme] = useState<string | null>(null);
  const handleInputChange = (index: number) => (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const newValues = boxes;
    newValues[index] = e.currentTarget.value;
    setBoxes(newValues);
  };

  const handleSelectTemplate = (template: TemplateInterface) => {
    setSelectedTemplate(template);
    setBoxes([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: CreateMeme = {
      template_id: selectedTemplate?.id,
      username: "vikayel543",
      password: "vikayel543",
      boxes: boxes.map((text) => ({ text })),
    };

    const params = qs.stringify(body);

    const response = await api.get(`/caption_image?${params}`);
    const {
      data: { url },
    } = response.data;
    setGeneratedMeme(url);
  };

  const handleReset = () => {
    setSelectedTemplate(null);
    setBoxes([]);
    setGeneratedMeme(null);
  };

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
        {generatedMeme && (
          <>
            <img
              src={generatedMeme}
              alt="Generated Meme"
              style={{ marginBottom: "10px" }}
            />
            <Button type="button" onClick={handleReset}>
              Create other meme
            </Button>
          </>
        )}
        {!generatedMeme && (
          <>
            <h2>Select a template</h2>
            <Templates>
              {templates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleSelectTemplate(template)}
                  className={
                    template.id === selectedTemplate?.id ? "selected" : ""
                  }
                >
                  <img src={template.url} alt={template.name} />
                </button>
              ))}
            </Templates>
            {selectedTemplate && (
              <>
                <h2>Texts</h2>
                <Form onSubmit={handleSubmit}>
                  {new Array(selectedTemplate.box_count)
                    .fill("")
                    .map((_, index) => (
                      <input
                        key={String(Math.random())}
                        placeholder={`Text #${index + 1}`}
                        onChange={handleInputChange(index)}
                      />
                    ))}
                  <Button type="submit">Make My Meme!</Button>
                </Form>
              </>
            )}
          </>
        )}
      </Card>
    </Wrapper>
  );
}
