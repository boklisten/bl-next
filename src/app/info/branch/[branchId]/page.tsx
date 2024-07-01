import { Branch } from "@boklisten/bl-model";
import moment from "moment";
import { Metadata } from "next";

import { fetcher } from "@/api/requests";
import LinkableBranchInfo from "@/components/LinkableBranchInfo";
import BL_CONFIG from "@/utils/bl-config";

export const generateStaticParams = async () => {
  const branchesUrl = `${BL_CONFIG.api.basePath}branches?og=id&active=true`;
  const branches = (await fetcher(branchesUrl)) as Branch[];
  return branches.map((branch) => ({ branchId: branch.id }));
};

export const metadata: Metadata = {
  title: "Skoler og åpningstider | Boklisten.no",
  description:
    "Skal du hente eller levere bøker? Finn ut når vi står på stand på din skole.",
};

async function getBranchData(branchId: string) {
  if (branchId === "select") {
    return { branch: null, openingHours: [] };
  }
  const branchUrl = `${BL_CONFIG.api.basePath}branches/${branchId}?og=name&og=location.address&og=openingHours`;
  const now = moment().startOf("day").format("DDMMYYYYHHmm");
  const openingHoursUrl = `${BL_CONFIG.api.basePath}openingHours?branch=${branchId}&from=>${now}&og=to&og=from`;
  const [branchData, openingHoursData] = await Promise.all([
    fetcher(branchUrl),
    fetcher(openingHoursUrl),
  ]);

  return {
    branch: branchData?.[0] ?? {},
    openingHours: openingHoursData,
  };
}

const BranchPage = async ({ params }: { params: { branchId: string } }) => {
  const { branch, openingHours } = await getBranchData(params.branchId);

  return <LinkableBranchInfo branch={branch} openingHours={openingHours} />;
};

export default BranchPage;
