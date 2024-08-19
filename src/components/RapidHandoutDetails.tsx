import { Order, UserDetail } from "@boklisten/bl-model";
import { Alert, Typography } from "@mui/material";
import useSWR from "swr";

import BlFetcher from "@/api/blFetcher";
import { ItemStatus } from "@/components/matches/matches-helper";
import MatchItemTable from "@/components/matches/MatchItemTable";
import BL_CONFIG from "@/utils/bl-config";

function mapOrdersToItemStatuses(orders: Order[]): ItemStatus[] {
  return orders
    .filter((order) => order.byCustomer && !order.handoutByDelivery)
    .flatMap((order) => order.orderItems)
    .filter(
      (orderItem) =>
        !orderItem.movedToOrder &&
        !orderItem.handout &&
        (orderItem.type === "rent" ||
          orderItem.type === "buy" ||
          orderItem.type === "partly-payment"),
    )
    .map((oi) => ({
      id: oi.item,
      title: oi.title,
      fulfilled: false,
    }));
}

export default function RapidHandoutDetails({
  customer,
}: {
  customer: UserDetail;
}) {
  const { data: orders } = useSWR(
    `${BL_CONFIG.collection.order}?placed=true&customer=${customer.id}`,
    BlFetcher.get<Order[]>,
    { refreshInterval: 5000 },
  );
  const itemStatuses = mapOrdersToItemStatuses(orders ?? []);

  return itemStatuses.length === 0 ? (
    <Alert severity={"info"} sx={{ mt: 2 }}>
      Denne kunden har for øyeblikket ingen bestilte bøker
    </Alert>
  ) : (
    <>
      <Typography variant={"h2"} textAlign={"center"} mt={6}>
        Plukkliste
      </Typography>
      <MatchItemTable itemStatuses={itemStatuses} isSender={true} />
    </>
  );
}
