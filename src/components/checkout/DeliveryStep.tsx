import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BranchDelivery from "./BranchDelivery";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectCartItems,
  selectDeliveryMethod,
  setDeliveryMethod,
} from "../../redux/cart";
import { Tooltip } from "@mui/material";
import PostalDelivery from "./PostalDelivery";
import { UserDetail } from "@boklisten/bl-model";

type DeliveryMethods = {
  byMail: boolean;
  branch: boolean;
};

const deliveryOptions = ["branch", "postal"];
const getSelectedDeliveryOption = (tabIndex: number) =>
  deliveryOptions[tabIndex];

const DeliveryStep = ({
  userDetails,
  setWait,
  wait,
}: {
  userDetails: UserDetail | undefined;
  setWait: Dispatch<SetStateAction<boolean>>;
  wait: boolean;
}) => {
  const cartItems = useAppSelector(selectCartItems);
  const selectedDeliveryMethod = useAppSelector(selectDeliveryMethod);
  const dispatch = useAppDispatch();

  const getDefaultTabIndex = (deliveryMethods: DeliveryMethods): number => {
    if (selectedDeliveryMethod)
      return selectedDeliveryMethod === "branch" ? 0 : 1;

    return deliveryMethods.branch ? 0 : 1;
  };
  const deliveryMethods = (cartItems[0]?.branch.deliveryMethods ??
    {}) as DeliveryMethods;
  const [tabIndex, setTabIndex] = useState(getDefaultTabIndex(deliveryMethods));

  useEffect(() => {
    setWait(true);
  }, [setWait, selectedDeliveryMethod]);

  return (
    <>
      <Tabs value={tabIndex} aria-label="select delivery method">
        <Tooltip
          title={
            !deliveryMethods.branch
              ? "Henting på filial er ikke tilgjengelig på denne filialen."
              : ""
          }
        >
          <span>
            <Tab
              onClick={() => {
                setTabIndex(0);
                dispatch(setDeliveryMethod("branch"));
              }}
              icon={<StorefrontIcon />}
              value={tabIndex}
              label="På filial"
              disabled={!deliveryMethods.branch || wait}
            />
          </span>
        </Tooltip>
        <Tooltip
          title={
            !deliveryMethods.byMail
              ? "Sending per post er ikke tilgjengelig på denne filialen."
              : ""
          }
        >
          <span>
            <Tab
              onClick={() => {
                setTabIndex(1);
                dispatch(setDeliveryMethod("bring"));
              }}
              icon={<LocalShippingIcon />}
              value={tabIndex}
              label="Per post"
              disabled={!deliveryMethods.byMail || wait}
            />
          </span>
        </Tooltip>
      </Tabs>
      {getSelectedDeliveryOption(tabIndex) === "branch" ? (
        <BranchDelivery setWait={setWait} />
      ) : (
        userDetails && (
          <PostalDelivery setWait={setWait} userDetails={userDetails} />
        )
      )}
    </>
  );
};

export default DeliveryStep;
