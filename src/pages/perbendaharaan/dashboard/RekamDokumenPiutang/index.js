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
      tanggal_jatuh_tempo: "05/06/2020 09:10:11",
      dokumen_asal: "SPTNP/000001/05/06/2001",
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
      dokumen_asal: "SPP/000002/05/06/2020",
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
      dokumen_asal: "CK1-PENUNDAAN/000003/05/06/2020",
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
          akun: "Cukai-HT",
          nilai: 10000000,
          lebihBayar: "YA",
        },
        {
          akun: "Cukai-MMEA",
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
  const [jenisDokumenAsal, setJenisDokumenAsal] = useState("");
  const [nomor, setNomor] = useState("");
  const [tanggal_dokumen_asal, setTanggal_dokumen_asal] = useState("");
  const [perusahaan, setPerusahaan] = useState("");
  const [alamat_perusahaan, setAlamat_Perusahaan] = useState("");
  const [ppjk, setPpjk] = useState("");
  const [petugas, setPetugas] = useState("");
  let [totalNilai, setTotalNilai] = useState(0)
  const [form] = Form.useForm();
  // Pungutan
  // ==============================================
  const options_akun = [
    {
      name: "Bea Masuk",
      value: "Bea Masuk",
      key: "1",
    },
    {
      name: "BM AD",
      value: "BM AD",
      key: "2",
    },
    {
      name: "BM PT",
      value: "BM PT",
      key: "3",
    },
    {
      name: "PPN",
      value: "PPN",
      key: "4",
    },
    {
      name: "PPH",
      value: "PPH",
      key: "5",
    },
    {
      name: "DENDA",
      value: "DENDA",
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

  // Function - Sid - Headear
  // ==============================================
  let history = useHistory();
  const handleNavigate = () => {
    history.push("/");
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

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
    // others
    // setKantor_penerbit("");
    // setKantor_monitor("");
    // setTanggal_jatuh_tempo("");
    // 3 params
    // setJenisDokumenAsal("");
    // setNomor("");
    // setTanggal_dokumen_asal("");
    // pungutan
    // setData_pungutan([]);
    // all form
    form.resetFields();
    message.success("Data Berhasil di Kosongkan!");
  };

  const handleSimpan = () => {
    data_pungutan.map(item => {
      if(item.lebihBayar !== 'YA'){
        totalNilai += item.nilai
      }
    })
    const {
      idPerusahaan,
      namaPerusahaan,
      alamatPerusahaan,
      kantorPenerbit,
      kantorMonitor,
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
        jenisDokumen: "kosong",
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
        nomordokumen: nomorDokumenAsal,
        tanggalDokumen: moment(tanggalDokumen).format("YYYY-MM-DD hh:mm:ss"),
        tanggalDokumenAsal: moment(tanggalDokumenAsal).format(
          "YYYY-MM-DD hh:mm:ss"
        ),
        tanggalJatuhTempo: moment(tanggalJatuhTempo).format(
          "YYYY-MM-DD hh:mm:ss"
        ),
      },
      listTdKeterangan: [data_keterangan],
      listTdPungutan: [data_pungutan],
    };
    let data = form.getFieldsValue();
    console.log(data, "submit data values");
    console.log(payload, "payload data submit");

    // // post rekam
    axios({
      method: 'post',
      url: 'http://localhost:3000/rekam',
      data: payload
    })
    .then(({
        data
      }) => {
       console.log(data, 'berhasil');
       message.success("Data Berhasil di Kirim!");
      })
      .catch(error => {
        console.log((error, 'error'));
        message.error("ada yang salah!");
      })
      .finally(_ => {
        console.log('sukses');
      })
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
        if (data_pungutan[i].key === item.key) {
          data_pungutan[i].nilai = editValuePungutan;
        }
      }
      setKeyEditPungutan(0);
    }

    function deletePungutan() {
      let newData = data_pungutan.filter((data) => {
        return data.key !== item.key;
      });
      setData_pungutan(newData);
    }

    function klikEdit() {
      setKeyEditPungutan(item.key);
      setEditValuePungutan(item.nilai);
    }
    if (keyEditPungutan !== item.key) {
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
    if (keyEditPungutan !== item.key) {
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
    function findSeri(res) {
      let getSeri = data_pungutan.filter((item) => {
        return item.akun === akun
      });
      if (getSeri.length < 1) {
        console.log(getSeri, 'seri baru');
        return 1;
      } else {
        console.log(getSeri, 'seri lama');

        return getSeri.length + 1;
      }
    }
    if (
      jenisDokumenAsal === "SPTNP" ||
      jenisDokumenAsal === "SPKTNP" ||
      jenisDokumenAsal === "SPPBK" ||
      jenisDokumenAsal === "SPKPBK"
    ) {
      const check = pemberitahuan - penetapan;
      let ObjData = {
        akun: akun,
        seri: findSeri(),
        lebihBayar:
          parseInt(pemberitahuan) > parseInt(penetapan) ? "TIDAK" : "YA",
        nilaiDiberitahukan: pemberitahuan,
        nilaiPenetapan: penetapan,
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
        akun: akun,
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
        if (data_keterangan[i].key === item.key) {
          data_keterangan[i].uraian = editValueKeterangan;
        }
      }
      setKeyEditKeterangan(0);
    }

    function deleteKeterangan() {
      let newData = data_keterangan.filter((data) => {
        return data.key !== item.key;
      });
      setData_keterangan(newData);
    }

    function klikEdit() {
      setKeyEditKeterangan(item.key);
      setEditValueKeterangan(item.uraian);
    }
    if (keyEditKeterangan !== item.key) {
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
    if (keyEditKeterangan !== item.key) {
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

  const handleSubmitKeterangan = () => {
    function findSeri(res) {
      let getSeri = data_keterangan.filter((item) => {
        // if (item.jenisKeterangan === jenisKeterangan) {
          // console.log(item.jenisKeterangan, jenisKeterangan, 'masuk sama');
          return item.jenisKeterangan === jenisKeterangan;
        // } else {
        //   return null;
        // }
      });
     
      if (getSeri.length < 1) {
        
        return 1;
      } else {
        return getSeri.length + 1;
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
                          <Option value="PIB-BERKALA">PIB BERKALA</Option>
                          <Option value="PIB-VOORITSLAG">PIB VOORITSLAG</Option>
                          <Option value="RUSH-HANDLING">RUSH HANDLING</Option>
                          <Option value="SPTNP">SPTNP</Option>
                          <Option value="SPKTNP">SPKTNP</Option>
                          <Option value="SPP">SPP</Option>
                          <Option value="SPSA">SPSA</Option>
                          <Option value="SPPBMCP">SPPBMCP</Option>
                          <Option value="PEB-PENUNDAAN">PEB PENUNDAAN</Option>
                          <Option value="SPPBK">SPPBK</Option>
                          <Option value="SPKPBK">SPKPBK</Option>
                          <Option value="CK1-PENUNDAAN">CK1 PENUNDAAN</Option>
                          <Option value="CK1A-BERKALA">CK1A BERKALA</Option>
                          <Option value="CK5">CK5</Option>
                          <Option value="STCK1">STCK1</Option>
                          <Option value="SPPBP">SPPBP</Option>
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
                {jenisDokumenAsal === "SPTNP" ||
                jenisDokumenAsal === "SPKTNP" ||
                jenisDokumenAsal === "SPPBK" ||
                jenisDokumenAsal === "SPKPBK" ? (
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
                        {jenisDokumenAsal === "CK1-PENUNDAAN" ||
                        jenisDokumenAsal === "CK1A-BERKALA" ? (
                          <>
                            <Option value="Cukai-HT">Cukai HT</Option>
                            <Option value="Cukai-MMEA">Cukai MMEA</Option>
                            <Option value="Cukai-EA">Cukai EA</Option>
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
                        {jenisDokumenAsal === "CK1-PENUNDAAN" ||
                        jenisDokumenAsal === "CK1A-BERKALA" ? (
                          <>
                            <Option value="Cukai-HT">Cukai HT</Option>
                            <Option value="Cukai-MMEA">Cukai MMEA</Option>
                            <Option value="Cukai-EA">Cukai EA</Option>
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
                        <Option value="YA">Lebih Bayar</Option>
                        <Option value="TIDAK">Kurang Bayar</Option>
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
                            {item.akun}
                          </div>
                          <div
                            style={{
                              minWidth: "200px",
                              maxWidth: "550px",
                              padding: 4,
                              backgroundColor:
                                item.lebihBayar === "YA"
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
