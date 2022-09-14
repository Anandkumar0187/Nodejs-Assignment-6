const router = require('express').Router();
const bodyparser = require('body-parser');
const Blog = require('../models/Blog');

// Your routing code goes here
router.use(bodyparser.json());
router.get('/',(req,res)=>{
    res.json({status : "OK"});
})
router.get('/blog', async (req,res)=>{
    const data = await Blog.find();
    res.json({
        status : "OK",
        data
    });
})
router.get('/blog',async(req,res)=>{
    try{
        // let {page = 1, search = ""} = req.query;
        const data = await Blog.find({topic : req.query.search});
        res.json({
            status : "success",
            data}).limit(5).skip((Number(req.query.page)-1) * 5);
    }
    catch(err){
        res.status(500).json({
            status:"failed",
            message : err.message
        })
    }
})
router.post('/blog',async(req,res)=>{
    try{
        const data = await Blog.create(req.body);
        res.json({
            status: "success",
            data});
    }
    catch(err){
        res.status(500).json({
            status:"failed",
            message : err.message
        })
    }
})
router.put('/blog/:id',async(req,res)=>{
    try{
        const data = await Blog.updateOne({"_id":req.params.id},req.body);
        res.json({
            status: "success",
            data});
    }
    catch(err){
        res.status(500).json({
            status:"failed",
            message : err.message
        })
    }
})
router.delete('/blog/:id',async(req,res)=>{
    try{
        const data = await Blog.deleteOne({"_id":req.params.id});
        res.json({
            status: "success",
            data});
    }
    catch(err){
        res.status(500).json({
            status:"failed",
            message : err.message
        })
    }    
})

module.exports = router;