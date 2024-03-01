import * as admin from 'firebase-admin';

const serviceAccountKey = require('../thinkspace-d7f77-firebase-adminsdk-wvoz9-4260183b3c.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
})

export default admin;