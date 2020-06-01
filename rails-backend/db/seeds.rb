# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Sentence.__elasticsearch__.create_index!(force: true)

# Sentence.create!(text: 'this is a test sentence', language: 'eng', tatoebaId: 0)
# Sentence.create!(text: 'これは例文です', language: 'eng', tatoebaId: 0)

#<Sentence:0x00007f8d0d83fbc0>2020-05-31 17:29:42 -0700: PUT http://localhost:9200/sentences/_doc/1 [status:201, request:0.202s, query:n/a]
# 2020-05-31 17:29:42 -0700: > {"text":"Lorsqu'il a demandé qui avait cassé la fenêtre, tous les garçons ont pris un air innocent."}
# 2020-05-31 17:29:42 -0700: < {"_index":"sentences","_type":"_doc","_id":"1","_version":1,"result":"created","_shards":{"total":2,"successful":1,"failed":0},"_seq_no":0,"_primary_term":3}

# x = Sentence.first

# print x

# Sentence.first.__elasticsearch__.index_document


Sentence.__elasticsearch__.import