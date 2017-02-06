import PouchDB from 'pouchdb-browser'
//

const db = new PouchDB('jumpsuit_hsr')

let ready = Promise.resolve(db)

export default {
  save,
  restore
}

function save (ts, state) {
  return ready
    .then((res) => {
      return db.put({
        _id: String(ts),
        state
      })
    })
}

function restore (ts) {
  return ready
    .then(() => db.get(ts))
    .then(doc => {
      cleanDB()
      return doc.state
    })
}

function cleanDB () {
  return db.allDocs()
    .then((res) => {
      if (res.rows.length < 20) return Promise.resolve(db)
      console.info('Compacting...')
      const docs = res.rows.map(d => {
        return {
          id: d.id,
          rev: d.value.rev,
          _deleted: true
        }
      })
      return db.bulkDocs(docs)
    })
    .then((res) => {
      return db.compact()
    })
    .then(() => {
      console.info('Compacted.')
      return db
    })
}