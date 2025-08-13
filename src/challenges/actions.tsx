import { Muscle } from "../types";

const Joints = [
  {
    name: "ankle",
    actions: ["dorsiflexion", "plantarflexion", "inversion", "eversion"],
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
      "stabilization",
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

export default function actions(data: Muscle[], lastDeals: string[]) {
  let joint = Joints[Math.floor(Math.random() * Joints.length)];
  let action = joint.actions[Math.floor(Math.random() * joint.actions.length)];
  while (lastDeals.includes(`${joint.name}-${action}`)) {
    action = joint.actions[Math.floor(Math.random() * joint.actions.length)];
  }

  let answer = data.filter((muscle) => {
    return muscle.joints.some((muscleJoint) => {
      return (
        muscleJoint.name === joint.name && muscleJoint.actions.includes(action)
      );
    });
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
    id: `${joint.name}-${action}`,
    question: (
      <>
        What muscles of the {joint.name} perform {action}?
      </>
    ),
    deck: data
      .filter((muscle) => {
        return (
          muscle.attachments.proximal.some((a) => {
            return a.bone && bones.includes(a.bone);
          }) &&
          muscle.attachments.distal.some((a) => {
            return a.bone && bones.includes(a.bone);
          })
        );
      })
      .filter((muscle) => {
        return !muscle.joints.some((muscleJoint) => {
          return (
            muscleJoint.name === joint.name &&
            muscleJoint.actions.includes(action)
          );
        });
      }),
    answer,
  };
}
