import chalk from "chalk";
import { commitTypes } from "../util";
import type { Commit, CommitType } from "../util";

type CommitObj = { [K in CommitType]: Commit };

// build an object with the commit types as keys
const types: CommitObj = commitTypes.reduce(
  (a, v) => ({ ...a, [v.type]: v }),
  {} as CommitObj
);

interface AnswersInterface {
  type: string;
  scope: string;
  subject: string;
}

/**
 * getHeaderLength - determine the current header length to account for emoji spacing
 *
 * @param answers - user input to each prompt
 */
function getHeaderLength(answers: AnswersInterface): number {
  return (
    answers.type.length + 2 + (answers.scope ? answers.scope.length + 2 : 0)
  );
}

/**
 * getMaxSummaryLength - determine the maximum summary based on the header length and max allowed chars
 *
 * @param answers - user input to each prompt
 */
function getMaxSummaryLength(answers: AnswersInterface): number {
  const maxHeaderWidth = 75;

  return maxHeaderWidth - getHeaderLength(answers);
}

/**
 * filterSubject - sanitize the user input subject by removing punctuation and whitespace
 *
 * @param subject - user input subject
 */
function filterSubject(subject: string): string {
  subject = subject.trim();

  while (subject.endsWith(".")) {
    subject = subject.slice(0, subject.length - 1);
  }

  return subject;
}

// commitizen prompter method
export const prompter = (
  cz: { prompt: (e: unknown) => Promise<{ answers: AnswersInterface }> },
  commit: (c: string) => void
): void => {
  const typeList = Object.keys(types) as CommitType[];

  const length = typeList.reduce((a, c) => Math.max(a, c.length), 0) + 2;

  const choices = typeList.map((type: CommitType) => {
    const optType = types[type];

    const padType = `${type}:`.padEnd(length);

    return {
      name: `${optType.emoji} ${padType} ${optType.description}`,
      value: `${type}`,
    };
  });

  void cz
    .prompt([
      {
        type: "list",
        name: "type",
        message: "Select the type of change that you're committing:",
        choices,
      },
      {
        type: "input",
        name: "subject",
        message(answers: AnswersInterface): string {
          return `Write a short, imperative tense description of the change (max ${getMaxSummaryLength(
            answers
          )} chars):\n`;
        },
        default: "",
        validate(subject: string, answers: AnswersInterface): string | boolean {
          const filteredSubject = filterSubject(subject);
          return filteredSubject.length === 0
            ? "subject is required"
            : filteredSubject.length <= getMaxSummaryLength(answers)
            ? true
            : `Subject length must be less than or equal to ${getMaxSummaryLength(
                answers
              )} characters. Current length is ${
                filteredSubject.length
              } characters.`;
        },
        transformer(subject: string, answers: AnswersInterface): string {
          const filteredSubject = filterSubject(subject);
          const color =
            filteredSubject.length <= getMaxSummaryLength(answers)
              ? chalk.green
              : chalk.red;

          return color(`(${filteredSubject.length}) ${subject}`);
        },
        filter(subject: string): string {
          return filterSubject(subject);
        },
      },
    ])
    /// @ts-ignore this typing is correct
    .then((answers: AnswersInterface): void => {
      // add parens to scope
      const scope = `(${answers.scope})`;

      // hard limit this line in the validate
      const head = `${answers.type}${scope}: ${answers.subject}`;

      commit([head].filter((e) => e).join("\n\n"));
    });
};

// expose the prompter so we can extend it in .czrc
export default {
  prompter,
};
