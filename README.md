# DnD Campaign Maker With Authentication
###### Bailee Allen | CS 3200
###### Published April 16, 2019

##
##### Resource name = characters
##### Attributes:
- Name
- class
- race
- level
- alignment
- XP

##### Resource name = users
##### Attributes:
- First Name
- Last Name
- Username
- Email
- Password

# Create Table 

```sh
CREATE TABLE characters (
    id INTEGER PRIMARY KEY,
    name TEXT,
    class TEXT,
    race TEXT,
    level text,
    alignment TEXT,
    XP INTEGER);
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    firstName TEXT,
    lastName TEXT,
    username TEXT,
    email TEXT,
    password TEXT
);
```

# REST Endpoints

| Name | HTTP Method | Path |
| ------ | ------ | ------ |
| Retrieve Character | GET | http://localhost:8080/dndCharacters
| Add a Character | POST | http://localhost:8080/dndCharacters
| Delete Character | DELETE | http://localhost:8080/dndCharacters/${id} |
| Update Character | PUT | http://localhost:8080/dndCharacters/${id} |
| Signup New User | POST | http://localhost:8080/dndUsers |
| Login User | POST | http://localhost:8080/dndSessions |

# Password Hashing
Passwords are hashed using bcrypt in the passlib.hash library. Documentation for bcrypt can be found [here](https://passlib.readthedocs.io/en/stable/lib/passlib.hash.bcrypt.html).

# Github
Code lives in github repository [here](https://github.com/dsu-cit-csweb3200/s19-resourceful-BaileeAllen).



