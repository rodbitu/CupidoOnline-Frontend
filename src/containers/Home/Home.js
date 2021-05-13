import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../../libs/contextLib";
import { onError } from "../../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import Icon from './img/cupido.png'


export default function Home() {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        const messages = await loadMessages();
        setMessages(messages);
      } catch (e) {
        onError(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [isAuthenticated]);

  function loadMessages() {
    return API.get("messages", "/messages");
  }


  function renderMessagesList(messages) {
    return (
      <>
        <LinkContainer to="/messages/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Crie uma nova mensagem</span>
          </ListGroup.Item>
        </LinkContainer>
        {messages.map(({ messageId, content, createdAt }) => (
          <LinkContainer key={messageId} to={`/notes/${messageId}`}>
            <ListGroup.Item action>
              <span className="font-weight-bold">
                {content.trim().split("\n")[0]}
              </span>
              <br />
              <span className="text-muted">
                Created: {new Date(createdAt).toLocaleString()}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <img src={Icon}></img>
        <h1>Cupido Online</h1>
        <p className="text-muted">O Cupido Online é um site para você ter uma conexão com seu par ideal!</p>
        <p className="text-muted">Mostre seu carinho por alguém enviando um email a essa pessoa..</p>

      </div>
    );
  }

  function renderMessages() {
    return (
      <div className="messages">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Crie uma mensagem para seu crush</h2>
        <ListGroup>{!isLoading && renderMessagesList(messages)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderMessages() : renderLander()}
    </div>
  );
}