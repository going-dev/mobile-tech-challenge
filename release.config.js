const { promisify } = require("util");
const dateFormat = require("dateformat");
const readFileAsync = promisify(require("fs").readFile);
const path = require("path");

// release notes templates
const TEMPLATE_DIR =
  "node_modules/semantic-release-gitmoji/lib/assets/templates";
const template = readFileAsync(path.join(TEMPLATE_DIR, "default-template.hbs"));
const commitTemplate = readFileAsync(
  path.join(TEMPLATE_DIR, "commit-template.hbs")
);

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
            datetime: function (format = "UTC:yyyy-mm-dd") {
              return dateFormat(new Date(), format);
            },
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
    // commit the release assets
    [
      "@semantic-release/git",
      {
        message:
          "🔖 `${nextRelease.gitTag}` [skip ci] \n\n${nextRelease.notes}",
        assets: ["package.json", "CHANGELOG.md"],
      },
    ],
    // tag the release in github
    "@semantic-release/github",
  ],
};
