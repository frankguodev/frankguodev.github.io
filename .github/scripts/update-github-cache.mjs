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
    pushed_at: repo.pushed_at,
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
      size: event.payload?.size,
      commits: Array.isArray(event.payload?.commits)
        ? event.payload.commits.map((commit) => ({
            sha: commit.sha,
            message: commit.message
          }))
        : []
    }
  };
}

async function getRecentCommits(repos) {
  const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
  const publicOwnerRepos = repos.filter((repo) => !repo.private && !repo.fork && !repo.archived);
  const rows = await Promise.all(publicOwnerRepos.map(async (repo) => {
    try {
      const commits = await getJson(`/repos/${repo.full_name}/commits?author=${encodeURIComponent(githubUser)}&since=${encodeURIComponent(since)}&per_page=100`);
      const latest = commits[0];
      return {
        repo: repo.full_name,
        html_url: repo.html_url,
        count: commits.length,
        latest_at: latest?.commit?.author?.date || latest?.commit?.committer?.date || repo.pushed_at || repo.updated_at
      };
    } catch (error) {
      console.warn(`Could not read commits for ${repo.full_name}: ${error.message}`);
      return {
        repo: repo.full_name,
        html_url: repo.html_url,
        count: 0,
        latest_at: repo.pushed_at || repo.updated_at
      };
    }
  }));

  return rows
    .filter((row) => row.count > 0)
    .sort((a, b) => b.count - a.count || new Date(b.latest_at) - new Date(a.latest_at))
    .slice(0, 6);
}

const [user, repos, events] = await Promise.all([
  getJson(`/users/${githubUser}`),
  getJson(`/users/${githubUser}/repos?type=owner&sort=updated&per_page=100`),
  getJson(`/users/${githubUser}/events/public?per_page=100`)
]);

const recentCommits = await getRecentCommits(repos);

const cache = {
  generatedAt: new Date().toISOString(),
  source: "github-actions-cache",
  user: pickUser(user),
  repos: repos.map(pickRepo),
  events: events.map(pickEvent),
  recentCommits
};

await writeFile("github-data.json", `${JSON.stringify(cache, null, 2)}\n`, "utf8");
console.log(`Wrote github-data.json for ${githubUser}`);
