import React from "react";
import EditableQNA from "../src/components/EditableQna";
import { QNAs } from "../src/mockData";
import { render, within } from "../utils/test-utils";

test("displays the correct number of questions", async () => {
  const component = render(<EditableQNA QNAs={QNAs} />);
  const qnaEntries = component.getAllByTestId("qna-entry");
  expect(qnaEntries).toHaveLength(QNAs.length);

  for (const [index, qna] of QNAs.entries()) {
    const question = within(qnaEntries[index] as HTMLElement).getByText(
      qna?.question ?? ""
    );
    const answer = within(qnaEntries[index] as HTMLElement).getByText(
      qna?.answer ?? ""
    );
    expect(answer).toBeDefined();
    expect(question).toBeDefined();
  }
});
