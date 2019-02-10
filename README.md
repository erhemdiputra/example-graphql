## Example GraphQL

### Query
```
query {
  getUsers {
    id
    name
  }
  
  getUser(id: 2) {
    id
    name
  }
}
```

### Mutation
```
mutation {
  addUser(id: 3, name: "Kurapika") {
    id
    name
  }
  
  updateUser(id: 2, name: "Hisoka") {
  	id
    name
  }
  
  deleteUser(id: 3) {
  	id
    name
  }
}
```