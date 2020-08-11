import {
  React,
  axios,
  Layout,
  Row,
  Col,
  Form,
  Input,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  useHistory,
  useState,
  Menu,
  UserOutlined,
  Select,
  Button,
  DatePicker,
  message,
  Badge,
  List,
  DeleteFilled,
  EditFilled,
  moment,
  Spin,
  Alert,
} from "../../libraries/dependencies";
import { convertToRupiah } from "../../libraries/functions";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;

function RekamDokumenPiutang() {
  // const { getFieldDecorator } = props.form;
  // Sid - Headear
  // ==============================================
  const [collapsed, setCollapsed] = useState(false);
  const [akun, setAkun] = useState("");
  // Form Perekaman
  // ==============================================
  const db_dokumen_asal = [
    {
      kantor_penerbit: "009000 - DIREKTORAT INFORMASI KEPABEANAN DAN CUKAI",
      kantor_monitor: "050905 - KPPBC TMP AA",
      tanggal_jatuh_tempo: "05/08/2020 09:10:11",
      dokumen_asal: "13/000001/06/07/2020",
      // jenisDokumenAsal: "S000001",
      // nomor: "000001",
      // tanggal: "2019-02-07", // MM/DD/YYYY
      idPerusahaan: "12345678912345",
      namaPerusahaan: "PT TESTING INDONESIA",
      alamat_perusahaan: "Jalan Alamat PT Testing Indonesia",
      ppjk: "-",
      petugas: "198989504523538987 - Andhika Kusuma",
      pungutan: [],
      keterangan: [],
      key: "1",
    },
    {
      kantor_penerbit: "009000 - DIREKTORAT INFORMASI KEPABEANAN DAN CUKAI",
      kantor_monitor: "050905 - KPPBC TMP AA",
      tanggal_jatuh_tempo: "06/06/2006",
      dokumen_asal: "15/000002/05/06/2020",
      // jenisDokumenAsal: "S000002",
      // nomor: "000002",
      // tanggal: "2020-02-08", // MM/DD/YYYY
      idPerusahaan: "12345678912345",
      namaPerusahaan: "PT TESTING INDONESIA 2",
      alamat_perusahaan: "Jalan Alamat Cileungsi Bogor",
      ppjk: "-",
      petugas: "198989504523538987 - Salman Isar",
      pungutan: [],
      keterangan: [],
      key: "2",
    },
    {
      kantor_penerbit: "009000 - DIREKTORAT INFORMASI KEPABEANAN DAN CUKAI",
      kantor_monitor: "050905 - KPPBC TMP AA",
      tanggal_jatuh_tempo: "06/06/2006",
      dokumen_asal: "31/000003/05/06/2020",
      // jenisDokumenAsal: "S000002",
      // nomor: "000002",
      // tanggal: "2020-02-08", // MM/DD/YYYY
      idPerusahaan: "12345678912345",
      namaPerusahaan: "PT TESTING INDONESIA 3",
      alamat_perusahaan: "Jalan Raya Kenangan",
      ppjk: "-",
      petugas: "198989504523538999 - Duloh Ahmed",
      pungutan: [
        {
          akun: "411511",
          nilai: 10000000,
          lebihBayar: "YA",
        },
        {
          akun: "411513",
          nilai: 20000000,
          lebihBayar: "YA",
        },
      ],
      keterangan: [],
      key: "3",
    },
  ];
  const [tanggalDokumen, setTanggalDokumen] = useState("");
  const [tanggal_jatuh_tempo, setTanggal_jatuh_tempo] = useState("");
  const [jenisDokumen, setJenisDokumen] = useState("");
  const [jenisDokumenAsal, setJenisDokumenAsal] = useState("");
  const [nomor, setNomor] = useState("");
  const [tanggal_dokumen_asal, setTanggal_dokumen_asal] = useState("");
  const [perusahaan, setPerusahaan] = useState("");
  const [alamat_perusahaan, setAlamat_Perusahaan] = useState("");
  const [ppjk, setPpjk] = useState("");
  const [petugas, setPetugas] = useState("");
  let totalNilai = 0;
  const [form] = Form.useForm();
  // Pungutan
  // ==============================================
  const options_akun = [
    {
      name: "Bea Masuk",
      value: "412111",
      key: "1",
    },
    {
      name: "BM AD",
      value: "412121",
      key: "2",
    },
    {
      name: "BM PT",
      value: "412123",
      key: "3",
    },
    {
      name: "PPN Impor",
      value: "411212",
      key: "4",
    },
    {
      name: "PPH Impor",
      value: "411123",
      key: "5",
    },
    {
      name: "Denda Administrasi Cukai",
      value: "411514",
      key: "6",
    },
  ];
  const [pemberitahuan, setPemberitahuan] = useState(0);
  const [penetapan, setPenetapan] = useState(0);
  const [selisih, setSelisih] = useState("");
  const [nilai, setNilai] = useState(0);
  const [data_pungutan, setData_pungutan] = useState([]);
  let [editValuePungutan, setEditValuePungutan] = useState(0);
  const [keyEditPungutan, setKeyEditPungutan] = useState(0);
  // Keterangan
  // ==============================================
  const [jenisKeterangan, setJenisKeterangan] = useState("");
  const [uraian, setUraian] = useState("");
  const [data_keterangan, setData_keterangan] = useState([]);
  let [editValueKeterangan, setEditValueKeterangan] = useState(0);
  const [keyEditKeterangan, setKeyEditKeterangan] = useState(0);
  const [keyDeletePungutan, setKeyDeletePungutan] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Function - Sid - Headear
  // ==============================================
  let history = useHistory();
  const handleNavigate = () => {
    history.push("/");
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  if (isLoading) {
    return (
      <Spin tip="Loading...">
        <Alert
          message="Fetching data ....."
          // description="Further details about the context of this alert."
          // type="info"
        />
      </Spin>
    );
  }

  // Function - Form Perekaman
  // ==============================================
  const handleTanggalJatuhTMP = (date, dateString) => {
    setTanggal_jatuh_tempo(date);
  };

  const handleTanggalDokumen = (date, dateString) => {
    setTanggalDokumen(date);
  };

  const handleTanggalDokumenAsal = (date, dateString) => {
    setTanggal_dokumen_asal(dateString);
  };

  const handleTarik = () => {
    if (Object.values(form.getFieldsValue())[0] !== undefined) {
      return message.error("Data sudah diTampilkan!");
    }
    let dokumen_asal = `${jenisDokumenAsal}/${nomor}/${tanggal_dokumen_asal}`;
    console.log(tanggal_dokumen_asal);
    for (let i = 0; i < db_dokumen_asal.length; i++) {
      if (db_dokumen_asal[i].dokumen_asal === dokumen_asal) {
        form.setFieldsValue({
          kantorPenerbit: db_dokumen_asal[i].kantor_penerbit,
          kantorMonitor: db_dokumen_asal[i].kantor_monitor,
          tanggalJatuhTempo: moment(
            db_dokumen_asal[i].tanggal_jatuh_tempo,
            "YYYY-MM-DD hh:mm:ss"
          ),
          idPerusahaan: db_dokumen_asal[i].idPerusahaan,
          namaPerusahaan: db_dokumen_asal[i].namaPerusahaan,
          alamatPerusahaan: db_dokumen_asal[i].alamat_perusahaan,
          ppjk: db_dokumen_asal[i].ppjk,
          petugas: db_dokumen_asal[i].petugas,
        });
        if (db_dokumen_asal[i].pungutan.length > 0) {
          let arrData = [];
          db_dokumen_asal[i].pungutan.map((item) => arrData.push(item));
          setData_pungutan(arrData);
        }
        return message.success("Data ditemukan!");
      }
    }
    return message.error("Data Tidak ditemukan!");
  };

  const handleBersihkan = () => {
    setData_pungutan([]);
    setData_keterangan([]);
    // all form
    form.resetFields();
    message.success("Data Berhasil di Kosongkan!");
  };

  const handleSimpan = () => {
    data_pungutan.map((item) => {
      return item.lebihBayar !== "Y" ? (totalNilai += item.nilai) : null;
    });
    const {
      idPerusahaan,
      namaPerusahaan,
      alamatPerusahaan,
      kantorPenerbit,
      kantorMonitor,
      jenisDokumen,
      jenisDokumenAsal,
      nomorDokumenAsal,
      tanggalDokumen,
      tanggalDokumenAsal,
      tanggalJatuhTempo,
      petugas,
    } = form.getFieldsValue();
    let payload = {
      tdHeader: {
        alamatPerusahaan: alamatPerusahaan,
        idPerusahaan: idPerusahaan,
        idPpjk: ppjk,
        jenisDokumen: jenisDokumen,
        jenisDokumenAsal: jenisDokumenAsal,
        kodeBidang: "String",
        kodeKantorMonitor: kantorMonitor,
        kodeKantorPenerbit: kantorPenerbit,
        kodeProses: "100",
        namaPerusahaan: namaPerusahaan,
        namaPpjk: ppjk,
        nilai: totalNilai,
        nipPetugas1: petugas,
        nipPetugas2: petugas,
        nomorDokumenAsal: "string",
        nomorDokumen: nomorDokumenAsal,
        tanggalDokumen: moment(tanggalDokumen).format("YYYY-MM-DD hh:mm:ss"),
        tanggalDokumenAsal: moment(tanggalDokumenAsal).format(
          "YYYY-MM-DD hh:mm:ss"
        ),
        tanggalJatuhTempo: moment(tanggalJatuhTempo).format(
          "YYYY-MM-DD hh:mm:ss"
        ),
      },
      nipRekam: petugas,
      listTdKeterangan: data_keterangan,
      listTdPungutan: data_pungutan,
    };
    console.log(payload, "payload data submit");
    // // post rekam
    setIsLoading(true);
    let lokal = "http://10.102.120.36:9090";
    let server = "http://10.162.71.119:9090";
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${server}/perbendaharaan/perben/piutang/simpan-piutang`,
      data: payload,
    })
      .then(({ data }) => {
        console.log({ data }, "berhasil");
        message.success("Data Berhasil di Kirim!");
      })
      .catch((error) => {
        console.log((error, "error"));
        message.error("ada yang salah!");
      })
      .finally((_) => {
        console.log("finally");
        setIsLoading(false);
      });

    // form.resetFields();
  };

  // Function - Pungutan
  // ==============================================
  const handleAkun = (val) => {
    setAkun(val);
  };

  const handleNilai = (e) => {
    setNilai(e.target.value);
  };

  const EditPungutan = (item) => {
    function saveEdit() {
      for (let i = 0; i < data_pungutan.length; i++) {
        if (
          `${data_pungutan[i].kodeAkun}-${data_pungutan[i].seri}` ===
          keyEditPungutan
        ) {
          data_pungutan[i].nilai = editValuePungutan;
        }
      }
      setKeyEditPungutan(0);
    }

    function deletePungutan() {
      let newData = data_pungutan.filter((data) => {
        return (
          `${data.kodeAkun}-${data.seri}` !== `${item.kodeAkun}-${item.seri}`
        );
      });
      setData_pungutan(newData);
    }

    function klikEdit() {
      setKeyEditPungutan(`${item.kodeAkun}-${item.seri}`);
      setEditValuePungutan(item.nilai);
    }
    if (keyEditPungutan !== `${item.kodeAkun}-${item.seri}`) {
      return (
        <>
          <Button
            icon={<EditFilled />}
            onClick={() => klikEdit()}
            style={{ marginRight: "5px" }}
          ></Button>
          <Button
            type="Warning"
            icon={<DeleteFilled />}
            onClick={() => deletePungutan()}
          ></Button>
        </>
      );
    } else {
      return (
        <>
          <Button onClick={() => saveEdit()} style={{ marginRight: "5px" }}>
            Save
          </Button>
          <Button onClick={() => setKeyEditPungutan(0)}>Cancel</Button>
        </>
      );
    }
  };

  const FormEditPungutan = (item) => {
    if (keyEditPungutan !== `${item.kodeAkun}-${item.seri}`) {
      return convertToRupiah(item.nilai);
    } else {
      //   setEditValuePungutan(item.nilai);
      return (
        <Input
          onChange={(e) => setEditValuePungutan(e.target.value)}
          onPointerLeave={(e) => setEditValuePungutan(e.target.value)}
          defaultValue={editValuePungutan}
          value={editValuePungutan}
        />
      );
    }
  };

  const handleSubmitPungutan = () => {
    function findSeri() {
      let getSeri = data_pungutan.filter((item) => {
        return item.kodeAkun === akun;
      });
      if (getSeri.length < 1) {
        return 1;
      } else {
        let seri = getSeri[getSeri.length - 1].seri;
        return seri + 1;
      }
    }
    if (
      jenisDokumenAsal === "13" ||
      jenisDokumenAsal === "14" ||
      jenisDokumenAsal === "20" ||
      jenisDokumenAsal === "21"
    ) {
      const check = pemberitahuan - penetapan;
      let ObjData = {
        kodeAkun: akun,
        seri: findSeri(),
        lebihBayar: parseInt(pemberitahuan) > parseInt(penetapan) ? "T" : "Y",
        nilaiDiberitahukan: parseInt(pemberitahuan),
        nilaiPenetapan: parseInt(penetapan),
        nilai:
          String(check).match(/-/g) !== null
            ? String(check).replace("-", "")
            : check,
      };
      if (!akun) {
        message.error("Mohon pilih akun");
      } else if (!pemberitahuan) {
        message.error("Mohon Isi Pemberitahuan");
      } else if (!penetapan) {
        message.error("Mohon Isi Penetapan");
      } else {
        const newData = [...data_pungutan, ObjData];

        setData_pungutan(newData);
        setAkun("");
        setPemberitahuan(0);
        setPenetapan(0);
        return message.success("Sukses di Tambahkan!");
      }
    } else {
      let ObjData = {
        kodeAkun: akun,
        seri: findSeri(),
        lebihBayar: selisih,
        nilaiDiberitahukan: 0,
        nilaiPenetapan: 0,
        nilai: parseInt(nilai),
      };
      if (!akun) {
        message.error("Mohon pilih akun");
      } else if (!selisih) {
        message.error("Mohon pilih jenis selisih");
      } else if (!nilai) {
        message.error("Mohon isi nilai");
      } else {
        const newData = [...data_pungutan, ObjData];
        setData_pungutan(newData);
        setAkun("");
        setSelisih("");
        setNilai(0);
        return message.success("Sukses di Tambahkan!");
      }
    }
  };

  // Function - Keterangan
  // ==============================================
  const handleJenisKeterangan = (val) => {
    setJenisKeterangan(val);
  };

  const handleUraian = (e) => {
    setUraian(e.target.value);
  };

  const EditKeterangan = (item) => {
    function saveEdit() {
      for (let i = 0; i < data_keterangan.length; i++) {
        if (
          `${data_keterangan[i].jenisKeterangan}-${data_keterangan[i].seri}` ===
          keyEditKeterangan
        ) {
          data_keterangan[i].uraian = editValueKeterangan;
        }
      }
      setKeyEditKeterangan(0);
    }

    function deleteKeterangan() {
      let newData = data_keterangan.filter((data) => {
        return (
          `${data.jenisKeterangan}-${data.seri}` !==
          `${item.jenisKeterangan}-${item.seri}`
        );
      });
      setData_keterangan(newData);
    }

    function klikEdit() {
      setKeyEditKeterangan(`${item.jenisKeterangan}-${item.seri}`);
      setEditValueKeterangan(item.uraian);
    }
    if (keyEditKeterangan !== `${item.jenisKeterangan}-${item.seri}`) {
      return (
        <>
          <Button
            icon={<EditFilled />}
            onClick={() => klikEdit()}
            style={{ marginRight: "5px" }}
          ></Button>
          <Button
            type="Warning"
            icon={<DeleteFilled />}
            onClick={() => deleteKeterangan()}
          ></Button>
        </>
      );
    } else {
      return (
        <>
          <Button onClick={() => saveEdit()} style={{ marginRight: "5px" }}>
            Save
          </Button>
          <Button onClick={() => setKeyEditKeterangan(0)}>Cancel</Button>
        </>
      );
    }
  };

  const FormEditKeterangan = (item) => {
    if (keyEditKeterangan !== `${item.jenisKeterangan}-${item.seri}`) {
      return item.uraian;
    } else {
      //   setEditValuePungutan(item.nilai);
      return (
        <Input
          onChange={(e) => setEditValueKeterangan(e.target.value)}
          onPointerLeave={(e) => setEditValueKeterangan(e.target.value)}
          defaultValue={editValueKeterangan}
          value={editValueKeterangan}
        />
      );
    }
  };

  const uraianAkun = (kodeAkun) => {
    const data = [
      {
        kodeAkun: "411122",
        uraian: "PPh Pasal 22 Ekspor",
      },
      {
        kodeAkun: "411123",
        uraian: "PPH Impor",
      },
      {
        kodeAkun: "411211",
        uraian: "PPN HT / DN",
      },
      {
        kodeAkun: "411212",
        uraian: "PPN Impor",
      },
      {
        kodeAkun: "411511",
        uraian: "Cukai HT",
      },
      {
        kodeAkun: "411512",
        uraian: "Cukai EA",
      },
      {
        kodeAkun: "411513",
        uraian: "Cukai MMEA",
      },
      {
        kodeAkun: "411514",
        uraian: "Denda Administrasi Cukai",
      },
      {
        kodeAkun: "411519",
        uraian: "Pendapatan Cukai Lainnya",
      },
      {
        kodeAkun: "411622",
        uraian: "Bunga Penagihan PPN",
      },
      {
        kodeAkun: "412111",
        uraian: "Bea Masuk",
      },
      {
        kodeAkun: "412112",
        uraian: "Bea Masuk ditanggung Pemerintah atas Hibah (SPM) Nihil",
      },
      {
        kodeAkun: "412113",
        uraian: "Denda Administrasi Pabean",
      },
      {
        kodeAkun: "412114",
        uraian: "Bea Masuk KITE",
      },
      {
        kodeAkun: "412115",
        uraian: "Denda administrasi atas pengangkutan barang tertentu",
      },
      {
        kodeAkun: "412116",
        uraian: "Pendapatan Bea Masuk Ditanggung Pemerintah (BM-DTP)",
      },
      {
        kodeAkun: "412119",
        uraian: "Pendapatan Pabean Lainnya",
      },
      {
        kodeAkun: "412121",
        uraian: "Bea Masuk Anti Dumping (BMAD)",
      },
      {
        kodeAkun: "412122",
        uraian: "Bea Masuk Imbalan (BMI)",
      },
      {
        kodeAkun: "412123",
        uraian: "Bea Masuk Tindakan Pengamanan (BMTP)",
      },
      {
        kodeAkun: "412211",
        uraian: "Bea Keluar",
      },
      {
        kodeAkun: "412212",
        uraian: "Denda Administrasi Bea Keluar",
      },
      {
        kodeAkun: "412213",
        uraian: "Bunga Bea Keluar",
      },
      {
        kodeAkun: "423216",
        uraian: "-",
      },
      {
        kodeAkun: "424138",
        uraian: "Dana Sawit",
      },
      {
        kodeAkun: "425151",
        uraian:
          "Pendapatan dari Penggunaan Sarana dan Prasarana Sesuai dengan Tusi",
      },
      {
        kodeAkun: "425289",
        uraian:
          "Pendapatan Pengujian, Sertifikasi, Kalibrasi dan Standarisasi Lainnya",
      },
      {
        kodeAkun: "425699",
        uraian: "Pendapatan Jasa Lainnya",
      },
      {
        kodeAkun: "425781",
        uraian: "Pendapatan Biaya Penagihan Pajak Negara dengan Surat Paksa",
      },
      {
        kodeAkun: "425839",
        uraian: "Pendapatan Denda lainnya",
      },
      {
        kodeAkun: "817711",
        uraian: "Pajak Rokok",
      },
    ];
    const result = data.filter((item) => item.kodeAkun === kodeAkun);
    return result[0].uraian;
  };

  const handleSubmitKeterangan = () => {
    function findSeri(res) {
      let getSeri = data_keterangan.filter((item) => {
        return item.jenisKeterangan === jenisKeterangan;
      });

      if (getSeri.length < 1) {
        return 1;
      } else {
        let seri = getSeri[getSeri.length - 1].seri;
        return seri + 1;
      }
    }
    let ObjData = {
      jenisKeterangan: jenisKeterangan,
      seri: findSeri(), // return angka dri if else
      uraian: uraian,
    };

    if (!jenisKeterangan) {
      message.error("Mohon Pilih Jenis Keterangan!");
    } else if (!uraian) {
      message.error("Mohon isi uraian");
    } else {
      const newData = [...data_keterangan, ObjData];
      setData_keterangan(newData);
      setJenisKeterangan("");
      setUraian("");
      message.success("Sukses di Tambahkan!");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Perbendaharaan">
            <Menu.Item key="1" onClick={handleNavigate}>
              Dashboard
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ margin: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Layout style={{ backgroundColor: "white" }}>
            <Row justify="space-between">
              <h1 style={{ fontWeight: "bold", fontSize: 24 }}>
                Perekaman Dokumen Piutang
              </h1>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: 100,
                  height: 35,
                  marginLeft: "auto",
                  marginRight: "2px",
                }}
                onClick={handleBersihkan}
              >
                Bersihkan
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: 100, height: 35 }}
                onClick={handleSimpan}
              >
                Simpan
              </Button>
            </Row>
            <Row>
              <Col span={24}>
                <Form
                  form={form}
                  labelCol={{ span: 5 }}
                  labelAlign={"left"}
                  name="record-form"
                  size={"small"}
                  onFinish={handleSimpan}
                  // style={{ border: "1px solid #eaeaea", minWidth: "100%" }}
                >
                  <Form.Item
                    name="kantorPenerbit"
                    label="Kantor Penerbit"
                    // wrapperCol={{ span: 0 }}
                    style={{
                      marginBottom: "5px",
                      padding: "1px 1px 1px 5px",
                      // borderBottom: "1px solid #eaeaea",
                    }}
                  >
                    <Input
                    // style={{ borderLeft: "5px solid #eaeaea" }}
                    // value={kantor_penerbit}
                    // onChange={(e) => setKantor_penerbit(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="kantorMonitor"
                    label="Kantor Monitor"
                    wrapperCol={{ span: 0 }}
                    style={{
                      marginBottom: "5px",
                      padding: "1px 1px 1px 5px",
                      // borderBottom: "1px solid #eaeaea",
                    }}
                  >
                    <Input
                    // style={{ borderLeft: "5px solid #eaeaea" }}
                    // value={kantor_monitor}
                    // onChange={(e) => setKantor_monitor(e.target.value)}
                    />
                  </Form.Item>

                  {/* tanggal dok & jatuh tempo*/}

                  <Form.Item
                    name="tanggalDokumen"
                    label="Tanggal Dokumen"
                    wrapperCol={{ span: 4 }}
                    style={{
                      marginBottom: "5px",
                      padding: "1px 1px 1px 5px",
                      // borderBottom: "1px solid #eaeaea",
                    }}
                  >
                    <DatePicker
                      placeholder=""
                      onChange={handleTanggalDokumen}
                      selected={tanggalDokumen}
                      style={{
                        width: "100%",
                        borderLeft: "5px solid #eaeaea",
                      }}
                      format={"DD/MM/YYYY"}
                    />
                  </Form.Item>
                  <Form.Item
                    name="tanggalJatuhTempo"
                    label="Tanggal Jatuh Tempo"
                    wrapperCol={{ span: 4 }}
                    style={{
                      marginBottom: "5px",
                      padding: "1px 1px 1px 5px",
                      // borderBottom: "1px solid #eaeaea",
                    }}
                  >
                    <DatePicker
                      placeholder=""
                      onChange={handleTanggalJatuhTMP}
                      selected={tanggal_jatuh_tempo}
                      style={{
                        width: "100%",
                        borderLeft: "5px solid #eaeaea",
                      }}
                      format={"DD/MM/YYYY"}
                    />
                  </Form.Item>

                  <Form.Item
                    style={{
                      marginBottom: "5px",
                      padding: "1px 1px 1px 5px",
                    }}
                    name="jenisDokumen"
                    label="Jenis Dokumen"
                  >
                    <Select
                      value={jenisDokumen.length === 0 ? null : jenisDokumen}
                      style={{
                        width: "20%",
                        borderLeft: "5px solid #eaeaea",
                      }}
                      onChange={(val) => setJenisDokumen(val)}
                      size={"small"}
                    >
                      <Option value="10">PIB BERKALA</Option>
                      <Option value="11">PIB VOORITSLAG</Option>
                      <Option value="12">RUSH HANDLING</Option>
                      <Option value="13">SPTNP</Option>
                      <Option value="14">SPKTNP</Option>
                      <Option value="15">SPP</Option>
                      <Option value="16">SPSA</Option>
                      <Option value="17">SPPBMCP</Option>
                      <Option value="22">PEB PENUNDAAN</Option>
                      <Option value="20">SPPBK</Option>
                      <Option value="21">SPKPBK</Option>
                      <Option value="31">CK1 PENUNDAAN</Option>
                      <Option value="CK1A-BERKALA">CK1A BERKALA</Option>
                      <Option value="33">CK5</Option>
                      <Option value="34">STCK1</Option>
                      <Option value="36">SPPBP</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="dokumen_asal"
                    label="Dokumen Asal"
                    wrapperCol={{ span: 0 }}
                    style={{
                      marginBottom: 0,
                      padding: "1px 1px 1px 5px",
                      // borderBottom: "1px solid #eaeaea",
                    }}
                  >
                    <Input.Group compact>
                      {/** Jenis Dokumen Asal */}
                      <Form.Item
                        style={{ marginBottom: 0, width: "20%" }}
                        name="jenisDokumenAsal"
                      >
                        <Select
                          value={
                            jenisDokumenAsal.length === 0
                              ? null
                              : jenisDokumenAsal
                          }
                          style={{
                            width: "100%",
                            borderLeft: "5px solid #eaeaea",
                          }}
                          onChange={(val) => setJenisDokumenAsal(val)}
                          size={"small"}
                        >
                          <Option value="10">PIB BERKALA</Option>
                          <Option value="11">PIB VOORITSLAG</Option>
                          <Option value="12">RUSH HANDLING</Option>
                          <Option value="13">SPTNP</Option>
                          <Option value="14">SPKTNP</Option>
                          <Option value="15">SPP</Option>
                          <Option value="16">SPSA</Option>
                          <Option value="17">SPPBMCP</Option>
                          <Option value="22">PEB PENUNDAAN</Option>
                          <Option value="20">SPPBK</Option>
                          <Option value="21">SPKPBK</Option>
                          <Option value="31">CK1 PENUNDAAN</Option>
                          <Option value="CK1A-BERKALA">CK1A BERKALA</Option>
                          <Option value="33">CK5</Option>
                          <Option value="34">STCK1</Option>
                          <Option value="36">SPPBP</Option>
                        </Select>
                      </Form.Item>
                      <span style={{ marginRight: 8, marginLeft: 8 }}>/</span>
                      {/** NOMOR */}
                      <Form.Item
                        name="nomorDokumenAsal"
                        style={{ marginBottom: 0, width: "20%" }}
                      >
                        <Input
                          value={nomor}
                          onChange={(e) => setNomor(e.target.value)}
                          placeholder="Nomor"
                        />
                      </Form.Item>
                      <span style={{ marginRight: 8, marginLeft: 8 }}>/</span>
                      {/** TANGGAL */}
                      <Form.Item
                        name="tanggalDokumenAsal"
                        style={{ marginBottom: 0, width: "20%" }}
                      >
                        <DatePicker
                          style={{ width: "100%" }}
                          onChange={handleTanggalDokumenAsal}
                          placeholder="Tanggal"
                          format={"DD/MM/YYYY"}
                        />
                      </Form.Item>
                      <Form.Item
                        style={{ marginLeft: 8, marginBottom: 0, width: "12%" }}
                      >
                        <Button
                          type="info"
                          style={{ width: "100%" }}
                          onClick={handleTarik}
                        >
                          Tarik
                        </Button>
                      </Form.Item>
                      <Form.Item
                        style={{ marginLeft: 8, marginBottom: 0, width: "12%" }}
                      >
                        <Button type="info" style={{ width: "100%" }}>
                          Lihat
                        </Button>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                  <Form.Item
                    name="idPerusahaan"
                    label="id Perusahaan"
                    style={{
                      marginBottom: 0,
                      padding: "1px 1px 1px 5px",
                      // borderBottom: "1px solid #eaeaea",
                    }}
                  >
                    <Input style={{ borderLeft: "5px solid #eaeaea" }} />
                  </Form.Item>
                  <Form.Item
                    name="namaPerusahaan"
                    label="nama Perusahaan"
                    style={{
                      marginBottom: 0,
                      padding: "1px 1px 1px 5px",
                      // borderBottom: "1px solid #eaeaea",
                    }}
                  >
                    <Input
                      style={{ borderLeft: "5px solid #eaeaea" }}
                      value={perusahaan}
                      onChange={(e) => setPerusahaan(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="alamatPerusahaan"
                    label="Alamat Perusahaan"
                    wrapperCol={{ span: 0 }}
                    style={{
                      marginBottom: 0,
                      padding: "1px 1px 1px 5px",
                      // borderBottom: "1px solid #eaeaea",
                    }}
                  >
                    <Input
                      style={{ borderLeft: "5px solid #eaeaea" }}
                      value={alamat_perusahaan}
                      onChange={(e) => setAlamat_Perusahaan(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="ppjk"
                    label="PPJK"
                    wrapperCol={{ span: 0 }}
                    style={{
                      marginBottom: 0,
                      padding: "1px 1px 1px 5px",
                      // borderBottom: "1px solid #eaeaea",
                    }}
                  >
                    <Input
                      style={{ borderLeft: "5px solid #eaeaea" }}
                      value={ppjk}
                      onChange={(e) => setPpjk(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="petugas"
                    label="Petugas"
                    wrapperCol={{ span: 0 }}
                    style={{ marginBottom: 0, padding: "1px 1px 1px 5px" }}
                  >
                    <Input
                      style={{ borderLeft: "5px solid #eaeaea" }}
                      value={petugas}
                      onChange={(e) => setPetugas(e.target.value)}
                    />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
            <h1 style={{ fontWeight: "bold", fontSize: 24, marginTop: 14 }}>
              Pungutan
            </h1>
            <Row>
              <Col span={16}>
                {jenisDokumenAsal === "13" ||
                jenisDokumenAsal === "14" ||
                jenisDokumenAsal === "20" ||
                jenisDokumenAsal === "21" ? (
                  <Row style={{ marginBottom: 8 }}>
                    <Col span={5} style={{ display: "flex" }}>
                      <h4 style={{ marginRight: 10, marginBottom: 0 }}>
                        Akun :
                      </h4>
                      <Select
                        value={akun.length === 0 ? null : akun}
                        style={{ width: "60%" }}
                        onChange={handleAkun}
                        size={"small"}
                      >
                        {jenisDokumenAsal === "31" ||
                        jenisDokumenAsal === "CK1A-BERKALA" ? (
                          <>
                            <Option value="411511">Cukai HT</Option>
                            <Option value="411513">Cukai MMEA</Option>
                            <Option value="411512">Cukai EA</Option>
                          </>
                        ) : (
                          options_akun.map((item) => (
                            <Option key={item.key} value={item.value}>
                              {item.name}
                            </Option>
                          ))
                        )}
                      </Select>
                    </Col>
                    <Col span={7} style={{ display: "flex" }}>
                      <h4 style={{ marginRight: 10, marginBottom: 0 }}>
                        Pemberitahuan :
                      </h4>
                      <Input
                        style={{ width: "40%", height: "24px" }}
                        value={pemberitahuan}
                        onChange={(e) => setPemberitahuan(e.target.value)}
                      />
                    </Col>
                    <Col span={6} style={{ display: "flex" }}>
                      <h4 style={{ marginRight: 10, marginBottom: 0 }}>
                        Penetapan :
                      </h4>
                      <Input
                        style={{ width: "45%", height: "24px" }}
                        value={penetapan}
                        onChange={(e) => setPenetapan(e.target.value)}
                      />
                    </Col>
                    <Col span={6}>
                      <Button
                        type="primary"
                        size="small"
                        style={{ width: "100%" }}
                        onClick={handleSubmitPungutan}
                      >
                        Tambah Akun
                      </Button>
                    </Col>
                  </Row>
                ) : (
                  <Row style={{ marginBottom: 8 }}>
                    <Col span={6} style={{ display: "flex" }}>
                      <h4 style={{ marginRight: 10, marginBottom: 0 }}>
                        Akun :
                      </h4>
                      <Select
                        value={akun.length === 0 ? null : akun}
                        style={{ width: "65%" }}
                        onChange={handleAkun}
                        size={"small"}
                      >
                        {jenisDokumenAsal === "31" ||
                        jenisDokumenAsal === "CK1A-BERKALA" ? (
                          <>
                            <Option value="411511">Cukai HT</Option>
                            <Option value="411513">Cukai MMEA</Option>
                            <Option value="411512">Cukai EA</Option>
                          </>
                        ) : (
                          options_akun.map((item) => (
                            <Option key={item.key} value={item.value}>
                              {item.name}
                            </Option>
                          ))
                        )}
                      </Select>
                    </Col>
                    <Col span={6} style={{ display: "flex" }}>
                      <h4 style={{ marginRight: 10, marginBottom: 0 }}>
                        Selisih :
                      </h4>
                      <Select
                        value={selisih.length === 0 ? null : selisih}
                        style={{ width: "65%" }}
                        onChange={(val) => setSelisih(val)}
                        size={"small"}
                      >
                        <Option value="Y">Lebih Bayar</Option>
                        <Option value="T">Kurang Bayar</Option>
                      </Select>
                    </Col>
                    <Col span={6} style={{ display: "flex" }}>
                      <h4 style={{ marginRight: 10, marginBottom: 0 }}>
                        Nilai :
                      </h4>
                      <Input
                        style={{ width: "65%", height: "24px" }}
                        value={nilai}
                        onChange={handleNilai}
                      />
                    </Col>
                    <Col span={6}>
                      <Button
                        type="primary"
                        size="small"
                        style={{ width: "100%" }}
                        onClick={handleSubmitPungutan}
                      >
                        Tambah Akun
                      </Button>
                    </Col>
                  </Row>
                )}
                <Row justify="space-between">
                  <Col span={24}>
                    <List
                      size="small"
                      bordered
                      itemLayout="horizontal"
                      dataSource={data_pungutan}
                      renderItem={(item) => (
                        <List.Item
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              minWidth: "150px",
                              maxWidth: "550px",
                            }}
                          >
                            {uraianAkun(item.kodeAkun)}
                          </div>
                          <div
                            style={{
                              minWidth: "200px",
                              maxWidth: "550px",
                              padding: 4,
                              backgroundColor:
                                item.lebihBayar === "Y"
                                  ? "lightGreen"
                                  : "coral",
                              color: "black",
                              fontWeight: "bolder",
                            }}
                          >
                            {FormEditPungutan(item)}
                          </div>
                          <div>{EditPungutan(item)}</div>
                        </List.Item>
                      )}
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={6} offset={2}>
                <h4>Keterangan :</h4>
                <Badge color="lightGreen" text="Lebih Bayar" />
                <br />
                <Badge color="coral" text="Kurang Bayar" />
              </Col>
            </Row>
            <h1 style={{ fontWeight: "bold", fontSize: 24, marginTop: 14 }}>
              Keterangan
            </h1>
            <Row>
              <Col span={16}>
                <Row style={{ marginBottom: 8 }}>
                  <Col span={6} style={{ display: "flex" }}>
                    <Select
                      value={
                        jenisKeterangan.length === 0 ? null : jenisKeterangan
                      }
                      style={{ width: "90%" }}
                      onChange={handleJenisKeterangan}
                      size={"small"}
                    >
                      <Option value="Uraian Kesalahan">Uraian Kesalahan</Option>
                      <Option value="Alasan">Alasan</Option>
                      <Option value="Pasal">Pasal</Option>
                    </Select>
                  </Col>
                  <Col span={12} style={{ display: "flex" }}>
                    <Input
                      style={{ width: "92%", height: "24px" }}
                      value={uraian}
                      onChange={handleUraian}
                    />
                  </Col>
                  <Col span={6}>
                    <Button
                      type="primary"
                      size="small"
                      style={{ width: "100%" }}
                      onClick={handleSubmitKeterangan}
                    >
                      Tambah Keterangan
                    </Button>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col span={24}>
                    <List
                      size="small"
                      bordered
                      itemLayout="horizontal"
                      dataSource={data_keterangan}
                      renderItem={(item) => (
                        <List.Item
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              minWidth: "150px",
                              maxWidth: "550px",
                            }}
                          >
                            {item.jenisKeterangan}
                          </div>
                          <div
                            style={{
                              minWidth: "200px",
                              maxWidth: "550px",
                            }}
                          >
                            {FormEditKeterangan(item)}
                          </div>
                          <div>{EditKeterangan(item)}</div>
                        </List.Item>
                      )}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
}

export default RekamDokumenPiutang;
