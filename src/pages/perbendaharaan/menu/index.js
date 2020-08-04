import {
  React,
  Input,
  Select,
  Row,
  Col,
  Button,
  PrinterFilled,
  PlusOutlined,
  useHistory,
} from "../libraries/dependencies";

const { Option } = Select;
const { Search } = Input;

export default function Menu({ tes }) {
  let history = useHistory();
  const handleNavigate = () => {
    history.push("/Perekaman");
  };
  return (
    <Row justify="start" style={{ backgroundColor: "gray", padding: 8 }}>
      <Col span={5}>
        {/* <div className="site-input-group-wrapper">
          <Input.Group compact>
            <Select defaultValue="keys" style={{ width: 200 }}>
              <Option value="npwp">npwp</Option>
              <Option value="status">status</Option>
            </Select>
          </Input.Group>
        </div> */}
      </Col>
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
        {/* <Button
          type="info"
          icon={<PrinterFilled />}
          size={"middle"}
          style={{ marginLeft: 8 }}
        /> */}
      </Col>
    </Row>
  );
}
