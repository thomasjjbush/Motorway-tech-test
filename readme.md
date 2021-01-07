# Motorway tech test

I chose to use my own boilerplate since it has linting and TS already set up for me (hopefully thats not cheating!) and used latest Chrome. I took a little over the suggested 2 hours (spent maybe an extra hour or so adding unit tests).

## Images
I've tried to do a dynamic masonry grid for the car images. As I felt this was a cool approach to handle the variety of dimensions. Regarding API performance I'm storing responses in localStorage (keyed by request url). Better approach may have been to use Service Worker. (Didn't have sufficient time to register custom one, in hindsight should have used the provided repo!!)

## Form
I could have opted for the simpler built-in validation by relying on (required, pattern and the :valid :invalid psuedo classes) but I figured custom JS was more appropriate for tech test. I've tried to make it as dynamic as possible so it could accept n amount of fields (of any type)

## Install dependancies
Run `yarn`

## Run webpack dev server
Run `yarn start`

## Run server
Run `yarn serve` (in different terminal)

## Run test
Run `yarn test`