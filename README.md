Luna
====

Luna is a blogging engine that compiles your posts written in [**markdown**](http://daringfireball.net/projects/markdown/syntax) into a static HTML site. Luna is inspired by [**Jekyll**](http://jekyllrb.com/) and [**Empress**](https://github.com/hodgesmr/Empress). Luna is powered by a front-end MVC Javascript framework [**AngularJS**](http://angularjs.org/) and is styled by Zurb's [**Foundation 4**](http://foundation.zurb.com/), a mobile-friendly front-end framework.

Using Luna is a three-step process: Write. Build. Deploy. View the a sample of the blog here: [http://yangshun.github.io/luna/](http://yangshun.github.io/luna/).

**Note:** You will have to install the Python package `dicttoxml` in order to enable RSS for the blog. Simply install it by running:

		pip install dicttoxml

Or:

		easy_install dicttoxml

Writing
--

1. Writing blog posts is easy. Simple add markdown files to the `./posts` directory. Avoid file names containing `#` and special symbols. 

2. By convention, the Python build script extracts the first line of the markdown file as the title of the post. Please write your posts in this fashion:

        My Awesome Blog Post
        ==
        
        This marks the start of me using Luna to blog.

3. Luna is a SPA (Single-Page Application) and the url slug for each post will be the the title in lower case, with words concatenated by hyphens. For example, a post with the title **My Awesome Blog Post** will be identified by `/#/my-awesome-blog-post`.

4. To compile the site for uploading, run:
    
        $ python3 build.py
  
    This command will compile the markdown files in the `./posts` directory into a JSON file called `posts.json` in the `./content` directory.

5. Open this directory in a webserver to view the blog.

6. Write. Build. Deploy. Have fun!

Configuration
--

A number of configuration options are available in `./config.js` and `build.py`. They should be pretty self-explanatory. Have a look at it and change the values where appropriate. More configurations to be added in future releases.

Authors
-- 

- Tay Yang Shun ([https://www.github.com/yangshun](https://www.github.com/yangshun))

License
--
Copyright (c) Luna 2013. Licensed under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
