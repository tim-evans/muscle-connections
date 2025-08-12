import { Muscle } from "../types";

const Attachments = [
  "greater trochanter",
  "illiotibial tract",
  "ASIS",
  "AIIS",
  "ischial ramus",
  "linea aspera",
  "pes anserinus",
  "head of fibula",
  "corocoid process",
  "achilles tendon",
];

export default function attachment(data: Muscle[], lastDeals: string[]) {
  let attachment = Attachments[Math.floor(Math.random() * Attachments.length)];
  while (lastDeals.includes(attachment)) {
    attachment = Attachments[Math.floor(Math.random() * Attachments.length)];
  }

  let answer = data.filter((muscle) => {
    return (
      muscle.attachments.proximal.some((a) => {
        return a.name === attachment;
      }) ||
      muscle.attachments.distal.some((a) => {
        return a.name === attachment;
      })
    );
  });
  // Grab all bones that these muscles connect to
  let bones = answer.reduce((E, muscle) => {
    E.push(
      ...muscle.attachments.proximal
        .map((a) => a.bone)
        .filter((a) => a != null)
        .filter((a) => !E.includes(a))
    );
    E.push(
      ...muscle.attachments.distal
        .map((a) => a.bone)
        .filter((a) => a != null)
        .filter((a) => !E.includes(a))
    );
    return E;
  }, [] as string[]);

  return {
    id: attachment,
    question: <>What muscles attach to the {attachment}?</>,
    deck: data.filter((muscle) => {
      return (
        muscle.attachments.proximal.some((a) => {
          return a.bone && bones.includes(a.bone);
        }) &&
        muscle.attachments.distal.some((a) => {
          return a.bone && bones.includes(a.bone);
        }) &&
        !muscle.attachments.proximal.some((a) => {
          return a.name === attachment;
        }) &&
        !muscle.attachments.distal.some((a) => {
          return a.name === attachment;
        })
      );
    }),
    answer,
  };
}
