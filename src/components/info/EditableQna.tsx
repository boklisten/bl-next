import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveIcon from "@mui/icons-material/Save";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";

import { isAdmin } from "@/api/auth";

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
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

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
        {hydrated && isAdmin() && (
          <>
            <Tooltip title={edit ? "Lagre" : "Rediger"}>
              <IconButton
                data-testid="question-edit-button"
                onClick={() => {
                  if (edit) {
                    updateQuestion({
                      id: id,
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      //@ts-ignore
                      question: questionInput.current.value,
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
          </>
        )}
      </AccordionSummary>
      <AccordionDetails>
        {edit && (
          <Input
            inputRef={answerInput}
            sx={{ width: "100%" }}
            defaultValue={answer}
          />
        )}
        {!edit && (
          <Typography data-testid="qna-entry-answer">{answer}</Typography>
        )}
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

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        data-testid="qna-title"
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

      {hydrated && isAdmin() && (
        <Tooltip title="Legg til spørsmål">
          <IconButton
            data-testid="add-question-button"
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
      )}
    </Box>
  );
};

export default EditableQNA;
