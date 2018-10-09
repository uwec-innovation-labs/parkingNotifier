## The Issue
The city of Eau Claire, WI receives, on average, 46" of snowfall per year. Naturally, snow emergencies are declared many times each winter. Alternate side parking is critical in helping snowplows clear residential roads on time.

In neighborhoods heavily populated by students, it's very common for students to receive tickets for not following the policy. The goal of this project is to decrease the number of tickets issued to students and increase the effectiveness of residential plowing.

### City Policy
In Eau Claire, the [city policy](http://www.ci.eau-claire.wi.us/departments/public-works/alternate-side-parking) is as follows:
- **Odd numbered days**: vehicles shall only be parked, stopped or left standing on that side of the street having odd-numbered addresses.
- **Even numbered days**: vehicles shall only be parked, stopped or left standing on that side of the street having even-numbered addresses.

These rules are in effect for a full **72 hours (3 days)** after the snow emergency is declared. These rules affect all roads within the City of Eau Claire.

## How It Works

### Status Monitoring
The status of the roads are monitored by scraping the [city website](http://www.ci.eau-claire.wi.us/home). The `monitor.js` file is the controller for the scraping of the website. The script checks for an alert banner at the top of the website, and if the banner is there, it visits the announcement linked to make sure it's a snow emergency alert. This automated check is performed every 30 minutes. If the announcement is a snow emergency, the script takes the contents of announcement and inserts it into a database.

### SMS alerts
SMS alerts are sent out using the database of subscribers. The provider for the messaging is [Twilio](https://www.twilio.com/). This service is the most convenient because it does not require knowledge of carriers and is extremely reliable.

### Development Instructions
Instructions for development can be found [here](docs/README.md)

## Versioning
Parking Notifier API will be maintained under the [Semantic Versioning guidelines](http://semver.org) guidelines as much as possible. Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

Breaking backward compatibility bumps the major (and resets the minor and patch).
New additions, including new icons, without breaking backward compatibility bumps the minor (and resets the patch).
Bug fixes, changes to brand logos, and misc changes bumps the patch.

# Development Instructions

## Starting the API locally
1. Pull down the latest version of the repo
2. Install all dependencies by running `npm install`
3. Start the server using nodemon: `nodemon dev-server.js`
4. The service will start on localhost:9000


## Task Tracking
Visit [here](https://trello.com/b/2UBXPQ4H/parking-notifier) to see the current status of tasks and backlog.

## Docker Info
Docker is used to containerize the project. More info about Docker can be found here: https://docs.docker.com/get-started/#docker-concepts