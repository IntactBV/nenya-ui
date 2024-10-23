const os = require('os');
module.exports = {
    apps: [{
        port        : 3080,
        name        : "nenya-ui",
        script      : "yarn dev",
        watch       : false,
        instances   : 1,
        exec_mode   : 'fork',
        env: {
            NODE_ENV: "local",
            NEXT_PUBLIC_API_BASE_URL: 'http://localhost:3030',
            NEXT_PUBLIC_FIREBASE_CONFIG: '{"apiKey":"AIzaSyDoWomlQ12W_rljOFRFC0VmS3FhCHpXKnc","authDomain":"auth-dev-1eb74.firebaseapp.com","projectId":"auth-dev-1eb74","storageBucket":"auth-dev-1eb74.appspot.com","messagingSenderId":"39107459609","appId":"1:39107459609:web:6ca36f352c59c5f7668888"}'

        }
    }]
}