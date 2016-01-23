import json
print (len('𣍐'));
#Load data
file = open('data.json','r',encoding='utf-8')

content = file.read()

data = json.loads(content)

print(len(data))

#

for item in data:
    print(item)
    raw_input()