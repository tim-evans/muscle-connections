import { Deals } from "./Deals";
import { Muscle } from "./types";

export function App(props: { data: Muscle[] }) {
  return <Deals data={props.data} />;
}
