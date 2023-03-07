export enum CommitType {
  breaking = "breaking",
  feat = "feat",
  fix = "fix",
  chore = "chore",
  release = "release",
  wip = "wip",
}

export enum ReleaseType {
  major = "major",
  minor = "minor",
  patch = "patch",
}

export type Commit = {
  type: CommitType | `${CommitType}`;
  code: string;
  emoji: string;
  entity: string;
  release: ReleaseType | `${ReleaseType}` | false;
  description: string;
};

export const commitTypes: Commit[] = [
  {
    type: CommitType.breaking,
    code: ":boom:",
    entity: "&#x1f4a5;",
    emoji: "💥",
    release: ReleaseType.major,
    description: "Introduce a breaking or native-layer change",
  },
  {
    type: CommitType.feat,
    code: ":sparkles:",
    entity: "&#x2728;",
    emoji: "✨",
    release: ReleaseType.minor,
    description: "Introduce a new feature",
  },
  {
    type: CommitType.fix,
    code: ":bug:",
    entity: "&#x1f41b;",
    emoji: "🐛",
    release: ReleaseType.patch,
    description: "Fix a bug",
  },
  {
    type: CommitType.chore,
    code: ":broom:",
    entity: "&#x1F9F9",
    emoji: "🧹",
    release: false,
    description: "Changes that don't modify any source or test files",
  },
  {
    type: CommitType.release,
    code: ":bookmark:",
    entity: "&#x1f516;",
    emoji: "🔖",
    release: false,
    description: "Release the next version",
  },
  {
    type: CommitType.wip,
    code: ":construction:",
    entity: "&#x1f6a7;",
    emoji: "🚧",
    release: false,
    description: "Work in progress",
  },
];
