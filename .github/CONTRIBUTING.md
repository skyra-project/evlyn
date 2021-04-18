# Contributing

**The issue tracker is only for issue reporting or proposals/suggestions. If you have a question, you can find us in our [Discord Server]**.

To contribute to this repository, feel free to create a new fork of the repository and
submit a pull request. We highly suggest [ESLint] to be installed
in your text editor or IDE of your choice to ensure builds from GitHub Actions do not fail.

1. Fork, clone, and select the **main** branch.
2. Create a new branch in your fork.
3. Make your changes.
4. Ensure your linting and tests pass by running `yarn test && yarn lint`
5. Commit your changes, and push them.
6. Submit a Pull Request [here]!

## Running Evlyn locally

To run Evlyn locally a few steps should be taken.

1. Install [Node.JS], [Yarn] and [Docker]
1. Copy and paste the [`.env.development`] file in the `src` directory and rename it to `.env.development.local`.
1. Scroll down to `export const TOKENS = ` and fill in your bot token
1. Follow the [installation instructions for node-canvas][] for your platfor
    - Note: In case of using WSL then follow the Windows instructions
1. Install project dependencies with `yarn install`
1. Start Evlyn in development mode with `yarn dev`

A few other important commands:

```bash
# Lints and format all the code:
$ yarn lint

# Run Evlyn in development mode:
$ yarn start
```

## Evlyn Concept Guidelines

There are a number of guidelines considered when reviewing Pull Requests to be merged. _This is by no means an exhaustive list, but here are some things to consider before/while submitting your ideas._

-   Evlyn should never change Sapphire's or Discord.js's default behavior. Evlyn should only add to Sapphire and discord.js, and be as consistent as possible with them.
-   Everything in Evlyn should be generally useful for the majority of users. Don't let that stop you if you've got a good concept though, as your idea still might be a great addition.
-   Everything should be shard compliant. If code you put in a pull request would break when sharding, break other things from supporting sharding, or is incompatible with sharding; then you will need to think of a way to make it work with sharding in mind before the pull request will be accepted and merged.
-   Everything should follow [OOP paradigms] and generally rely on behaviour over state where possible. This generally helps methods be predictable, keeps the codebase simple and understandable, reduces code duplication through abstraction, and leads to efficiency and therefore scalability.
-   Everything should follow our ESLint rules as closely as possible, and should pass lint tests even if you must disable a rule for a single line.
-   Everything should follow [Discord Bot Best Practices]
-   Scripts that are to be ran outside of the scope of the bot should be added to [scripts] directory and should be in the `.mjs` file format.

<!-- Link Dump -->

[discord server]: https://join.skyra.pw
[here]: https://github.com/skyra-project/skyra/pulls
[eslint]: https://eslint.org/
[node.js]: https://nodejs.org/en/download/
[yarn]: https://classic.yarnpkg.com/en/docs/install
[docker]: https://www.docker.com
[installation instructions for node-canvas]: https://github.com/Automattic/node-canvas/blob/main/Readme.md#installation
[oop paradigms]: https://en.wikipedia.org/wiki/Object-oriented_programming
[discord bot best practices]: https://github.com/meew0/discord-bot-best-practices
[`.env.development`]: /src/.env.development
[scripts]: /scripts
[the repository wiki]: https://github.com/skyra-project/skyra/wikib
