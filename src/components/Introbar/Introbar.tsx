import { useState, useTransition, FormEvent } from "react";
import "./Introbar.css";
import Profilebox from "../Profilebox/Profilebox";

// Define types for user and repo data
interface User {
  login: string;
  id: number;
  avatar_url: string;
  repos_url: string;
  html_url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string | null;
  bio: string;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  fork: boolean;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

const Introbar = () => {
  const [isPending, startTransition] = useTransition();
  const [userName, setUserName] = useState<string>("");
  const [userData, setUserData] = useState<User | null>(null);
  const [userFound, setUserFound] = useState<boolean | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);

  const handleChange = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(() => {
      fetch(`https://api.github.com/search/users?q=${userName}+in:login`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("User not found");
          }
          return res.json();
        })
        .then((data) => {
          if (data.items && data.items.length > 0) {
            const user = data.items[0] as User;
            console.log(user);
            fetch(user.repos_url)
              .then((res) => res.json())
              .then((repoData: Repo[]) => {
                setRepos(repoData);
              });
            fetch(`https://api.github.com/users/${user.login}`)
              .then((res) => res.json())
              .then((fullUserData: User) => {
                setUserData(fullUserData);
                setUserName(fullUserData.login);
                setUserFound(true);
              });
          } else {
            setUserFound(false);
          }
        })
        .catch((error) => {
          console.log("Error:", error.message);
          setUserFound(false);
        });
    });
  };

  return (
    <>
      <section className="introbar">
        <h1>
          Search Users <span>Instantly</span>
        </h1>
        <div className="searchbox" style={{marginTop: "2rem"}}>
          <form onSubmit={handleChange}>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Search for a user"
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </section>
      {userName!==""?
      (userFound ? (
        isPending ? (
          <h1 className="showinfo">Searching...</h1>
        ) : (
          <Profilebox profileData={userData} repos={repos} />
        )
      ) : userFound === false ? (
        <h1 className="showinfo">No User Found</h1>
      ) : (
        <h1></h1>
      )):
      (
        <h1 className="showinfo">Search for a User</h1>
      )}
    </>
  );
};

export default Introbar;
