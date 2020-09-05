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
} from "../../../libraries/dependencies";
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
  const [akun, setAkun] = useState("");
  const [namaKantorPenerbit, setNamaKantorPenerbit] = useState("");
  const [namaKantorMonitor, setNamaKantorMonitor] = useState("");
  const [kodeBidang, setKodeBidang] = useState("");
  const [jabatan1, setJabatan1] = useState("");
  const [jabatan2, setJabatan2] = useState("");

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
  const [tanggal_dokumen_asal, setTanggal_dokumen_asal] = useState("");
  const [statusJabatan1, setStatusJabatan1] = useState([]);
  const [statusJabatan2, setStatusJabatan2] = useState([]);
  const [listKantor, setListKantor] = useState([]);
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

  useEffect(() => {
    dispatch(allActions.getJenisDokumen("JENIS DOKUMEN"));
    dispatch(allActions.getJenisDokumen("JENIS DOKUMEN ASAL"));
  }, [dispatch]);

  useEffect(() => {
    axios
      .get(`http://10.162.71.21:8111/Referensi/v1/kantor/all`)
      .then((res) => {
        let dataKantor = res.data.data;
        let dataTemp = [];
        dataKantor.map((item) => {
          let data = {
            options: [renderItem(item.kodeKantor, item.namaKantorPendek)],
          };
          return dataTemp.push(data);
        });
        setListKantor(dataTemp);
      })
      .catch((error) => {
        // dispatch(SET_ERROR_HISTORY(error));
      })
      .finally((_) => {
        // dispatch(SET_LOADING_HISTORY(false));
      });
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
  }, []);

  // Function - Sid - Headear
  // ==============================================
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
    const {
      jenisDokumenAsal,
      nomorDokumenAsal,
      tanggalDokumenAsal,
    } = form.getFieldsValue();
    let dokumen_asal = `${jenisDokumenAsal}/${nomorDokumenAsal}/${tanggalDokumenAsal}`;
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
      dispatch(allActions.addRekamManual(payload));
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
    if (
      jenisDokumen === "13" ||
      jenisDokumen === "14" ||
      jenisDokumen === "20" ||
      jenisDokumen === "21"
    ) {
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

  function getKantorPenerbit(value, option) {
    setNamaKantorPenerbit(option.nama);
  }

  function getKantorMonitor(value, option) {
    setNamaKantorMonitor(option.nama);
  }

  function getKodeBidang(value, option) {
    setKodeBidang(option.nama);
  }

  function getJabatan1(value, option) {
    setJabatan1(option.nama);
  }

  function getJabatan2(value, option) {
    setJabatan2(option.nama);
  }

  function getNamaPerusahaan(id) {
    axios({
      method: "get",
      url: `http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-perusahaan?idPerusahaan=${id}`,
    })
      .then((res) => {
        let { namaPerusahaan, alamatPerusahaan } = res.data.data;
        if (!namaPerusahaan) {
          form.setFieldsValue({
            namaPerusahaan: "PERUSAHAAN TIDAK DITEMUKAN",
            alamatPerusahaan: "PERUSAHAAN TIDAK DITEMUKAN",
          });
        } else {
          form.setFieldsValue({
            namaPerusahaan: namaPerusahaan,
            alamatPerusahaan: alamatPerusahaan,
          });
        }
        console.log(namaPerusahaan, "masuk then");
      })
      .catch((error) => {
        form.setFieldsValue({
          namaPerusahaan: "PERUSAHAAN TIDAK DITEMUKAN",
          alamatPerusahaan: "PERUSAHAAN TIDAK DITEMUKAN",
        });
      })
      .finally((_) => {
        console.log("finally");
      });
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
                    dropdownMatchSelectWidth={500}
                    style={{ width: 180 }}
                    options={listKantor}
                    // onChange={(option) => getKantorPenerbit(option)}
                    onSelect={(value, option) =>
                      getKantorPenerbit(value, option)
                    }
                    placeholder="Kode Kantor"
                    filterOption={true}
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
                    dropdownMatchSelectWidth={500}
                    style={{ width: 180 }}
                    options={listKantor}
                    onSelect={(value, option) =>
                      getKantorMonitor(value, option)
                    }
                    placeholder="Kode Kantor"
                    filterOption={true}
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
                value={jenisDokumen.length === 0 ? null : jenisDokumen}
                style={{
                  width: "180px",
                  // borderLeft: "5px solid #eaeaea",
                }}
                onChange={(val) => setJenisDokumen(val)}
                size={"small"}
              >
                {listJenisDokumen.map((item) => (
                  <Option value={item.kodeDokumen} key={item.kodeDokumen}>
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
                onChange={handleTanggalDokumen}
                selected={tanggalDokumen}
                style={{
                  width: "180px",
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
                  width: "180px",
                }}
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
            <Form.Item
              name="idPerusahaan"
              label="Id Perusahaan"
              style={{
                marginBottom: 10,
                padding: "1px 1px 1px 5px",
              }}
            >
              <Input
                style={{
                  width: "180px",
                }}
                onChange={(e) => getNamaPerusahaan(e.target.value)}
              />
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
                    value={statusJabatan1.length === 0 ? null : statusJabatan1}
                    style={{
                      width: "100%",
                      // borderLeft: "5px solid #eaeaea",
                    }}
                    onChange={(val) => setStatusJabatan1(val)}
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
                    value={statusJabatan2.length === 0 ? null : statusJabatan2}
                    style={{
                      width: "100%",
                    }}
                    onChange={(val) => setStatusJabatan2(val)}
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
          {jenisDokumen === "13" ||
          jenisDokumen === "14" ||
          jenisDokumen === "20" ||
          jenisDokumen === "22" ? (
            <Row style={{ marginBottom: 8 }}>
              <Col span={5} style={{ display: "flex" }}>
                <h4 style={{ marginRight: 10, marginBottom: 0 }}>Akun :</h4>
                <Select
                  value={akun.length === 0 ? null : akun}
                  style={{ width: "60%" }}
                  onChange={handleAkun}
                  size={"small"}
                >
                  {jenisDokumen === "31" || jenisDokumen === "32" ? (
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
                  {jenisDokumen === "31" || jenisDokumen === "32" ? (
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
    </Layout>
  );
}

export default RekamDokumenPiutang;