entity_sentence
{
    field_text
    field_tags
    [
        <reference>
    ]
    
    field_audio 
    [
        <reference>
    ]
    field_annotations  //����ע��
    [
        indices:[]
        text:[]
        explanation:[]
    ]
    field_notes  //��˵
    field_metaphor //������
    field_source
    {
        source:<reference>
        metadata: //Page number, etc.
    }
}
entity_tag
{
    field_title
    field_description
}

entity_audio
{
    _id
    field_filename:
    field_speaker:<reference>
}

entity_speaker
{
    _id
    field_title:
    field_description:
    field_accent:
}

entity_source
{
    field_title
    field_description
}