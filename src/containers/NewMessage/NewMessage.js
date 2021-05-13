import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import { onError } from "../../libs/errorLib";
import config from "../../config";
import { API } from "aws-amplify";
import "./NewMessage.css";

export default function NewMessage() {
  const file = useRef(null);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }
  
    setIsLoading(true);
    console.log(email, name, content)
    try {
      await createMessage({ content });
      alert("Mensagem enviada!");
      history.push("/");
    } catch (e) {
      onError(e);
      alert("Mensagem não enviada!");
      setIsLoading(false);
    }
  }
  
  function createMessage() {
    return API.post("messages", "/messages", {
      body: {
        name,
        email,
        content
      }
    });
  }
  

  return (
    <div className="containerNM">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            as="input"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email de crush.."
          />
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            as="input"
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome de seu crush.."
          />
        </Form.Group>
        <Form.Group controlId="content">
        <label htmlFor="mensagem">Mensagem</label>
        <textarea
          as="textarea"
          onChange={(e) => setContent(e.target.value)}
          placeholder="Mensagem romântica para seu crush.."
        ></textarea>
        </Form.Group>
        <LoaderButton block size="lg" type="submit" isLoading={isLoading}
          disabled={!validateForm()}>
          Enviar
        </LoaderButton>
      </Form>
    </div>
  );
}


