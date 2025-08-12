export type Muscle = {
  name: string;
  joints: Array<{
    name: string;
    actions: string[];
  }>;
  attachments: {
    proximal: Array<{ name: string; bone?: string }>;
    distal: Array<{ name: string; bone?: string }>;
  };
};
