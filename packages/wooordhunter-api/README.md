# Wooordhunter API

## Motivation

This package provide asyncronize API for [WooordHunt](https://wooordhunt.ru/) service for word translation.

## Installation

To add this package to the project just run command:

```
  yarn add @vviital/wooordhunter-api
```

## API

This package provide API for word translation and getting word tips. You can translate in both directions:

- Russian -> English
- English -> Russian

### fetchWordTranslation

#### Usage

```
  const WooordhuntAPI = require('@vviital/wooordhunter-api');

  const options = { apiUri: 'https://wooordhunt.ru' };

  const API = new WooordhuntAPI(options);

  API
    .fetchWordTranslation('test')
    .then(translation => {
      console.log(translation);
    });
```

#### Options

Right now options has only one _mandatory_ parameter apiUri which should have value _https://wooordhunt.ru_

#### Response format

Data in response depends on languge of requested word. Generally response have such format:

```
{
  commonMeanings: string[],
  language: 'english|russian',
  mainMeaning: string,
  nouns: string[],
  phrases: string[],
  transcription: {
    uk: string,
    us: string,
  },
  verbs: string[],
  word: string
}
```

### fetchTips

```
  const WooordhuntAPI = require('@vviital/wooordhunter-api');

  const options = { apiUri: 'https://wooordhunt.ru' };

  const API = new WooordhuntAPI(options);

  API
    .fetchTips('test')
    .then(tips => {
      console.log(tips);
    });
```

#### Response format

Generally response have such format:

```
[
  {
      word: string,
      translation: string
  },
  ...
  {
      word: string,
      translation: string
  }
]
```

### reconfigure

_Generally you don't need this method_

Actually WooordhunterAPI is a singelton and because of this we sometimes need to have possibility to reconfigure it. To do it - just invoke `reconfigure` method.

```
  const WooordhuntAPI = require('@vviital/wooordhunter-api');

  const wrongOptions = { apiUri: 'http://example.com' };

  const API = new WooordhuntAPI(options);

  const correctOptions = { apiUri: 'https://wooordhunt.ru' };

  API.reconfigure(correctOptions); // Now API has correct configuration
```
