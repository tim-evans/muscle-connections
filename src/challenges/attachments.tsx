import { Muscle } from "../types";

const Attachments = [
  { name: "greater trochanter", nearby: ["illiotibial tract", "ASIS", "AIIS"] },
  { name: "illiotibial tract", nearby: ["greater trochanter", "ASIS", "AIIS"] },
  { name: "ASIS", nearby: ["illiotibial tract", "greater trochanter", "AIIS"] },
  { name: "AIIS", nearby: ["illiotibial tract", "greater trochanter", "ASIS"] },
  { name: "ischial ramus", nearby: ["ischial tuberosity", "ASIS", "AIIS"] },
  {
    name: "linea aspera",
    nearby: ["illiotibial tract", "greater trochanter", "ASIS"],
  },
  {
    name: "pes anserinus",
    nearby: ["illiotibial tract", "greater trochanter", "ASIS"],
  },
  {
    name: "head of fibula",
    nearby: ["illiotibial tract", "greater trochanter", "ASIS"],
  },
  {
    name: "corocoid process",
    nearby: ["medial clavicle", "acromion"],
  },
];

export default function attachment(data: Muscle[]) {
  let attachment = Attachments[Math.floor(Math.random() * Attachments.length)];
  return {
    question: <>What muscles attach to the {attachment.name}?</>,
    deck: data.filter((muscle) => {
      return (
        muscle.attachments.proximal.some((a) => {
          return attachment.nearby.includes(a);
        }) &&
        !muscle.attachments.proximal.some((a) => {
          return a === attachment.name;
        }) &&
        !muscle.attachments.distal.some((a) => {
          return a === attachment.name;
        })
      );
    }),
    answer: data.filter((muscle) => {
      return (
        muscle.attachments.proximal.some((a) => {
          return a === attachment.name;
        }) ||
        muscle.attachments.distal.some((a) => {
          return a === attachment.name;
        })
      );
    }),
  };
}
