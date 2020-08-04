import {
  React,
  Card,
  Row,
  Col,
  Steps,
  Popover,
  Tooltip,
  Progress,
} from "../../libraries/dependencies";
import { hasPrefixSuffix } from "antd/lib/input/ClearableLabeledInput";
const { Step } = Steps;

export default function Timeline() {
  const customDot = (dot, { status, index }) => (
    <Popover
      content={
        <span>
          step {index} status: {status}
        </span>
      }
    >
      {dot}
    </Popover>
  );
  return (
    <Card className="card-layout">
      <h2>Timeline</h2>
      <Steps current={3} progressDot={customDot}>
        <Step
          status="error"
          title="Finished"
          description="You can hover on the dot."
        />
        <Step
          status="process"
          title="In Progress"
          description="You can hover on the dot."
        />
        <Step title="Waiting" description="You can hover on the dot." />
        <Step title="Waiting" description="You can hover on the dot." />
        <Step title="Waiting" description="You can hover on the dot." />
      </Steps>
      {/* <Timeline pending="Recording..." reverse>
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
      </Timeline> */}
    </Card>
  );
}

/*
perekaman tagihan 60 hari
teguran 7 hari
surat paksa 21 hari
surat sita 12 hari


perekaman tagihan 20 hari
teguran 7 hari
surat paksa 21 hari
surat sita 52 hari
*/
