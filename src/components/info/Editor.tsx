import React from "react";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Button, Container } from "@mui/material";
import { isAdmin } from "api/auth";

const Editor = dynamic(
  // @ts-ignore
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  { ssr: false }
);

const sanitizeRawState = (raw: string) => {
  return raw.replaceAll("\n", "\\n");
};

const getEditorStateFromRaw = (rawState: string) => {
  try {
    return EditorState.createWithContent(
      convertFromRaw(JSON.parse(sanitizeRawState(rawState)))
    );
  } catch (error) {
    console.error(error);
    return EditorState.createEmpty();
  }
};

const CustomEditor = ({ rawEditorState }: { rawEditorState: string }) => {
  const initialEditorState = rawEditorState
    ? getEditorStateFromRaw(rawEditorState)
    : EditorState.createEmpty();

  const [editorState, setEditorState] = useState(initialEditorState);

  const rawState = JSON.stringify(
    convertToRaw(editorState.getCurrentContent())
  );

  const [readOnly, setReadOnly] = useState(true);

  const onEditorStateChange = (changedState: EditorState) => {
    setEditorState(changedState);
  };

  const onSave = () => {
    console.log(rawState);
    setReadOnly(!readOnly);
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      data-testid="editor"
    >
      {isAdmin() && (
        <Button
          data-testid="edit-button"
          sx={{ width: { xs: "100%", sm: "" }, paddingX: 5 }}
          onClick={onSave}
        >
          {readOnly ? "Rediger" : "Lagre"}
        </Button>
      )}
      <Editor
        // @ts-ignore
        editorState={editorState}
        toolbarHidden={!isAdmin() || readOnly}
        onEditorStateChange={onEditorStateChange}
        readOnly={!isAdmin() || readOnly}
        wrapperStyle={{ width: "100%" }}
      />
    </Container>
  );
};

export default CustomEditor;
