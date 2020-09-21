import {
  React,
  useEffect,
  useState,
  axios,
  Select,
} from "../libraries/dependencies";
const { Option } = Select;

export default function SelectAkunPungutan(props) {
  const { onSelect, disabled, defaultValue, kategoriJenisDokumen } = props;
  const [listAkun, setListAkun] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(kategoriJenisDokumen, "kategori akun cukai");
  useEffect(() => {
    function getListAkun() {
      setLoading(true);
      axios
        .get(
          "http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-pungutan"
        )
        .then(({ data }) => {
          if (kategoriJenisDokumen === "AKUNCUKAI") {
            setListAkun([
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
            ]);
          } else {
            setListAkun(data.data);
          }
          setLoading(false);
        });
    }
    getListAkun();
  }, [kategoriJenisDokumen]);

  return (
    <Select
      disabled={disabled}
      value={defaultValue}
      style={{ width: "200px" }}
      onSelect={onSelect}
      loading={loading}
    >
      {listAkun.map((item) => (
        <Option
          value={item.kodeAkun}
          key={item.kodeAkun}
          namaAkun={item.uraian}
        >
          {item.uraian}
        </Option>
      ))}
    </Select>
  );
}
