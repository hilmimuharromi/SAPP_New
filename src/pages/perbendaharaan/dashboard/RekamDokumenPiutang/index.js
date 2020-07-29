import {
  React,
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
  moment
} from "../../libraries/dependencies";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;

function RekamDokumenPiutang() {
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
      tanggal_jatuh_tempo: "06/06/2006",
      dokumen_asal: "SPTNP/000001/05/06/2001",
      // surat: "S000001",
      // nomor: "000001",
      // tanggal: "2019-02-07", // MM/DD/YYYY
      perusahaan: "12345678912345 - PT TESTING INDONESIA",
      alamat_perusahaan: "Jalan Alamat PT Testing Indonesia",
      ppjk: "-",
      petugas: "198989504523538987 - Andhika Kusuma",
      key: "1",
    },
    {
      dokumen_asal: "SPP/000002/05/06/2020",
      // surat: "S000002",
      // nomor: "000002",
      // tanggal: "2020-02-08", // MM/DD/YYYY
      perusahaan: "12345678912345 - PT SINAR MULYA SENTOSA",
      alamat_perusahaan: "Jalan Alamat Cileungsi Bogor",
      ppjk: "-",
      petugas: "198989504523538987 - Salman Isar",
      key: "2",
    },
  ];
  const [kantor_penerbit, setKantor_penerbit] = useState("");
  const [kantor_monitor, setKantor_monitor] = useState("");
  const [tanggal_jatuh_tempo, setTanggal_jatuh_tempo] = useState("");
  const [surat, setSurat] = useState("");
  const [nomor, setNomor] = useState("");
  const [tanggal_dokumen, setTanggal_dokumen] = useState("");
  const [perusahaan, setPerusahaan] = useState("");
  const [alamat_perusahaan, setAlamat_Perusahaan] = useState("");
  const [ppjk, setPpjk] = useState("");
  const [petugas, setPetugas] = useState("");
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
  const [selisih, setSelisih] = useState("");
  const [nilai, setNilai] = useState(0);
  const [data_pungutan, setData_pungutan] = useState([]);
  let [editValuePungutan, setEditValuePungutan] = useState(0);
  const [keyEditPungutan, setKeyEditPungutan] = useState(0);
  // Keterangan
  // ==============================================
  const [keterangan, setKeterangan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
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
    setTanggal_jatuh_tempo(dateString);
  };

  const handleTanggalDokumen = (date, dateString) => {
    setTanggal_dokumen(dateString);
  };

  const handleTarik = () => {
    let dokumen_asal = `${surat}/${nomor}/${tanggal_dokumen}`;
    for (let i = 0; i < db_dokumen_asal.length; i++) {
      if (db_dokumen_asal[i].dokumen_asal === dokumen_asal) {
        form.setFieldsValue({
          kantor_penerbit: db_dokumen_asal[i].kantor_penerbit,
          kantor_monitor: db_dokumen_asal[i].kantor_monitor,
          tanggal_jatuh_tempo: moment(db_dokumen_asal[i].tanggal_jatuh_tempo, "DD/MM/YYYY"),
          perusahaan: db_dokumen_asal[i].perusahaan,
          alamat_perusahaan: db_dokumen_asal[i].alamat_perusahaan,
          ppjk: db_dokumen_asal[i].ppjk,
          petugas: db_dokumen_asal[i].petugas,
        });
        return message.success("Data ditemukan!");
      }
    }
    return message.error("Data Tidak ditemukan!");
  };

  const handleBersihkan = () => {
    // others
    setKantor_penerbit("");
    setKantor_monitor("");
    setTanggal_jatuh_tempo("");
    // 3 params
    setSurat("");
    setNomor("");
    setTanggal_dokumen("");
    form.resetFields();
    message.success("Data Berhasil di Kosongkan!");
  };

  const handleSimpan = () => {
    // others
    setKantor_penerbit("");
    setKantor_monitor("");
    setTanggal_jatuh_tempo("");
    // 3 params
    setSurat("");
    setNomor("");
    setTanggal_dokumen("");
    form.resetFields();
    message.success("Data Berhasil di Kirim!");
  };

  // Function - Pungutan
  // ==============================================
  const handleAkun = (val) => {
    setAkun(val);
  };

  const handleSelisih = (val) => {
    setSelisih(val);
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
      return item.nilai;
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
    let ObjData = {
      key: data_pungutan.length + 1,
      akun: akun,
      selisih: selisih,
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
      message.success("Sukses di Tambahkan!");
    }
  };

  // Function - Keterangan
  // ==============================================
  const handleKeterangan = (val) => {
    setKeterangan(val);
  };

  const handleDeskripsi = (e) => {
    setDeskripsi(e.target.value);
  };

  const EditKeterangan = (item) => {
    function saveEdit() {
      for (let i = 0; i < data_keterangan.length; i++) {
        if (data_keterangan[i].key === item.key) {
          data_keterangan[i].deskripsi = editValueKeterangan;
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
      setEditValueKeterangan(item.deskripsi);
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
      return item.deskripsi;
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
    let ObjData = {
      key: data_keterangan.length + 1,
      keterangan: keterangan,
      deskripsi: deskripsi,
    };

    if (!keterangan) {
      message.error("Mohon pilih keterangan");
    } else if (!deskripsi) {
      message.error("Mohon isi deskripsi");
    } else {
      const newData = [...data_keterangan, ObjData];
      setData_keterangan(newData);
      setKeterangan("");
      setDeskripsi("");
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
                style={{ width: 100, height: 35, marginLeft: "auto", marginRight: "2px" }}
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
                  labelCol={{ span: 4 }}
                  labelAlign={"left"}
                  name="record-form"
                  size={"small"}
                  style={{ border: "1px solid #eaeaea", minWidth: "100%" }}
                >
                  <Form.Item
                    name="kantor_penerbit"
                    label="Kantor Penerbit"
                    wrapperCol={{ span: 0 }}
                    style={{
                      marginBottom: 0,
                      padding: "1px 1px 1px 5px",
                      borderBottom: "1px solid #eaeaea",
                    }}
                  >
                    <Input
                      style={{ borderLeft: "5px solid #eaeaea" }}
                      value={kantor_penerbit}
                      onChange={(e) => setKantor_penerbit(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="kantor_monitor"
                    label="Kantor Monitor"
                    wrapperCol={{ span: 0 }}
                    style={{
                      marginBottom: 0,
                      padding: "1px 1px 1px 5px",
                      borderBottom: "1px solid #eaeaea",
                    }}
                  >
                    <Input
                      style={{ borderLeft: "5px solid #eaeaea" }}
                      value={kantor_monitor}
                      onChange={(e) => setKantor_monitor(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="tanggal_jatuh_tempo"
                    label="Tanggal Jatuh Tempo"
                    wrapperCol={{ span: 4 }}
                    style={{
                      marginBottom: 0,
                      padding: "1px 1px 1px 5px",
                      borderBottom: "1px solid #eaeaea",
                    }}
                  >
                    <DatePicker
                      placeholder=""
                      onChange={handleTanggalJatuhTMP}
                      selected={tanggal_jatuh_tempo}
                      style={{ width: "100%", borderLeft: "5px solid #eaeaea" }}
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
                      borderBottom: "1px solid #eaeaea",
                    }}
                  >
                    <Input.Group compact>
                      {/** SURAT */}
                      <Form.Item style={{ marginBottom: 0, width: "20%" }}>
                        <Select
                          value={surat.length === 0 ? null : surat}
                          style={{ width: "100%", borderLeft: "5px solid #eaeaea" }}
                          onChange={(val) => setSurat(val)}
                          size={"small"}
                        >
                          <Option value="PIB BERKALA">PIB BERKALA</Option>
                          <Option value="PIB VOORITSLAG">PIB VOORITSLAG</Option>
                          <Option value="RUSH HANDLING">RUSH HANDLING</Option>
                          <Option value="SPTNP">SPTNP</Option>
                          <Option value="SPKTNP">SPKTNP</Option>
                          <Option value="SPP">SPP</Option>
                          <Option value="SPSA">SPSA</Option>
                          <Option value="SPPBMCP">SPPBMCP</Option>
                          <Option value="PEB PENUNDAAN">PEB PENUNDAAN</Option>
                          <Option value="SPPBK">SPPBK</Option>
                          <Option value="SPKPBK">SPKPBK</Option>
                          <Option value="CK1 PENUNDAAN">CK1 PENUNDAAN</Option>
                          <Option value="CK1A BERKALA">CK1A BERKALA</Option>
                          <Option value="CK5">CK5</Option>
                          <Option value="STCK1">STCK1</Option>
                          <Option value="SPPBP">SPPBP</Option>
                        </Select>
                      </Form.Item>
                      <span style={{ marginRight: 8, marginLeft: 8 }}>/</span>
                      {/** NOMOR */}
                      <Form.Item style={{ marginBottom: 0, width: "20%" }}>
                        <Input
                          value={nomor}
                          onChange={(e) => setNomor(e.target.value)}
                          placeholder="Nomor"
                        />
                      </Form.Item>
                      <span style={{ marginRight: 8, marginLeft: 8 }}>/</span>
                      {/** TANGGAL */}
                      <Form.Item style={{ marginBottom: 0, width: "20%" }}>
                        <DatePicker
                          style={{ width: "100%" }}
                          onChange={handleTanggalDokumen}
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
                    name="perusahaan"
                    label="Perusahaan"
                    style={{
                      marginBottom: 0,
                      padding: "1px 1px 1px 5px",
                      borderBottom: "1px solid #eaeaea",
                    }}
                  >
                    <Input
                      style={{ borderLeft: "5px solid #eaeaea" }}
                      value={perusahaan}
                      onChange={(e) => setPerusahaan(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="alamat_perusahaan"
                    label="Alamat Perusahaan"
                    wrapperCol={{ span: 0 }}
                    style={{
                      marginBottom: 0,
                      padding: "1px 1px 1px 5px",
                      borderBottom: "1px solid #eaeaea",
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
                      borderBottom: "1px solid #eaeaea",
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
                <Row style={{ marginBottom: 8 }}>
                  <Col span={6} style={{ display: "flex" }}>
                    <h4 style={{ marginRight: 10, marginBottom: 0 }}>Akun :</h4>
                    <Select
                      value={akun.length === 0 ? null : akun}
                      style={{ width: "60%" }}
                      onChange={handleAkun}
                      size={"small"}
                    >
                      {surat === "CK1 PENUNDAAN" || surat === "CK1A BERKALA" ? (
                        <>
                          <Option value="Cukai HT">Cukai HT</Option>
                          <Option value="Cukai MMEA">Cukai MMEA</Option>
                          <Option value="Cukai EA">Cukai EA</Option>
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
                    <h4 style={{ marginRight: 10, marginBottom: 0 }}>Selisih :</h4>
                    <Select
                      value={selisih.length === 0 ? null : selisih}
                      style={{ width: "60%" }}
                      onChange={handleSelisih}
                      size={"small"}
                    >
                      <Option value="lebih bayar">Lebih Bayar</Option>
                      <Option value="kurang bayar">Kurang Bayar</Option>
                    </Select>
                  </Col>
                  <Col span={6} style={{ display: "flex" }}>
                    <h4 style={{ marginRight: 10, marginBottom: 0 }}>Nilai :</h4>
                    <Input
                      style={{ width: "60%", height: "24px" }}
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
                          <td
                            style={{
                              minWidth: "150px",
                              maxWidth: "550px",
                            }}
                          >
                            {item.akun}
                          </td>
                          <td
                            style={{
                              minWidth: "200px",
                              maxWidth: "550px",
                              padding: 4,
                              backgroundColor:
                                item.selisih === "lebih bayar"
                                  ? "lightGreen"
                                  : "coral",
                              color: 'black',
                              fontWeight: 'bolder'
                            }}
                          >
                            {FormEditPungutan(item)}
                          </td>
                          <td>
                            {EditPungutan(item)}
                          </td>
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
            <h1 style={{ fontWeight: "bold", fontSize: 24, marginTop: 14 }}>Keterangan</h1>
            <Row>
              <Col span={16}>
                <Row style={{ marginBottom: 8 }}>
                  <Col span={6} style={{ display: "flex" }}>
                    <Select
                      value={keterangan.length === 0 ? null : keterangan}
                      style={{ width: "90%" }}
                      onChange={handleKeterangan}
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
                      value={deskripsi}
                      onChange={handleDeskripsi}
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
                          <td
                            style={{
                              minWidth: "150px",
                              maxWidth: "550px",
                            }}
                          >
                            {item.keterangan}
                          </td>
                          <td
                            style={{
                              minWidth: "200px",
                              maxWidth: "550px",
                            }}
                          >
                            {FormEditKeterangan(item)}
                          </td>
                          <td>{EditKeterangan(item)}</td>
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
