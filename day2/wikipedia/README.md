# Pair Programming Exercise: Wikipedia Traffic Patterns

## Goal

The goal of this exercise is to learn how to deal with large real-world datasets.

## Instructions

In this exercise we will be working with real life web traffic data for Wikipedia.
You will be calculating interesting stats about Wikipedia traffic using JavaScript.

You can find the actual results of running this analysis in [answers.md](answers.md).
Compare your results to verify your code!

### Part 1: Popularity contest

Calculate which languages and pages are the most popular on Wikipedia on June 6th 2016 1700 GMT (see data files at the bottom):

1. Find the top-10 most popular Wikipedia languages
1. Find the top-10 most popular Wikipedia pages
1. For the top 3 most popular languages, find the top-10
   most popular pages

### Part 2: Wikipedia traffic trends

Find the top 10 pages from day 1. Calculate their gain and loss in traffic
compared to the next day, June 7th 2016 1700 GMT.

Measuring changes in traffic is many sites implement features such as Trending Topics.

### (Bonus) Part 3: Upload your results to Google Spreadsheets

1. [Create an API token for Google Sheets](https://console.developers.google.com/apis/api/sheets.googleapis.com/overview)
1. Install [the google-spreadsheet NPM package](https://www.npmjs.com/package/google-spreadsheet)
1. Upload results of analysis to a Google Spreadsheet using Spreadsheets API.

You should have a tab in this spreadsheet for each part of this exercise.

TODO example output

### (Double Bonus) Part 4: Biggest winner and loser

Find the pages that had the greatest absolute increase or decrease
from day 1 to day 2.

## Data files

These files contain all Wikipedia pages that were access during these time
periods. Each line in each file contains three to four fields:

```
[language] [optional page name] [number of visits] [data transferred]
```

Sample data can be found the file [`sample.data`](sample.data).

For this exercise we only care about the first three fields: language, page name and visits.

### Data cleanup

As with all real world data, there's some cleanup you need to get good answers
from this data.

1. Ignore lines with only three fields.
1. Ignore languages that contain `.mw`.
1. **When counting page traffic:** Ignore lines where language is equal to page. These are aggregate numbers.

### Actual data

 - [File #1: 1 hour of Wikipedia traffic from June 6th](https://dumps.wikimedia.org/other/pagecounts-raw/2016/2016-06/pagecounts-20160606-170000.gz)
 - [File #2: 1 hour of Wikipedia traffic from June 7th](https://dumps.wikimedia.org/other/pagecounts-raw/2016/2016-06/pagecounts-20160607-170000.gz)

[File Information](https://wikitech.wikimedia.org/wiki/Analytics/Data/Pagecounts-raw)
