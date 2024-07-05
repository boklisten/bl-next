import { Branch, OpeningHour } from "@boklisten/bl-model";
import moment from "moment";
import { Metadata } from "next";

import BlFetcher from "@/api/blFetcher";
import LinkableBranchInfo from "@/components/LinkableBranchInfo";
import BL_CONFIG from "@/utils/bl-config";
import { assertBlApiError } from "@/utils/types";

type Params = { params: { id: string } };

export const generateStaticParams = async () => {
  return await BlFetcher.get<Branch[]>(
    `${BL_CONFIG.collection.branch}?active=true`,
  );
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const branchData = await BlFetcher.get<Branch[]>(
    `${BL_CONFIG.collection.branch}/${params.id}`,
  );
  return {
    title: `${branchData?.[0]?.name ?? "Skoler og åpningstider"} | Boklisten.no`,
    description:
      "Skal du hente eller levere bøker? Finn ut når vi står på stand på din skole.",
  };
}
type BranchData = {
  branch: Branch | null;
  openingHours: OpeningHour[];
};

async function getBranchData(branchId: string): Promise<BranchData> {
  const branchUrl = `${BL_CONFIG.collection.branch}/${branchId}`;
  const now = moment().startOf("day").format("DDMMYYYYHHmm");
  const openingHoursUrl = `${BL_CONFIG.collection.openingHour}?branch=${branchId}&from=>${now}`;
  const branchData: BranchData = { branch: null, openingHours: [] };
  const [branchResult, openingHoursResult] = await Promise.allSettled([
    BlFetcher.get<Branch[]>(branchUrl),
    BlFetcher.get<OpeningHour[]>(openingHoursUrl),
  ]);

  if (branchResult.status === "fulfilled") {
    branchData.branch = branchResult.value[0] ?? null;
  } else {
    assertBlApiError(branchResult.reason);
  }

  if (openingHoursResult.status === "fulfilled") {
    branchData.openingHours = openingHoursResult.value;
  } else {
    assertBlApiError(openingHoursResult.reason);
  }

  return branchData;
}

const BranchPage = async ({ params }: Params) => {
  const { branch, openingHours } = await getBranchData(params.id);

  return (
    <LinkableBranchInfo branch={branch} openingHours={openingHours ?? []} />
  );
};

export default BranchPage;
