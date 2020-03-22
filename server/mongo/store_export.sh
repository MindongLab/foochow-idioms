#!/usr/bin/env bash

echo "=========== Restore foochow-idioms ============"
get_sentences_count() {
    local count=$(mongo foochowidioms --quiet --eval "db.entity_sentence.count()")
    echo $count
}

COUNT=$(get_sentences_count)
echo "Current sentence count: $COUNT"

if [ $COUNT -eq 0 ];
then
    echo "No data found, need to import"
    pushd /import && \
    mongorestore -h localhost && \
    popd
    echo "done"
    COUNT2=$(get_sentences_count)
    echo "Current sentence count: $COUNT2"
fi
