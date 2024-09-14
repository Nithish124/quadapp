const{Router}=require('express')
const authcontroler=require('../controllers/authcontroller');
const router=Router();
router.get('/api/tickers',authcontroler.apiget);
module.exports=router;