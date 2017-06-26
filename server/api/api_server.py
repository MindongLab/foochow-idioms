from flask import Flask
from flask import make_response
import json
from pymongo import MongoClient
from bson import ObjectId

MONGO_CONN = "mongodb://mongo:27017"
API_HOST = "0.0.0.0"
API_PORT = 80
DEBUG_MODE = True

client = MongoClient(MONGO_CONN)
db = client.foochowidioms
cSentence = db['entity_sentence']
cTag = db['entity_tag']
cAudio = db['entity_audio']
cSpeaker = db['entity_speaker']
cSource = db['entity_source']
cGlyph = db['entity_glyph']

app = Flask(__name__)

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

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


@app.route('/')
def hello_world():
    return "OK"

@app.route('/api/tags/')
def list_tags():
    cursor = cTag.find()
    if (cursor.count()==0):
        return make_response('Not Found',404)
    result = []
    for item in cursor:
        result.append(item['field_title'])
    r = make_response(JSONEncoder(ensure_ascii=False).encode(result))
    r.mimetype="application/json"
    r.headers.add('Access-Control-Allow-Origin', '*')
    return r

@app.route('/api/tag/<path:tagname>')
def show_tag(tagname):
    cursor = cTag.find({'field_title':tagname})
    if (cursor.count()==0):
        return make_response('Not Found',404)
    tagId=cursor[0]['_id']
    cursor = cSentence.find({'field_tags':tagId})
    result = []
    for item in cursor:
        result.append(item['field_text'])
    r = make_response(JSONEncoder(ensure_ascii=False).encode(result))
    r.mimetype="application/json"
    r.headers.add('Access-Control-Allow-Origin', '*')
    return r

@app.route('/api/all/')
def show_all():
    cursor = cSentence.find()
    if (cursor.count()==0):
        return make_response('Not Found',404)
    result = []
    for item in cursor:
        result.append(item['field_text'])
    r = make_response(JSONEncoder(ensure_ascii=False).encode(result))
    r.mimetype="application/json"
    r.headers.add('Access-Control-Allow-Origin', '*')
    return r

@app.route('/api/sentence/<path:sentence>')
def get_sentence(sentence):
    cursor = cSentence.find({'field_text':sentence})
    if (cursor.count()==0):
        r= make_response('Not Found',404)
        r.headers.add('Access-Control-Allow-Origin', '*')
        return r
    else:
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
        if (len(tmp)==1):
            r = make_response(JSONEncoder(ensure_ascii=False).encode(tmp[0]))
            r.mimetype="application/json"
            r.headers.add('Access-Control-Allow-Origin', '*')
            return r
        else:
            return JSONEncoder(ensure_ascii=False).encode(tmp)
 
@app.route('/api/glyph/<path:ids>')
def get_glyph(ids):
    cursor = cGlyph.find({'field_ids':ids})
    if (cursor.count()==0):
        r= make_response('Not Found',404)
        r.headers.add('Access-Control-Allow-Origin', '*')
        return r
    else:
        r = make_response(JSONEncoder(ensure_ascii=False).encode(cursor[0]))
        r.mimetype="application/json"
        r.headers.add('Access-Control-Allow-Origin', '*')
        return r

if __name__ == '__main__':
    app.run(debug=DEBUG_MODE, host=API_HOST, port=API_PORT)
