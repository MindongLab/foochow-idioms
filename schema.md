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
    field_annotations  //单字注解
    [
        indices:[]
        text:[]
        explanation:[]
    ]
    field_notes  //解说
    field_metaphor //比喻义
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