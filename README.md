# bl-next

[![bl-next](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/1mzays/main&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/1mzays/runs)

Library and book management services and administration for upper secondary schools. Built with Next.js with Material UI using an express backend. This project is the successor for the bl-web and bl-admin projects, with the aim to unify the administration site with the customer site.

## Setup and development

```bash
# Install dependencies
$ yarn install

# Copy .env.example to .env and fill in the correct keys to access the required apis

# Run the development server on http://localhost:3000
$ yarn dev

```

## Code style, linting and tests

```bash
# Prettier code style
$ yarn prettier

# Linting with Eslint
$ yarn lint

# E2E tests with Cypress
$ yarn cypress run

```

## Branches

There are two active branches, `main` and `develop`. You should use `develop` for all
development and treat `main` as the public live version.

### `main`

This branch should be treated as the production branch and should not have
failing code.

When you push code to `main` the code is also pushed to our production
environment on Vercel. Be aware that any commit you push to `main` will be
viewable and executed on our live production server. The `main` branch is
currently running on [next.boklisten.no](https://next.boklisten.no).

### `develop`

This branch should be treated as a development branch, but it does not need to have runnable code. By default, CI will run when pushing to this branch, which is nice for testing your code.
To create a production preview, please use the [Vercel CLI](https://vercel.com/docs/cli)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[AGPL-3.0](LICENSE)
