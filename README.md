![badge](https://github.com/somosphi/nestjs-seed/workflows/Node%20CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/somosphi/nestjs-seed/badge.svg?branch=master)](https://coveralls.io/github/somosphi/nestjs-seed?branch=master)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

## Description

<p  align="center">

Seed API with [Nest](https://github.com/nestjs/nest) framework TypeScript, a progressive <a  href="http://nodejs.org"  target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a  href="https://angular.io"  target="blank">Angular</a>.

</p>

## Features

- Job for to sync users by integration [jsonplaceholder](http://jsonplaceholder.typicode.com/users) with the project database.
- Apm logger.
- Config validation load env.
- Request validation with class-validator 
- Routes for users, list all users, get user and to sync a user.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## How use test:e2e

End-to-end testing, such as description information, is used to test all application components, service layer, integration layer, database layer, and more.

To use the test: e2e with successfully is required create a test database with name ending with _test.

for exemple:

seed_nestjs 

seed_nestjs_test

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Maintainers

- Giuseppe Ferreira Menti - giuseppe.menti@somosphi.com  

- Ciro Stodulski de Azevedo - ciro.azevedo@somosphi.com 

- Mauricio dos Santos Henrique - mauricio.henrique@somosphi.com 

- Vinícius Müller Teixeira - vinicius.teixeira@somosphi.com 

## License

Copyright (c) 2017 4all Tecnologia

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

</p>
