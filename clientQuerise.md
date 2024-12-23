query getAllUsers{
  users {
		id
    firstName
   lastName
  }
}

------------------------------------

query getAllQuote {
  quotes {
    name
  }
} 

--------------------------------
query getAllUsers{
  users {
		id
    firstName
   lastName
    quotes{
      name
      by
    }
  }
}

----------------------------

query getUserById{
  user(id:"2"){
    id
    firstName
    quotes{
      name
      by
    }
  }
}