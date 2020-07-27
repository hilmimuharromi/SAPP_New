import { React, Card, Steps, Popover } from "../../libraries/dependencies";
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
        <Step title="Finished" description="You can hover on the dot." />
        <Step title="In Progress" description="You can hover on the dot." />
        <Step title="Waiting" description="You can hover on the dot." />
        <Step title="Waiting" description="You can hover on the dot." />
        <Step title="Waiting" description="You can hover on the dot." />
      </Steps>
    </Card>
  );
}
