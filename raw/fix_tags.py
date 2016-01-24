from pymongo import MongoClient
from bson import ObjectId
import json

client = MongoClient()
db = client.foochowidioms
cSentence = db['entity_sentence']
cTag = db['entity_tag']
cAudio = db['entity_audio']
cSpeaker = db['entity_speaker']
cSource = db['entity_source']

    
    
def queryTag(id):  
    cursor = cTag.find({"_id":id})
    if (cursor.count()):
        return cursor[0]['field_title']
    else:
        return None;


cursor = cSentence.find({'field_tags':[ObjectId("56a456b4ef3c8213c800cbe8"),  ObjectId("56a456b2ef3c8213c800c941")]})
print(cursor.count())

result = cSentence.update_many(
    {'field_tags':[ObjectId("56a456b4ef3c8213c800cbe8"),  ObjectId("56a456b2ef3c8213c800c941")]},
    {
        "$set":{"field_tags":[ObjectId("56a456b4ef3c8213c800cbe8")]}
    }
)

print(result.matched_count)