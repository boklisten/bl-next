import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const Editor = dynamic(
  // @ts-ignore
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  { ssr: false }
);

const CustomEditor = () => {
  // These two needs to be set
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const readOnly = false;

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
    <Editor
      // @ts-ignore
      editorState={editorState}
      toolbarStyle={{ display: display }}
      editorStyle={{ border: "1px solid black", padding: "10px" }}
      onEditorStateChange={onEditorStateChange}
      readOnly={readOnly}
    />
  );
};

export default CustomEditor;
