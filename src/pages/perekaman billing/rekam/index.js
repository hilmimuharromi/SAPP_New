import {
  React,
  useEffect,
  Form,
  Select,
  Input,
  DatePicker,
  Checkbox,
  Button,
  Table,
  Space,
  useState,
  Modal,
  axios,
} from "../../../libraries/dependencies";
import TablePerusahaan from "./tablePerusahaan";

const { Option } = Select;

export default function RekamBilling() {
  const [toggleNPWP, setToggleNPWP] = useState(false);
  const [visibleRef, setVisibleRef] = useState(false);
  const [refPerusahaan, setRefPerusahaan] = useState([]);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [dataPembayaran, setDataPembayaran] = useState([]);
  const [total, setTotal] = useState(0);
  const columns = [
    {
      title: "Akun",
      dataIndex: "akun",
      key: "akun",
    },
    {
      title: "Npwp",
      dataIndex: "npwpPembayaran",
      key: "npwpPembayaran",
    },
    {
      title: "Nilai",
      dataIndex: "nilai",
      key: "nilai",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => hapusPembayaran(record)}>Hapus</Button>
          <Button onClick={() => console.log(`edit ${record.npwp}`)}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  // useEffect(() => {
  //   dataPembayaran.map((item) => {
  //     let current = total;
  //     current += item.nilai;
  //     return setTotal(current);
  //   });
  // }, [dataPembayaran, total]);

  function onCopyNPWP(e) {
    console.log(`checked = ${e.target.checked}`);
    setToggleNPWP(!toggleNPWP);
    let { idWajibBayar } = form.getFieldValue();
    if (!toggleNPWP) {
      form2.setFieldsValue({
        npwpPembayaran: idWajibBayar,
      });
    } else {
      form2.setFieldsValue({
        npwpPembayaran: "",
      });
    }
  }

  const buttonReferensi = async () => {
    await getPerusahaan("ALL", 4, 1);
  };

  const tambahNilaiPembayaran = (values) => {
    console.log("tambah pembayaran:", values);
    let { akun, npwpPembayaran, nilai } = values;
    // dataPembayaran.push({ akun, npwpPembayaran, nilai });
    let newData = [
      ...dataPembayaran,
      {
        akun,
        npwpPembayaran,
        nilai: parseInt(nilai),
        key: dataPembayaran.length + 1,
      },
    ];
    setDataPembayaran(newData);
    let current = total;
    dataPembayaran.map((item) => {
      current += item.nilai;
      return;
    });
    setTotal(current);
    form.setFieldsValue({
      totalTagihan: total,
    });
    console.log(total, "total");
    form2.resetFields();
    console.log(akun + "" + npwpPembayaran + " " + nilai);
  };

  const hapusPembayaran = (data) => {
    const newData = dataPembayaran.filter((item) => {
      return item !== data;
    });
    setDataPembayaran(newData);
  };

  const simpanBilling = (values) => {
    console.log("simpan billing", values);
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 0 },
    labelAlign: "left",
  };

  const getPerusahaan = (query, limit, page) => {
    console.log(query, limit, page);
    let end = limit * page;
    let start = end - limit;

    // setVisibleRef(true);
    let url = `http://localhost:3000/perusahaan?_start=${start}&_end=${end}`;
    // let url =   `http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-perusahaan?search=${query}&limit=${limit}&page=${page}`

    axios.get(url).then((res) => {
      setRefPerusahaan(res.data);
      setVisibleRef(true);
    });
  };

  const setPerusahaan = (data) => {
    form.setFieldsValue({
      idWajibBayar: data.npwp,
      namaPerusahaan: data.namaPerusahaan,
      alamatPerusahaan: data.alamatPerusahaan,
    });
    setVisibleRef(false);
  };

  return (
    <>
      {" "}
      <h2>Rekam Billing</h2>
      <Form
        {...layout}
        form={form}
        onFinish={simpanBilling}
        initialValues={{
          kodeKantor: "009000",
          jenisDokumen: "pib",
          jenisIdWajibBayar: "NPWP",
        }}
      >
        <Form.Item label="Kode Kantor">
          <Input.Group compact>
            <Form.Item name="kodeKantor">
              <Select>
                <Option value="009000">009000</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <p>DIrektorat IKC</p>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="Jenis Dokumen">
          <Input.Group compact>
            <Form.Item name="jenisDokumen">
              <Select>
                <Option value="pib">PIB BC 2.0</Option>
                <Option value="peb">PEB BC 3.0</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <p>PIB Bayar</p>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="No dan Tanggal Dokumen">
          <Input.Group compact>
            <Form.Item name="nomorDokumen">
              <Input />
            </Form.Item>
            <Form.Item>
              <DatePicker />
            </Form.Item>
            <Form.Item>
              <Button>Tarik</Button>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="ID Wajib Bayar">
          <Input.Group compact>
            <Form.Item name="jenisIdWajibBayar">
              <Select>
                <Option value="NPWP">NPWP</Option>
              </Select>
            </Form.Item>
            <Form.Item name="idWajibBayar">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button onClick={buttonReferensi}>Referensi</Button>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="Nama" name="namaPerusahaan">
          <Input />
        </Form.Item>

        <Form.Item label="Alamat" name="alamatPerusahaan">
          <Input />
        </Form.Item>

        <Form.Item label="Tanggal Expired" name="tanggalExpired">
          <DatePicker />
        </Form.Item>

        <Form.Item label="Total Tagihan" name="totalTagihan" value={total}>
          <Input />
        </Form.Item>

        <h2>Detail Pembayaran</h2>
        <Form
          form={form2}
          name="tambahPembayaran"
          onFinish={tambahNilaiPembayaran}
          initialValues={{
            akun: "PPn",
          }}
          layout="inline"
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Form.Item label="Akun" name="akun">
              <Select>
                <Option value="PPn">PPn</Option>
                <Option value="PPh">PPh</Option>
              </Select>
            </Form.Item>
            <Form.Item label="NPWP" name="npwpPembayaran">
              <Input disabled={toggleNPWP} />
            </Form.Item>
            <Form.Item name="copyHeader">
              <Checkbox onChange={onCopyNPWP}>Copy Header</Checkbox>
            </Form.Item>
            <Form.Item label="Nilai" name="nilai">
              <Input />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              // onClick={tambahNilaiPembayaran}
            >
              Tambah
            </Button>
          </div>
        </Form>
        <div>
          <Table
            dataSource={dataPembayaran}
            columns={columns}
            pagination={false}
          />
        </div>

        <Button type="primary" htmlType="submit">
          Simpan
        </Button>
      </Form>
      <Modal
        title="Referensi Perusahaan"
        visible={visibleRef}
        footer={null}
        width={700}
        onCancel={() => setVisibleRef(false)}
      >
        <Input onChange={(e) => getPerusahaan(e.target.value, 100, 1)} />
        <TablePerusahaan
          data={refPerusahaan}
          setPerusahaan={setPerusahaan}
          getPerusahaan={getPerusahaan}
        />
      </Modal>
    </>
  );
}
