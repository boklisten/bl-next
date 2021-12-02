import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Button, Container } from "@mui/material";

const Editor = dynamic(
  // @ts-ignore
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  { ssr: false }
);

const CustomEditor = () => {
  // These two needs to be set
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [readOnly, setReadOnly] = useState(true);

  // TODO: Store this in mongodb
  // const rawState = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

  // TODO: Use this func to get the state from the raw in mongodb
  // const getEditorStateFromRaw = (rawState: string) => EditorState.createWithContent(convertFromRaw(JSON.parse(rawState)));

  const onEditorStateChange = (changedState: EditorState) => {
    // Store in db?

    setEditorState(changedState);
  };
  const display = readOnly ? "none" : "flex";
  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Button
        sx={{ width: { xs: "100%", sm: "" }, paddingX: 5 }}
        onClick={() => setReadOnly(!readOnly)}
      >
        {readOnly ? "Rediger" : "Lagre"}
      </Button>
      <Editor
        // @ts-ignore
        editorState={editorState}
        toolbarStyle={{ display: display }}
        onEditorStateChange={onEditorStateChange}
        readOnly={readOnly}
      />
    </Container>
  );
};

export default CustomEditor;
