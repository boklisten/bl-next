import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Button, Container } from "@mui/material";

const Editor = dynamic(
  // @ts-ignore
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  { ssr: false }
);

const sanitizeRawState = (raw: string) => {
  return raw.replaceAll("\n", "\\n");
};

// TODO: Write tests for editor
const CustomEditor = ({ rawEditorState }: { rawEditorState: string }) => {
  // TODO: handle fetching and storing in api
  //

  // TODO: Use this func to get the state from the raw in mongodb
  const getEditorStateFromRaw = (rawState: string) => {
    try {
      return EditorState.createWithContent(
        convertFromRaw(JSON.parse(sanitizeRawState(rawState)))
      );
    } catch {
      // TODO: display error: illegal symbol
      return EditorState.createEmpty();
    }
  };

  const initialEditorState = rawEditorState
    ? getEditorStateFromRaw(rawEditorState)
    : EditorState.createEmpty();
  const [editorState, setEditorState] = useState(initialEditorState);

  // TODO: Store this in mongodb
  const rawState = JSON.stringify(
    convertToRaw(editorState.getCurrentContent())
  );

  // TODO: fetch permission
  const [readOnly, setReadOnly] = useState(true);

  const onEditorStateChange = (changedState: EditorState) => {
    // Store in db?

    setEditorState(changedState);
    console.log(rawState);
  };

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
        toolbarHidden={readOnly}
        onEditorStateChange={onEditorStateChange}
        readOnly={readOnly}
        wrapperStyle={{ width: "100%" }}
      />
    </Container>
  );
};

export default CustomEditor;
