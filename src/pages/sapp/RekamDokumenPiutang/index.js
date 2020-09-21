import {
  React,
  useEffect,
  axios,
  AutoComplete,
  Layout,
  Row,
  Col,
  Form,
  Input,
  useState,
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
  Modal,
  NumberFormat,
} from "../../../libraries/dependencies";
import {
  RefPerusahaan,
  SearchKantor,
  SelectAkunPungutan,
} from "../../../components/";
import { convertToRupiah, convertToAngka } from "../../../libraries/functions";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../../stores/actions";

const { Option } = Select;

const renderItem = (kode, nama) => {
  return {
    value: kode,
    nama: nama,
    label: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {kode}
        <span>{nama}</span>
      </div>
    ),
  };
};

function RekamDokumenPiutang() {
  const dispatch = useDispatch();
  let error = useSelector((state) => state.rekamManual.errorRekamManual);
  let result = useSelector((state) => state.rekamManual.data);
  let isLoading = useSelector((state) => state.rekamManual.loadingRekamManual);
  // const dataListKantor = useSelector((state) => state.listKantor.data);

  // Sid - Headear
  // ==============================================
  const [visibleRefPerusahaan, setVisibleRefPerusahaan] = useState(false);
  const [akun, setAkun] = useState("");
  const [namaAkun, setNamaAkun] = useState("");
  const [namaKantorPenerbit, setNamaKantorPenerbit] = useState(
    "Nama Kantor Penerbit"
  );
  const [namaKantorMonitor, setNamaKantorMonitor] = useState(
    "Nama Kantor Monitor"
  );
  const [kodeBidang, setKodeBidang] = useState("");
  const [jabatan1, setJabatan1] = useState("");
  const [jabatan2, setJabatan2] = useState("");

  // Form Perekaman
  // ==============================================

  const [kategoriJenisDokumen, setKategoriJenisDokumen] = useState("");
  const [jenisDokumen, setJenisDokumen] = useState("");
  const [disableJatuhTempo, setDisableJatuhTempo] = useState(true);
  const [tanggalDokumen, setTanggalDokumen] = useState("");
  const [jenisDokumenAsal, setJenisDokumenAsal] = useState("");
  const [listKodeBidang, setListKodeBidang] = useState([]);
  const [listJabatan, setListJabatan] = useState([]);
  const statusJabatan = [
    { kodeJabatan: "10", namaJabatan: "plh" },
    { kodeJabatan: "20", namaJabatan: "plt" },
    { kodeJabatan: "30", namaJabatan: "an" },
    { kodeJabatan: "40", namaJabatan: "ub" },
  ];
  let [totalNilai, setTotalNilai] = useState(null);
  const [form] = Form.useForm();
  const [formTambahNilai] = Form.useForm();
  // Pungutan
  // ==============================================
  const [pemberitahuan, setPemberitahuan] = useState(0);
  const [penetapan, setPenetapan] = useState(0);
  const [selisih, setSelisih] = useState("T");
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
  const listJenisDokumen = useSelector(
    (state) => state.jenisDokumen.jenisDokumen
  );
  const listJenisDokumenAsal = useSelector(
    (state) => state.jenisDokumen.jenisDokumenAsal
  );
  // console.log(listJenisDokumen, "list jenis dokumen");
  useEffect(() => {
    dispatch(allActions.getJenisDokumen("JENIS DOKUMEN"));
    dispatch(allActions.getJenisDokumen("JENIS DOKUMEN ASAL"));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-bidang-jabatan?keterangan=BIDANG`
      )
      .then((res) => {
        let dataKodeBidang = res.data.data;
        let dataTemp = [];
        dataKodeBidang.map((item) => {
          let data = {
            options: [renderItem(item.kodeBidangJabatan, item.uraian)],
          };
          return dataTemp.push(data);
        });
        setListKodeBidang(dataTemp);
      })
      .catch((error) => {
        // dispatch(SET_ERROR_HISTORY(error));
      })
      .finally((_) => {
        // dispatch(SET_LOADING_HISTORY(false));
      });

    axios
      .get(
        `http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-bidang-jabatan?keterangan=JABATAN`
      )
      .then((res) => {
        let dataJabatan = res.data.data;
        let dataTemp = [];
        dataJabatan.map((item) => {
          let data = {
            options: [renderItem(item.kodeBidangJabatan, item.uraian)],
          };
          return dataTemp.push(data);
        });
        setListJabatan(dataTemp);
      })
      .catch((error) => {
        // dispatch(SET_ERROR_HISTORY(error));
      })
      .finally((_) => {
        // dispatch(SET_LOADING_HISTORY(false));
      });

    const getJatuhTempo = () => {
      if (!jenisDokumen || !tanggalDokumen) {
        return console.log(
          jenisDokumen,
          tanggalDokumen,
          "ditolak get jatuh tempo"
        );
      }

      axios
        .get(
          `http://10.162.71.119:9090/perbendaharaan/perben/referensi/jatuh-tempo?jenisDokumen=${jenisDokumen}`
        )
        .then(({ data }) => {
          const dataServer = data.data[0];
          console.log(dataServer, "data server jatuh tempo");
          const date = tanggalDokumen;
          let jatuhTempo = moment();
          if (dataServer) {
            const bulan = dataServer.jatuhTempoBayar.bulan;
            const hari = dataServer.jatuhTempoBayar.hari;
            if (bulan) {
              console.log(hari, bulan);
              if (hari === "last") {
                jatuhTempo = moment(date)
                  .add(bulan, "M")
                  .endOf("month")
                  .format("DD-MM-YYYY");
              } else {
                jatuhTempo = moment(date)
                  .add(bulan, "M")
                  .set("date", hari)
                  .format("DD-MM-YYYY");
              }
            } else {
              jatuhTempo = moment(date).add(hari, "d");
            }
            console.log(hari, bulan, "hari bulan jatuh tempo");
            console.log(jatuhTempo, "tanggalJatuh tempo");
            if (!bulan && !hari) {
              setDisableJatuhTempo(false);
            } else {
              setDisableJatuhTempo(true);
              form.setFieldsValue({
                tanggalJatuhTempo: moment(jatuhTempo, "DD-MM-YYYY"),
              });
            }
            // let nama = "saya.ka.mu......jpeg";
            // let index = nama.substring(nama.lastIndexOf(".") + 1);
            // let namaFile = nama.substr(0, nama.lastIndexOf("."));
            // console.log(index, "index");
            // console.log(namaFile, "nama");
          }
        });
    };

    getJatuhTempo();
    // eslint-disable-next-line
  }, [jenisDokumen, tanggalDokumen]);

  // Function - Sid - Headear
  // ==============================================

  // Function - Form Perekaman
  // ==============================================

  const handleBersihkan = () => {
    setData_pungutan([]);
    setData_keterangan([]);
    // all form
    form.resetFields();
    message.success("Data Berhasil di Kosongkan!");
  };

  function totalPungutan(data) {
    let total = 0;
    data.map((item) => {
      if (item.lebihBayar !== "Y") {
        total += item.nilai;
      }
      return setTotalNilai(convertToRupiah(total));
    });
  }

  const handleSimpan = () => {
    if (data_pungutan < 1) {
      message.error("pungutan tidak boleh kosong");
    } else {
      totalPungutan(data_pungutan);
      const listTdPungutan = [];

      data_pungutan.map((item) => {
        const pungutan = {
          kodeAkun: item.kodeAkun,
          seri: item.seri,
          lebihBayar: item.lebihBayar,
          nilaiDiberitahukan: item.nilaiDiberitahukan,
          nilaiPenetapan: item.nilaiPenetapan,
          nilai: item.nilai,
        };
        return listTdPungutan.push(pungutan);
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
        nomorDokumen,
        tanggalDokumen,
        tanggalDokumenAsal,
        tanggalJatuhTempo,
        kodeBidang,
        petugas,
        statusJabatan1,
        statusJabatan2,
        jabatan1,
        jabatan2,
        ppjk,
      } = form.getFieldsValue();
      let payload = {
        idBilling: "",
        billingManual: false,
        flagManual: "Y",
        tdHeader: {
          alamatPerusahaan: alamatPerusahaan,
          idPerusahaan: idPerusahaan,
          idPpjk: ppjk,
          jenisDokumen: jenisDokumen,
          jenisDokumenAsal: jenisDokumenAsal,
          kodeBidang: kodeBidang,
          kodeKantorMonitor: kantorMonitor,
          kodeKantorPenerbit: kantorPenerbit,
          kodeProses: "100",
          namaPerusahaan: namaPerusahaan,
          namaPpjk: ppjk,
          nilai: convertToAngka(totalNilai),
          nipPetugas1: petugas,
          statusJabatan1: statusJabatan1,
          statusJabatan2: statusJabatan2,
          jabatan1: jabatan1,
          jabatan2: jabatan2,

          nomorDokumenAsal: nomorDokumenAsal,
          nomorDokumen: nomorDokumen,
          tanggalDokumen: moment(tanggalDokumen).format("YYYY-MM-DD HH:mm:ss"),
          tanggalDokumenAsal: moment(tanggalDokumenAsal).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          tanggalJatuhTempo: moment(tanggalJatuhTempo).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
        },
        nipRekam: petugas,
        listTdKeterangan: data_keterangan,
        listTdPungutan,
      };
      console.log(payload, "payload data submit");
      // // post rekam
      // dispatch(allActions.addRekamManual(payload));
      // form.resetFields();
    }
  };

  if (result) {
    console.log(result, "result rekam");
    message.success("Data Berhasil Ditambahkan");
    dispatch(allActions.setResultRekam(false));
    // result = false;
  }
  if (error) {
    console.log(error, "error rekam");
    message.error("error");
    // error = null;
  }

  // Function - Pungutan
  // ==============================================

  // const handleNilai = (e) => {
  //   setNilai(value);
  // };

  const EditPungutan = (item) => {
    function saveEdit() {
      for (let i = 0; i < data_pungutan.length; i++) {
        if (
          `${data_pungutan[i].kodeAkun}-${data_pungutan[i].seri}` ===
          keyEditPungutan
        ) {
          data_pungutan[i].nilai = Number(editValuePungutan);
        }
      }
      setKeyEditPungutan(0);
      totalPungutan(data_pungutan);
    }

    function deletePungutan() {
      let newData = data_pungutan.filter((data) => {
        return (
          `${data.kodeAkun}-${data.seri}` !== `${item.kodeAkun}-${item.seri}`
        );
      });
      setData_pungutan(newData);
      if (newData.length > 0) {
        totalPungutan(newData);
      } else {
        setTotalNilai(null);
      }
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

  const handleSubmitPungutan = (values) => {
    console.log(values, "submit pungutan");
    console.log("akun : ", akun);
    console.log("pemberitahuan : ", pemberitahuan);
    console.log("penetapan : ", penetapan);
    console.log("nilai : ", nilai);
    console.log("selisih : ", selisih);
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
    if (kategoriJenisDokumen === "PENETAPAN") {
      const check = pemberitahuan - penetapan;
      let ObjData = {
        kodeAkun: akun,
        namaAkun,
        seri: findSeri(),
        lebihBayar: parseInt(pemberitahuan) < parseInt(penetapan) ? "T" : "Y",
        nilaiDiberitahukan: parseInt(pemberitahuan),
        nilaiPenetapan: parseInt(penetapan),
        nilai:
          String(check).match(/-/g) !== null
            ? Number(String(check).replace("-", ""))
            : check,
      };
      console.log("objek data if: ", ObjData);

      if (!akun) {
        message.error("Mohon pilih akun");
      } else if (!pemberitahuan) {
        message.error("Mohon Isi Pemberitahuan");
      } else if (!penetapan) {
        message.error("Mohon Isi Penetapan");
      } else {
        const newData = [...data_pungutan, ObjData];
        setData_pungutan(newData);
        totalPungutan(newData);
        setAkun("");
        setPemberitahuan(0);
        setPenetapan(0);
        formTambahNilai.resetFields();
        return message.success("Sukses di Tambahkan!");
      }
    } else {
      let ObjData = {
        kodeAkun: akun,
        namaAkun,
        seri: findSeri(),
        lebihBayar: selisih,
        nilaiDiberitahukan: 0,
        nilaiPenetapan: 0,
        nilai: parseInt(nilai),
      };
      console.log("objek data else: ", ObjData);
      if (!akun) {
        message.error("Mohon pilih akun");
      } else if (!selisih) {
        // setSelisih("T");
        message.error("Mohon pilih jenis selisih");
      } else if (!nilai) {
        message.error("Mohon isi nilai");
      } else {
        const newData = [...data_pungutan, ObjData];
        setData_pungutan(newData);
        totalPungutan(newData);
        // setAkun("");
        setSelisih("T");
        // setNilai(0);
        formTambahNilai.resetFields();
        return message.success("Sukses di Tambahkan!");
      }
    }
  };

  //function get nama kantor

  const onSelectPenerbit = (value, option) => {
    setNamaKantorPenerbit(option.nama);
  };

  const onSelectMonitor = (value, option) => {
    setNamaKantorMonitor(option.nama);
  };

  function getKodeBidang(value, option) {
    setKodeBidang(option.nama);
  }

  function getJabatan1(value, option) {
    setJabatan1(option.nama);
  }

  function getJabatan2(value, option) {
    setJabatan2(option.nama);
  }

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

  const buttonReferensi = async () => {
    dispatch(allActions.getPerusahaan("ALL", 50, 1));
    setVisibleRefPerusahaan(true);
  };

  const setPerusahaan = async (data) => {
    const { npwp, namaPerusahaan, alamatPerusahaan } = data;
    console.log(data, "setPerusahaan");
    form.setFieldsValue({
      idPerusahaan: npwp,
      namaPerusahaan,
      alamatPerusahaan,
    });
    setVisibleRefPerusahaan(false);
  };

  if (isLoading) {
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
          spinning={isLoading}
          delay={500}
          tip="Menunggu Simpan Rekam Manual Piutang ....."
        />
      </div>
    );
  }

  const formParent = {
    marginBottom: "5px",
    padding: "1px 1px 1px 5px",
  };
  const formChild = {
    marginBottom: "5px",
  };

  const FormPungutan = () => {
    if (kategoriJenisDokumen === "PENETAPAN") {
      return (
        <>
          <Form.Item label="Pemberitahuan" name="pemberitahuan">
            <NumberFormat
              customInput={Input}
              thousandSeparator={true}
              prefix={"Rp "}
              inputmode="numeric"
              defaultValue={0}
              value={pemberitahuan}
              allowEmptyFormatting
              onValueChange={(values) => setPemberitahuan(values.value)}
            />
          </Form.Item>
          <Form.Item label="Penetapan" name="penetapan">
            <NumberFormat
              customInput={Input}
              thousandSeparator={true}
              prefix={"Rp "}
              inputmode="numeric"
              // value={penetapan}
              defaultValue={0}
              allowEmptyFormatting
              onValueChange={(values) => setPenetapan(values.value)}
            />
          </Form.Item>
        </>
      );
    } else {
      return (
        <>
          <Form.Item label="selisih" name="selisih" style={{ margin: "0 5px" }}>
            <Select
              value={selisih.length === 0 ? null : selisih}
              defaultValue={"T"}
              onChange={(val) => setSelisih(val)}
            >
              <Option value="Y">Lebih Bayar</Option>
              <Option value="T">Kurang Bayar</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Nilai" name="nilai">
            <NumberFormat
              customInput={Input}
              thousandSeparator={true}
              prefix={"Rp "}
              inputmode="numeric"
              // value={nilai}
              // defaultValue={}
              allowEmptyFormatting
              onValueChange={(values) => setNilai(values.value)}
            />
            {/* <Input value={nilai} onChange={handleNilai} /> */}
          </Form.Item>
        </>
      );
    }
  };

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Row justify="space-between">
        <h1 style={{ fontWeight: "bold", fontSize: 24 }}>
          Perekaman Dokumen Piutang
        </h1>
      </Row>

      <Form
        form={form}
        labelCol={{ span: 4 }}
        labelAlign={"left"}
        name="record-form"
        onFinish={handleSimpan}
      >
        <Form.Item label="Kantor Penerbit" style={formParent}>
          <Input.Group compact>
            <Form.Item name="kantorPenerbit" style={formChild}>
              <SearchKantor
                style={{ width: 200 }}
                onSelect={onSelectPenerbit}
              />
            </Form.Item>
            <h3 style={{ margin: "0 8px" }}>{namaKantorPenerbit}</h3>
          </Input.Group>
        </Form.Item>

        <Form.Item label="Kantor Monitor" style={formParent}>
          <Input.Group compact>
            <Form.Item name="kantorMonitor" style={formChild}>
              <SearchKantor style={{ width: 200 }} onSelect={onSelectMonitor} />
            </Form.Item>
            <Form.Item style={formChild}>
              <h3 style={{ margin: "0 8px" }}>{namaKantorMonitor}</h3>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item style={formParent} name="jenisDokumen" label="Jenis Dokumen">
          <Select
            placeholder="Jenis Dokumen"
            style={{
              width: 400,
            }}
            onChange={(val, option) => {
              setJenisDokumen(val);
              setKategoriJenisDokumen(option.kategori);
              // getJatuhTempo();
              console.log(val, "jenis dokumen");
            }}
          >
            {listJenisDokumen.map((item) => (
              <Option
                value={item.kodeDokumen}
                key={item.kodeDokumen}
                kategori={item.kategori}
              >
                {item.uraianDokumen}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="nomorDokumen"
          label="Nomor Dokumen"
          wrapperCol={{ span: 0 }}
          style={formParent}
        >
          <Input style={{ width: 200 }} />
        </Form.Item>

        {/* tanggal dok*/}

        <Form.Item
          name="tanggalDokumen"
          label="Tanggal Dokumen"
          wrapperCol={{ span: 4 }}
          style={formParent}
        >
          <DatePicker
            placeholder=""
            style={{ width: 200 }}
            format={"DD/MM/YYYY"}
            onChange={(date, dateString) => {
              setTanggalDokumen(date);
              // getJatuhTempo();
              console.log(date, dateString, "tanggal;=====================");
            }}
          />
        </Form.Item>

        <Form.Item
          name="dokumen_asal"
          label="Dokumen Asal"
          wrapperCol={{ span: 0 }}
          style={formParent}
        >
          <Input.Group compact>
            {/** Jenis Dokumen Asal */}
            <Form.Item name="jenisDokumenAsal" style={formChild}>
              <Select
                placeholder="Jenis Dokumen Asal"
                value={jenisDokumenAsal.length === 0 ? null : jenisDokumenAsal}
                style={{ width: 200 }}
                onChange={(val) => setJenisDokumenAsal(val)}
              >
                {listJenisDokumenAsal.map((item) => (
                  <Option value={item.kodeDokumen} key={item.kodeDokumen}>
                    {item.uraianDokumen}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <span style={{ margin: "0 5px 5px" }}>/</span>
            {/** NOMOR */}
            <Form.Item name="nomorDokumenAsal" style={formChild}>
              <Input
                placeholder="Nomor"
                style={{
                  width: "180px",
                }}
              />
            </Form.Item>
            <span style={{ margin: "0 5px 5px" }}>/</span>
            {/** TANGGAL */}
            <Form.Item name="tanggalDokumenAsal" style={formChild}>
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Tanggal"
                format={"DD-MM-YYYY"}
              />
            </Form.Item>

            <Form.Item style={{ margin: "0 5px 5px" }}>
              <Button
                type="info"
                style={{ width: "100%" }}
                onClick={() => console.log("tarik button")}
              >
                Tarik
              </Button>
            </Form.Item>
            <Form.Item style={{ marginBottom: "5px" }}>
              <Button type="info" style={{ width: "100%" }}>
                Lihat
              </Button>
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item
          name="tanggalJatuhTempo"
          label="Tanggal Jatuh Tempo"
          wrapperCol={{ span: 4 }}
          style={formParent}
        >
          <DatePicker
            disabled={disableJatuhTempo}
            placeholder=""
            style={{
              width: "200px",
            }}
            format={"DD-MM-YYYY"}
          />
        </Form.Item>

        <Form.Item label="Id Perusahaan" style={formParent}>
          <Input.Group compact>
            <Form.Item name="idPerusahaan" style={formChild}>
              <Input
                style={{
                  width: "200px",
                }}
              />
            </Form.Item>
            <Form.Item style={{ margin: "0 5px 5px" }}>
              <Button onClick={buttonReferensi}>Referensi</Button>
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item
          name="namaPerusahaan"
          label="Nama Perusahaan"
          style={formParent}
        >
          <Input style={{ width: 400 }} />
        </Form.Item>

        <Form.Item
          name="alamatPerusahaan"
          label="Alamat Perusahaan"
          wrapperCol={{ span: 0 }}
          style={formParent}
        >
          <Input style={{ width: 400 }} />
        </Form.Item>

        <Form.Item
          name="ppjk"
          label="PPJK"
          wrapperCol={{ span: 0 }}
          style={formParent}
        >
          <Input style={{ width: 200 }} />
        </Form.Item>

        <Form.Item label="Kode Bidang" style={formParent}>
          <Input.Group compact>
            <Form.Item
              name="kodeBidang"
              wrapperCol={{ span: 0 }}
              style={formChild}
            >
              {/* <Input /> */}
              <AutoComplete
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                style={{ width: 200 }}
                options={listKodeBidang}
                onSelect={(value, option) => getKodeBidang(value, option)}
                placeholder="Kode Bidang"
                filterOption={true}
              />
            </Form.Item>
            <h3 style={{ margin: "0 5px" }}>{kodeBidang}</h3>
          </Input.Group>
        </Form.Item>

        <Form.Item
          name="petugas"
          label="Petugas"
          wrapperCol={{ span: 0 }}
          style={formParent}
        >
          <Input style={{ width: 200 }} />
        </Form.Item>

        <Form.Item
          label="Status - Jabatan 1"
          wrapperCol={{ span: 0 }}
          style={formParent}
        >
          <Input.Group compact>
            <Form.Item style={formChild} name="statusJabatan1">
              <Select
                placeholder="Status"
                style={{
                  width: 200,
                  // borderLeft: "5px solid #eaeaea",
                }}
              >
                {statusJabatan.map((item) => (
                  <Option value={item.namaJabatan} key={item.kodeJabatan}>
                    {item.namaJabatan}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <span style={{ marginRight: 8, marginLeft: 8 }}> - </span>
            <Form.Item name="jabatan1" style={formChild}>
              <AutoComplete
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                style={{ width: 200 }}
                options={listJabatan}
                onSelect={(value, option) => getJabatan1(value, option)}
                placeholder="Kode Jabatan"
                filterOption={true}
              />
            </Form.Item>
            <h3 style={{ margin: "0 8px" }}>{jabatan1}</h3>
          </Input.Group>
        </Form.Item>

        <Form.Item
          label="Status - Jabatan 2"
          wrapperCol={{ span: 0 }}
          style={formParent}
        >
          <Input.Group compact>
            <Form.Item style={formChild} name="statusJabatan2">
              <Select
                placeholder="Status"
                style={{
                  width: 200,
                }}
              >
                {statusJabatan.map((item) => (
                  <Option value={item.namaJabatan} key={item.kodeJabatan}>
                    {item.namaJabatan}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <span style={{ marginRight: 8, marginLeft: 8 }}> - </span>
            <Form.Item name="jabatan2" style={formChild}>
              <AutoComplete
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                style={{ width: 200 }}
                options={listJabatan}
                onSelect={(value, option) => getJabatan2(value, option)}
                placeholder="Kode Jabatan"
                filterOption={true}
              />
            </Form.Item>
            <h3 style={{ margin: "0 8px" }}>{jabatan2}</h3>
          </Input.Group>
        </Form.Item>
      </Form>

      <h1 style={{ fontWeight: "bold", fontSize: 24, marginTop: 14 }}>
        Pungutan
      </h1>
      <Row>
        <Form form={formTambahNilai} onFinish={handleSubmitPungutan}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Form.Item label="akun" name="akun">
              <SelectAkunPungutan
                onSelect={(value, option) => {
                  setAkun(value);
                  setNamaAkun(option.namaAkun);
                }}
                kategoriJenisDokumen={kategoriJenisDokumen}
              />
            </Form.Item>
            <FormPungutan />
            <Form.Item style={{ marginLeft: "5px" }}>
              <Button type="primary" htmlType="submit">
                Tambah Akun
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Row>
      <Row>
        <Col span={18}>
          <List
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
                  {item.namaAkun}
                </div>
                <div
                  style={{
                    minWidth: "200px",
                    maxWidth: "550px",
                    padding: 4,
                    backgroundColor:
                      item.lebihBayar === "Y" ? "lightGreen" : "coral",
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
        <Col span={3} offset={1}>
          <h4>Keterangan :</h4>
          <Badge color="lightGreen" text="Lebih Bayar" />
          <br />
          <Badge color="coral" text="Kurang Bayar" />
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <h2>{totalNilai ? "Total Pungutan :" : ""}</h2>
        </Col>
        <Col span={4}>
          <h2>{totalNilai}</h2>
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
                value={jenisKeterangan.length === 0 ? null : jenisKeterangan}
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
      <Row justify="center" style={{ marginTop: "10px" }}>
        <Col span={4}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: 100, height: 35 }}
            onClick={handleSimpan}
          >
            Simpan
          </Button>
        </Col>
      </Row>

      <Row justify="end">
        <Col span={4}>
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
        </Col>
      </Row>

      <Modal
        title="Referensi Perusahaan"
        visible={visibleRefPerusahaan}
        footer={null}
        header={null}
        width={700}
        onCancel={() => setVisibleRefPerusahaan(false)}
      >
        <RefPerusahaan setPerusahaan={(data) => setPerusahaan(data)} />
      </Modal>
    </Layout>
  );
}

export default RekamDokumenPiutang;
