# API design

## API to use for apps created during the training
* user actions
 * input a value (text, name)
 * click a button (search, find)
 * view the result (section, list)

## NOTE
Emberjs recommend using [JSON API](http://jsonapi.org/), so that is what we will be using

## API
* `<host>/connected-entities/search?q=<text>`
* `<host>/leave-tracker/search?q=<name>`

### Connected Entities

* api: `<host>/connected-entities/search?q=<text>`
* request format: GET
* response format:
```
{
  data: [{
    "type": "entities",
    "id": "<entity-id>",
    "attributes": {
      "text": "<text>",
      "properties": [{
          "category": "<ex: row>",
          "name": "<ex: 2>"
        }, {
          "category": "<ex: column>",
          "name": "<ex: Email>"
        }]
    },
    "relationships": {
      "connections": {
        "data": [{
          "type": "connections", "id": "<connection-id>"
        }]
      }
    }
  }],
  "included": [{
      "type": "connections",
      "id": "<connection-id>",
      "attributes": {
        "path": "<ex: column>",
        "entities": ["<entity text>", "<entity text>"]
      }
    }]
}
```
### Absence Tracker

* api: `<host>/leave-tracker/search?q=<text>`
* request format: GET
* response format:
```
{
  data: [{
    "type": "absences",
    "id": "<absence-id>",
    "attributes": {
      "name": "<name>",
      "properties": [{
          "category": "<ex: start-time>",
          "name": "<ex: 08-10>"
        }, {
          "category": "<ex: end-time>",
          "name": "<ex: 08-15>"
        }]
    },
    "relationships": {
      "similarities": {
        "data": [{
          "type": "similarities", "id": "<similarity-id>"
        }]
      }
    }
  }],
  "included": [{
      "type": "similarities",
      "id": "<similarity-id>",
      "attributes": {
        "path": "<ex: start-time>",
        "entities": ["<similarity text>", "<similarity text>"]
      }
    }]
}
```
