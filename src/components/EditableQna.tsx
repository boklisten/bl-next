import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useRef, useState } from "react";
import { Box } from "@mui/system";

interface QNA {
  id: string;
  question: string;
  answer: string;
}

// eslint-disable-next-line no-unused-vars
const QuestionWithAnswer = ({
  id,
  question,
  answer,
  expanded,
  handleExpand,
  updateQuestion,
  deleteQuestion,
}: QNA & {
  expanded: boolean;
  // eslint-disable-next-line no-unused-vars
  handleExpand: (questionId: string) => void;
  // eslint-disable-next-line no-unused-vars
  updateQuestion: (QNA: QNA) => void;
  // eslint-disable-next-line no-unused-vars
  deleteQuestion: (questionId: string) => void;
}) => {
  const [edit, setEdit] = useState(false);
  const questionInput = useRef();
  const answerInput = useRef();

  return (
    <Accordion
      data-testid="qna-entry"
      expanded={expanded}
      sx={{ width: "100%" }}
      onChange={() => handleExpand(id)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="question-content"
        sx={{ display: "flex" }}
      >
        {edit && (
          <Input
            inputRef={questionInput}
            sx={{ flexGrow: 1 }}
            defaultValue={question}
          />
        )}
        {!edit && <Typography sx={{ flexGrow: 1 }}>{question}</Typography>}
        <Tooltip title={edit ? "Lagre" : "Rediger"}>
          <IconButton
            onClick={() => {
              if (edit) {
                updateQuestion({
                  id: id,
                  //@ts-ignore
                  question: questionInput.current.value,
                  //@ts-ignore
                  answer: answerInput.current.value,
                });
              }
              setEdit(!edit);
            }}
          >
            {edit ? <SaveIcon /> : <EditIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Slett">
          <IconButton onClick={() => deleteQuestion(id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </AccordionSummary>
      <AccordionDetails>
        {edit && (
          <Input
            inputRef={answerInput}
            sx={{ width: "100%" }}
            defaultValue={answer}
          />
        )}
        {!edit && <Typography>{answer}</Typography>}
      </AccordionDetails>
    </Accordion>
  );
};
const EditableQNA = ({ QNAs }: { QNAs: QNA[] }) => {
  const [expandedQuestionId, setExpandedQuestionId] = useState("");
  const handleExpand = (questionId: string) => {
    if (questionId === expandedQuestionId) {
      setExpandedQuestionId("");
      return;
    }
    setExpandedQuestionId(questionId);
  };

  const updateQuestion = (QNA: QNA) => {
    const questionIndex = QNAs.findIndex((q) => q.id === QNA.id);
    QNAs[questionIndex] = QNA;
  };

  const deleteQuestion = (questionId: string) => {
    QNAs = QNAs.filter((QNA) => QNA.id !== questionId);
  };
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", marginTop: 4, marginBottom: 2 }}
      >
        Spørsmål og svar
      </Typography>
      {QNAs.map((QNA) => (
        <QuestionWithAnswer
          deleteQuestion={deleteQuestion}
          updateQuestion={updateQuestion}
          handleExpand={handleExpand}
          expanded={expandedQuestionId === QNA.id}
          key={QNA.id}
          {...QNA}
        />
      ))}
      <Tooltip title="Legg til spørsmål">
        <IconButton
          onClick={() =>
            QNAs.push({
              id: "foo",
              question: "nytt spørsmål",
              answer: "nytt svar",
            })
          }
        >
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default EditableQNA;
