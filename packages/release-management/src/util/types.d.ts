declare module "emoji-name-map" {
  export const get: (name: string) => string;
}

declare module "commitizen" {
  namespace configLoader {
    export function load(...args: string[]): Record<string, string>;
  }
}
