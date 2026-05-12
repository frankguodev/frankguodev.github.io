import { writeFile } from "node:fs/promises";

const githubUser = process.env.GITHUB_USER || "frankguodev";
const token = process.env.GITHUB_TOKEN;
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "frankguo-dev-site-cache"
};

if (token) {
  headers.Authorization = `Bearer ${token}`;
}

async function getJson(path) {
  const response = await fetch(`https://api.github.com${path}`, { headers });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API ${response.status} for ${path}: ${body}`);
  }
  return response.json();
}

function pickUser(user) {
  return {
    login: user.login,
    name: user.name,
    avatar_url: user.avatar_url,
    html_url: user.html_url,
    public_repos: user.public_repos,
    followers: user.followers,
    following: user.following
  };
}

function pickRepo(repo) {
  return {
    name: repo.name,
    full_name: repo.full_name,
    html_url: repo.html_url,
    description: repo.description,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    private: repo.private,
    fork: repo.fork,
    archived: repo.archived,
    updated_at: repo.updated_at
  };
}

function pickEvent(event) {
  return {
    id: event.id,
    type: event.type,
    created_at: event.created_at,
    repo: event.repo ? {
      id: event.repo.id,
      name: event.repo.name,
      url: event.repo.url
    } : null,
    payload: {
      ref_type: event.payload?.ref_type,
      commits: Array.isArray(event.payload?.commits)
        ? event.payload.commits.map((commit) => ({
            sha: commit.sha,
            message: commit.message
          }))
        : []
    }
  };
}

const [user, repos, events] = await Promise.all([
  getJson(`/users/${githubUser}`),
  getJson(`/users/${githubUser}/repos?type=owner&sort=updated&per_page=100`),
  getJson(`/users/${githubUser}/events/public?per_page=100`)
]);

const cache = {
  generatedAt: new Date().toISOString(),
  source: "github-actions-cache",
  user: pickUser(user),
  repos: repos.map(pickRepo),
  events: events.map(pickEvent)
};

await writeFile("github-data.json", `${JSON.stringify(cache, null, 2)}\n`, "utf8");
console.log(`Wrote github-data.json for ${githubUser}`);
