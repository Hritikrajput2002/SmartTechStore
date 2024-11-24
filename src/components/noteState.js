import noteContext from "./noteContext";
import React ,{useState} from 'react'


const NoteState = (props) => {
      
     //alert box 
      const[alert,setalert]=useState(null);
      const[allproducts,setproducts]=useState([])           //all
      const[result,setresult]=useState({})               //single product



      const [isLoading,setloading]=useState('')
      const callalert=(type,msg)=>{
          setalert({type:type,
                  msg:msg
                  
          })

          setTimeout(() => {
            setalert(null)
          },1500);
      }


    //show products
    const showProducts=async(keyword="",currentpage="",price=[1000,200000],category="",rating=0)=>{
        setloading(true)      
        try {
             let link=`http://localhost:5000/api/v1/product/getall?name=${keyword}&page=${currentpage}&pricegt=${price[0]}&pricelt=${price[1]}&category=${category}&rating=${rating}`

             const response = await fetch(link, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
              
            });
        
        const data = await response.json();
        if (!response.ok)      return callalert("Error", data.error || "Something went wrong"); 
        setproducts(data.products)
        setresult({totalresult:data.totalresults,pagesize:data.resultperpage})
        setloading(false)
        } catch (err) {
              callalert("Error", "Server error, please try again later");
              
        }

    } 

  

    //show product detail
    const showproductdetail=async(id)=>{
        setloading(true) 
        try {
             
             const response = await fetch(`http://localhost:5000/api/v1/product/getProductDetail/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
              
            });
        
        const data = await response.json();
        if (!response.ok)      return callalert("Error", data.error || "Something went wrong"); 
        setloading(false)
        return data.product
        } catch (err) {
              callalert("Error", "Server error, please try again later");
              
        }

    } 
    


      // API call for register
      const userSignup=async(node)=>{

          try {
              const response = await fetch('http://localhost:5000/api/v1/user/create', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      name: node.name,
                      email: node.email,
                      password: node.password,
                      avatar:node.avatar


                  })
              });

              const token = await response.json();
              if (!response.ok)      return callalert("Error", token.error || "Something went wrong");
              callalert("Success", "Registration successful");
              callalert("Success", "Login successful");
              return true;
              
          } catch (err) {
                callalert("Error", "Server error, please try again later");
                return false
          }

      } 


      //api call for login
  
      const userLogin=async(node)=>{
        try {
              const response = await fetch('http://localhost:5000/api/v1/user/login', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  credentials: 'include', 
                  body: JSON.stringify({
                      email: node.email,
                      password: node.password
                  }),
                  
              });
      
            const token = await response.json();  
            if (!response.ok)     return props.callalert("Error", token.error || "Something went wrong");
            callalert("Success", "Login successful");
              return true
          } catch (error) {
              callalert("Error", "Wrong credential, please try again later");
              return false;
          }
      }

      //api call for islogined
  
      const isLogined=async()=>{
        try {
              const response = await fetch('http://localhost:5000/api/v1/user/islogined', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  credentials: 'include', 
              });
      
            const data = await response.json();  
            if (!response.ok)     return props.callalert("Error", data.error || "Something went wrong");
            return data.success;
          } catch (error) {
              callalert("Error", "Wrong credential, please try again later");
          }
      }

       //api call for user details
  
       const userdetails=async()=>{
        try {
              const response = await fetch('http://localhost:5000/api/v1/user/userdetails', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  credentials: 'include', 
              });
      
            const data = await response.json();  
            if (!response.ok)     return props.callalert("Error", data.error || "Something went wrong");
            return data;
          } catch (error) {
              callalert("Error", "Wrong credential, please try again later");
          }
      }



       // api call for logout
       const userLogout=async()=>{
        try {
              const response = await fetch(' http://localhost:5000/api/v1/user/logout', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  credentials: 'include', 
              });
      
            const data = await response.json();  
            if (!response.ok)     return props.callalert("Error", data.error || "Something went wrong");
              callalert("Success", "Logout successful");
              return true
          } catch (error) {
              callalert("Error", "please try again later");
              return false;
          }
      }


       // api call for password update
       const updatePassword=async(node)=>{
        try {
              const response = await fetch(' http://localhost:5000/api/v1/user/updatepassword', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    oldpassword: node.oldpassword,
                    newpassword: node.newpassword,
                    confirmpassword: node.confirmpassword,
                }),
                  credentials: 'include', 
              });
            console.log(node);
            const data = await response.json();  
            if (!response.ok)     return props.callalert("Error", data.error || "Something went wrong");
              callalert("Success", "Password updated");
              console.log(data)
              return true
          } catch (error) {
              callalert("Error", "wrong password ,please try again later");
              return false;
          }
      }


       // api call for profile update
       const updateProfile=async(node)=>{
        try {
              const response = await fetch(' http://localhost:5000/api/v1/user/updateprofile', {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    ...(node.email ? { email: node.email } : {}),
                    ...(node.name ? { name: node.name } : {}),
                    ...(node.avatar.url ? { avatar: node.avatar } : {})
                }),
                  credentials: 'include', 
              });
            console.log(node);
            const data = await response.json();  
            if (!response.ok)     return props.callalert("Error", data.error || "Something went wrong");
              callalert("Success", "Profile updated");
              return true
          } catch (error) {
              callalert("Error", "please try again later");
              return false;
          }
      }



      
      //api call for forgot password
  
      const forgotPassword=async(email)=>{
        try {
              const response = await fetch('http://localhost:5000/api/v1/user/forgotpassword', {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  credentials: 'include', 
                  body: JSON.stringify({
                      email: email,
                  }),
                  
              });
      
            const token = await response.json();  
            if (!response.ok)     return props.callalert("Error", token.error || "Something went wrong");
            callalert("Success", "Email sent successful");
              return true
          } catch (error) {
              callalert("Error", "Wrong credential, please try again later");
              return false;
          }
      }


         //api call for reset password
  
         const resetPassword=async(node)=>{
            try {
                console.log(node.token);
                const encodedToken = encodeURIComponent(node.token);
                console.log(encodedToken);
                  const response = await fetch(`http://localhost:5000/api/v1/user/resetpassword/${encodedToken}`, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      credentials: 'include', 
                      body: JSON.stringify({
                        password: node.password,
                        confirmpassword:node.confirmpassword,
                      }),
                      
                  });
          
                const token = await response.json();  
                if (!response.ok)     return props.callalert("Error", token.error || "Something went wrong");
                callalert("Success", "Password change successfully");
                  return true
              } catch (error) {
                  callalert("Error", "Wrong credential, please try again later");
                  return false;
              }
          }


          //api call for add review
  
         const addReview=async(node)=>{
            try {
                  const response = await fetch(`http://localhost:5000/api/v1/Product/addreview/${node.id}`, {
                      method: 'PUT',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      credentials: 'include', 
                      body: JSON.stringify({
                        name: node.name,
                        rating:node.rating,
                        comment:node.comment
                      }),
                      
                  });
          
                const token = await response.json();  
                if (!response.ok)     return props.callalert("Error", token.error || "Something went wrong");
                callalert("Success", "Reviewed successfully");
                console.log(token)
                  return true
              } catch (error) {
                  callalert("Error", "Wrong input, please try again later");
                  return false;
              }
          }



          //add to cart
          const addCart=async(quantity,id)=>{
            try {
                const response = await fetch(`http://localhost:5000/api/v1/user/addtocart/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include', 
                    body: JSON.stringify({
                      quantity: quantity,
                    }),
                    
                });
        
              const data = await response.json();  
              if (!response.ok)     return props.callalert("Error", data.error || "Something went wrong");
              callalert("Success", "Added to cart successfully");
                return true
            } catch (error) {
                callalert("Error", "Wrong input, please try again later");
                return false;
            }
        }

     //show cart
        const showCart=async()=>{
                    try {
                        const response = await fetch(`http://localhost:5000/api/v1/user/showcart`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            credentials: 'include', 
                            
                        });
                
                      const data = await response.json();  
                      if (!response.ok)     return props.callalert("Error", data.error || "Something went wrong");
                      callalert("Success", "cart opened successfully");
                        return data
                    } catch (error) {
                        callalert("Error", "Wrong input, please try again later");
                        return false;
                    }
                }


       //   edit cart
        const editCart=async(quantity,id)=>{
            try {
                const response = await fetch(`http://localhost:5000/api/v1/user/editcart/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include', 
                    body: JSON.stringify({
                      quantity: quantity,
                    }),
                    
                });
        
              const data = await response.json();  
              if (!response.ok)     return props.callalert("Error", data.error || "Something went wrong");
              callalert("Success", "cart edited successfully");
                return true
            } catch (error) {
                callalert("Error", "Wrong input, please try again later");
                return false;
            }
        }


  return (
    <noteContext.Provider value={{showProducts,userSignup,userLogin,showproductdetail,alert,allproducts,isLoading,result,isLogined,userLogout,userdetails,updateProfile,updatePassword,forgotPassword,resetPassword,addReview,addCart,showCart,editCart,callalert}}>
            {props.children}
    </noteContext.Provider>
  )
}

export default NoteState








