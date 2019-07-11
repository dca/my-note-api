const SOURCE_PATH = process.env.NODE_ENV === 'production' ? 'dist' : 'src'
const config = require('config')

module.exports = {
  type: config.get('database.type'),
  host: config.get('database.host'),
  port: config.get('database.port'),
  username: config.get('database.username'),
  password: config.get('database.password'),
  database: config.get('database.database'),
  dropSchema: config.get('database.dropSchema'),
  synchronize: config.get('database.synchronize'),

  logging: 'all',
  logger: 'debug',
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
  // entities: ["src/**/**.entity{.ts,.js}"],
  entities: [`${SOURCE_PATH}/**/**.entity{.ts,.js}`],
  subscribers: [`${SOURCE_PATH}/**/**.subscriber{.ts,.js}`],

  // cache: false
}
