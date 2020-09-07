import {
  React,
  useState,
  axios,
  Table,
  NumberFormat,
} from "../../../libraries/dependencies";

export default function DetailPungutan(props) {
  const { idBilling, getDetail, setGetDetail } = props;
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  if (getDetail) {
    axios
      .get(
        `http://10.162.71.119:9090/perbendaharaan/perben/billing/get-billing-detail-pungutan?idBilling=${idBilling}`
      )
      .then(({ data }) => {
        console.log(data.data, "pungutan");
        let dataServer = data.data;
        let totalTemp = 0;
        dataServer.map((item, index) => {
          totalTemp += item.nilai;
          return (item.no = index + 1);
        });
        setTotal(totalTemp);
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
      title: "Akun",
      dataIndex: "akun",
      key: "akun",
    },
    {
      title: "Nilai",
      dataIndex: "nilai",
      key: "nilai",
      render: (text, record) => (
        <NumberFormat
          value={record.nilai}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Rp "}
        />
      ),
    },
    {
      title: "Id Wajib Bayar",
      dataIndex: "idWajibBayar",
      key: "idWajibBayar",
    },
  ];
  return (
    <>
      <Table
        dataSource={data}
        bordered
        columns={columns}
        pagination={false}
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={2}>
              Total
            </Table.Summary.Cell>
            <Table.Summary.Cell index={2} colSpan={2}>
              <NumberFormat
                value={total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp "}
              />
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    </>
  );
}
