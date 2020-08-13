import {
  React,
  Input,
  Row,
  Col,
  //   Button,
  //   PlusOutlined,
  //   useHistory,
} from "../../libraries/dependencies";
import { useDispatch } from "react-redux";
import allActions from "../../../../stores/actions";
const { Search } = Input;

export default function Menu() {
  const dispatch = useDispatch();
  //   let history = useHistory();
  //   const handleNavigate = () => {
  //     history.push("/Perekaman");
  //   };

  return (
    <Row justify="start" style={{ backgroundColor: "gray", padding: 8 }}>
      <Col span={5}>
        <Search
          placeholder="Search.."
          onSearch={(value) => dispatch(allActions.getHeaders(value))}
          //   onChange={(value) => dispatch(allActions.getHeaders(value))}
          style={{ width: 200 }}
        />
      </Col>
      {/* <Col span={4}>
        <Button
          type="danger"
          icon={<PlusOutlined />}
          size={"middle"}
          onClick={handleNavigate}
        />
      </Col> */}
    </Row>
  );
}
