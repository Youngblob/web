
let header = "./includes/header.html"
if(["/dash","/dash.html","/src/dash.html"].includes(window.location.pathname)){
  header = "./includes/header-dash.html"
}

console.log(header,window.location.pathname)
fetch(header).then(response => {
    return response.text()
  })
  .then(data => {
    // console.log(data)
    document.querySelector("header").innerHTML = data;
});

fetch("./includes/footer.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    try{
      document.querySelector("footer").innerHTML = data;

    }
    catch(e){}
});

/* Alpine JS - State control */

const STATUS = {
  idle:"0",
  loading:"1",
  error:"2"
}
function getData(){
  return {
      student_name:"",
      cert_auth:"",
      program_id:"",
      create_status:STATUS.idle,
      async createCert() {
        console.log("ic.create called")
        this.create_status = STATUS.loading
        let api = "https://solana-deploy.parmu.town/registerCertificate"
        const data = {
          "student-name":this.student_name,
          "certifying-authority":this.cert_auth
        }
        const rawResponse  = await fetch(api,{
          // mode:"no-cors",
          headers:{
            'Accept': 'application/json',
            "Content-Type":"application/json"
          },
          method:"POST",
          body: JSON.stringify(data)
        })
        const result = await rawResponse.text();
        let resultJson = ""
        try{
          resultJson = JSON.parse(result)
          this.program_id = resultJson.result
          this.create_status = STATUS.idle
          if(resultJson.status == 200){
            $('#create-modal form')[0].reset()
            $('#create-modal').removeClass("modal-open")
            $('#show-modal').toggleClass('modal-open')
          }
        }
        catch(e){}

        this.create_status = STATUS.idle

        // this.data
        
      },
      
      copyId() {
        var type = "text/plain";
        var blob = new Blob([this.program_id], { type });
        var data = [new ClipboardItem({ [type]: blob })];
    
        navigator.clipboard.write(data).then(
            function () {
              /* success */
              Snackbar.show({ 
                showAction: true,
                actionTextColor:"#424242",
                actionText:"OK",
                text:"Copied to clipboard.",
                pos:"bottom-center",
                backgroundColor:"#fff",
                textColor:"#000"
               });

            },
            function () {
            /* failure */
            }
        );
      },
      get explorerUrl(){
        return `https://explorer.solana.com/address/${this.program_id}?cluster=devnet`;
      },
      toggleCreateModal(){
        $('#create-modal').toggleClass("modal-open")
      },
      toggleShowModal(){
        $('#show-modal').toggleClass("modal-open")
      },
      toggleVerifyModal(){
        $('#verify-modal').toggleClass("modal-open")
      }

  }
}