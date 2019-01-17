exports.options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Parking Notifier API",
            version: "1.0.0",
            description: "This specification documentation is for the Parking Notifier API. This API is the core of the notification service provided by Clearwater Labs.\n\nGetting Started\n=========\n\nTo get started, make sure you have the dependencies installed:\n\n- Docker\n- Node\n\nThese are the only two dependencies. Use *docker-compose* to spin up the instance of everything. This will include a mongodb instance, API instance, and a UI instance. The API will be on port 80 (127.0.0.1:80)"
        },
        host: "127.0.0.1:80"
    },
    apis: ['./routes/*']
}