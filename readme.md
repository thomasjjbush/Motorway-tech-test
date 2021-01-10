# Motorway tech test

I chose to use my own boilerplate since it has linting and TS already set up for me (hopefully thats not cheating!) and used latest Chrome. All colours are dervied from theme provider. I took a little over the suggested 2 hours (spent maybe an extra hour or so adding unit tests (still very far from full coverage), in a production app I would strive to add functional + visual tests too). Since I'm using styled-components I have added a snapshot serializer to try and catch styles in snapz.

## Images
I've tried to do a dynamic (experimental) masonry grid for the car images. As I felt this was a cool approach to handle the variety of dimensions. Regarding API performance I'm storing responses in localStorage (keyed by request url). Better approach may have been to use Service Worker. (Didn't have sufficient time to register custom one, in hindsight should have used the provided repo!!). Handles responsiveness via bespoke useBreakpoints hook*

*If the number of image columns wasnt dynamic I would handle responsiveness via @media-querys

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