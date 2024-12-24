query getAllUsers{
  users {
		_id
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
		_id
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
  user(_id:"2"){
    _id
    firstName
    quotes{
      name
      by
    }
  }
}
---------------------------------

query getUserById($userid:ID!){
  user(_id:$userid){
    _id
    firstName
    quotes{
      name
      by
    }
  }
}
---------------------------
query getQuoteById($quoteby:ID!){
  iquote(by:$quoteby){
      name
      by
  }
}

------------------------------
mutation createUser($userNew:UserInput!){
  user: signupUserDummy(userNew:$userNew){
    _id
    email
    firstName
    lastName
  }
}