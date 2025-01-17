# QA Assessment - Funda

## About
This is my attempt at the QA assignment for your company

## Requirements
- NodeJS
## Instructions for OsX
- Run the following command to install the requirements \
  `npm install`
- 

## Main features

### Search for character (person)
*	When you search for **a character** and it’s a valid one, then you should be able to see his / her “Gender”, “Birth year”, “Eye color” and “Skin color”.
*	When you search for a character and it’s not a valid one, then you should be able to see “Not found” in the results.

### Search for planet
*	When you search for **a planet** and it’s a valid one, then you should be able to see its “Population”, “Climate” and “Gravity”.
*	When you search for a planet and it’s not a valid one, then you should be able to see “Not found” in the results.

### Additional flows
*	When you search for either a character or a planet and you get one or more results for it, clear the “Search form” and hit the Search button again, you should then get an empty result list (previous search results are removed).
*	You can search for results by clicking the “Search” button or by pressing “enter” on the search field.
*	When for example you have searched for a full planet name and you’ve got results, if you switch to People and search for the same thing (that has no matching people based on a partial name), you should get a “Not found” in the results.
*	You can have more than one results, for both Planets and Names (partial matching)

## Requirements
* **NodeJS 10**
* Chrome browser
* Tested on Mac OS X

## Installation

```
npm install 
```

## Run

Run `ng serve` and navigate to `http://localhost:4200/`.
You can search by people and planets there.
To search by people use `Luke Skywalker`, `Leia Organa` or `r2`. Use `Darth` to see multiple results.  
To search by search by planets use `Alderaan`, `Hoth`.
 