![Monkee-Boy](https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/113009/mboy-1403710932.jpg) generator-mboy-deploy [![npm version](https://img.shields.io/npm/v/generator-mboy-deploy.svg?style=flat-square)](http://badge.fury.io/js/generator-mboy-deploy) [![Build Status](https://img.shields.io/travis/Monkee-Boy/generator-mboy-deploy.svg?style=flat-square)](https://travis-ci.org/Monkee-Boy/generator-mboy-deploy) [![Test Coverage](https://img.shields.io/coveralls/Monkee-Boy/generator-mboy-deploy.svg?style=flat-square)](https://coveralls.io/r/Monkee-Boy/generator-mboy-deploy) [![Package Dependencies](https://www.versioneye.com/user/projects/54d7c65d2bc790052a000078/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/54d7c65d2bc790052a000078)
==============

`mboy-deploy` is a Yeoman generator for initializing the Monkee-Boy Capistrano deployment templates. Yeoman will guide you along and ask a few important questions to get you ready for deployments.

The deploy templates Yeoman uses can be found at [Monkee-Boy/deploy-templates](https://github.com/Monkee-Boy/deploy-templates).

## Usage

```
npm install -g yo
```

```
npm install -g generator-mboy-deploy
```

```
yo mboy-deploy
```

### Tests

* **Mocha**
  * `npm install -g mocha`
  * Run tests with `mocha`
* **Code Coverage**
  * `npm install -g istanbul`
  * Generate coverage with `istanbul cover _mocha -- -R spec`


## To Do

* [x] Ask if using WordPress for default linked_files and linked_dirs.
* [x] Ask if using npm and add build:npm task.
* [x] Ask if using bower and add build:bower task.
* [ ] Ask if using Jekyll and add build:jekyll task.
* [ ] Ask if using Laravel and add migration, seed, etc tasks.
* [ ] Ask if using mbCMS and add migrations, clear cache, etc tasks.
* [x] Add next steps when generator is done.
  * Ex: linked_files, linked_dirs, check any values you left as default, etc.


## The Dev Team

Handcrafted with ♥ in Austin, Texas by the [Monkee-Boy Troop](http://www.monkee-boy.com/about/the-troop.php).

| [![James Fleeting](https://avatars0.githubusercontent.com/u/23062?s=144)](https://github.com/fleeting) | [![Pete Gautier](https://avatars3.githubusercontent.com/u/5394199?s=144)](https://github.com/pgautier404) | [![Sarah Higley](https://avatars3.githubusercontent.com/u/3819570?s=144)](https://github.com/smhigley) | [![John,Hoover](https://avatars2.githubusercontent.com/u/48278?s=144)](https://github.com/defvayne23) |
|---|---|---|---|
| [James Fleeting](http://github.com/fleeting) | [Pete Gautier](https://github.com/pgautier404) | [Sarah Higley](https://github.com/smhigley) | [John Hoover](https://github.com/defvayne23) |

## License

`generator-mboy-deploy` is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

![Monkee-Boy](http://assets.monkee-boy.com/mboy-logo-tagline.jpg)
