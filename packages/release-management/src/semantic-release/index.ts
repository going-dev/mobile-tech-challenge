import { commitTypes } from "../util";

export default {
  branches: ["main"],
  plugins: [
    // analyze commits to determine next release
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
        releaseRules: commitTypes,
      },
    ],
    // generate the next release
    "@semantic-release/release-notes-generator",
    // output the release notes to the changelog
    [
      "@semantic-release/changelog",
      {
        changelogFile: "./CHANGELOG.md",
      },
    ],
    // update the version field
    [
      "@semantic-release/npm",
      {
        npmPublish: false,
      },
    ],
    // commit the release assets
    [
      "@semantic-release/git",
      {
        message:
          "release: `${nextRelease.gitTag}` [skip ci] \n\n${nextRelease.notes}",
        assets: ["package.json", "CHANGELOG.md"],
      },
    ],
    // tag the release in github
    "@semantic-release/github",
  ],
};
