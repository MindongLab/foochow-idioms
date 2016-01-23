import json
#Load data
file = open('data/data.json','r',encoding='utf-8')
content = file.read()
data = json.loads(content)

file = open('data/annotations.json','r',encoding='utf-8')
content = file.read()
annotations = json.loads(content)
print(len(data),len(annotations)

#

for item in data:
    print(item)
    raw_input()