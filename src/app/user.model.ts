export interface User {
  img: string,
  username: string,
  link: string
}

export interface UserFromApi {
  avatar_url: string,
  login: string,
  html_url: string;
}