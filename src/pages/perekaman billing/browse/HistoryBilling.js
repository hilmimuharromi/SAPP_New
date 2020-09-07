import { React, useState, axios, Table } from "../../../libraries/dependencies";

export default function HistoryBilling(props) {
  const { idBilling, getDetail, setGetDetail } = props;
  const [data, setData] = useState([]);

  if (getDetail) {
    axios
      .get(
        `http://10.162.71.119:9090/perbendaharaan/perben/billing/get-billing-history?idBilling=${idBilling}`
      )
      .then(({ data }) => {
        let dataServer = data.data;
        dataServer.map((item, index) => {
          return (item.no = index + 1);
        });
        console.log(dataServer, "get-billing-history");
        setData(dataServer);
        setGetDetail(false);
      });
  }

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Waktu Rekam",
      dataIndex: "waktuRekam",
      key: "waktuRekam",
    },
    {
      title: "Nip Rekam",
      dataIndex: "nipRekam",
      key: "nipRekam",
    },
  ];
  return (
    <>
      <Table bordered dataSource={data} columns={columns} pagination={false} />
    </>
  );
}
