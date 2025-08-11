import { Muscle } from "../types";

const Joints = [
  {
    name: "ankle",
    actions: ["dorisiflexsion", "plantarflexion", "inversion", "eversion"],
  },
  { name: "knee", actions: ["flexion", "extension"] },
  {
    name: "hip",
    actions: [
      "flexion",
      "extension",
      "lateral rotation",
      "medial rotation",
      "abduction",
      "adduction",
    ],
  },
  {
    name: "neck",
    actions: [
      "flexion",
      "extension",
      "lateral flexion",
      "ipsilateral rotation",
      "contralateral rotation",
    ],
  },
  {
    name: "shoulder",
    actions: [
      "flexion",
      "extension",
      "lateral rotation",
      "medial rotation",
      "abduction",
      "adduction",
      "lateral abduction",
      "lateral adduction",
    ],
  },
  {
    name: "scapula",
    actions: [
      "protraction",
      "retraction",
      "depression",
      "elevation",
      "downward rotation",
      "upward rotation",
    ],
  },
  { name: "elbow", actions: ["flexion", "extension"] },
  { name: "forearm", actions: ["supination", "pronation"] },
  {
    name: "wrist",
    actions: ["flexion", "extension", "ulnar deviation", "radial deviation"],
  },
];

export default function actions(data: Muscle[]) {
  let joint = Joints[Math.floor(Math.random() * Joints.length)];
  let action = joint.actions[Math.floor(Math.random() * joint.actions.length)];
  return {
    question: (
      <>
        What muscles of the {joint.name} perform {action}?
      </>
    ),
    deck: data.filter((muscle) => {
      return muscle.joints.some((muscleJoint) => {
        return (
          muscleJoint.name === joint.name &&
          !muscleJoint.actions.includes(action)
        );
      });
    }),
    answer: data.filter((muscle) => {
      return muscle.joints.some((muscleJoint) => {
        return (
          muscleJoint.name === joint.name &&
          muscleJoint.actions.includes(action)
        );
      });
    }),
  };
}
