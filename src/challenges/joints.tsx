import { Muscle } from "../types";

const Joints = [
  { name: "ankle", proximal: "knee", distal: null },
  { name: "knee", proximal: "hip", distal: "ankle" },
  { name: "hip", proximal: null, distal: "knee" },
  { name: "neck", proximal: null, distal: "shoulder" },
  { name: "shoulder", proximal: "neck", distal: "elbow" },
  { name: "elbow", proximal: "shoulder", distal: "wrist" },
  { name: "wrist", proximal: "elbow", distal: null },
];

export default function joints(data: Muscle[]) {
  let joint = Joints[Math.floor(Math.random() * Joints.length)];
  return {
    question: <>What muscles cross the {joint.name} joint?</>,
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
