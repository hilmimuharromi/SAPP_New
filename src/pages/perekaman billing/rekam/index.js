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
} from "../../../libraries/dependencies";
import { useDispatch } from "react-redux";
import allActions from "../../../stores/actions";
import RefPerusahaan from "../../../components/RefPerusahaan";
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
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [dataPembayaran, setDataPembayaran] = useState([]);
  const [listAkun, setListAkun] = useState([]);
  const [listJenisDokumen, setListJenisDokumen] = useState([]);
  const [kdIdWajibBayar, setKdIdWajibBayar] = useState("");
  const [flagManual, setFlagManual] = useState("Y");
  const [disableInput, setDisableInput] = useState(false);
  const dispatch = useDispatch();

  // console.log(location, "get data history");
  // const data = location.state.dataHistory;
  // setFlagManual("T");
  // setNamaKantor(data.kantorPenerbit);
  // setIdPiutang(data.idHeader);
  // setKdIdWajibBayar(data.npwpPerusahaan);
  // form.setFieldsValue({
  //   kodeKantor: data.kodeKantorPenerbit,
  //   idWajibBayar: data.npwpPerusahaan,
  //   namaWajibBayar: data.namaPerusahaan,
  //   alamatPerusahaan: data.alamatPerusahaan,
  // });

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
        setListAkun(data.data);
      });

    axios
      .get(
        "http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-jenis-dokumen?keterangan=billing"
      )
      .then(({ data }) => {
        setListJenisDokumen(data.data);
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
        idWajibBayar: item.npwpPembayaran,
        nilai: item.nilai,
      });
    });
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
        tanggalExpired: moment(tanggalExpired).format("YYYY-MM-DD HH:mm:ss"),
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
        message.success("This is a success message");
        console.log(data, "simpan billing");
      })
      .catch((err) => {
        message.error("error");
        console.log(err, "derror simpan");
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
    setKdIdWajibBayar(data.idPerusahaan);
    form.setFieldsValue({
      idWajibBayar: data.npwp,
      namaWajibBayar: data.namaPerusahaan,
      // alamatPerusahaan: data.alamatPerusahaan,
    });
    setVisibleRef(false);
  };

  const NotifTarikData = (status) => {
    if (status === "200") {
      message.success("This is a success message");
    } else {
      message.error("data tidak ditemukan");
    }
  };

  const tarikData = () => {
    let { nomorDokumen, tanggalDokumen } = form.getFieldValue();
    tanggalDokumen = moment(tanggalDokumen).format("YYYY-MM-DD");
    console.log(nomorDokumen, tanggalDokumen);
    axios
      .get(
        `http://10.162.71.119:9090/perbendaharaan/perben/piutang/get-data-browse?browse=${nomorDokumen}&tanggalDokumen=${tanggalDokumen}`
      )
      .then(({ data }) => {
        if (data.data) {
          const dataServer = data.data[0];
          console.log(dataServer, "tarik data");
          form.setFieldsValue({
            jenisDokumen: dataServer.kodeJenisDokumen,
            kodeKantor: dataServer.kodeKantorPenerbit,
            idWajibBayar: dataServer.npwpPerusahaan,
            namaWajibBayar: dataServer.namaPerusahaan,
            alamatPerusahaan: dataServer.alamatPerusahaan,
          });
          setNamaKantor(dataServer.kantorPenerbit);
          setIdPiutang(dataServer.idHeader);
          setKdIdWajibBayar(dataServer.idPerusahaan);
          setFlagManual("T");
          setDisableInput(true);
          NotifTarikData("200");
        } else {
          NotifTarikData("400");
        }
      });
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
          // jenisDokumen: "pib",
          kdIdWajibBayar: "NPWP",
        }}
      >
        <Form.Item label="Kode Kantor" style={{ marginBottom: "5px" }}>
          <Input.Group compact>
            <Form.Item name="kodeKantor">
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

        <Form.Item label="Jenis Dokumen" style={{ marginBottom: "5px" }}>
          <Input.Group compact>
            <Form.Item name="jenisDokumen">
              <Select
                disabled={disableInput}
                style={{ width: 200 }}
                placeholder={"Jenis Dokumen"}
              >
                {listJenisDokumen.map((item) => (
                  <Option value={item.kodeDokumen} key={item.kodeDokumen}>
                    {item.uraianDokumen}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {/* <Form.Item style={{ margin: "0 7px" }}>
              <p>{uraianJenisDok}</p>
            </Form.Item> */}
          </Input.Group>
        </Form.Item>

        <Form.Item
          label="No dan Tanggal Dokumen"
          style={{ marginBottom: "5px" }}
        >
          <Input.Group compact>
            <Form.Item name="nomorDokumen">
              <Input disabled={disableInput} style={{ width: 200 }} />
            </Form.Item>
            <Form.Item name="tanggalDokumen">
              <DatePicker
                disabled={disableInput}
                style={{ margin: "0 7px", width: 200 }}
                format={"YYYY-MM-DD"}
              />
            </Form.Item>
            <Form.Item>
              <Button onClick={tarikData}>Tarik</Button>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="ID Wajib Bayar" style={{ marginBottom: "5px" }}>
          <Input.Group compact>
            <Form.Item name="kdIdWajibBayar">
              <Select disabled={disableInput} style={{ width: 200 }}>
                <Option value="NPWP">NPWP</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="idWajibBayar"
              style={{ margin: "0 7px", width: 200 }}
            >
              <Input disabled={disableInput} />
            </Form.Item>
            <Form.Item>
              <Button onClick={buttonReferensi}>Referensi</Button>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          label="Nama"
          name="namaWajibBayar"
          style={{ marginBottom: "5px" }}
        >
          <Input disabled={disableInput} style={{ width: 200 }} />
        </Form.Item>

        {/* <Form.Item label="Alamat" name="alamatPerusahaan">
          <Input />
        </Form.Item> */}

        <Form.Item
          label="Tanggal Expired"
          name="tanggalExpired"
          style={{ marginBottom: "5px" }}
        >
          <DatePicker style={{ width: 200 }} />
        </Form.Item>

        <Form.Item
          label="Total Tagihan"
          name="totalTagihan"
          value={total}
          style={{ marginBottom: "5px" }}
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
          initialValues={{
            akun: "411123",
          }}
          style={{ marginBottom: "5px" }}
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
        <RefPerusahaan setPerusahaan={setPerusahaan} />
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
