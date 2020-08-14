import axios from "axios";
import convertToRupiah from "../../pages/perbendaharaan/libraries/functions/covertRupiah";
export default function FETCH_PUNGUTAN(idHeader) {
  console.log("masuk pungutan");
  return (dispatch) => {
    dispatch(SET_LOADING_PUNGUTAN(true));
    axios
      .get(
        `http://10.162.71.119:9090/perbendaharaan/perben/piutang/get-data-pungutan?idHeader=${idHeader}`
      )
      .then(({ data }) => {
        let dataPungutan = data.data;
        let totalNilai = {
          kodeAkun: "Total Nilai",
          nilai: 0,
        };
        function convertPungutan(data) {
          const filterData = data.filter((item) => {
            return item.nilai !== null;
          });
          filterData.map((data) => {
            if (data.lebihBayar !== "Y") {
              totalNilai.nilai += data.nilai;
            }
            return (data.nilai = convertToRupiah(data.nilai));
          });
          return filterData;
        }

        let dataRupiah = convertPungutan(dataPungutan.data);
        totalNilai.nilai = convertToRupiah(totalNilai.nilai);
        if (dataRupiah.length > 0) {
          dataRupiah.push(totalNilai);
        }
        // let totalRupiah = convertToRupiah(dataPungutan.total_nilai);
        dispatch(SET_PUNGUTAN(dataRupiah));
        // dispatch(SET_TOTAL_NILAI(totalRupiah));

        console.log(dataRupiah, "pungutan");
      })
      .catch((error) => {
        dispatch(SET_ERROR_PUNGUTAN(error));
        console.log(error, "masuk error");
      })
      .finally((_) => {
        dispatch(SET_LOADING_PUNGUTAN(false));
      });
  };
}

export function SET_PUNGUTAN(data) {
  return {
    type: "SET_PUNGUTAN",
    payload: data,
  };
}

export function SET_TOTAL_NILAI(data) {
  return {
    type: "SET_TOTAL_NILAI",
    payload: data,
  };
}

export function SET_LOADING_PUNGUTAN(data) {
  return {
    type: "SET_LOADING_PUNGUTAN",
    payload: data,
  };
}

export function SET_ERROR_PUNGUTAN(data) {
  return {
    type: "SET_ERROR_PUNGUTAN",
    payload: data,
  };
}
