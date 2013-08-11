#!/usr/bin/env python

# Copyright (c) 2013 Tay Yang Shun 

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.

import sys
import webbrowser
import SimpleHTTPServer
import os
import json
from SocketServer import TCPServer
from threading import Thread

POSTS_DIR_PATH = "./posts/"
POSTS_JSON_FILE_PATH = "./content/posts.json"

file_paths = os.listdir(POSTS_DIR_PATH)
json_output = []

for file_path in file_paths:
    current_file_path = POSTS_DIR_PATH + file_path
    with open(current_file_path) as f:
        post_title = f.readline()
        throw_away = f.readline()   # second line of post is markdown heading syntax
        file_content = f.read()

    post = {
            'timestamp': int(os.path.getctime(current_file_path)),
            'modified': int(os.path.getmtime(current_file_path)),
            'content': file_content.strip(),
            'title': post_title.replace('\n', ''),
            'filename': file_path,
            'post_id': post_title.replace(' ', '-').lower().strip() # TODO: Make sure there are no duplicate ids
            }
    json_output.append(post)

json_output = sorted(json_output, key=lambda post: post['timestamp'], reverse=True)
print json.dumps(json_output, None, indent=4)

posts_json_file = open(POSTS_JSON_FILE_PATH, 'w+')
# print posts_json_file
posts_json_file.write(json.dumps(json_output))
posts_json_file.close()

print '\nJSON output generated at \'./content/posts.json\'.\n'

if sys.argv[1:]:
    PORT = int(sys.argv[1])
else:
    PORT = 9000

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
try:
    httpd = TCPServer(("", PORT), Handler)
    print "Starting HTTP server on port", PORT
    Thread(target=httpd.serve_forever).start()
except IOError:
    print "Port already in use"

print "Launching local instance of Luna"
webbrowser.open('http://localhost:' + str(PORT))
