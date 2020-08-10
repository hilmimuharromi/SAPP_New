import {
  React,
  Input,
  Row,
  Col,
  Button,
  PlusOutlined,
  useHistory,
} from "../libraries/dependencies";
const { Search } = Input;

export default function Menu({ tes }) {
  let history = useHistory();
  const handleNavigate = () => {
    history.push("/Perekaman");
  };
  return (
    <Row justify="start" style={{ backgroundColor: "gray", padding: 8 }}>
      <Col span={5}>
        <Search
          placeholder="Search.."
          onSearch={(value) => tes(value)}
          onChange={(value) => tes(value)}
          style={{ width: 200 }}
        />
      </Col>
      <Col span={4}>
        <Button
          type="danger"
          icon={<PlusOutlined />}
          size={"middle"}
          onClick={handleNavigate}
        />
      </Col>
    </Row>
  );
}
