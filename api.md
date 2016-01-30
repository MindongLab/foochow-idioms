#API Specifications

##/api/tag/<tagname>: 拥有<tagname>标签的所有句子
###Response format:
JSON array
```
[<string>, <string>, ...]
```
##/api/all/: 所有句子
###Response format:
JSON array
```
[<string>, <string>, ...]
```
##/api/sentence/<sentence>: 熟语（句子）
###Response format:
```
{
    "_id": ObjectId,
    "field_text": 句子原文,
    "field_notes": 解释（案）,
    "field_metaphor": 比喻义,
    "field_annotations": 单字注释
    [
        {
        "text":被注释的原文,
        "explanation": 注释内容,
        "indices": [<int>, <int>, ...] 需要高亮的字（下标）
        },
        ...
    ],
    "field_source": 来源
    {
        "source": 来源ID,
        "metadata": 其他信息
    }, 
    "field_audio": 音频文件名
}
```
