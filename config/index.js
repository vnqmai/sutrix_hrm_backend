var configValues = require('../config/cfg.json');

module.exports = {
    getDbConnectionString: function() {
        return `mongodb+srv://${configValues.username}:${configValues.password}@testdb01-qmmsa.mongodb.net/sutrix_hrm`;
    }
}