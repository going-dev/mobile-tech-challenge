const { readFile } = require("fs/promises");
const { join } = require("path");
const dayjs = require("dayjs");

// release notes templates
const TEMPLATE_DIR =
  "node_modules/semantic-release-gitmoji/lib/assets/templates";
const template = readFile(join(TEMPLATE_DIR, "default-template.hbs"));
const commitTemplate = readFile(join(TEMPLATE_DIR, "commit-template.hbs"));

module.exports = {
  branches: ["main"],
  plugins: [
    // analyze commits to determine next release
    [
      "semantic-release-gitmoji",
      {
        releaseRules: {
          major: [":boom:"],
          minor: [":sparkles:"],
          patch: [":bug:"],
        },
        releaseNotes: {
          template,
          partials: { commitTemplate },
          helpers: {
            datetime: () => dayjs(new Date()).format("DD MMM YYYY"),
          },
          issueResolution: {
            template: "{baseUrl}/{owner}/{repo}/issues/{ref}",
            baseUrl: "https://github.com",
            source: "github.com",
            removeFromCommit: false,
            regex: /#\d+/g,
          },
        },
      },
    ],
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
    // tag the release in github
    "@semantic-release/github",
    // commit the release assets
    [
      "@semantic-release/git",
      {
        message:
          "🔖 `${nextRelease.gitTag}` [skip ci] \n\n${nextRelease.notes}",
        assets: ["package.json", "CHANGELOG.md"],
      },
    ],
  ],
};
