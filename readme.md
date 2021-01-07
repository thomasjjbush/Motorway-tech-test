# Motorway tech test

I chose to use my own boilerplate as it has linting and TS already set up for me (hopefully thats not cheating!). I spent an extra hour or so adding unit tests.

I've tried to do a dynamic masonry grid for the car images. Regarding API performance I'm storing responses in localStorage (keyed by request url) a better approach would be to leverage Cache API via a serviceWorker but I didn't have sufficient time. 

Regarding the form, I could have opted for the simpler built-in validation by relying on (required, pattern and the :valid :invalid psuedo classes) but I figured custom JS was more appropriate for tech test.

## Install dependancies
Run `yarn`

## Run webpack dev server
Run `yarn start`

## Run server
Run `yarn serve` (in different terminal)

## Run test
Run `yarn test`