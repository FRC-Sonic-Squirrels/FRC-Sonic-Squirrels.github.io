# FRC-Sonic-Squirrels.github.io

This is the Github Pages website for the Sonic Squirrels, FRC team 2930 <https://frc-sonic-squirrels.github.io/> and <https://sonicsquirrels.com>.

## Creating a New Blog Post

Either clone the repo and edit in VS Code or edit directly on github.com. Preferably by cloning this repo and testing on your own machine first if you are making changes to the layout and styles.

1. Create a new file in the `_posts` directory. The file must be in the format `YYYY-MM-DD-blog-title.html`  (or ending in .`md`). Where YYYY is the current year, MM is the current month, and DD is the current day. (month and day with leading zeros). Something like this: `2021-12-04-moved-blog-to-github-pages.html`.
2. Next edit the file to look like this example post:

```html
---
layout: post
title: "Put Blog Post Title Here"
categories: robots
author: "Sonic Squirrels"
permalink: 2022/03/put-blog-post-title-here
---
<p>
Your blog post <b>html</b> goes here. The word "html" is bold thanks to the HTML "b" tag.
</p>
<p>
This is a second paragraph. Paragraphs are separated by html "p" tags.
</p>
<p>
This is a link to our <a href="https://www.thebluealliance.com/team/2930/">2930 Blue Alliance Page.</a>    
</p>
```

Check out previous posts for more formatting examples in the [_posts](/_posts/) directory.

3. Commit and push your change to GitHub. Then wait until GitHub Pages updates the blog. This shouldn't take more than a few minutes at most. You may need to do a Shift-Reload in your webpages to get the update pages.

### Formatting

For the meta-data (between the '---' delimiters at the top of the post):
* make sure 'title:' field is in quotes.
* 'permalink:' should include year, month, simplified title in lowercase, separated by dashes "-" (minus signs)
* 'categories:' are optional, they're only used in RSS feed
* 'author:' should be 'HiFi' so posts look like they come from the team, not an individual
* 'published: false' will prevent the draft of your post from being visible until it is finished.

For the posts:
* posts are HTML and will respect any HTML, CSS, or Javascript used.
* use \<a href\> tags to add links to other pages. 

### Embedding Youtube Videos

Use the following HTML and replace the title with the actual title of the video and replace `XXX-YOUTUBE-VIDEO-ID-XXX` with the YouTube video's video id. 
 
```html
<div class="videoWrapper">
<iframe title="YOUTUBE VIDEO TITLE" width="1015" height="761" src="https://www.youtube.com/embed/XXX-YOUTUBE-VIDEO-ID-XXX?feature=oembed"
    frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>
</div>
```

For example, if you are embedding the 2023 Worlds Recap video found at <https://www.youtube.com/watch?v=30ZQIG8Hmxs> the YouTube video id is `30ZQIG8Hmxs`. Everything that comes after the `?v=` (and before any following & characters) in the URL. In this case `30ZQIG8Hmxs` is what you would substitute in place of `XXX-YOUTUBE-VIDEO-ID-XXX` in the html code snippet above.

### Inserting images

* Resize images to be no taller than 1080 pixels. File size should be 250kb or less. Image format should be JPG. (only use PNG for small digital images and logos) [How to Resize Images](https://www3.uwsp.edu/infotech/web/Pages/resizing-images.aspx)
* copy files into the directory '/assets/images/2023/' (or the appropriate year)
* name the files something identifiable. Include the event name, month, something that describes the photo in 2 words or less.

Then use the following HTML in your post. Changing the file name and the descriptive text of course.

```html
<p>
<img src="/assets/images/2022/2022_03_squirrel_spirit.jpg" alt="2930 showing team spirit in the stands" class="responsive">
</p>
```

* the `class="responsive"` lets the image expand and contract to fit the screen and work on mobile.
* using `alt=` text makes the site more accessible to those who are visually impaired.

### Advanced Stuff

For more information on how to format posts read <https://jekyllrb.com/docs/posts/>.

Alternatively you can write your blog posts in [markdown](https://www.markdownguide.org/getting-started/) which can be simpler and quicker, but doesn't have as much flexibility and power as HTML if you need to do something like embed a YouTube video.

## Customizing CSS

CSS for the website is in the `_sass/` directory.
## How to Make a Local Deployment

* <https://jekyllrb.com/docs/>
* [Watch Bill Raymond's excellent introductions to Github Pages and Jekyll.](https://www.youtube.com/playlist?list=PLWzwUIYZpnJuT0sH4BN56P5oWTdHJiTNq)

## File Structure

The following are important directories and their function. See <https://jekyllrb.com/docs/structure/> and <https://github.com/jekyll/minima> for more details.

* [_posts](/_posts/) - blog posts in the format `YYYY-MM-DD-post-title.html`  (.html for HTML or .md for markdown)
* [_pages](/_pages/) - web pages, that are not blog posts: "About Us", "Donate", etc.
* [assets](/assets/) - images, icons, other static files.
* [_layout](/_layout/) - webpage templates
* [_includes](/_includes/) - templates for headers, footer, etc

Jekyll templates use the [Liquid](https://shopify.github.io/liquid/) templating language.

## Important Files

* `_config.yml` - configuration file. <https://jekyllrb.com/docs/structure/>
* `Gemfile` - ruby `bundle` configuration, tracks installed gems <https://bundler.io/gemfile.html>

## Updating Gemfile Libraries

To Update the libraries used by Jekyll run the following. This make come up if one of the libraries is out of date or is flagged for a security issue. GitHub will scan the repo and send an email alert if there is a security vulnerability in one of the libraries.

```
bundle update
```

After running bundle update, use git to commit and push the updated `Gemfile.lock`.`

## Wordpress Migration

Instructions on how to migrate from Wordpress to GitHub pages is here <https://guillermo-roman.com/migrating-wordpress-blog-to-github-pages/>

## Archives and Backups

Old posts from the GoDaddy hosted Wordpress site are in the [OldWordpressArchive](OldWordpressArchive) directory. That contains the following files

* `sonicsquirrels.WordPress_Posts.2021-11-21.xml` An XML file containing all the blog posts with metadata. No images.
* `sonicsquirrels_wordpress_customizing_config.dat` The customized CSS for this blog.

The complete backup of the Wordpress data with SQL database, uploaded images, etc is on the team's Dropbox account in the file `Wordpress_Full_backup.com_2021-Nov-21_backup_619a997939afb0.53077090.zip`
