let db = db.getSiblingDB('spotify')
db.createUser({
    user: 'dbuser',
    pwd: 'dbpass',
    roles: [{ role: 'readWrite', db: 'spotify' }]
})
