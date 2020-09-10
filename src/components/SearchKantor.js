import {
  React,
  AutoComplete,
  useState,
  axios,
} from "../libraries/dependencies";

const renderTitle = (kodeKantor, nama, namaPanjang) => {
  return {
    value: kodeKantor,
    nama: nama,
    namaPanjang: namaPanjang,
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

export default function RekamBilling(props) {
  const [options, setOptions] = useState([]);
  const { onSelect, kodeKantor, style } = props;

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
              options: [
                renderTitle(
                  item.kodeKantor,
                  item.namaKantorPendek,
                  item.namaKantorPanjang
                ),
              ],
            });
          });
          setOptions(listKantor);
        })
        .catch((err) => {
          console.log(err, "error get kantor");
        });
    }
  };

  return (
    <>
      <AutoComplete
        dropdownClassName="certain-category-search-dropdown"
        dropdownMatchSelectWidth={400}
        style={style}
        options={options}
        placeholder="kode kantor"
        onSearch={onSearch}
        onSelect={onSelect}
        defaultValue={kodeKantor}
      />
    </>
  );
}
