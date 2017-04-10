<img src="https://raw.githubusercontent.com/pact-foundation/pact-logo/master/media/logo-black.png" width="200">

[![Build Status](https://travis-ci.org/pact-foundation/grunt-pact.svg?branch=master)](https://travis-ci.org/pact-foundation/grunt-pact)
[![npm](https://img.shields.io/npm/v/@pact-foundation/grunt-pact.svg?maxAge=2592000)](https://www.npmjs.com/package/@pact-foundation/grunt-pact)
[![npm](https://img.shields.io/github/license/pact-foundation/grunt-pact.svg?maxAge=2592000)](https://github.com/pact-foundation/grunt-pact/blob/master/LICENSE)
[![npm](https://img.shields.io/david/pact-foundation/grunt-pact.svg?maxAge=2592000)](https://www.npmjs.com/package/@pact-foundation/grunt-pact)
<!---[![npm](https://img.shields.io/npm/dt/pact-foundation/grunt-pact.svg?maxAge=2592000)](https://www.npmjs.com/package/@pact-foundation/grunt-pact)-->

# Grunt Pact

> UPGRADE NOTICE

> If you are using grunt-pact as a dependency in your project, please update it to @pact-foundation/grunt-pact.

A grunt task to run pact on node.

## Getting Started
This plugin requires Grunt `>=0.4.0` (works with 1.X)

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install @pact-foundation/grunt-pact --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-pact');
```

## The "pact" task

### Overview
In your project's Gruntfile, add a section named `pact` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  pact: {
    options: {
      // Grunt Pact Specific Options
      force: <Boolean>, // Continue if one of the pact files errors, defaults to 'false'
      logLevel: <String>, // Specify log level, either 'trace', 'debug', 'info', 'warn', 'error' or 'fatal', defaults to 'info'
      // Pact Specific Options Go Here
      port: <Number>, // Port number that the server runs on, defaults to 1234
      host: <String>, // Host on which to bind the server on, defaults to 'localhost'
      log: <String>, // File to log output on relative to current working directory, defaults to none
      ssl: <Boolean>, // Create a self-signed SSL cert to run the server over HTTPS, defaults to 'false'
      cors: <Boolean>, // Allow CORS OPTION requests to be accepted, defaults to 'false'
      dir: <String>, // Directory to write the pact contracts relative to the current working directory, defaults to none
      spec: <Number>, // The pact specification version to use when writing pact contracts, defaults to '1'
      consumer: <String>, // The name of the consumer to be written to the pact contracts, defaults to none
      provider: <String> // The name of the provider to be written to the pact contracts, defaults to none
    },
    your_target: {
      // Specify Pact configuration files here
      src:['mocks/**/*.pact.js']
    },
  },
});
```

### Options

All pact-mock-service options are available to grunt-pact.

#### options.force
Type: `Boolean`
Default value: `false`

While running through pact files, this will prevent grunt from stopping if an error occurs.  

#### options.logLevel
Type: `String`
Default value: `'info'`

Sets the log level for Pact when running.  Can be set to 'trace', 'debug', 'info', 'warn', 'error' or 'fatal'.

#### options.port
Type: `Number`
Default value: `1234`

Port number that the server runs on.

#### options.host
Type: `String`
Default value: `'localhost'`

Host on which to bind the server on.  You probably don't need to use this.

#### options.log
Type: `String`
Default value: `''`

File to log output on relative to current working directory.

#### options.ssl
Type: `Boolean`
Default value: `false`

Create a self-signed SSL cert to run the server over HTTPS.

#### options.cors
Type: `Boolean`
Default value: `false`

Allow CORS OPTION requests to be accepted.

#### options.dir
Type: `String`
Default value: `''`

Directory to write the pact contracts relative to the current working directory.

#### options.spec
Type: `Number`
Default value: `1`

The pact specification version to use when writing pact contracts.

#### options.consumer
Type: `String`
Default value: `''`

The name of the consumer to be written to the pact contracts. This can be set via the API.

#### options.provider
Type: `String`
Default value: `'.'`

The name of the provider to be written to the pact contracts. This can be set via the API.

