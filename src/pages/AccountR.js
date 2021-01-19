import React, { useEffect, useState } from 'react';
import {Card,Icon,Image, Button} from 'semantic-ui-react';
import './Pages.css';
import firebase from "firebase/app";
import "firebase/firestore";
import emailjs from 'emailjs-com'

import * as FaIcons from 'react-icons/fa';

function Reports() {
  const [hide, setHide] = useState(false)
  const [listings,setListings] = useState([])
const [searchText,setSearchText] = useState('')



  async function loadData() {
    console.log("ok")
    const postRef = await firebase.firestore().collection("user").where('isDriver','==',true).get()
    setListings(postRef.docs.map((doc)=>({id: doc.id, data: doc.data()})))
    let data =[]
    
    if(searchText!==null || searchText!==""){
    postRef.forEach(doc => {
          if(String(doc.data().name).toLowerCase().startsWith(String(searchText).toLowerCase())){
            data.push({id: doc.id, data: doc.data()})
          }
        })
    setListings(data)
    return
  }
  }
  function approveProfile(id){
    const isApprove = true 
    firebase.firestore().collection('user').doc(id).update({isApproved:true})
    setHide(true)
     
  }
  function removeProfle(id){
    firebase.firestore().collection('user').doc(id).delete()
  }
  function suspendAccount(card){
    firebase.firestore().collection('user').doc(card.id).update({isApproved:false})
    // const nodemailer = require('nodemailer');
    let email = card.data.email
       console.log("idr agya")
    
    console.log("idr agya1")

    emailjs.sendForm('gmail', 'template_093u0rq','email' , 'user_C579S1mZssNEba4JSNj6V')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      console.log("idr agya")


//     console.log(email)



// //step 1
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth:{
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     }
// });

// //step 2
// const mailOptions={
//     from:' journeypartnerr@gmail.com', //comapny's email address
//     to:email, //driver's email address from database
//     subject:'Pay the pending bill',
//     text:'Hi! Leader your pending bill exceeds 1000 PKR you are suspended from the app kindly pay your pending balance'
// }

// //step 3
// transporter.sendMail(mailOptions, function(err, data){
//     if(err)
//         console.log('Err', err);
//     else
//         console.log('Message Sent!');
// })

  }
  function handleChange(e) {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('user').onSnapshot(snapshot => {
        if (snapshot.size) {
          loadData();
        }
      })
  return () => {
      unsubscribe()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebase,searchText])


  

  //CardInfo Variable with Array of Objects
  const renderCard =(card,index) =>{
    console.log(card.data.image, "hello")
    console.log(card.data.name)

    return (
      <div style={{marginLeft:30,padding: 20, borderRadius: 20, borderColor: "#fca311"}}>
      <Card className="cardUI">
    <Image className="img1" src={card.data.image} />
    <Card.Content>
      <Card.Header className="title1">{card.data.name}</Card.Header>
      <Card.Meta>
        <span className='email'>{card.data.email}</span>
      </Card.Meta>
      <Card.Description className="CardDesc">
        {card.data.contact}
      </Card.Description>
      <Card.Description className="CardDesc">
        {card.data.LicenseNo}
      </Card.Description>
      <Card.Description className="CardDesc">
        {card.data.VehicleNo}
      </Card.Description>
      
      <div className='ui two buttons row'>
      
          <Button basic color='green' className="GB" onClick = {()=>removeProfle(card.id)}>
            Delete
          </Button>
          {!card.data.isApproved && <Button basic color='green' className="GB1" onClick = {()=>approveProfile(card.id)}>
            Approve
          </Button>  } 
          {card.data.isApproved && <Button basic color='green' className="GB1" onClick = {()=>suspendAccount(card)}>
            Suspend
          </Button>  } 
          
          </div>
    </Card.Content>
  </Card>
  </div>

    )
  }
  return (
    <React.Fragment>
    <input className="search1" onChange={handleChange} ></input>
    <label className="SB" htmlFor="Search">Search by Name:</label>
    <div className="reports" >
      
      
      {listings.map(renderCard)}
      </div>
    </React.Fragment>
  );
}
const styles = {
  container: {
    flex: 1,
    flexGrow: 1,
    position: "absolute",
    left: 300,
    backgroundColor: "#065143",

  }
}

export default Reports;
