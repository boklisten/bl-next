import { Branch, OpeningHour } from "@boklisten/bl-model";
import moment from "moment";
import { Metadata } from "next";

import { fetcher } from "@/api/requests";
import LinkableBranchInfo from "@/components/LinkableBranchInfo";
import BL_CONFIG from "@/utils/bl-config";

type Params = { params: { id: string } };

export const generateStaticParams = async () => {
  const branchesUrl = `${BL_CONFIG.api.basePath}branches?og=id&active=true`;
  return (await fetcher<Branch[]>(branchesUrl)) ?? [];
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const branchData = await fetcher<Branch[]>(
    `${BL_CONFIG.api.basePath}branches/${params.id}`,
  );
  return {
    title: `${branchData?.[0]?.name ?? "Skoler og åpningstider"} | Boklisten.no`,
    description:
      "Skal du hente eller levere bøker? Finn ut når vi står på stand på din skole.",
  };
}

async function getBranchData(branchId: string) {
  if (branchId === "select") {
    return { branch: null, openingHours: [] };
  }
  const branchUrl = `${BL_CONFIG.api.basePath}branches/${branchId}?og=name&og=location.address&og=openingHours`;
  const now = moment().startOf("day").format("DDMMYYYYHHmm");
  const openingHoursUrl = `${BL_CONFIG.api.basePath}openingHours?branch=${branchId}&from=>${now}&og=to&og=from`;
  const [branchData, openingHoursData] = await Promise.all([
    fetcher<Branch[]>(branchUrl),
    fetcher<OpeningHour[]>(openingHoursUrl),
  ]);

  return {
    branch: branchData?.[0] ?? null,
    openingHours: openingHoursData,
  };
}

const BranchPage = async ({ params }: Params) => {
  const { branch, openingHours } = await getBranchData(params.id);

  return (
    <LinkableBranchInfo branch={branch} openingHours={openingHours ?? []} />
  );
};

export default BranchPage;
