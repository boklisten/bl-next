import { EditableText } from "@boklisten/bl-model";

import { apiFetcher, NotFoundError } from "@/api/api";
import BL_CONFIG from "@/utils/bl-config";
import { MaybeEmptyEditableText } from "@/utils/types";

const useEditableText = async (
  editableTextId: string,
): Promise<MaybeEmptyEditableText> => {
  try {
    const [result] = await apiFetcher<[EditableText]>(
      `${BL_CONFIG.collection.editableText}/${editableTextId}`,
    );
    return result;
  } catch (error) {
    if (!(error instanceof NotFoundError)) {
      console.error(
        "Could not fetch EditableText and it was not a 404:",
        error,
      );
    }
    return {
      id: editableTextId,
      text: null,
    };
  }
};

export default useEditableText;
