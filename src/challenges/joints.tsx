import { Muscle } from "../types";

const Joints = [
  { name: "ankle", proximal: "knee", distal: null },
  { name: "knee", proximal: "hip", distal: "ankle" },
  { name: "hip", proximal: null, distal: "knee" },
  { name: "neck", proximal: "scapula", distal: "shoulder" },
  { name: "shoulder", proximal: "neck", distal: "scapula" },
  { name: "scapula", proximal: "neck", distal: "elbow" },
  { name: "elbow", proximal: "shoulder", distal: "forearm" },
  { name: "forearm", proximal: "elbow", distal: "wrist" },
  { name: "wrist", proximal: "forearm", distal: null },
];

export default function joints(data: Muscle[], lastDeals: string[]) {
  let joint = Joints[Math.floor(Math.random() * Joints.length)];
  while (lastDeals.includes(joint.name)) {
    joint = Joints[Math.floor(Math.random() * Joints.length)];
  }
  return {
    id: joint.name,
    question: <>What muscles cross the {joint.name}?</>,
    deck: data.filter((muscle) => {
      return (
        muscle.joints.some((muscleJoint) => {
          return (
            muscleJoint.name == joint.proximal ||
            muscleJoint.name == joint.distal
          );
        }) &&
        !muscle.joints.some((muscleJoint) => {
          return muscleJoint.name == joint.name;
        })
      );
    }),
    answer: data.filter((muscle) => {
      return muscle.joints.some((muscleJoint) => {
        return muscleJoint.name == joint.name;
      });
    }),
  };
}
