# QA Assessment - Funda

## About
This is my attempt at the QA assignment for your company

## Requirements
- NodeJS

## Instructions for OsX
- Run the following command to install the requirements \
  `npm install`
- Install the Chromium browser \
  `npx playwright install chromium`
- If the operating system complains that not all dependencies have been installed,
 it will ask you to run this command. Please run this command  
`npx playwright install-deps`

## Run

Run the tests using the following command

`npm test`

The configuration is set to run the tests in headed mode which is good for debugging and for a demo.
This needs to be changed if running in a CI environment to run headless.

## Details

This was the requirement

`We want to have 5 automated smoke tests which would help us releasing the funda website
with confidence.`

In response, I added the following five tests

- Should be able to log in to Funda as an end user
- Should show saved searches for the logged-in user
- Should search for properties in a city and filter on type of property
- Should list a single property and verify its listing details
- Should be able to contact the property agent

### Framework used

PlayWright with TypeScript

## Observations and challenges

- A lot of important elements do not have dedicated data-testIds. 
That makes it difficult to create simple and consistent locators.
- The cookies dialog is being handled in the UI. I was unable to find a better way to handle this. 
- There is one place where I had to add an `explicit wait` otherwise many of the form fields would not get filled in. 
- A handful of locators were left out in one test; it was easier that way.
- When using the application manually, the URLs end up being 'url decoded'. 
But when running the tests, many a times the URL would show up as URL decoded.
For example, when searching for a city, the URL should end as `selected_area=["den-haag"]` but
sometimes it would be `selected_area=%5B"den-haag"%5D` and then sometimes also `selected_area=%5B%22den-haag%22%5D`
This also resulted in some inconsistency in some locators. 
- Occasional 502 Bade Gateway or other interruption in service noted while executing the tests.
Hence, the default setting is to retry the tests once before declaring them as having failed.
