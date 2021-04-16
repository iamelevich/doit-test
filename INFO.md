# Challenge details

Your goal is to build an integration tool that loads data from a CSV file, schedules some email communications, and then executes automated tests to ensure all data and logic was executed correctly.

Here is the sample data file:

```csv
Program Identifier|Data Source|Card Number|Member ID|First Name|Last Name|Date of Birth|Address 1|Address 2|City|State|Zip code|Telephone number|Email Address|CONSENT|Mobile Phone
50777445|WEB 3RD PARTY|342121211|43233|LOAD|TEST 0|04/29/2000|3100 S Ashley Drive||Chandler|AZ|85286||test0@humancaresystems.com|Y|1234567912
50777445|WEB 3RD PARTY|564232340|12045|LOAD|TEST 1|03/20/1969|3100 S Ashley Drive||Chandler|AZ|85286||test1@humancaresystems.com|Y|1234567890
50777445|WEB 3RD PARTY|564232341|12145|LOAD|TEST 2|03/01/1969|3100 S Ashley Drive||Chandler|AZ|85286||test2@humancaresystems.com|Y|6177504302
50777445|WEB 3RD PARTY|564232342|12245|LOAD|TEST 3|03/02/1969|3100 S Ashley Drive||Chandler|AZ|85286||test3@humancaresystems.com|Y|6177504303
50777445|WEB 3RD PARTY|564232343|12445|LOAD|TEST 4|03/03/1969|3100 S Ashley Drive||Chandler|AZ|85286||test4@humancaresystems.com|N|6177504384
50777445|WEB 3RD PARTY|564232344|13245|LOAD|TEST 5|03/04/1969|3100 S Ashley Drive||Chandler|AZ|85286||test5@humancaresystems.com|N|6177504305
50777445|WEB 3RD PARTY|564232345|14545|LOAD|TEST 6|03/05/1969|3100 S Ashley Drive||Chandler|AZ|85286||test6@humancaresystems.com|N|6177504306
50777445|WEB 3RD PARTY|564232346|15245||TEST 7|03/06/1969|3100 S Ashley Drive||Chandler|AZ|85286||test7@humancaresystems.com|Y|6177504307
50777445|WEB 3RD PARTY|564232347|15545|LOAD|TEST 8|03/07/1969|3100 S Ashley Drive||Chandler|AZ|85286||test8@humancaresystems.com|N|6177504308
50777445|WEB 3RD PARTY|564232348|16445|LOAD|TEST 9|03/08/1969|3100 S Ashley Drive||Chandler|AZ|85286||test9@humancaresystems.com|N|6177504309
50777445|WEB 3RD PARTY|564232349|16345||TEST 10|03/09/1969|3100 S Ashley Drive||Chandler|AZ|85286||test10@humancaresystems.com|N|6177504310
50777445|WEB 3RD PARTY|564232350|16245|LOAD|TEST 11|03/10/1969|3100 S Ashley Drive||Chandler|AZ|85286|||Y|6177504311
50777445|WEB 3RD PARTY|564232365|17445|LOAD|TEST 12|03/11/1969|3100 S Ashley Drive||Chandler|AZ|85286||test12@humancaresystems.com|N|6177504312
50777445|WEB 3RD PARTY|564232363|17345|LOAD|TEST 13|03/12/1969|3100 S Ashley Drive||Chandler|AZ|85286||test13@humancaresystems.com|Y|6177504313
50777445|WEB 3RD PARTY|564232360|19845|LOAD|TEST 14|03/13/1969|3100 S Ashley Drive||Chandler|AZ|85286||test14@humancaresystems.com|N|6177504314
50777445|WEB 3RD PARTY|564232423|4542323|LOAD|TEST 15|04/29/2000|3100 S Ashley Drive||Chandler|AZ|85286||test15@humancaresystems.com|N|132342323
50777445|BENCHWORKS|56221312|32323|LOAD|TEST 16|04/20/2001|3100 S Ashley Drive||Chandler|AZ|85286||test16@humancaresystems.com|Y|1234567890
50777445|WEB 3RD PARTY|53434323|12345|LOAD|TEST 17|04/29/19871|3100 S Ashley Drive||Chandler|AZ|85286||test17@humancaresystems.com|N|1234567890
```

## Project Notes

- Create a node.js project to loads the above data into a Patients collection in MongoDB. The collection will include all the data stored in the input data file.
- Create logic that schedules emails for every patient that has CONSET=Yes.
  - All emails should be stored in an Emails collection
  - Each email should have an id, name, and scheduled_date
  - Create multiple emails with the following information:
    - Name: “Day 1”, scheduled_date: NOW+1 day
    - Name: “Day 2”, scheduled_date: NOW+2 days
    - Name: “Day 3”, scheduled_date: NOW+3 days
    - Name: “Day 4”, scheduled_date: NOW+4 days
- Create an Automation script\Unit tests that test the following conditions:
  - Verify the data in flat file matches the data in Patients collection
  - Print out all Patient IDs where the first name is missing
  - Print out all Patient IDs where the email address is missing, but consent is Y
  - Verify Emails were created in Emails Collection for patients who have CONSENT as Y
  - Verify emails for each patient are scheduled correctly.

## Guidance

Feel free to use any automation framework you prefer.

## Deliverables

1. A working solution that can be cloned, installed (using the instructions in README.md), ran, tested, and reviewed.
2. A document highlighting the steps you took to implement the solution (adding screenshots is encouraged).

Important notes

1. The challenge should not take you more than 5 hours to complete.
2. You should not incur any expenses.
3. If you have any questions, please contact us – this will not negatively impact your overall evaluation.
