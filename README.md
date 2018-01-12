<h1 align="center">Parking Notifier API<br><a href="https://travis-ci.org/UWEC-ITC/parkingNotifier-API"><img src="https://travis-ci.org/UWEC-ITC/parkingNotifier-API.svg?branch=master"></a></h1>

The Parking Notifier API alerts UW-Eau Claire students when there is a snow emergency and alternate side parking is in effect. This API has endpoints that are public facing so that community members of Eau Claire can also utilize the monitoring that is built into this system. For more information [read the docs].

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
The status of the roads are monitored by scraping the [city website](http://www.ci.eau-claire.wi.us/home). The `monitor.js` file is the controller for the scraping of the website. The script checks for an alert banner at the top of the website, and if the banner is there, it visits the announcement linked to make sure it's a snow emergency alert. This automated check is performed every 30 minutes.

If the announcement is a snow emergency, the script takes the contents of announcement and inserts it into a database. This monitoring is conducted every 30 minutes. It's important to limit the number of requests to respect the website host.

### SMS alerts
SMS alerts are sent out using the database of subscribers. The provider for the messaging is [Twilio](https://www.twilio.com/). This service is the most convenient because it does not require knowledge of carriers and is extremely reliable.

## Versioning
Parking Notifier API will be maintained under the [Semantic Versioning guidelines](http://semver.org) guidelines as much as possible. Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

Breaking backward compatibility bumps the major (and resets the minor and patch).
New additions, including new icons, without breaking backward compatibility bumps the minor (and resets the patch).
Bug fixes, changes to brand logos, and misc changes bumps the patch.

<div align="center"><sup><sub align="center">Hosted and funded by [UWEC Information Technology Commission](http://www.uwec.edu/StudentSenate/commissions/itc/)</sub></sup></div>
