#API Specifications

##/api/tag/<tagname>: ӵ��<tagname>��ǩ�����о���
###Response format:
JSON array
```
[<string>, <string>, ...]
```
##/api/all/: ���о���
###Response format:
JSON array
```
[<string>, <string>, ...]
```
##/api/sentence/<sentence>: ������ӣ�
###Response format:
```
{
    "_id": ObjectId,
    "field_text": ����ԭ��,
    "field_notes": ���ͣ�����,
    "field_metaphor": ������,
    "field_annotations": ����ע��
    [
        {
        "text":��ע�͵�ԭ��,
        "explanation": ע������,
        "indices": [<int>, <int>, ...] ��Ҫ�������֣��±꣩
        },
        ...
    ],
    "field_source": ��Դ
    {
        "source": ��ԴID,
        "metadata": ������Ϣ
    }, 
    "field_audio": ��Ƶ�ļ���
}
```
