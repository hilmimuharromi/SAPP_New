import {
  React,
  useEffect,
  Form,
  Select,
  Input,
  AutoComplete,
  DatePicker,
  Checkbox,
  Button,
  Table,
  Space,
  useState,
  Modal,
  axios,
  NumberFormat,
  moment,
} from "../../../libraries/dependencies";
import TablePerusahaan from "./tablePerusahaan";

const { Option } = Select;
const { Search } = Input;

const renderTitle = (kodeKantor, nama) => {
  return {
    value: kodeKantor,
    nama: nama,
    label: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {kodeKantor}
        <span>{nama}</span>
      </div>
    ),
  };
};

export default function RekamBilling() {
  const [toggleNPWP, setToggleNPWP] = useState(false);
  const [visibleRef, setVisibleRef] = useState(false);
  const [visibleEditPembayaran, setVisibleEditPembayaran] = useState(false);
  const [keyEditPembayaran, setkeyEditPembayaran] = useState({});
  const [refPerusahaan, setRefPerusahaan] = useState([]);
  const [loadingPerusahaan, setLoadingPerusahaan] = useState(false);
  const [namaKantor, setNamaKantor] = useState("");
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [dataPembayaran, setDataPembayaran] = useState([]);
  const [listAkun, setListAkun] = useState([]);
  const [kdIdWajibBayar, setKdIdWajibBayar] = useState("");
  let total = 0;
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
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => hapusPembayaran(record)}>Hapus</Button>
          <Button onClick={() => buttonEdit(text)}>Edit</Button>
        </Space>
      ),
    },
  ];
  const [options, setOptions] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-pungutan"
      )
      .then(({ data }) => {
        console.log(data.data);
        setListAkun(data.data);
      });
  }, []);

  const onSearch = (searchText) => {
    if (!searchText) {
      setOptions([]);
    } else {
      axios
        .get(
          `http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-kantor?search=${searchText}`
        )
        .then(({ data }) => {
          let dataKantor = data.data;
          let listKantor = [];
          dataKantor.map((item) => {
            return listKantor.push({
              options: [renderTitle(item.kodeKantor, item.namaKantorPendek)],
            });
          });
          setOptions(listKantor);
        })
        .catch((err) => {
          console.log(err, "error get kantor");
        });
    }
  };

  const onSelect = (value, option) => {
    setNamaKantor(option.nama);
  };

  const buttonEdit = (data) => {
    setkeyEditPembayaran(data.key);
    formEdit.setFieldsValue({
      akun: data.akun,
      npwpPembayaran: data.npwpPembayaran,
      nilai: data.nilai,
    });
    setVisibleEditPembayaran(true);
    console.log(data, "edit data");
  };

  function onCopyNPWP(e) {
    setToggleNPWP(e.target.checked);
    console.log(`checked = ${e.target.checked}`);
    if (!toggleNPWP) {
      let { idWajibBayar } = form.getFieldValue();
      form2.setFieldsValue({
        npwpPembayaran: idWajibBayar,
      });
    } else {
      form2.setFieldsValue({
        npwpPembayaran: "",
      });
    }
  }

  const splitRupiah = (nilai) => {
    let splitNilai = nilai.split("");
    let newNilai = splitNilai.filter((item) => {
      return item !== "R" && item !== "p" && item !== " " && item !== ",";
    });
    console.log(newNilai, "nilai baruuu");
    return newNilai.join("");
  };

  const tambahNilaiPembayaran = async (values) => {
    console.log("tambah pembayaran:", values);
    let { akun, npwpPembayaran, nilai } = values;
    let newNilai = splitRupiah(nilai);
    let key = 0;
    if (dataPembayaran.length < 1) {
      key = 1;
    } else {
      key = dataPembayaran[dataPembayaran.length - 1].key + 1;
    }
    let newData = [
      ...dataPembayaran,
      {
        akun,
        npwpPembayaran,
        nilai: parseInt(newNilai),
        key,
      },
    ];

    await newData.map((item) => {
      return (total += parseInt(item.nilai));
    });
    await setDataPembayaran(newData);
    await form.setFieldsValue({
      totalTagihan: total,
    });
    // setToggleNPWP(!toggleNPWP);
    console.log(total, "total");
    // form2.resetFields();
    console.log(akun + "" + npwpPembayaran + " " + nilai);
  };

  const hapusPembayaran = async (data) => {
    const newData = dataPembayaran.filter((item) => {
      return item !== data;
    });
    await newData.map((item) => {
      return (total += parseInt(item.nilai));
    });
    await setDataPembayaran(newData);
    await form.setFieldsValue({
      totalTagihan: total,
    });
  };

  const editNilaiPembayaran = (values) => {
    const { akun, npwpPembayaran, nilai } = values;
    console.log(values, "values");
    let newNilai = nilai;
    const index = dataPembayaran.findIndex(
      (item) => item.key === keyEditPembayaran
    );
    if (nilai !== dataPembayaran[index].nilai) {
      newNilai = splitRupiah(nilai);
    }
    const newData = dataPembayaran.map((item) => {
      if (item.key === keyEditPembayaran) {
        item = {
          akun,
          npwpPembayaran,
          nilai: parseInt(newNilai),
          key: keyEditPembayaran,
        };
      }
      return item;
    });
    newData.map((item) => {
      return (total += parseInt(item.nilai));
    });
    form.setFieldsValue({
      totalTagihan: total,
    });
    setkeyEditPembayaran(0);
    setDataPembayaran(newData);
    console.log(" data Pembayaran: ", dataPembayaran);
    console.log(" new data Pembayaran: ", newData);
    setVisibleEditPembayaran(false);
  };

  const simpanBilling = (values) => {
    const {
      tanggalDokumen,
      tanggalExpired,
      jenisDokumen,
      idWajibBayar,
      kodeKantor,
      namaWajibBayar,
      nomorDokumen,
      totalTagihan,
    } = values;

    let tdBillingDetail = [];
    dataPembayaran.map((item) => {
      return tdBillingDetail.push({
        kodeAkun: item.akun,
        npwp: item.npwpPembayaran,
        nilai: item.nilai,
      });
    });
    const dataBilling = {
      tdBillingMaster: {
        flagManual: "",
        idPiutang: "string",
        idWajibBayar,
        jenisDokumen,
        kdIdWajibBayar,
        kodeKantor,
        namaWajibBayar,
        nomorDokumen,
        tanggalDokumen: moment(tanggalDokumen).format("YYYY-MM-DD HH:mm:ss"),
        tanggalExpired: moment(tanggalExpired).format("YYYY-MM-DD HH:mm:ss"),
        totalTagihan,
      },
      tdBillingDetail,
      nipRekam: "1234",
    };
    console.log(dataBilling, "dataBilling");
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 0 },
    labelAlign: "left",
  };

  const buttonReferensi = async () => {
    await getPerusahaan("ALL", 50, 1);
  };

  const getPerusahaan = (query, limit, page) => {
    console.log(query, limit, page);

    // let url = `http://localhost:3000/perusahaan?_start=${start}&_end=${end}`;
    let url = `http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-perusahaan?search=${query}&limit=${limit}&page=${page}`;
    setLoadingPerusahaan(true);
    axios
      .get(url)
      .then((res) => {
        let data = res.data.data;
        setRefPerusahaan(data);
        setLoadingPerusahaan(false);
        setVisibleRef(true);
      })
      .catch((err) => {
        console.log(err, "error get perusahaan");
      })
      .finally((_) => {
        setLoadingPerusahaan(false);
      });
  };

  const setPerusahaan = (data) => {
    setKdIdWajibBayar(data.idPerusahaan);
    form.setFieldsValue({
      idWajibBayar: data.npwp,
      namaWajibBayar: data.namaPerusahaan,
      // alamatPerusahaan: data.alamatPerusahaan,
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
          // kodeKantor: "009000",
          jenisDokumen: "pib",
          kdIdWajibBayar: "NPWP",
        }}
      >
        <Form.Item label="Kode Kantor">
          <Input.Group compact>
            <Form.Item name="kodeKantor">
              <AutoComplete
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={400}
                style={{ width: 200 }}
                options={options}
                placeholder="kode kantor"
                onSearch={onSearch}
                onSelect={onSelect}
              />
            </Form.Item>
            <Form.Item style={{ margin: "0 7px" }}>
              <p>{namaKantor}</p>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="Jenis Dokumen">
          <Input.Group compact>
            <Form.Item name="jenisDokumen">
              <Select style={{ width: 200 }}>
                <Option value="pib">PIB BC 2.0</Option>
                <Option value="peb">PEB BC 3.0</Option>
              </Select>
            </Form.Item>
            <Form.Item style={{ margin: "0 7px" }}>
              <p>PIB Bayar</p>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="No dan Tanggal Dokumen">
          <Input.Group compact>
            <Form.Item name="nomorDokumen">
              <Input style={{ width: 200 }} />
            </Form.Item>
            <Form.Item name="tanggalDokumen">
              <DatePicker style={{ margin: "0 7px", width: 200 }} />
            </Form.Item>
            <Form.Item>
              <Button>Tarik</Button>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="ID Wajib Bayar">
          <Input.Group compact>
            <Form.Item name="kdIdWajibBayar">
              <Select style={{ width: 200 }}>
                <Option value="NPWP">NPWP</Option>
              </Select>
            </Form.Item>
            <Form.Item name="idWajibBayar" style={{ margin: "0 7px" }}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button onClick={buttonReferensi}>Referensi</Button>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="Nama" name="namaWajibBayar">
          <Input style={{ width: 200 }} />
        </Form.Item>

        {/* <Form.Item label="Alamat" name="alamatPerusahaan">
          <Input />
        </Form.Item> */}

        <Form.Item label="Tanggal Expired" name="tanggalExpired">
          <DatePicker style={{ width: 200 }} />
        </Form.Item>

        <Form.Item label="Total Tagihan" name="totalTagihan" value={total}>
          <NumberFormat
            style={{ width: 200 }}
            disabled
            customInput={Input}
            thousandSeparator={true}
            prefix={"Rp "}
            inputMode="numeric"
            allowEmptyFormatting
          />
        </Form.Item>

        <h2>Detail Pembayaran</h2>
        <Form
          form={form2}
          name="tambahPembayaran"
          onFinish={tambahNilaiPembayaran}
          layout="inline"
          initialValues={{
            akun: "411123",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Form.Item label="Akun" name="akun">
              <Select style={{ width: "200px" }}>
                {listAkun.map((item) => (
                  <Option value={item.kodeAkun} key={item.kodeAkun}>
                    {item.uraian}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="NPWP" name="npwpPembayaran">
              <Input disabled={toggleNPWP} />
            </Form.Item>
            <Form.Item name="copyHeader">
              <Checkbox onChange={onCopyNPWP}>Copy Header</Checkbox>
            </Form.Item>
            <Form.Item label="Nilai" name="nilai">
              <NumberFormat
                customInput={Input}
                thousandSeparator={true}
                prefix={"Rp "}
                inputmode="numeric"
                allowEmptyFormatting
              />
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
        header={null}
        width={700}
        onCancel={() => setVisibleRef(false)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "10px",
            padding: 0,
          }}
        >
          <Search
            placeholder="input search Perusahaan"
            // enterButton="Search"
            size="large"
            style={{ width: 300 }}
            onSearch={(value) => getPerusahaan(value, 100, 1)}
            enterButton
          />
        </div>

        <TablePerusahaan
          data={refPerusahaan}
          setPerusahaan={setPerusahaan}
          getPerusahaan={getPerusahaan}
          loading={loadingPerusahaan}
        />
      </Modal>
      <Modal
        title="Edit Data Pembayaran"
        visible={visibleEditPembayaran}
        footer={null}
        onCancel={() => setVisibleEditPembayaran(false)}
      >
        <Form
          form={formEdit}
          name="editPembayaran"
          onFinish={editNilaiPembayaran}
          layout="vertical"
        >
          {/* <div style={{ display: "flex", flexDirection: "row" }}> */}
          <Form.Item label="Akun" name="akun">
            <Select>
              {listAkun.map((item) => (
                <Option value={item.kodeAkun} key={item.kodeAkun}>
                  {item.uraian}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="NPWP" name="npwpPembayaran">
            <Input disabled={toggleNPWP} />
          </Form.Item>
          <Form.Item name="copyHeader">
            <Checkbox onChange={onCopyNPWP}>Copy Header</Checkbox>
          </Form.Item>
          <Form.Item label="Nilai" name="nilai">
            <NumberFormat
              customInput={Input}
              thousandSeparator={true}
              prefix={"Rp "}
              inputmode="numeric"
              allowEmptyFormatting
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Simpan
          </Button>
          {/* </div> */}
        </Form>
      </Modal>
    </>
  );
}
