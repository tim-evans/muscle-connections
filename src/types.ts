export type Muscle = {
  name: string;
  joints: Array<{
    name: string;
    actions: string[];
  }>;
  attachments: {
    proximal: string[];
    distal: string[];
  };
};
