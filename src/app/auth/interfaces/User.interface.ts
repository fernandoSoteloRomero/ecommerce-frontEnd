export interface User {
  token:   string;
  user:    UserClass;
  message: string;
}

export interface UserClass {
  username:  string;
  email:     string;
  name:      string;
  last_name: string;
}
