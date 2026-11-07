# Sonic Squirrels Website (Team 2930)

Plain HTML, CSS and one small script. No build step, no frameworks. Hosted on GitHub Pages (same as before), with an optional browser-based editor for the media team.

## What is where

| Folder / file | What it is |
|---|---|
| `index.html` | Homepage and the robot carousel |
| `content/*.json` | **All editable content**: robots, news, photo gallery, sponsors |
| `assets/images/` | Photos and logos. **Same paths as the old site** so old links keep working |
| `about/ contact/ donate/ ...` | Old pages, same addresses as before |
| `2022/03/meet-pteromyini/ ...` | Old blog posts, same addresses as before (the QR codes) |
| `admin/` | The content editor (Decap CMS) |
| `oauth-worker/` | Tiny login helper the editor needs (free, optional, see Part 4) |
| `tools/check_urls.py` | Checks every old address still works |
| `tools/build_pages.py` | One-time converter that made the old pages from Jekyll. Not needed day to day |
| `CNAME`, `.nojekyll` | Required by GitHub Pages. Do not delete |

---

## Part 1: Test it on your computer (2 minutes)

```
cd path/to/this/folder
python3 -m http.server 8000
```
Open http://localhost:8000. In a second terminal run the address check:
```
python3 tools/check_urls.py http://localhost:8000
```
It must end with `ALL URLS WORK`. (The `/admin` login only works on the live site.)

## Part 2: Put it on the `redesign` branch (your `main` stays untouched)

```
git checkout main && git pull
git tag jekyll-final && git push origin jekyll-final     # permanent bookmark of the old site
git checkout -b redesign
git rm -rq .                                              # clears the old Jekyll files from THIS branch only
# now unzip/copy this folder's contents into the repo folder (including hidden files like .nojekyll)
git add -A
git commit -m "New site"
git push -u origin redesign
```
`main` is never changed by any of this.

## Part 3: Make `redesign` the live site (and how to go back)

**Before you start**, open the repo's Settings, then Pages, and take a screenshot of the current settings.

1. GitHub repo, Settings, Pages, "Build and deployment".
2. Source: **Deploy from a branch**. Branch: **redesign**, folder **/ (root)**. Save.
3. Wait 1 to 2 minutes. Confirm Custom domain still says `sonicsquirrels.com` (the `CNAME` file in this folder keeps it).
4. Run the address check against the live site: `python3 tools/check_urls.py https://sonicsquirrels.com`
5. Scan every QR code on your flyers with a phone.

**To go back to the old site:** repeat step 2 and pick **main** instead. Takes about a minute. Nothing else changes: no DNS, no Cloudflare.

Your domain's DNS is not touched by any of this.

## Part 4: Turn on the media team editor (optional, can wait)

The site works fine without it. The editor lives at `sonicsquirrels.com/admin`. It needs a small free login helper because GitHub Pages cannot run server code.

1. **Create a GitHub OAuth app** (organization Settings, Developer settings, OAuth Apps, New). Homepage URL `https://sonicsquirrels.com`. Callback URL: `https://YOUR-WORKER-NAME.YOUR-SUBDOMAIN.workers.dev/callback` (you get this address in step 2, so you can edit the app afterward). Copy the Client ID and make a Client Secret.
2. **Create the helper on Cloudflare:** dashboard, Workers & Pages, Create, Hello World, Deploy, then Edit code. Paste in everything from `oauth-worker/worker.js`. Deploy.
3. On that Worker, Settings, Variables and Secrets: add `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (type Secret) and `ALLOWED_ORIGINS` = `https://sonicsquirrels.com`.
4. Edit `admin/config.yml`: set `repo:` to `your-org/your-repo` and `base_url:` to the Worker address. Commit.
5. Add each editor to the GitHub organization with Write access to the repo.
6. Visit `https://sonicsquirrels.com/admin` and click Login with GitHub.

This is the only step that uses the Cloudflare account. It does not change DNS.

## For the media team

Log in at `/admin`, pick a section, and fill in the form.
- **Photo Gallery**: add photo, caption, date, then Publish.
- **News**: add a post with a title, text, optional photo and YouTube link. Leave "Page address" empty.
- **Robots**: add each season's robot. Add a transparent PNG for the homepage carousel when you have one.
- **Sponsors**: add or reorder.

Changes appear in 1 to 2 minutes.

**Photo rules:** resize to about 2000 px wide and under 1 MB before uploading. Carousel cutouts: transparent PNG, whole robot, side view, cropped tight.

---

## Things to know

- **Old posts keep their own pages** (`/2022/03/...`). New posts from the editor show on the homepage and on `/news/` with the full text there. They do not get their own page.
- **Do not rename or delete old page folders**, because printed QR codes point to them.
- Two 2022 posts shared one address in the old site. Both now appear together at `/2022/05/Youtube-video-announcement/`.
- The old Mentors, Buttons and Social pages were hidden on the old site and are not included.
- Donate and Resources text is carried over unchanged and is out of date (it mentions April 2023 Worlds and a 2024 kickoff). Edit `donate/index.html` and `resources/index.html`.
- Old season pages (`/competition-season-2015/` to `2020/`) are linked from the archive section but not restyled in detail.

## Handover checklist
- [ ] GitHub organization has two or more Owners
- [ ] Cloudflare account email is a team address more than one person can read
- [ ] Domain auto-renew is on
- [ ] OAuth app owned by the organization
- [ ] Client ID and Secret saved in the team password manager
- [ ] Editor list reviewed each September

## If something breaks
| Problem | Fix |
|---|---|
| Site looks wrong after an edit | Repo commit history, revert the last commit |
| An old link 404s | Run `tools/check_urls.py`, then restore the missing folder from the `jekyll-final` tag |
| Can't log in at /admin | Callback URL must match the Worker address exactly; secrets set; `ALLOWED_ORIGINS` correct |
| Want the old site back | Part 3, pick `main` |
