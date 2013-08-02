import os
import json

POSTS_DIR_PATH = "./posts/"
POSTS_JSON_FILE_PATH = "./content/posts.json"

file_paths = os.listdir(POSTS_DIR_PATH)
json_output = []

for file_path in file_paths:
    current_file_path = POSTS_DIR_PATH + file_path
    with open(current_file_path) as f:
        post_title = f.readline()
        throw_away = f.readline()
        file_content = f.read()

    post = {
            'timestamp': int(os.path.getctime(current_file_path)),
            'modified': int(os.path.getmtime(current_file_path)),
            'content': file_content.strip(),
            'title': post_title.replace('\n', ''),
            'route': file_path[:-3]
            }
    json_output.append(post)

sorted(json_output, key=lambda post: post['timestamp'])
# print json.dumps(json_output, None, indent=4)

posts_json_file = open(POSTS_JSON_FILE_PATH, 'w+')
# print posts_json_file
posts_json_file.write(json.dumps(json_output))
posts_json_file.close()

print '\n\nJSON output generated at \'./content/posts.json\'.\n'