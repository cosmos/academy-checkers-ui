# CosmJs Part For Checkers Blockchain

This project contains the elements, messages, scripts and GUI of the Checkers blockchain.

## Branches progression

The project is created with a clean list of commits in order to demonstrate the natural progression of the project. In this sense, there is no late commit that fixes an error introduced earlier. If there is a fix for an error introduced earlier, the fix should be squashed with the earlier commit that introduced the error. This may require some conflict resolution.

Having a clean list of commits makes it possible to do meaningful `compare`s.

To make it easier to link to the content at the different stages of the project's progression, a number of branches have been created at commits that have `Add branch the-branch-name` as message. Be careful with the commit message as it depends on it matching the `"Add branch [0-9a-zA-Z\-]*"` regular expression.

The script `push-branches.sh` is used to extract these commits and force push them to the appropriate branch in the repository. After having made changes, you should run this script, and also manually force push to `main`.

* [`start`](https://github.com/cosmos/academy-checkers-ui/tree/start)
* [`generated`](https://github.com/cosmos/academy-checkers-ui/tree/generated) [diff](https://github.com/cosmos/academy-checkers-ui/compare/start...generated)
* [`stargate`](https://github.com/cosmos/academy-checkers-ui/tree/stargate) [diff](https://github.com/cosmos/academy-checkers-ui/compare/generated...stargate)
* [`signing-stargate`](https://github.com/cosmos/academy-checkers-ui/tree/signing-stargate) [diff](https://github.com/cosmos/academy-checkers-ui/compare/stargate...signing-stargate)
* [`unwired-gui`](https://github.com/cosmos/academy-checkers-ui/tree/unwired-gui) [diff](https://github.com/cosmos/academy-checkers-ui/compare/signing-stargate...unwired-gui)
* [`gui`](https://github.com/cosmos/academy-checkers-ui/tree/gui) [diff](https://github.com/cosmos/academy-checkers-ui/compare/unwired-gui...gui)
* [`server-indexing`](https://github.com/cosmos/academy-checkers-ui/tree/server-indexing) [diff](https://github.com/cosmos/academy-checkers-ui/compare/gui...server-indexing)

## V1 branches progression

* [`start`](https://github.com/cosmos/academy-checkers-ui/tree/start)
* [`v1-generated`](https://github.com/cosmos/academy-checkers-ui/tree/v1-generated) [diff](https://github.com/cosmos/academy-checkers-ui/compare/start...v1-generated)
* [`v1-stargate`](https://github.com/cosmos/academy-checkers-ui/tree/v1-stargate) [diff](https://github.com/cosmos/academy-checkers-ui/compare/v1-generated...v1-stargate)
* [`v1-signing-stargate`](https://github.com/cosmos/academy-checkers-ui/tree/v1-signing-stargate) [diff](https://github.com/cosmos/academy-checkers-ui/compare/v1-stargate...v1-signing-stargate)
* [`v1-unwired-gui`](https://github.com/cosmos/academy-checkers-ui/tree/v1-unwired-gui) [diff](https://github.com/cosmos/academy-checkers-ui/compare/v1-signing-stargate...v1-unwired-gui)
* [`gui`](https://github.com/cosmos/academy-checkers-ui/tree/v1-gui) [diff](https://github.com/cosmos/academy-checkers-ui/compare/v1-unwired-gui...v1-gui)
* [`v1-server-indexing`](https://github.com/cosmos/academy-checkers-ui/tree/v1-server-indexing) [diff](https://github.com/cosmos/academy-checkers-ui/compare/v1-gui...v1-server-indexing)
