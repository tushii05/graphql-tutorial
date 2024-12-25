query getAllUsers{
  users {
   _id
    firstName
   lastName
    email
    quotes{
      name
      by
    }
  }
}
------------------------------------

query getAllQuote {
  quotes {
    name
    by{
      _id
      firstName
    }
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
  user: signupUser(userNew:$userNew){
    _id
    email
    firstName
    lastName
  }
}

------------------------------------

mutation signinUser($userSignIn:UserSignInInput!){
  user: signinUser(userSignIn:$userSignIn){
    token
  }
}

-------------------------------------

mutation createQuote{
  qoute : createQuote(name:"i am another nice quote")
}