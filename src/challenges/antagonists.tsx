import { Muscle } from "../types";

const Antagonists = {
  dorsiflexion: "plantarflexion",
  plantarflexion: "dorsiflexion",
  inversion: "eversion",
  eversion: "inversion",
  flexion: "extension",
  extension: "flexion",
  "lateral rotation": "medial rotation",
  "medial rotation": "lateral rotation",
  abduction: "adduction",
  adduction: "abduction",
  "ipsilateral rotation": "contralateral rotation",
  "contralateral rotation": "ipsilateral rotation",
  protraction: "retraction",
  retraction: "protraction",
  "horizontal abduction": "horizontal adduction",
  "horizontal adduction": "horizontal abduction",
  depression: "elevation",
  elevation: "depression",
  supination: "pronation",
  pronation: "supination",
  "ulnar deviation": "radial deviation",
  "radial deviation": "ulnar deviation",
  "downward rotation": "upward rotation",
  "upward rotation": "downward rotation",
} as Record<string, string | undefined>;

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
      "horizontal abduction",
      "horizontal adduction",
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

export default function antagonists(data: Muscle[], lastDeals: string[]) {
  let joint = Joints[Math.floor(Math.random() * Joints.length)];
  let action = joint.actions[Math.floor(Math.random() * joint.actions.length)];
  let antagonist = Antagonists[action];
  while (
    lastDeals.includes(`${joint.name}-${antagonist}`) ||
    antagonist == null
  ) {
    action = joint.actions[Math.floor(Math.random() * joint.actions.length)];
    antagonist = Antagonists[action];
  }

  let answer = data.filter((muscle) => {
    return muscle.joints.some((muscleJoint) => {
      return (
        muscleJoint.name === joint.name &&
        muscleJoint.actions.includes(antagonist)
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
    id: `${joint.name}-${antagonist}`,
    question: (
      <>
        What muscles of the {joint.name} are antagonists in {action}?
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
            muscleJoint.actions.includes(antagonist)
          );
        });
      }),
    answer,
  };
}
