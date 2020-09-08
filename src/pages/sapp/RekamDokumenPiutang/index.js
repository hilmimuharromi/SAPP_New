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
  Alert,
  Modal,
} from "../../../libraries/dependencies";
import RefPerusahaan from "../../../components/RefPerusahaan";
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

function RekamDokumenPiutang() {
  const dispatch = useDispatch();
  let error = useSelector((state) => state.rekamManual.errorRekamManual);
  let result = useSelector((state) => state.rekamManual.data);
  let isLoading = useSelector((state) => state.rekamManual.loadingRekamManual);
  // const dataListKantor = useSelector((state) => state.listKantor.data);

  // Sid - Headear
  // ==============================================
  const [options, setOptions] = useState([]);
  const [optionsMonitor, setOptionsMonitor] = useState([]);
  const [visibleRefPerusahaan, setVisibleRefPerusahaan] = useState(false);
  const [akun, setAkun] = useState("");
  const [namaKantorPenerbit, setNamaKantorPenerbit] = useState("");
  const [namaKantorMonitor, setNamaKantorMonitor] = useState("");
  const [kodeBidang, setKodeBidang] = useState("");
  const [jabatan1, setJabatan1] = useState("");
  const [jabatan2, setJabatan2] = useState("");

  // Form Perekaman
  // ==============================================

  const [kategoriJenisDokumen, setKategoriJenisDokumen] = useState("");
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
  console.log(listJenisDokumen, "list jenis dokumen");

  useEffect(() => {
    dispatch(allActions.getJenisDokumen("JENIS DOKUMEN"));
    dispatch(allActions.getJenisDokumen("JENIS DOKUMEN ASAL"));
  });

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
  }, []);

  // Function - Sid - Headear
  // ==============================================
  if (isLoading) {
    return (
      <Spin tip="Loading...">
        <Alert message="Fetching data ....." />
      </Spin>
    );
  }

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
        listTdPungutan: data_pungutan,
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
    if (kategoriJenisDokumen === "PENETAPAN") {
      const check = pemberitahuan - penetapan;
      let ObjData = {
        kodeAkun: akun,
        seri: findSeri(),
        lebihBayar: parseInt(pemberitahuan) < parseInt(penetapan) ? "T" : "Y",
        nilaiDiberitahukan: parseInt(pemberitahuan),
        nilaiPenetapan: parseInt(penetapan),
        nilai:
          String(check).match(/-/g) !== null
            ? Number(String(check).replace("-", ""))
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
        totalPungutan(newData);
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
        // setSelisih("T");
        message.error("Mohon pilih jenis selisih");
      } else if (!nilai) {
        message.error("Mohon isi nilai");
      } else {
        const newData = [...data_pungutan, ObjData];
        setData_pungutan(newData);
        totalPungutan(newData);
        setAkun("");
        setSelisih("T");
        setNilai(0);
        return message.success("Sukses di Tambahkan!");
      }
    }
  };

  //function get nama kantor

  const onSelectPenerbit = (value, option) => {
    setNamaKantorPenerbit(option.nama);
  };

  const onSearchPenerbit = (searchText) => {
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

  const onSelectMonitor = (value, option) => {
    setNamaKantorMonitor(option.nama);
  };

  const onSearchMonitor = (searchText) => {
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
          setOptionsMonitor(listKantor);
        })
        .catch((err) => {
          console.log(err, "error get kantor");
        });
    }
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

  const getJatuhTempo = (date, dateString) => {
    let plusLastBulan = moment(date)
      .add(1, "M")
      .endOf("month")
      .format("YYYY/MM/DD");
    let addHari = moment(date).add(60, "d");
    const bulan = moment(date).add(1, "M").set("date", 5).format("YYYY/MM/DD");

    console.log(plusLastBulan, "get jatuh tempo lastday bulan berikutnya");
    console.log(addHari, "get jatuh tempo 60 hari");
    console.log(
      bulan,

      "get jatuh tempo tanggal 5 bulan berikutnya"
    );
    form.setFieldsValue({
      tanggalJatuhTempo: moment(addHari, "DD/MM/YYYY"),
    });
  };

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Row justify="space-between">
        <h1 style={{ fontWeight: "bold", fontSize: 24 }}>
          Perekaman Dokumen Piutang
        </h1>
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
          >
            <Form.Item
              label="Kantor Penerbit"
              style={{
                // marginBottom: "5px",
                height: "10px",
                padding: "1px 1px 1px 5px",
              }}
            >
              <Input.Group compact>
                <Form.Item
                  name="kantorPenerbit"
                  // wrapperCol={{ span: 0 }}
                >
                  <AutoComplete
                    dropdownClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={400}
                    style={{ width: 200 }}
                    options={options}
                    placeholder="kode kantor"
                    onSearch={onSearchPenerbit}
                    onSelect={onSelectPenerbit}
                  />
                </Form.Item>
                <h3 style={{ margin: "0 8px" }}>{namaKantorPenerbit}</h3>
              </Input.Group>
            </Form.Item>

            <Form.Item
              label="Kantor Monitor"
              style={{
                height: "10px",
                padding: "1px 1px 1px 5px",
              }}
            >
              <Input.Group compact>
                <Form.Item name="kantorMonitor">
                  <AutoComplete
                    dropdownClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={400}
                    style={{ width: 200 }}
                    options={optionsMonitor}
                    placeholder="kode kantor"
                    onSearch={onSearchMonitor}
                    onSelect={onSelectMonitor}
                  />
                </Form.Item>
                <h3 style={{ margin: "0 8px" }}>{namaKantorMonitor}</h3>
              </Input.Group>
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
                placeholder="Jenis Dokumen"
                style={{
                  width: "180px",
                  // borderLeft: "5px solid #eaeaea",
                }}
                onChange={(val, option) =>
                  setKategoriJenisDokumen(option.kategori)
                }
                size={"small"}
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
              style={{
                marginBottom: "5px",
                padding: "1px 1px 1px 5px",
                // borderBottom: "1px solid #eaeaea",
              }}
            >
              <Input
                style={{
                  width: "180px",
                }}
              />
            </Form.Item>

            {/* tanggal dok*/}

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
                style={{
                  width: "180px",
                }}
                format={"DD/MM/YYYY"}
                onChange={getJatuhTempo}
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
                    placeholder="Jenis Dokumen Asal"
                    value={
                      jenisDokumenAsal.length === 0 ? null : jenisDokumenAsal
                    }
                    style={{
                      width: "180px",
                    }}
                    onChange={(val) => setJenisDokumenAsal(val)}
                    size={"small"}
                  >
                    {listJenisDokumenAsal.map((item) => (
                      <Option value={item.kodeDokumen} key={item.kodeDokumen}>
                        {item.uraianDokumen}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <span style={{ marginRight: 8, marginLeft: 8 }}>/</span>
                {/** NOMOR */}
                <Form.Item
                  name="nomorDokumenAsal"
                  style={{ marginBottom: 0, width: "20%" }}
                >
                  <Input
                    placeholder="Nomor"
                    style={{
                      width: "180px",
                    }}
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
                    onClick={() => console.log("tarik button")}
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
                disabled
                placeholder=""
                style={{
                  width: "180px",
                }}
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
            <Form.Item
              name="idPerusahaan"
              label="Id Perusahaan"
              style={{
                marginBottom: 5,
                padding: "1px 1px 1px 5px",
              }}
            >
              <Input.Group compact>
                <Form.Item name="idPerusahaan">
                  <Input
                    style={{
                      width: "180px",
                    }}
                    // onChange={(e) => getNamaPerusahaan(e.target.value)}
                  />
                </Form.Item>
                <Form.Item style={{ marginLeft: "5px" }}>
                  <Button onClick={buttonReferensi}>Referensi</Button>
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item
              name="namaPerusahaan"
              label="Nama Perusahaan"
              style={{
                marginBottom: 10,
                padding: "1px 1px 1px 5px",
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="alamatPerusahaan"
              label="Alamat Perusahaan"
              wrapperCol={{ span: 0 }}
              style={{
                marginBottom: 10,
                padding: "1px 1px 1px 5px",
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="ppjk"
              label="PPJK"
              wrapperCol={{ span: 0 }}
              style={{
                marginBottom: 10,
                padding: "1px 1px 1px 5px",
              }}
            >
              <Input style={{ width: 180 }} />
            </Form.Item>

            <Form.Item
              label="Kode Bidang"
              style={{
                // marginBottom: "5px",
                height: "10px",
                padding: "1px 1px 1px 5px",
              }}
            >
              <Input.Group compact>
                <Form.Item
                  name="kodeBidang"
                  wrapperCol={{ span: 0 }}
                  style={{ marginBottom: 10 }}
                >
                  {/* <Input /> */}
                  <AutoComplete
                    dropdownClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={500}
                    style={{ width: 180 }}
                    options={listKodeBidang}
                    onSelect={(value, option) => getKodeBidang(value, option)}
                    placeholder="Kode Bidang"
                    filterOption={true}
                  />
                </Form.Item>
                <h3 style={{ margin: "0 8px" }}>{kodeBidang}</h3>
              </Input.Group>
            </Form.Item>

            <Form.Item
              name="petugas"
              label="Petugas"
              wrapperCol={{ span: 0 }}
              style={{ marginBottom: 10, padding: "1px 1px 1px 5px" }}
            >
              <Input style={{ width: 180 }} />
            </Form.Item>

            <Form.Item
              label="Status - Jabatan 1"
              wrapperCol={{ span: 0 }}
              style={{
                marginBottom: "10px",
                height: "20px",
                padding: "1px 1px 1px 5px",
              }}
            >
              <Input.Group compact>
                <Form.Item
                  style={{
                    width: "20%",
                  }}
                  name="statusJabatan1"
                >
                  <Select
                    placeholder="Status"
                    style={{
                      width: "100%",
                      // borderLeft: "5px solid #eaeaea",
                    }}
                    size={"small"}
                  >
                    {statusJabatan.map((item) => (
                      <Option value={item.namaJabatan} key={item.kodeJabatan}>
                        {item.namaJabatan}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <span style={{ marginRight: 8, marginLeft: 8 }}> - </span>
                <Form.Item name="jabatan1">
                  <AutoComplete
                    dropdownClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={500}
                    style={{ width: 180 }}
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
              style={{
                marginBottom: 0,
                height: "10px",
                padding: "1px 1px 1px 5px",
              }}
            >
              <Input.Group compact>
                <Form.Item
                  style={{ marginBottom: 0, width: "20%" }}
                  name="statusJabatan2"
                >
                  <Select
                    placeholder="Status"
                    style={{
                      width: "100%",
                    }}
                    size={"small"}
                  >
                    {statusJabatan.map((item) => (
                      <Option value={item.namaJabatan} key={item.kodeJabatan}>
                        {item.namaJabatan}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <span style={{ marginRight: 8, marginLeft: 8 }}> - </span>
                <Form.Item name="jabatan2">
                  <AutoComplete
                    dropdownClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={500}
                    style={{ width: 180 }}
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
        </Col>
      </Row>
      <h1 style={{ fontWeight: "bold", fontSize: 24, marginTop: 14 }}>
        Pungutan
      </h1>
      <Row>
        <Col span={16}>
          {kategoriJenisDokumen === "PENETAPAN" ? (
            <Row style={{ marginBottom: 8 }}>
              <Col span={5} style={{ display: "flex" }}>
                <h4 style={{ marginRight: 10, marginBottom: 0 }}>Akun :</h4>
                <Select
                  value={akun.length === 0 ? null : akun}
                  style={{ width: "60%" }}
                  onChange={handleAkun}
                  size={"small"}
                >
                  {kategoriJenisDokumen === "AKUNCUKAI" ? (
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
                <h4 style={{ marginRight: 10, marginBottom: 0 }}>Akun :</h4>
                <Select
                  value={akun.length === 0 ? null : akun}
                  style={{ width: "65%" }}
                  onChange={handleAkun}
                  size={"small"}
                >
                  {kategoriJenisDokumen === "AKUNCUKAI" ? (
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
                <h4 style={{ marginRight: 10, marginBottom: 0 }}>Selisih :</h4>
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
                <h4 style={{ marginRight: 10, marginBottom: 0 }}>Nilai :</h4>
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
          </Row>
        </Col>
        <Col span={6} offset={2}>
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
