import { PORT } from './common/config';
import dbConnection from './db';

import app from './app';

dbConnection
  .then(() => {
    console.log('connect succefully');
    app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
  })
  .catch(err => console.error(err));
