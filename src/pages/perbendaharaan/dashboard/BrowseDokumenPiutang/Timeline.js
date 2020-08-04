import { React, Card, Steps, Popover } from "../../libraries/dependencies";
// import { hasPrefixSuffix } from "antd/lib/input/ClearableLabeledInput";
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
        <Step title="Perekaman" description="Tanggal Perekaman 25/05/2020" />
        <Step
          style={{ width: "800px" }}
          title="Surat Teguran"
          description="Tanggal Surat Teguran 25/05/2020"
        />
        <Step
          title="Surat Paksa"
          description="Tanggal Surat Paksa 25/05/2020"
          status="process"
        />
        <Step title="Surat Sita" description="Tanggal Surat Sita 25/05/2020" />
      </Steps>
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
