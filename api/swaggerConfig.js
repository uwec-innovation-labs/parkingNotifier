exports.options = {
    {
        "openapi" : "3.0.0",
        "info" : {
          "title" : "Parking Notifier API",
          "description" : "This specification documentation is for the Parking Notifier API. This API is the core of the notification service provided by Clearwater Labs.\n\n# Getting Started\nTo get started, make sure you have the dependencies installed:\n- Docker\n- Node\n\nThese are the only two dependencies. Use *docker-compose* to spin up the instance of everything. This will include a mongodb instance, API instance, and a UI instance.",
          "version" : "1.0.0-oas3"
        },
        "servers" : [ {
          "url" : "http://127.0.0.1:80/"
        } ],
        "paths" : {
          "/status" : {
            "get" : {
              "tags" : [ "Status" ],
              "summary" : "get a list of all users",
              "responses" : {
                "200" : {
                  "description" : "An object with the current statuss"
                }
              }
            }
          },
          "/users" : {
            "get" : {
              "tags" : [ "User" ],
              "summary" : "get a list of all users",
              "responses" : {
                "201" : {
                  "description" : "An object with user details"
                },
                "403" : {
                  "description" : "Invalid authentication level"
                }
              }
            },
            "post" : {
              "tags" : [ "User" ],
              "summary" : "creates a new user",
              "requestBody" : {
                "description" : "It enables a user to register for notifications",
                "content" : {
                  "application/json" : {
                    "schema" : {
                      "$ref" : "#/components/schemas/register"
                    }
                  }
                },
                "required" : true
              },
              "responses" : {
                "201" : {
                  "description" : "An object with user details"
                }
              }
            }
          }
        },
        "components" : {
          "schemas" : {
            "register" : {
              "type" : "object",
              "properties" : {
                "firstName" : {
                  "type" : "string"
                },
                "lastName" : {
                  "type" : "string"
                },
                "email" : {
                  "type" : "string"
                },
                "phoneNumber" : {
                  "type" : "string"
                }
              }
            }
          }
        }
      }
    apis: ['./routes/*']
}