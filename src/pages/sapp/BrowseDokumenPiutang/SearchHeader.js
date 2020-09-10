import { React, Input, Row, Col } from "../../../libraries/dependencies";
import { useDispatch } from "react-redux";
import allActions from "../../../stores/actions";
const { Search } = Input;

export default function SearchHeader(props) {
  const { start, end, kodeKantor } = props.data;
  const dispatch = useDispatch();
  return (
    <Row justify="start" style={{ backgroundColor: "gray", padding: 8 }}>
      <Col span={5}>
        <Search
          placeholder="Search.."
          onSearch={(value) =>
            dispatch(allActions.getHeaders(value, start, end, kodeKantor))
          }
          style={{ width: 200 }}
        />
      </Col>
    </Row>
  );
}
