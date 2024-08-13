import moment from "moment/moment";
import { RegisterOptions } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import isPostalCode from "validator/lib/isPostalCode";

import BlFetcher from "@/api/blFetcher";
import { UserEditorFields } from "@/components/user/user-detail-editor/useUserDetailEditorForm";
import BL_CONFIG from "@/utils/bl-config";

export const fieldValidators: {
  [K in keyof UserEditorFields]: RegisterOptions<UserEditorFields>;
} = {
  email: {
    required: "Du må fylle inn e-post",
    validate: (v) => (isEmail(v) ? true : "Du må fylle inn en gyldig e-post"),
  },
  password: {
    required: "Du må fylle inn passord",
    minLength: {
      value: 10,
      message: "Passordet må minst ha 10 tegn",
    },
  },
  name: {
    required: "Du må fylle inn navn",
  },
  phoneNumber: {
    required: "Du må fylle inn telefonnummer",
    validate: (v) =>
      isMobilePhone(v, "nb-NO")
        ? true
        : "Du må fylle inn et gyldig norsk telefonnummer (uten mellomrom og +47)",
    minLength: {
      value: 8,
      message: "Telefonnummeret må være 8 tegn langt (uten mellomrom og +47)",
    },
    maxLength: {
      value: 8,
      message: "Telefonnummeret må være 8 tegn langt (uten mellomrom og +47)",
    },
  },
  address: {
    required: "Du må fylle inn adresse",
  },
  postalCode: {
    required: "Du må fylle inn postnummer",
    validate: async (v) => {
      const illegalPostalCodeMessage = "Du må oppgi et gyldig norsk postnummer";
      if (!isPostalCode(v, "NO")) {
        return illegalPostalCodeMessage;
      }

      const response = await BlFetcher.post<
        [
          {
            postalCity: string | null;
          },
        ]
      >(
        `${BL_CONFIG.collection.delivery}/${BL_CONFIG.delivery.postalCodeLookup.operation}`,
        { postalCode: v },
      );

      if (!response[0].postalCity) {
        return illegalPostalCodeMessage;
      }

      return true;
    },
  },
  birthday: {
    required: "Du må fylle inn fødselsdato",
    valueAsDate: true,
    validate: (v) =>
      v?.isValid() &&
      v.isAfter(moment().subtract(100, "years")) &&
      v.isBefore(moment().subtract(10, "years"))
        ? true
        : "Du må fylle inn en gyldig fødselsdato",
  },
  guardianName: {
    required: "Du må fylle inn foresatt sitt fulle navn",
  },
  guardianEmail: {
    required: "Du må fylle inn foresatt sin epost",
    validate: (v) =>
      isEmail(v) ? true : "Du må fylle inn en gyldig e-post for foresatt",
  },
  guardianPhoneNumber: {
    required: "Du må fylle inn foresatt sitt telefonnummer",
    validate: (v) =>
      isMobilePhone(v, "nb-NO")
        ? true
        : "Du må fylle inn et gyldig norsk telefonnummer (uten mellomrom og +47)",
    minLength: {
      value: 8,
      message: "Telefonnummeret må være 8 tegn langt (uten mellomrom og +47)",
    },
    maxLength: {
      value: 8,
      message: "Telefonnummeret må være 8 tegn langt (uten mellomrom og +47)",
    },
  },
  agreeToTermsAndConditions: {
    required: "Du må godta våre betingelser og vilkår",
  },
};
