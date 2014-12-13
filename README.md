angular-web-storage
=====================

This module is destined to be used with [AngularJS](https://angularjs.org). It allow you to store data in the [web storage](http://www.w3schools.com/html/html5_webstorage.asp) of your browser.

You can use this module from 2 different ways.

##### Simple way
You can use the methods without use the optional parameter "storageType". This way, the module manage your data between session and local storage without you need to worry about how your data are managed.

##### Advanced usage
Using optional "storageType" parameters offers you more possibilites to manage your data. You can precise where to store or get your data (between session and local storage).

All methods are based on a param storage type to give you the possibility to manage your data as you want.


Table of contents
=====================
- [Get Started](#get-started)
- [API Documentation](#api-documentation)
 - [get](#get)
 - [set](#set)
 - [remove](#remove)
 - [clearAll](#clearAll)
 - [keys](#keys)
- [Change log](#change-log)
- [Development](#development)



# Get Started

1. Get the module

    ##### Via npm
    ```bash
    $ npm install angular-webstorage
    ```

    ##### Via git
    Download the repository and take the angular-webstorage.js file from dist repository.

2. Include the module into your angular application. Include angular-webstorage.js (or angular-webstorage.min.js) file in `index.html`, after the Angular import.

3. Add WebStorageModule to your angular modules


# API Documentation

## get(key, storageType)

Get value from storage.
By default, without storageType, value is took from session but if no value is find from session, the method try to find a value from local storage.

#### Params
- key *(string)*: data identifier
- storageType *(string, optional)*: where to find the data between 'sessionStorage' and 'localStorage'

#### Return
- value if it find, undefined otherwise

#### Example
```js
var value1 = AngularWebStorage.get('foo'); // return value corresponding to 'foo' from session or local storage
var value2 = AngularWebStorage.get('key', 'localStorage'); // return value corresponding to 'key' from local storage
```

## set(key, value, keep)

Add value in web storage.
By default, without keep param, value is stored in session.

#### Params
- key *(string)*: data identifier
- value *(object)*: value to store
- keep *(boolean, optional)*: if true data is stored in local, if false data is stored in session

#### Return
- boolean: true if the data was stored well, false otherwise

#### Example
```js
AngularWebStorage.set('foo', 'toto'); // store the data in session
AngularWebStorage.set('foo', 'toto', false); // store the data in session
AngularWebStorage.set('foo', 'toto', true); // store the data in local
```

## remove(key, storageType)

Remove data from web storage.
By default, without storageType, data corresponding to key is removed from session and local storage.

#### Params
- key *(string)*: data identifier
- storageType *(string, optional)*: where to find the data between 'sessionStorage' and 'localStorage'

#### Example
```js
AngularWebStorage.remove('foo1'); // remove the data from session and local storage
AngularWebStorage.remove('foo2', 'sessionStorage'); // remove the data from session storage
AngularWebStorage.remove('foo2', 'localStorage'); // remove the data from local storage
```

## clearAll(storageType)

Clear all datas from local, session or both storage.

#### Params
- storageType *(string, optional)*: where to remove the data between 'sessionStorage' and 'localStorage'

#### Example
```js
AngularWebStorage.clearAll(); // remove all data from session and local storage
AngularWebStorage.clearAll('sessionStorage'); // remove all data from session storage
AngularWebStorage.clearAll('localStorage'); // remove all data from local storage
```

## keys(storageType)

Return all keys from local, session or both storage.
By default, without storageType, all keys (from session and local) are returned (the doublon between session and local are mixed)

#### Params
- storageType *(string, optional)*: where to find the keys between 'sessionStorage' and 'localStorage'

#### Example
```js
AngularWebStorage.keys(); // return all keys from session and local storage
AngularWebStorage.keys('sessionStorage'); // return all keys from session storage
AngularWebStorage.keys('localStorage'); // return all leys from local storage
```


# Change log

- v0.1.0
 - Initial commit

# Development

I encourage you to propose new functionality or suggestion to improve the project.

1. Fork the project
2. Clone the projet
    ```bash
    git clone https://github.com/<username>/angular-web-storage.git
    ```
3. Install dependencies
    ```bash
    npm install
    bower install
    ```
4. Launch test to be sure that everything work
    ```bash
    grunt test
    ```

5. Minify source file
    ```bash
    grunt dist
    ```

6. Check syntax
    ```bash
    grunt jshint
    ```

Don't forget to write tests and pass jshint syntax before to pull request please.
