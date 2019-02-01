exports.options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Parking Notifier API",
            version: "1.0.0",
            description: `
This specification documentation is for the Parking Notifier API. This API is the core of the notification service provided by Clearwater Labs.
            
## Getting Started

To start developing locally, you need to install \`docker\` and have \`Node\`. The \`docker-compose\` command will build the local environemnt with a fresh
version of MongoDB, Parking Notifier API, and Parking Notifier UI.

These are the only two dependencies. Use \`docker-compose\` to spin up the instance of everything. This will include a mongodb instance, API instance, and a UI instance. The API will be on port 80 (127.0.0.1:80)
            `
        },
        host: "127.0.0.1:80",
        tags: [
            {
                name: "Stats",
                description: "Stats are used to get the user counts and the percentages of users that have confirmed their email. "
            }
        ]
    },
    apis: ['./routes/*']
}