//otp input box logic
let otpinput=document.querySelectorAll(".otpinput")
let allowredirect=true;
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

input.addEventListener("input",()=>{
    input.value=input.value.replace(/[^0-9]/g,"")
    if(input.value&&index<otpinput.length-1){ //cursor moves to next OTP input
        allowredirect=false;
        otpinput[index+1].focus()
        allowredirect=true;
    }
    
});
input.addEventListener("keydown",(event)=>{
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
let seconds =30;
let intervalid;

function startTimer(){
     
    resendotp.classList.add("disabled");
    seconds=30;
    timer.textContent=seconds;
    intervalid=setInterval(() => {
        seconds--;
        timer.textContent=seconds;
        if(seconds===0){
            clearInterval(intervalid);
            resendotp.classList.remove("disabled")
           
        }
    },1000);
}

resendotp.addEventListener("click",()=>{
    if(resendotp.classList.contains("disabled")) return;
    startTimer();
});

//email validation
let email=document.getElementById("email");
let emailhelper=document.getElementById("emailhelper");
let getotpbtn=document.getElementById("getotpbtn");
let emailregex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let logindiv=document.getElementById("login-card");
let otpdiv =document.getElementById("otp-card")
getotpbtn.disabled=true;
email.addEventListener("blur",()=>{
if(emailregex.test(email.value)){
    emailhelper.innerHTML="We’ll send a one-time password to this email";
    emailhelper.style.color="#777"
    getotpbtn.disabled=false;

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
        email.innerHTML="We’ll send a one-time password to this email"
        emailhelper.style.color="#777";
        getotpbtn.disabled=false;
        logindiv.classList.add("hidden");
        otpdiv.classList.remove("hidden");
        startTimer(); //  // Start the OTP countdown timer only when OTP card is displayed

        
    }
    else{
        email.innerHTML="Invalid Email"
        emailhelper.style.color="red";
        getotpbtn.disabled=true;
    
    }
})
