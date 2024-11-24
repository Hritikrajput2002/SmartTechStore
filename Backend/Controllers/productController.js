const Product=require('../Modals/product')

//addproduct
exports.addProducts=async(req,res)=>{
       req.body.user=req.user
      const product = await  Product.create(req.body)
      return res.status(201).json({
        success:true,
        product
      })

}

//get product detail
exports.getProductDetail=async(req,res)=>{

        let product=await Product.findById(req.params.id)
        if(!product){
                res.status(400).json({
                        success:"false",
                        desc:"product cant be reached at the moment"
                })       
        }
        return res.status(200).json({
                success:"true",
                product
        })
}        

//get all product
exports.getAllProducts=async(req,res)=>{

        let query={}

      //searching bt name or category
        if(req.query.name) query.name={  $regex:req.query.name, $options:'i' }
        if(req.query.category)query.category={  $regex:req.query.category,$options:'i' }
     
        //searching by price range
        if(req.query.pricegt ||req.query.pricelt) query.price={  $gte:req.query.pricegt,  $lte:req.query.pricelt}

        // for rating
        if(req.query.rating ) query.rating={  $gte:req.query.rating}

        

        let product=await Product.find(query)

        //pagination
         const itemperPage=4
         const totalproduct=product.length
        if(req.query.page){
                
                const ll=(req.query.page-1)*itemperPage
                const ul=ll+itemperPage
                product=product.slice(ll,ul)
        }

        return res.status(200).json({totalresults:totalproduct,resultperpage:itemperPage,products:product})
}



//update product
exports.updateProducts=async(req,res)=>{

        let product=await Product.findById(req.params.id)
        if(!product){
                res.status(400).json({
                        success:"false",
                        desc:"product cant be reached at the moment"
                })       
        }

        req.body.user=req.user
        product=await Product.findByIdAndUpdate(req.params.id,req.body,{
                new: true,    // Return the updated
                runValidators: true 
            })
        return  res.status(200).json({
                success:"true",
                product
        })
}

//delete product
exports.deleteProducts=async(req,res)=>{

        let product=await Product.findById(req.params.id)
        if(!product){
                res.status(400).json("product cant be reached at the moment")       
        }


        await product.deleteOne();
        return res.status(200).json({
                success:"true",
                desc:"product removed"
        })
}



//add review
exports.addReview=async(req,res)=>{
        const {name,rating,comment}=req.body

        let product=await Product.findById(req.params.id)
        if(!product){
                return res.status(400).json("product cant be reached at the moment")       
        }

        const isReviewed=await product.review.find(rev=> rev.user.toString()===req.user.toString())
        if(isReviewed){
                product.review.forEach(rev => {
                       if(rev.user.toString()===req.user.toString()) {
                        rev.name=name,
                        rev.comment=comment
                        rev.rating=rating
                       }
                });    
        }else{
                product.review.push({
                        user:req.user,
                        name:name,
                        rating:rating,
                        comment:comment
                })
        }

        product.totalreview=product.review.length
        let avg=0;
        product.review.forEach(rev => {
                avg+=rev.rating
        });
        product.rating=avg/product.review.length
        await product.save()


        return res.status(200).json({
                success:"true",
                desc:"product reviewed"
        })
}


//show review
exports.showReview=async(req,res)=>{
        const product=await Product.findById(req.query.id)

        if(!product){
                return res.status(401).json({ error:"product not found "})      
        }
        return res.status(201).json(product.review)      
        
}



//delete review
exports.deleteReview=async(req,res)=>{
        const product=await Product.findById(req.query.productid)
        if(!product){
                return res.status(401).json({ error:"product not found "})      
        }

        let review=product.review.filter(rev => {return  rev._id.toString()!== req.query.reviewid.toString() });
        product.review=review
  
        product.totalreview=product.review.length
        let avg=0;
        product.review.forEach(rev => {
                avg+=rev.rating
        });
        product.rating=avg/product.review.length
        await product.save()


        return res.status(200).json({
                success:"true",
                desc:"product deleted",
                product,
        })

}







