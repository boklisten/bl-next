import { Alert, Card, Typography } from "@mui/material";
import type { NextPage } from "next";
import DynamicNav from "../../../components/info/DynamicNav";
import { infoPageTabs } from "../../../utils/constants";
import Head from "next/head";
import { fetcher } from "api/requests";
import BranchInfo from "components/info/BranchInfo";
import BL_CONFIG from "utils/bl-config";
import { useRouter } from "next/router";
import { Branch, OpeningHour } from "@boklisten/bl-model";
import ContactInfo from "components/info/ContactInfo";
import BranchSelect from "components/BranchSelect";
import { Box } from "@mui/system";
import { selectBranch } from "redux/selectedBranch";
import { useAppSelector } from "redux/hooks";
import moment from "moment";

export const getStaticPaths = async () => {
  const branchesUrl = `${BL_CONFIG.api.basePath}branches?og=id&active=true`;
  const branches = (await fetcher(branchesUrl)) as Branch[];
  const branchPaths = branches.map((branch) => ({
    params: { branchId: branch.id },
  }));
  return {
    paths: branchPaths,
    fallback: "blocking",
  };
};

export async function getStaticProps({
  params,
}: {
  params: { branchId: string };
}) {
  if (params.branchId === "select") {
    return {
      props: { branch: {}, openingHours: [] },
    };
  }
  const branchUrl = `${BL_CONFIG.api.basePath}branches/${params.branchId}?og=name&og=location.address&og=openingHours`;
  const now = moment().startOf("day").format("DDMMYYYYHHmm");
  const openingHoursUrl = `${BL_CONFIG.api.basePath}openingHours?branch=${params.branchId}&from=>${now}&og=to&og=from`;
  const [branchData, openingHoursData] = await Promise.all([
    fetcher(branchUrl),
    fetcher(openingHoursUrl),
  ]);

  return {
    props: { branch: branchData?.[0] ?? {}, openingHours: openingHoursData },
    revalidate: 10,
  };
}

const BranchPage: NextPage<{ branch: Branch; openingHours: OpeningHour[] }> = ({
  branch,
  openingHours,
}) => {
  const router = useRouter();
  const { branchId } = router.query;
  const selectedBranch = useAppSelector(selectBranch);

  if (branchId === "select" && selectedBranch.id.length > 0) {
    router.push(`/info/branch/${selectedBranch.id}`);
  }

  return (
    <>
      <Head>
        <title>Skoler og åpningstider | Boklisten.no</title>
        <meta
          name="description"
          content="Skal du hente eller levere bøker? Finn ut når vi står på stand på din skole."
        />
      </Head>
      <Card>
        <DynamicNav tabs={infoPageTabs} twoRows />
        {branchId === "select" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{ textAlign: "center", marginTop: 4, marginBottom: 2 }}
            >
              Velg din skole
            </Typography>
            <BranchSelect />
          </Box>
        )}
        {branch?.name && (
          <BranchInfo branch={branch} openingHours={openingHours} />
        )}
        {branchId !== "select" && !branch?.name && (
          <Alert severity="error" data-testid="api-error">
            Fant ingen åpningstider for skole med id:
            <Typography fontStyle="italic">{branchId}</Typography>
            Dersom du mener dette er feil, vennligst ta kontakt med oss.
            <ContactInfo />
          </Alert>
        )}
      </Card>
    </>
  );
};

export default BranchPage;
