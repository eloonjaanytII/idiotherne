import WorldMap from "react-svg-worldmap";

interface GlobalData {
  country: string;
  value: number;
} 


export function GlobalMap() {
  const data: GlobalData[] = [
    { country: "cn", value: 1389618778 }, // china
    { country: "in", value: 1311559204 }, // india
    { country: "us", value: 331883986 }, // united states
    { country: "id", value: 264935824 }, // indonesia
    { country: "pk", value: 210797836 }, // pakistan
    { country: "br", value: 210301591 }, // brazil
    { country: "ng", value: 208679114 }, // nigeria
    { country: "bd", value: 161062905 }, // bangladesh
    { country: "ru", value: 141944641 }, // russia
    { country: "mx", value: 127318112 }, // mexico
  ];

  return (
    <div className="w-[100%] h-[100%]">
      <WorldMap
        color="red"
        value-suffix="people"
        size="xxl"
        data={data}
      />
    </div>
  );
}
