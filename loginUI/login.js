//otp input box logic
let otpinput=document.querySelectorAll(".otpinput")
let allowredirect=true;//Flag to prevent focus() calls from re-triggering focus logic

   otpinput[0].focus();
otpinput.forEach((input,index)=>{
    input.addEventListener("focus",()=>{
        if(!allowredirect)return;// // do nothing if focus came from input.focus()
    for(let i=0;i<otpinput.length;i++){
        if(!otpinput[i].value){  // find the first empty OTP input
            otpinput[i].focus();
            break;
        }
    }
    });
//
input.addEventListener("input",()=>{
    input.value=input.value.replace(/[^0-9]/g,"")
    if(input.value&&index<otpinput.length-1){ //cursor moves to next OTP input
      // Prevent focus event loop
        allowredirect=false;
        otpinput[index+1].focus()
        allowredirect=true;
    }
    
});
input.addEventListener("keydown",(event)=>{
      // If Backspace is pressed on empty input,
        // move cursor to previous OTP box
    if(event.key==="Backspace"&&!input.value&&index>0){//cursor moves backward
         allowredirect=false;
        otpinput[index-1].focus()
        allowredirect=true;
    }
});
});

// otp resend timer logic
const resendotp = document.getElementById("resendotp");
const timer = document.getElementById("timer");
let seconds =30;//seconds for Resend button
let intervalid;//it will stop seconds 

function startTimer(){
     
    resendotp.classList.add("disabled");// disable resend btn during countdown
    seconds=30;//reset seconds
    timer.textContent=seconds;
    intervalid=setInterval(() => {
        seconds--;
        timer.textContent=seconds;
        if(seconds===0){
            clearInterval(intervalid);//stops countdown timer
            resendotp.classList.remove("disabled")//makes resend otp btn visible
           
        }
    },1000);
}

resendotp.addEventListener("click",()=>{
    if(resendotp.classList.contains("disabled")) return;// ignore click if resend is disabled
    startTimer(); 
});

//email validation
let email=document.getElementById("email");
let emailhelper=document.getElementById("emailhelper");
let getotpbtn=document.getElementById("getotpbtn");
let emailregex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let logindiv=document.getElementById("login-card");
let otpdiv =document.getElementById("otp-card")
getotpbtn.disabled=true;//disable button when a valid email is entered
email.addEventListener("input",()=>{
if(emailregex.test(email.value)){
    emailhelper.innerHTML="We’ll send a one-time password to this email";
    emailhelper.style.color="#777"
    getotpbtn.disabled=false;//enable button when a valid email is entered

}
else{
    emailhelper.innerHTML="Invalid Email";
    emailhelper.style.color="red";
    getotpbtn.disabled=true;

}

});
//  Validate the entered email
getotpbtn.addEventListener("click",()=>{
    if(emailregex.test(email.value)){
        emailhelper.innerHTML="We’ll send a one-time password to this email"
        emailhelper.style.color="#777";
        getotpbtn.disabled=false;
        logindiv.classList.add("hidden");
        otpdiv.classList.remove("hidden");
        startTimer(); // start OTP countdown timer after clicking get otp

        
    }
    else{
        email.innerHTML="Invalid Email"
        emailhelper.style.color="red";
        getotpbtn.disabled=true;
    
    }
})
