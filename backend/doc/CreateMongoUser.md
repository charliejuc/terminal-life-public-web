# Create Mongo Database User

```json
db.createUser({
 user: "dbUser",
 pwd: passwordPrompt(),
 roles: [
  { role: "readWrite", db: "<database>" }
 ]
})
```
