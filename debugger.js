const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const app = express();

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan Enabled...')
}

// Db Debugger 

dbDebugger('Connected to the database');