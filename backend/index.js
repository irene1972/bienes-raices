import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import propiedadRoutes from './routes/propiedadRoutes.js';
import vendedorRoutes from './routes/vendedorRoutes.js';


const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
};

const app=express();

app.use(express.json());

app.use(cors(corsOptions));

dotenv.config();
//console.log(process.env.DB_HOST);

app.use('/api/propiedades',propiedadRoutes);
app.use('/api/vendedores',vendedorRoutes);

const PORT=process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});