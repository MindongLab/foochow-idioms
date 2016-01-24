from pymongo import MongoClient
import json

client = MongoClient()
db = client.foochowidioms
cSentence = db['entity_sentence']
cTag = db['entity_tag']
cAudio = db['entity_audio']
cSpeaker = db['entity_speaker']
cSource = db['entity_source']


def loadData():
    global data
    global annotations
    file = open('data/data.json','r',encoding='utf-8')
    content = file.read()
    data = json.loads(content)

    file = open('data/annotations.json','r',encoding='utf-8')
    content = file.read()
    annotations = json.loads(content)
    assert(len(data)==len(annotations))

def addSpeaker(title='Wong'):
    cursor = cSpeaker.find({"field_title":title})
    if (cursor.count()):
        return cursor[0]['_id']
    else:
        result = cSpeaker.insert_one(
        {
            'field_title':title,
            'field_description':'N/A',
            'field_accent':'福州市区'
        })
        return result.inserted_id

def addAudio(fileuuid):
    result = cAudio.insert_one(
    {
        'field_filename': (fileuuid+'.wma'),
        'field_speaker': addSpeaker()
    })
    return result.inserted_id
    
def addTag(tag):  #add or return existing tag
    cursor = cTag.find({"field_title":tag})
    if (cursor.count()):
        return cursor[0]['_id']
    else:
        result = cTag.insert_one(
        {
            'field_title':tag,
            'field_description':'N/A'
        })
        return result.inserted_id

def addSource(title='福州方言俗语歌谣'):
    cursor = cSource.find({"field_title":title})
    if (cursor.count()):
        return cursor[0]['_id']
    else:
        result = cSource.insert_one(
        {
            'field_title':title,
            'field_description':'陈泽平'
        })
        return result.inserted_id
        
def processOne(id):
    stnc = data[id]
    anno = annotations[id]['annotation']
    tmp = {}
    if ('content' in stnc):
        tmp['field_text'] = stnc['content']
    if ('explanation' in stnc):
        tmp['field_notes'] = stnc['explanation']
    if ('metaphor' in stnc):
        tmp['field_metaphor'] = stnc['metaphor']
    tmp['field_tags']=[]
    if ('tag' in stnc):
        tags = stnc['tag'].split(',')
        for t in tags:
            tmp['field_tags'].append(addTag(t))
        if (len(tags)==1):
            tmp['field_tags'].append(addTag('谚语'))
    if ('audio' in stnc):
        tmp['field_audio'] = addAudio(stnc['audio'])
    
    #单字注解
    tmp['field_annotations']=[]
    for item in anno:
        newLine = {}        
        str = '' #original text to be constructed from indices
        lastIndex = None
        discontinued = False
        for ind in item['indices']:
            if (lastIndex!=None and lastIndex+1!=ind): #discontinued
                str = str+'……'
                discontinued = True
            str = str+stnc['content'][ind]
            lastIndex=ind
        if discontinued:
            str = str + '……'
        newLine['text'] = str
        newLine['explanation'] = item['text']
        newLine['indices'] = item['indices']
        tmp['field_annotations'].append(newLine)
    
    tmp['field_source']={}
    tmp['field_source']['source']=addSource()
    if ('page' in stnc):
        tmp['field_source']['metadata']=json.dumps({'page':stnc['page']})
    cSentence.insert_one(tmp)

if __name__ == '__main__':
    loadData()
    for i in range(len(data)):
        processOne(i)
        print(i)