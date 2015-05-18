# Boundary UI Coding Test With [Marionette / Browserify TodoMVC](https://github.com/JSteunou/marionetteify)

After trying to clean up the original Marionette Backbone TodoMVC by adding a grunt build pipeline with browserify and karma, jasmine, tdd and linting I realized I was taking too long and not making a lot of progress.

I found [this](https://github.com/JSteunou/marionetteify) and decided to fork it instead.  I hope it's clean enough so it's not too painful to read.

## [API Docs](http://html5devgal.com/marionetteify-boundary-ui-coding-test/)

### Demo

[App running on heroku](https://floating-peak-3446.herokuapp.com/)

### Compare

You can compare the original code [with this PR](https://github.com/jewelsjacobs/marionetteify-boundary-ui-coding-test/pull/1)

### Install

Install grunt globally

    $ [sudo] npm install grunt -g
    $ [sudo] npm install grunt-cli -g
    
Install local node modules

    $ npm install
    
### Run

    $ npm start

### Build

For development:

    $ grunt init:dev && grunt build:dev  

For production:

    $ grunt build:prod
    
With watch:
    
    $ grunt watch

### Front-end Tests/TDD (Didn't finish this):

Requires PhantomJS to be installed globally:

    $ sudo npm install -g phantomjs

To run tests in TDD watch mode:

    $ grunt tdd

To run tests once:

    $ npm test
