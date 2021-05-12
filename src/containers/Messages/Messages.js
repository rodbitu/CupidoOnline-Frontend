import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../../libs/errorLib";
import Form from "react-bootstrap/Form";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import config from "../../config";
import "./Messages.css";
import { s3Upload } from "../../libs/awsLib";

export default function Messages() {
  const file = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const [message, setMessage] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    function loadMessage() {
      return API.get("messages", `/messages/${id}`);
    }

    async function onLoad() {
      try {
        const message = await loadMessage();
        const { content, attachment } = message;

        if (attachment) {
          message.attachmentURL = await Storage.vault.get(attachment);
        }

        setContent(content);
        setMessage(message);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  function validateForm() {
    return content.length > 0;
  }
  
  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }
  
  function handleFileChange(event) {
    file.current = event.target.files[0];
  }
  
  function saveMessage(message) {
    return API.put("messages", `/messages/${id}`, {
      body: message
    });
  }
  
  async function handleSubmit(event) {
    let attachment;
  
    event.preventDefault();
  
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }
  
    setIsLoading(true);
  
    try {
      if (file.current) {
        attachment = await s3Upload(file.current);
      }
  
      await saveMessage({
        content,
        attachment: attachment || message.attachment
      });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function deleteMessage() {
    return API.del("messages", `/messages/${id}`);
  }
  
  async function handleDelete(event) {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setIsDeleting(true);
  
    try {
      await deleteMessage();
      history.push("/");
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
  }
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  return (
    <div className="Messages">
      {message && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="content">
            <Form.Control
              as="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="file">
            <Form.Label>Attachment</Form.Label>
            {message.attachment && (
              <p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={message.attachmentURL}
                >
                  {formatFilename(message.attachment)}
                </a>
              </p>
            )}
            <Form.Control onChange={handleFileChange} type="file" />
          </Form.Group>
          <LoaderButton
            block
            size="lg"
            type="submit"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            size="lg"
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </Form>
      )}
    </div>
  );
}