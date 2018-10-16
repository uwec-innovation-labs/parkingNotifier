# Parking Notifier API

This is the API for the parking notifier. This handles all of the following:

- Creates and removes subscribers
- Monitors the city website for updates in snow emergencies
- Serves as a data source for emergency snow notification

## Routes

### **`GET /users/`**

- **`Description`** - This endpoint returns all the users in the system
- **`Optional Paramaters`** - None
- **`Response`**:

```json
{
  "users": [
    {
      "_id": "5bc5f849d7d44e0028874e8e",
      "username": "johndoe5302",
      "subscribed": "true",
      "__v": 0
    }
  ]
}
```

### **`GET /users/:username`**

- **`Description`** - This endpoint returns all the users in the system
- **`Optional Paramaters`** - None
- **`Response`**:

```json
{
  "_id": "5bc5f849d7d44e0028874e8e",
  "username": "johndoe5302",
  "subscribed": "true",
  "__v": 0
}
```
