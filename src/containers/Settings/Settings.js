import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "../../libs/errorLib";
import config from "../../config";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../../components/LoaderButton/LoaderButton";

export default function Settings() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="Settings">
      <center>
      <LinkContainer to="/settings/password">
        <LoaderButton variant="primary">
          Mudar Senha
        </LoaderButton>
      </LinkContainer>
      <hr />
      </center>
    </div>
  );
}