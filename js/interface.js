$(document).ready(function() {
    const encrypt_btn = $(".encrypt_btn");
    const decrypt_btn = $(".decrypt_btn");
    const copy_btn = $(".copy_btn");
    const clear_btn = $(".clear_btn");
    const encrypt_text = $("#source_message");
    const decrypt_text = $("#result_message");
    //global vars KEYS
    const Nkey_text = $("#Nkey_textarea");
    const skey_text = $("#skey_textarea");
    const ekey_text = $("#ekey_textarea");
    const keygen_btn = $(".keygen_btn");
    //initializing key and text vars
    let Nkey = "";
    let skey = "";
    let ekey = "";
    let encrypted = "";
    let decrypted = "";
    /*event handling*/
    //encryption
    encrypt_btn.on("click", function(){
        let msg = encrypt_text.val();
        if(msg.trim().length===0 || Nkey_text.val().trim().length===0
         || skey_text.val().trim().length===0 || ekey_text.val().trim().length===0){
            alert("Source message textbox is unoprppriate or keys haven't been generated");
        }
        else{
            console.log(`${msg}, ${skey}, ${Nkey}`);
            encrypted = encrypt(msg, skey, Nkey);
            decrypt_text.val(encrypted);
        }
    });
    //copy to clipboard
    copy_btn.on("click", function(){
        decrypt_text.select();
        document.execCommand("copy");
    });
    // clear all boxes
    clear_btn.on("click", function(){
        encrypt_text.val("");
        decrypt_text.val("");
        Nkey_text.val("");
        skey_text.val("");
        ekey_text.val("");
    });
    //key generation
    keygen_btn.on("click", function(){
        let {N, s, e} = keyGen();
        //equaling to global variables
        Nkey = N;
        skey = s;
        ekey = e;
        //fulling key textareas
        Nkey_text.val(N);
        skey_text.val(s);
        ekey_text.val(e);
    });
    //decryption
    decrypt_btn.on("click", function(){
        let x = encrypt_text.val();
        if(x.trim().length===0 || Nkey_text.val().trim().length===0
         || skey_text.val().trim().length===0 || ekey_text.val().trim().length===0){
             alert("Source message textbox is unoprppriate or keys haven't been generated");
        }
        else{
            decrypted = decrypt(x, ekey, Nkey);
            decrypt_text.val(decrypted);
        }        
    });
  });