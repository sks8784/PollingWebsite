const express=require('express');
const router=express.Router();
const fetchuser =require('../middleware/fetchuser'); 
const {createPoll,getAllPolls,vote}=require('../controllers/pollController');


router.route('/createPoll').post(fetchuser, createPoll);

router.route('/getAll').get(fetchuser, getAllPolls);

router.route('/voted').post(vote);

module.exports=router;