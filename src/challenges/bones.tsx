import { Muscle } from "../types";

export default function bones(data: Muscle[], lastDeals: string[]) {
  let allBones = data.reduce((E, muscle) => {
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

  let bone = allBones[Math.floor(Math.random() * allBones.length)];
  while (lastDeals.includes(bone)) {
    bone = allBones[Math.floor(Math.random() * allBones.length)];
  }

  let adjacentBones = data
    .filter((muscle) => {
      return (
        muscle.attachments.proximal.some(
          (attachment) => attachment.bone === bone
        ) ||
        muscle.attachments.distal.some((attachment) => attachment.bone === bone)
      );
    })
    .reduce((E, muscle) => {
      E.push(
        ...muscle.attachments.proximal
          .map((a) => a.bone)
          .filter((a) => a != null)
          .filter((a) => !E.includes(a) && a !== bone)
      );
      E.push(
        ...muscle.attachments.distal
          .map((a) => a.bone)
          .filter((a) => a != null)
          .filter((a) => !E.includes(a) && a !== bone)
      );
      return E;
    }, [] as string[]);

  return {
    id: bone,
    question: <>What muscles attach to the {bone}?</>,
    deck: data.filter((muscle) => {
      return (
        muscle.attachments.proximal.some((a) => {
          return a.bone && adjacentBones.includes(a.bone);
        }) &&
        muscle.attachments.distal.some((a) => {
          return a.bone && adjacentBones.includes(a.bone);
        }) &&
        !muscle.attachments.proximal.some((a) => {
          return a.bone === bone;
        }) &&
        !muscle.attachments.distal.some((a) => {
          return a.bone === bone;
        })
      );
    }),
    answer: data.filter((muscle) => {
      return (
        muscle.attachments.proximal.some((a) => {
          return a.bone === bone;
        }) ||
        muscle.attachments.distal.some((a) => {
          return a.bone === bone;
        })
      );
    }),
  };
}
