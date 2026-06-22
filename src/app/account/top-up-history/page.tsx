import { listTopUps } from "@/actions/top-up/list-top-ups";
import { TopUpHistoryDetail } from "@/components/top-up-history/top-up-history-detail";

const HistoryTopUpPage = async () => {
  const { data, error: listTopUpsError } = await listTopUps();
  if (listTopUpsError) {
    throw new Error(listTopUpsError);
  }
  return <TopUpHistoryDetail topUps={data} />;
};

export default HistoryTopUpPage;
