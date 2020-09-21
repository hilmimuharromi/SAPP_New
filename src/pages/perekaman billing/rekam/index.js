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
  message,
  Spin,
  Row,
} from "../../../libraries/dependencies";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../../stores/actions";
import { RefPerusahaan, SelectAkunPungutan } from "../../../components";
const { Option } = Select;

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
  const [namaKantor, setNamaKantor] = useState("");
  const [idPiutang, setIdPiutang] = useState("");
  const [loadingSimpan, setLoadingSimpan] = useState(false);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [dataPembayaran, setDataPembayaran] = useState([]);
  const [listJenisDokumen, setListJenisDokumen] = useState([]);
  const [listKdIdPerusahaan, setListKdIdPerusahaan] = useState([]);
  const [flagManual, setFlagManual] = useState("Y");
  const [disableInput, setDisableInput] = useState(false);
  const [namaAkun, setNamaAkun] = useState("");
  const [kodeAkun, setKodeAkun] = useState("");
  const [inputPungutan, setInputPungutan] = useState(0);
  const dispatch = useDispatch();
  const dataServer = useSelector((state) => state.dataCreateBilling);
  const data = dataServer.data;
  const statusTarikData = dataServer.status;
  const pungutan = dataServer.pungutan;
  const [totalPungutan, setTotalPungutan] = useState(0);
  let total = 0;
  if (statusTarikData) {
    console.log(dataServer, "hasil tombol create billing");
    if (statusTarikData === "ditemukan") {
      setFlagManual("T");
      setIdPiutang(data.idHeader);
      setNamaKantor(data.kantorPenerbit);

      form.setFieldsValue({
        kodeKantor: data.kodeKantorPenerbit,
        idWajibBayar: data.npwpPerusahaan,
        namaWajibBayar: data.namaPerusahaan,
        jenisDokumen: data.kodeJenisDokumen,
        nomorDokumen: data.nomorDokumen,
        kdIdWajibBayar: data.kodeIdPerusahaan,
        tanggalDokumen: moment(data.tanggalDokumen),
        totalTagihan: pungutan.total,
      });
      setDataPembayaran(pungutan.data);
      setTotalPungutan(pungutan.total);
      setDisableInput(true);
      message.success("sukses tarik data");
      dispatch(allActions.setStatusTarikData(false));
    } else {
      message.error("data tidak ditemukan");
      dispatch(allActions.setStatusTarikData(false));
    }
  }

  const columns = [
    {
      title: "Akun",
      dataIndex: "namaAkun",
      key: "namaAkun",
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
          <Button
            onClick={() => {
              setKodeAkun(record.kodeAkun);
              buttonEdit(record);
            }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];
  const [options, setOptions] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-jenis-dokumen?keterangan=billing"
      )
      .then(({ data }) => {
        setListJenisDokumen(data.data);
      });

    axios
      .get(
        "http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-id-perusahaan"
      )
      .then(({ data }) => {
        console.log(data, "kd id perusahaan");
        setListKdIdPerusahaan(data.data);
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
    console.log(data, "edit data");
    setkeyEditPembayaran(data.key);
    formEdit.setFieldsValue({
      npwpPembayaran: data.npwpPembayaran,
      nilai: data.nilai,
    });

    setInputPungutan(data.nilai);
    setNamaAkun(data.namaAkun);
    // setKodeAkun(data.kodeAkun);
    setVisibleEditPembayaran(true);
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

  const tambahNilaiPembayaran = async (values) => {
    if (disableInput) return message.error("tidak bisa tambah pungutan");
    let { npwpPembayaran } = values;
    console.log(values, "values tambah pembayaran");
    let newNilai = inputPungutan;
    if (!newNilai) return;
    let key = 0;
    if (dataPembayaran.length < 1) {
      key = 1;
    } else {
      key = dataPembayaran[dataPembayaran.length - 1].key + 1;
    }
    let newData = [
      ...dataPembayaran,
      {
        namaAkun,
        kodeAkun,
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
  };

  const hapusPembayaran = async (data) => {
    if (disableInput) return message.error("tidak bisa hapus pungutan");
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
    const { npwpPembayaran } = values;

    let newNilai = inputPungutan;
    const newData = dataPembayaran.map((item) => {
      if (item.key === keyEditPembayaran) {
        item = {
          kodeAkun,
          namaAkun,
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
    setVisibleEditPembayaran(false);
  };

  const simpanBilling = (values) => {
    setLoadingSimpan(true);
    const {
      tanggalDokumen,
      jenisDokumen,
      kdIdWajibBayar,
      idWajibBayar,
      kodeKantor,
      namaWajibBayar,
      nomorDokumen,
      totalTagihan,
    } = values;

    let tdBillingDetail = [];
    dataPembayaran.map((item) => {
      return tdBillingDetail.push({
        kodeAkun: item.kodeAkun,
        idWajibBayar: item.npwpPembayaran,
        nilai: item.nilai,
      });
    });
    console.log("data pembayaran: ", dataPembayaran);
    const dataBilling = {
      tdBillingMaster: {
        flagManual: flagManual,
        idPiutang,
        idWajibBayar,
        jenisDokumen,
        kdIdWajibBayar,
        kodeKantor,
        namaWajibBayar,
        nomorDokumen,
        tanggalDokumen: moment(tanggalDokumen).format("YYYY-MM-DD HH:mm:ss"),
        tanggalExpired: moment().add(5, "d").format("YYYY-MM-DD HH:mm:ss"),
        totalTagihan,
      },
      tdBillingDetail,
      nipRekam: "1234",
    };

    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: `http://10.162.71.119:9090/perbendaharaan/perben/billing/simpan-billing`,
      data: dataBilling,
    })
      .then(({ data }) => {
        message.success("Sukses simpan billing");
        console.log(data, "simpan billing");
        setLoadingSimpan(false);
      })
      .catch((err) => {
        message.error("error simpan");
        console.log(err, "error simpan");
      })
      .finally((_) => {
        setLoadingSimpan(false);
      });
    console.log(dataBilling, "dataBilling");
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 0 },
    labelAlign: "left",
  };

  const buttonReferensi = async () => {
    if (disableInput) {
      message.info("tidak bisa akses referensi");
    } else {
      dispatch(allActions.getPerusahaan("ALL", 50, 1));
      setVisibleRef(true);
    }
  };

  const setPerusahaan = (data) => {
    form.setFieldsValue({
      idWajibBayar: data.npwp,
      kdIdWajibBayar: data.kodeId,
      namaWajibBayar: data.namaPerusahaan,
      // alamatPerusahaan: data.alamatPerusahaan,
    });
    setVisibleRef(false);
  };

  const tarikData = () => {
    if (disableInput) return message.error("tidak bisa tarik data");
    let { nomorDokumen, tanggalDokumen } = form.getFieldValue();
    tanggalDokumen = moment(tanggalDokumen).format("DD-MM-YYYY");
    dispatch(allActions.getDataRekamBilling(nomorDokumen, tanggalDokumen));
  };

  if (loadingSimpan) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Spin
          spinning={loadingSimpan}
          delay={500}
          tip="Menunggu Simpan Billing ....."
        />
      </div>
    );
  }

  const bersihkan = () => {
    form.resetFields();
    setDataPembayaran([]);
    setDisableInput(false);
    setFlagManual("T");
    setNamaKantor("");
  };

  const formStyle = {
    padding: "1px 1px 1px 5px",
    marginBottom: "5px",
  };

  return (
    <>
      {" "}
      <Row justify="space-between">
        <h2>Rekam Billing</h2>
        <Button onClick={bersihkan}>Bersihkan</Button>
      </Row>
      <Form {...layout} form={form} onFinish={simpanBilling}>
        <Form.Item label="Kode Kantor" style={formStyle}>
          <Input.Group compact>
            <Form.Item name="kodeKantor" style={{ marginBottom: "5px" }}>
              <AutoComplete
                disabled={disableInput}
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

        <Form.Item label="Jenis Dokumen" style={formStyle}>
          <Input.Group compact>
            <Form.Item name="jenisDokumen" style={{ marginBottom: "5px" }}>
              <Select
                disabled={disableInput}
                style={{ width: 400 }}
                placeholder={"Jenis Dokumen"}
              >
                {listJenisDokumen.map((item) => (
                  <Option value={item.kodeDokumen} key={item.kodeDokumen}>
                    {item.uraianDokumen}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="No dan Tanggal Dokumen" style={formStyle}>
          <Input.Group compact>
            <Form.Item name="nomorDokumen" style={{ marginBottom: "5px" }}>
              <Input disabled={disableInput} style={{ width: 200 }} />
            </Form.Item>
            <Form.Item name="tanggalDokumen" style={{ marginBottom: "5px" }}>
              <DatePicker
                disabled={disableInput}
                style={{ margin: "0 7px", width: 200 }}
                format={"DD-MM-YYYY"}
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: "5px" }}>
              <Button onClick={tarikData}>Tarik</Button>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="ID Wajib Bayar" style={formStyle}>
          <Input.Group compact>
            <Form.Item name="kdIdWajibBayar" style={{ marginBottom: "5px" }}>
              <Select disabled={disableInput} style={{ width: 200 }}>
                {listKdIdPerusahaan.map((item) => (
                  <Option value={item.kodeId}>{item.uraian}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="idWajibBayar"
              style={{ margin: "0 7px", width: 200 }}
            >
              <Input disabled={disableInput} />
            </Form.Item>
            <Form.Item style={{ marginBottom: "5px" }}>
              <Button onClick={buttonReferensi}>Referensi</Button>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="Nama" name="namaWajibBayar" style={formStyle}>
          <Input disabled={disableInput} style={{ width: 200 }} />
        </Form.Item>

        <Form.Item
          label="Tanggal Expired"
          name="tanggalExpired"
          style={formStyle}
        >
          <DatePicker
            style={{ width: 200 }}
            format={"DD-MM-YYYY"}
            disabled
            defaultValue={moment().add(5, "d")}
          />
        </Form.Item>

        <Form.Item
          label="Total Tagihan"
          name="totalTagihan"
          value={totalPungutan}
          style={formStyle}
        >
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
          style={formStyle}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Form.Item label="Akun" name="akun">
              <SelectAkunPungutan
                onSelect={(value, option) => {
                  setNamaAkun(option.namaAkun);
                  setKodeAkun(value);
                }}
              />
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
                defaultValue={0}
                allowEmptyFormatting
                onValueChange={(values) => setInputPungutan(values.value)}
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
        <RefPerusahaan setPerusahaan={setPerusahaan} />
      </Modal>
      <Modal
        title="Edit Data Pembayaran"
        visible={visibleEditPembayaran}
        footer={null}
        onCancel={() => {
          setVisibleEditPembayaran(false);
          formEdit.resetFields();
          setKodeAkun("");
        }}
      >
        <Form
          form={formEdit}
          name="editPembayaran"
          onFinish={editNilaiPembayaran}
          layout="vertical"
        >
          {/* <div style={{ display: "flex", flexDirection: "row" }}> */}
          <Form.Item label="Akun" name="akun">
            <SelectAkunPungutan
              disabled={disableInput}
              defaultValue={kodeAkun}
              onSelect={(value, option) => {
                setNamaAkun(option.namaAkun);
                setKodeAkun(value);
              }}
            />
          </Form.Item>
          <Form.Item label="NPWP" name="npwpPembayaran">
            <Input disabled={toggleNPWP} />
          </Form.Item>
          <Form.Item name="copyHeader">
            <Checkbox onChange={onCopyNPWP}>Copy Header</Checkbox>
          </Form.Item>
          <Form.Item label="Nilai" name="nilai">
            <NumberFormat
              disabled={disableInput}
              customInput={Input}
              thousandSeparator={true}
              prefix={"Rp "}
              inputmode="numeric"
              allowEmptyFormatting
              onValueChange={(values) => setInputPungutan(values.value)}
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
