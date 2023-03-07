import { RuleConfigSeverity } from "@commitlint/types";
import type { QualifiedRules } from "@commitlint/types";
import { commitTypes } from "../util";

const { Error } = RuleConfigSeverity;

export const rules: QualifiedRules = {
  "type-enum": [
    Error,
    "always",
    commitTypes.map((commitType) => commitType.type),
  ],
  "type-case": [Error, "always", "lower-case"],
  "type-empty": [Error, "never"],
  "subject-empty": [Error, "never"],
  "header-max-length": [Error, "always", 75],
};

export default {
  rules,
};
