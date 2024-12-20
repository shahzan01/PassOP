import  express from 'express';
import  mongoose from 'mongoose';
import  dotenv from 'dotenv';
import  cors from 'cors';

import passwordRoutes from './routes/passwordRoutes.js';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/passwords', passwordRoutes);

const PORT = process.env.PORT || 5000;



async function  main() {
  try{
   await mongoose.connect(process.env.MONGO_URI)
  console.log('MongoDB connected')

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  }
  catch{((err) => console.error(err))

  }



}


main()

