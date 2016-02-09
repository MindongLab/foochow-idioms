import json
from pymongo import MongoClient
from bson import ObjectId
import urllib.parse
#Initialize MongoDB connection
client = MongoClient()
db = client.foochowidioms
cSentence = db['entity_sentence']
cTag = db['entity_tag']
cAudio = db['entity_audio']
cSpeaker = db['entity_speaker']
cSource = db['entity_source']
cGlyph = db['entity_glyph']

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

#file exporter
BASE_FOLDER = "api/"
def export_file(url, content):
    file = open(BASE_FOLDER + urllib.parse.quote(url)+'.json', "w", encoding='utf-8')
    file.write(content)
    file.close()



def queryAudio(id):
    cursor = cAudio.find({"_id":id})
    if (cursor.count()):
        return cursor[0]['field_filename']
    else:
        return ""

    
def queryTag(id):  
    cursor = cTag.find({"_id":id})
    if (cursor.count()):
        return cursor[0]['field_title']
    else:
        return None;
		
def querySource(id):
    cursor = cSource.find({"_id":id})
    if (cursor.count()):
        return cursor[0]
    else:
        return ""




def export_tag(tagname):
    cursor = cTag.find({'field_title':tagname})
    tagId=cursor[0]['_id']
    cursor = cSentence.find({'field_tags':tagId})
    result = []
    for item in cursor:
        result.append({'field_text':item['field_text'], '_id':item['_id']})
    s=JSONEncoder(ensure_ascii=False).encode(result)
    return s;



def export_all():
    cursor = cSentence.find()
    result = []
    for item in cursor:
        result.append({'field_text':item['field_text'], '_id':item['_id']})
    return result
 

def export_sentence(sentence):
    cursor = cSentence.find({'field_text':sentence})
    
    tmp=[]
    for item in cursor:
        if ('field_tags' in item):
            col = []
            for t in item['field_tags']:
                col.append(queryTag(t))
            item['field_tags']=col
        #Embed field_audio
        if ('field_audio' in item):
            item['field_audio']=queryAudio(item['field_audio'])
        #Embed source in field_source.source
        if (('field_source' in item) and ('source' in item['field_source'])):
            item['field_source']['source']=querySource(item['field_source']['source'])
        tmp.append(item)
    #Assuming there is only one match
    s = JSONEncoder(ensure_ascii=False).encode(tmp[0])
    return s

 
def export_glyph(ids):
    cursor = cGlyph.find({'field_ids':ids})
    if (cursor.count()==1):
        s = JSONEncoder(ensure_ascii=False).encode(cursor[0])
        return s

 
#export index
export_file('all',JSONEncoder(ensure_ascii=False).encode(export_all()))
#export sentences
for text in export_all():
    print('s_'+str(text['_id']))
    export_file('s_'+str(text['_id']), export_sentence(text['field_text']))

#export tags
cursor = cTag.find()
tmp = []
for item in cursor:
    tmp.append(item['field_title'])
s=JSONEncoder(ensure_ascii=False).encode(tmp)
export_file('all_tags', s)

for item in tmp:
    export_file('tag_'+item, export_tag(item))

#export glyph
cursor = cGlyph.find()
tmp = []
for item in cursor:
    export_file('glyph_'+item['field_ids'],export_glyph(item['field_ids']))


    
