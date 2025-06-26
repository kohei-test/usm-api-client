
const STR_PORT = 'https';
const CREDENTIALS = true;

function getCookie(name) {
  let cookieName = name + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookies = decodedCookie.split(';');
console.log("AllCookies:" + decodedCookie);
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
console.log(cookie);
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

// Write JavaScript here
// curl -c cookie.txt -X POST --header 'Content-Type: applicon/json' -d '{"id": "1", "execute":1, "core":"user", "function":"login","values":[{"username":"admin","password":"Ip69drqukm43U5TR0W03ZQ=="}]}' --insecure https://192.168.23.150:8080/api/gateway/user/login --noproxy '192.168.23.150'

function setIPAddressFetch()
{
    let sv_ipaddress = document.getElementById("sv-ip-address").value;

    let aUserName = document.getElementById("chg-user-text").value;
    let aUserPass = document.getElementById("old-password-text").value;


    const aUrl = STR_PORT + '://'+ sv_ipaddress +'/api/gateway/user/login';
    const data = {
        id: "1", 
        execute:1, 
        core:"user", 
        function:"login",
        values:[
            {
                username: aUserName,
                password: aUserPass
            }
        ]
    };

    console.log("url: "+ aUrl);
    console.log("param: "+ JSON.stringify(data));

fetch(aUrl, {
    credentials: 'include',
    method: 'POST', // メソッドをPOSTに設定
    headers: {
        'Content-Type': 'application/json' // リクエストのContent-Typeを設定
    },
    body: JSON.stringify(data) // リクエストボディをJSON形式で設定
})
.then(response => {
    return response.json();
}) // レスポンスをJSON形式に変換
.then(data => {
    console.log(data);
    // 例: 'username' という名前のクッキーを取得する
let userName = getCookie('loginname');
console.log('loginname: ' + userName);

}) // データをコンソールに出力
.catch(error => console.error('Error:', error)); // エラーハンドリング

}

function login()
{
    var plaintext = 'password';
    var password = '1111111111111111';   //'pwl0EODMCS0Hp81E';
    var iv = '2222222222222222';   //'7dYGweJoZxbDjOOn'; // 16バイトのIVを使用

    var encrypted = encrypt(plaintext, password, iv);
    var decrypted = decrypt(encrypted, password, iv);

    console.log("Original: " + plaintext);
    console.log("Encrypted: " + encrypted);
    console.log("Decrypted: " + decrypted);

    let sv_ipaddress = document.getElementById("sv-ip-address").value;

    let aUserName = document.getElementById("chg-user-text").value;
    let aUserPass = document.getElementById("old-password-text").value;

//    const aUrl = 'https://'+ sv_ipaddress +'/api/gateway/user/login';
    const aUrl = STR_PORT + '://'+ sv_ipaddress +'/api/internal/login';

    const data = {
        username: aUserName,
        password: aUserPass
    };

    console.log("url: "+ aUrl);
    console.log("param: "+ JSON.stringify(data));

    // リクエストオブジェクトを作成
    const xhr = new XMLHttpRequest();

    // リクエストの設定
    xhr.open("POST", aUrl);
    if ( CREDENTIALS ) {
        xhr.withCredentials = true;
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));

    // レスポンス処理
    xhr.onload = function() {
      if (xhr.status === 200) {
        // 成功した場合の処理
        console.log("送信成功"+ xhr.response);
//        const aValHeader = xhr.getResponseHeader("Cookie");
//        console.log(aValHeader);

// 例: 'username' という名前のクッキーを取得する
let userName = getCookie('loginname');
console.log('loginname: ' + userName);
    

        console.log(this.responseText);
        let objData = JSON.parse(this.responseText);
        document.getElementById("jwt-text").value = objData.jwt;

      } else {
        // 失敗した場合の処理
        console.log("送信失敗:", xhr.status);
      }
    };

    // エラー処理
    xhr.onerror = function() {
      console.log("エラー:", xhr.statusText);
    };

}

//curl -b cookie.txt -X GET --header 'Accept: application/json' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJsb3JhLWFwcC1zZXJ2ZXIiLCJleHAiOjE3MTEwOTg3NjMsImlzcyI6ImxvcmEtYXBwLXNlcnZlciIsIm5iZiI6MTcxMTAxMjM2Mywic3ViIjoidXNlciIsInVzZXJuYW1lIjoiYWRtaW4ifQ.Rn0PhgWnmwtM0dd_hBAqK_O1W3lf-jXeCOUWl8b-8bY' --noproxy '192.168.23.150' --insecure https://192.168.23.150:8080/api/urapplications?limit=9999&offset=0&organizationID=1 
//curl -b cookie.txt -X GET --header 'Accept: application/json' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJsb3JhLWFwcC1zZXJ2ZXIiLCJleHAiOjE3MTEwOTg3NjMsImlzcyI6ImxvcmEtYXBwLXNlcnZlciIsIm5iZiI6MTcxMTAxMjM2Mywic3ViIjoidXNlciIsInVzZXJuYW1lIjoiYWRtaW4ifQ.Rn0PhgWnmwtM0dd_hBAqK_O1W3lf-jXeCOUWl8b-8bY' --noproxy '192.168.23.150' --insecure http://192.168.23.150/api/urapplications?limit=9999&offset=0&organizationID=1 

/*
 * 3.2 Find application
 *  Method ：GET
 *  Request Address
 *   https://{gatewayIP}:8080/api/urapplications?limit=9999&offset=0&organizationID=1&search=&order=forward 
 */
function getApps()
{
    let sv_ipaddress = document.getElementById("sv-ip-address").value;

    // console.log("Cookie: "+ Cookies.get('loginname', { domain: 'site-020.zensho.local' }) );
    // console.log("Cookie: "+ Cookies.get('td', { domain: 'site-020.zensho.local' }) );

let userName = getCookie('loginname');
console.log('loginname: ' + userName);

    let aJWT = document.getElementById("jwt-text").value;
    console.log("aJWT: "+ aJWT);

    const aUrl = STR_PORT + '://'+ sv_ipaddress +'/api/urapplications?limit=9999&offset=0&organizationID=1';

    // リクエストオブジェクトを作成
    const xhr = new XMLHttpRequest();

    console.log("url: "+ aUrl);
    // console.log("param: "+ JSON.stringify(data));

    // リクエストの設定
    xhr.open("GET", aUrl);
    if ( CREDENTIALS ) {
        xhr.withCredentials = true;
    }
    xhr.setRequestHeader("Authorization", "Bearer "+ aJWT );
    xhr.send();

    // レスポンス処理
    xhr.onload = function() {
      if (xhr.status === 200) {
        // 成功した場合の処理
        console.log("送信成功");
        console.log(this.responseText);

        const myObj = JSON.parse(this.responseText);
        let text = "<table border='1'><tr><td>ID</td><td>Name</td><td>Service Profile ID</td></tr>"
        for (let x in myObj.result) {
          text += "<tr><td>" + myObj.result[x].id + "</td><td>" + myObj.result[x].name + "</td><td>" + myObj.result[x].serviceProfileID + "</td></tr>";
        }
        text += "</table>"

        document.getElementById("app-data").innerHTML = text;

      } else {
        // 失敗した場合の処理
        console.log("送信失敗:", xhr.status);
      }
    };

    // エラー処理
    xhr.onerror = function() {
      console.log("エラー:", xhr.statusText);
    };

}


function setApps()
{
    let sv_ipaddress = document.getElementById("sv-ip-address").value;

    let aJWT = document.getElementById("jwt-text").value;
    console.log("aJWT: "+ aJWT);

    let aApp = document.getElementById("app-text").value;
    let aDiscription = document.getElementById("app-discription-text").value;
    console.log("aApp: "+ aApp);

    const aUrl = STR_PORT + '://'+ sv_ipaddress +'/api/urapplications';
    const data = {
         name: aApp
        ,description:aDiscription
        ,organizationID:"1"
        ,serviceProfileID:"f6f7d81d-647f-4c7f-8409-3e5218c0c523"
    };

    // リクエストオブジェクトを作成
    const xhr = new XMLHttpRequest();

    console.log("url: "+ aUrl);
    console.log("param: "+ JSON.stringify(data));

    // リクエストの設定
    xhr.open("POST", aUrl);
    if ( CREDENTIALS ) {
        xhr.withCredentials = true;
    }
    xhr.setRequestHeader("Authorization", "Bearer "+ aJWT );
//    xhr.send();
    xhr.send(JSON.stringify(data));

    // レスポンス処理
    xhr.onload = function() {
      if (xhr.status === 200) {
        // 成功した場合の処理
        console.log("送信成功");
        console.log(this.responseText);
      } else {
        // 失敗した場合の処理
        console.log("送信失敗:", xhr.status);
      }
    };

    // エラー処理
    xhr.onerror = function() {
      console.log("エラー:", xhr.statusText);
    };

}


/*
 * 3.2 Find application
 *  Method ：GET
 *  Request Address
 *   https://{gatewayIP}:8080/api/urapplications?limit=9999&offset=0&organizationID=1&search=&order=forward 
 */
function getMQTT()
{
    let sv_ipaddress = document.getElementById("sv-ip-address").value;

    // console.log("Cookie: "+ Cookies.get('loginname', { domain: 'site-020.zensho.local' }) );
    // console.log("Cookie: "+ Cookies.get('td', { domain: 'site-020.zensho.local' }) );

let userName = getCookie('loginname');
console.log('loginname: ' + userName);

    let aJWT = document.getElementById("jwt-text").value;
    console.log("aJWT: "+ aJWT);

    let aAppId = document.getElementById("mqtt-app-id").value;

    const aUrl = STR_PORT + '://'+ sv_ipaddress +'/api/urapplications/'+aAppId+'/integrations/mqtt';

    // リクエストオブジェクトを作成
    const xhr = new XMLHttpRequest();

    console.log("url: "+ aUrl);
    // console.log("param: "+ JSON.stringify(data));

    // リクエストの設定
    xhr.open("GET", aUrl);
    if ( CREDENTIALS ) {
        xhr.withCredentials = true;
    }
    xhr.setRequestHeader("Authorization", "Bearer "+ aJWT );
    xhr.send();

    // レスポンス処理
    xhr.onload = function() {
      if (xhr.status === 200) {
        // 成功した場合の処理
        console.log("送信成功");
        console.log(this.responseText);

        const myObj = JSON.parse(this.responseText);
        let text = "<table border='1'><tr><td>ID</td><td>Host</td><td>Client ID</td></tr>"
        text += "<tr><td>" + myObj.id + "</td><td>" + myObj.host + "</td><td>" + myObj.clientID + "</td></tr>";
        text += "</table>"

        document.getElementById("mqtt-data").innerHTML = text;

      } else {
        // 失敗した場合の処理
        console.log("送信失敗:", xhr.status);
      }
    };

    // エラー処理
    xhr.onerror = function() {
      console.log("エラー:", xhr.statusText);
    };

}

function setMQTT()
{
    let sv_ipaddress = document.getElementById("sv-ip-address").value;

    let aJWT = document.getElementById("jwt-text").value;
    console.log("aJWT: "+ aJWT);

    let aAppId = document.getElementById("mqtt-app-id").value;
    let aClientId = document.getElementById("mqtt-client-id").value;
    console.log("aAppId: "+ aAppId);

    const aUrl = STR_PORT + '://'+ sv_ipaddress +'/api/urapplications/'+aAppId+'/integrations/mqtt';
    const data = {
          host: "a8n38m4jk1sb1-ats.iot.ap-northeast-1.amazonaws.com"
        , port: 8883
        , useAuth: false
        , username: ""
        , password: ""
        , connectTimeout: 30
        , keepAliveInterval: 60
        , clientID: aClientId
        , useTLS: true
        , TLSMode: 1
        , CACert: "-----BEGIN CERTIFICATE"
        , CAName: "AmazonRootCA1.pem"
        , TLSCert: "-----BEGIN CERTIFICATE"        
        , certName: "c4f6e6184319b7b67ed55ace8e4ab11c47ccc1bf4e764142b328b190ab5d572d-certificate.pem.crt"
        , TLSKey: "-----BEGIN RSA PRIVATE KEY"
        , keyName: "c4f6e6184319b7b67ed55ace8e4ab11c47ccc1bf4e764142b328b190ab5d572d-private.pem.key"
        , uplinkTopic: ""
        , upQoS: 0
        , joinTopic: ""
        , joinQoS: 0
        , ackTopic: ""
        , ackQoS: 0
        , errorTopic: ""
        , errorQoS: 0
        , downlinkTopic: ""
        , downlinkQoS: 0
        , connectStatus: true
        , mcDownlinkTopic: ""
        , mcDownlinkQoS: 0
        , requestTopic: ""
        , requestQoS: 0
        , responseTopic: ""
        , responseQoS: 0
    };

    // リクエストオブジェクトを作成
    const xhr = new XMLHttpRequest();

    console.log("url: "+ aUrl);
    console.log("param: "+ JSON.stringify(data));

    // リクエストの設定
    xhr.open("POST", aUrl);
    if ( CREDENTIALS ) {
        xhr.withCredentials = true;
    }
    xhr.setRequestHeader("Authorization", "Bearer "+ aJWT );
//    xhr.send();
    xhr.send(JSON.stringify(data));

    // レスポンス処理
    xhr.onload = function() {
      if (xhr.status === 200) {
        // 成功した場合の処理
        console.log("送信成功");
        console.log(this.responseText);
      } else {
        // 失敗した場合の処理
        console.log("送信失敗:", xhr.status);
      }
    };

    // エラー処理
    xhr.onerror = function() {
      console.log("エラー:", xhr.statusText);
    };

}

/*
 * curl -b cookie.txt -X POST --header 'Accept: application/json' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJsb3JhLWFwcC1zZXJ2ZXIiLCJleHAiOjE3MTExMDcyMDEsImlzcyI6ImxvcmEtYXBwLXNlcnZlciIsIm5iZiI6MTcxMTAyMDgwMSwic3ViIjoidXNlciIsInVzZXJuYW1lIjoiYWRtaW4ifQ.eK6ByjdEHWGGJdShnjFhkjIpsuL8MuXsQA3ueRHBx34' -d'{"id":1,"execute":1,"core":"yruo_wan","function":"get","values":[{"base":"yruo_wan"}]}' --noproxy '192.168.23.150'  --insecure https://192.168.23.150/cgi
 *
 * [OUTPUT]
 *  {"id":1,"model":"UG65","pn":"000003100000TW0010450100","oem":"8640","rtver":"60.0.8640.42.2-r4","status":0,"result":[{"get":[{"type":"yruo_wan","index":"TFa9EdC3","value":{"enable_wan":1,"port":"eth 0","protocol":0,"mtu":1500,"enable_nat":1,"pri_dns":"8.8.8.8","sec_dns":"114.114.114.114","static":{"ip_address":"192.168.23.150","netmask":"255.255.255.0","gateway":"192.168.23.1","multi_ip":[]},"dhcp":{"mtu":1500},"pppoe":{"mtu":1500}}}],"grey":0}]}
 */


/*
 * 4.2 Get the configuration of the network port
 *  Method ：POST
 *  Request Address
 *   https://{gatewayIP}/cgi
 */
function getNetwork()
{
    let sv_ipaddress = document.getElementById("sv-ip-address").value;

let userName = getCookie('loginname');
console.log('loginname: ' + userName);

    let aJWT = document.getElementById("jwt-text").value;
    console.log("token: "+ aJWT)
    let aLogin = document.getElementById("chg-user-text").value;
    console.log("loginname: "+ aLogin)
    let aTd = document.getElementById("td-text").value;
    console.log("td: "+ aTd)

    let aAuthText = 'token:'+aJWT+';'+'loginname:'+aLogin+';'+'td:'+aTd+';'

    const aUrl = STR_PORT + '://'+ sv_ipaddress +'/cgi';
    // const aUrl = 'https://'+ sv_ipaddress +'/cg1';
    //{"id":1,"execute":1,"core":"yruo_wan","function":"get","values":[{"base":"yruo_wan"}]}
    const data = {
        id: 9, 
        execute:1, 
        core:"yruo_wan", 
        function:"get",
        values:[
            {
                base:"yruo_wan"
            }
        ]
    };

    console.log("url: "+ aUrl);
    console.log("method: POST");
    console.log("param: "+ JSON.stringify(data));
    console.log("Content-Type: application/json");
    console.log("Authorization: Bearer "+ aJWT);

    // リクエストオブジェクトを作成
    const xhr = new XMLHttpRequest();

    // リクエストの設定
    xhr.open("POST", aUrl);
    if ( CREDENTIALS ) {
        xhr.withCredentials = true;
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer "+ aJWT );
//    xhr.setRequestHeader("Cookie", aAuthText );
    // xhr.setRequestHeader("Set-Cookie",'token:'+aJWT);
    // xhr.setRequestHeader("Set-Cookie",'loginname:'+aLogin);
    // xhr.setRequestHeader("Set-Cookie",'td:'+aTd);

    xhr.send(JSON.stringify(data));

    // レスポンス処理
    xhr.onload = function() {
      if (xhr.status === 200) {
        // 成功した場合の処理
        console.log("送信成功");
        console.log(this.responseText);

        const myObj = JSON.parse(this.responseText);
        let text = this.responseText;

        document.getElementById("network-data").innerHTML = text;

      } else {
        // 失敗した場合の処理
        console.log("送信失敗:", xhr.status);
      }
    };

    // エラー処理
    xhr.onerror = function() {
      console.log("エラー:", xhr.statusText);
    };

}

/*
 * <input id="button6" type="button" value="GW取得" onclick="getWgInfo()">
 * <div id="gw-info-data">nodata</div>
 */
/*
 * 4.2 Get the configuration of the network port
 *  Method ：POST
 *  Request Address
 *   https://{gatewayIP}/cgi
 */
function getWgInfo()
{
    let sv_ipaddress = document.getElementById("sv-ip-address").value;

let userName = getCookie('loginname');
console.log('loginname: ' + userName);

    let aJWT = document.getElementById("jwt-text").value;
    console.log("token: "+ aJWT)
    let aLogin = document.getElementById("chg-user-text").value;
    console.log("loginname: "+ aLogin)
    let aTd = document.getElementById("td-text").value;
    console.log("td: "+ aTd)

    let aAuthText = 'token:'+aJWT+';'+'loginname:'+aLogin+';'+'td:'+aTd+';'

//https://{gatewayIP}:8080/api/packet-forwarder/network-servers
    const aUrl = STR_PORT + '://'+ sv_ipaddress +'/api/packet-forwarder/network-servers';

    // リクエストオブジェクトを作成
    const xhr = new XMLHttpRequest();

    console.log("url: "+ aUrl);
//    console.log("param: "+ JSON.stringify(data));

    // リクエストの設定
    xhr.open("GET", aUrl);
    if ( CREDENTIALS ) {
        xhr.withCredentials = true;
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer "+ aJWT );
    xhr.send();

    // レスポンス処理
    xhr.onload = function() {
      if (xhr.status === 200) {
        // 成功した場合の処理
        console.log("送信成功");
        console.log(this.responseText);

        const myObj = JSON.parse(this.responseText);
        let text = this.responseText;

        document.getElementById("gw-info-data").innerHTML = text;

      } else {
        // 失敗した場合の処理
        console.log("送信失敗:", xhr.status);
      }
    };

    // エラー処理
    xhr.onerror = function() {
      console.log("エラー:", xhr.statusText);
    };

}


/*
 * 4.2 Get the configuration of the network port
 *  Method ：POST
 *  Request Address
 *   https://{gatewayIP}/cgi
 */
function getWgInfo2()
{
    let sv_ipaddress = document.getElementById("sv-ip-address").value;

let userName = getCookie('loginname');
console.log('loginname: ' + userName);

    let aJWT = document.getElementById("jwt-text").value;
    console.log("token: "+ aJWT)
    let aLogin = document.getElementById("chg-user-text").value;
    console.log("loginname: "+ aLogin)
    let aTd = document.getElementById("td-text").value;
    console.log("td: "+ aTd)

    let aAuthText = 'token:'+aJWT+';'+'loginname:'+aLogin+';'+'td:'+aTd+';'

//https://{gatewayIP}:8080/api/packet-forwarder/network-servers
    const aUrl = STR_PORT + '://'+ sv_ipaddress +'/api/gateways?limit=10&offset=0&organizationID=1';

    // リクエストオブジェクトを作成
    const xhr = new XMLHttpRequest();

    console.log("url: "+ aUrl);
//    console.log("param: "+ JSON.stringify(data));

    // リクエストの設定
    xhr.open("GET", aUrl);
    if ( CREDENTIALS ) {
        xhr.withCredentials = true;
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer "+ aJWT );
    xhr.send();

    // レスポンス処理
    xhr.onload = function() {
      if (xhr.status === 200) {
        // 成功した場合の処理
        console.log("送信成功");
        console.log(this.responseText);

        const myObj = JSON.parse(this.responseText);
        let text = this.responseText;

        document.getElementById("gw-info-data2").innerHTML = text;

      } else {
        // 失敗した場合の処理
        console.log("送信失敗:", xhr.status);
      }
    };

    // エラー処理
    xhr.onerror = function() {
      console.log("エラー:", xhr.statusText);
    };

}


/*
 * 2.1 Device Query
 * Method ：GET
 * Request Address
 * https://{gatewayIP}:8080/api/urdevices?search=&limit=&offset=&applicationID=
 */
function getDeviceInfo()
{
    let sv_ipaddress = document.getElementById("sv-ip-address").value;

    let userName = getCookie('loginname');
    console.log('loginname: ' + userName);

    let aJWT = document.getElementById("jwt-text").value;
    console.log("token: "+ aJWT)
    let aLogin = document.getElementById("chg-user-text").value;
    console.log("loginname: "+ aLogin)
    let aTd = document.getElementById("td-text").value;
    console.log("td: "+ aTd)

    let aAuthText = 'token:'+aJWT+';'+'loginname:'+aLogin+';'+'td:'+aTd+';'

//https://{gatewayIP}:8080/api/packet-forwarder/network-servers
//    const aUrl = 'https://'+ sv_ipaddress +'/api/urdevices?limit=&offset=&applicationID=0';
    const aUrl = STR_PORT + '://'+ sv_ipaddress +'/api/urdevices?limit=10&offset=0&organizationID=1&applicationID=0';

    // リクエストオブジェクトを作成
    const xhr = new XMLHttpRequest();

    console.log("url: "+ aUrl);
//    console.log("param: "+ JSON.stringify(data));

    // リクエストの設定
    xhr.open("GET", aUrl);
    if ( CREDENTIALS ) {
        xhr.withCredentials = true;
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer "+ aJWT );
    xhr.send();

    // レスポンス処理
    xhr.onload = function() {
      if (xhr.status === 200) {
        // 成功した場合の処理
        console.log("送信成功");
        console.log(this.responseText);

        const myObj = JSON.parse(this.responseText);
        let text = this.responseText;

        document.getElementById("device-info-data").innerHTML = text;

      } else {
        // 失敗した場合の処理
        console.log("送信失敗:", xhr.status);
      }
    };

    // エラー処理
    xhr.onerror = function() {
      console.log("エラー:", xhr.statusText);
    };

}

/*
 * 2.1 Device Query
 * Method ：GET
 * Request Address
 * https://{gatewayIP}:8080/api/payloadcodecs/?type=&search=&limit=&offset=
 */
function getPayloadCodecs()
{
    let sv_ipaddress = document.getElementById("sv-ip-address").value;

    let aJWT = document.getElementById("jwt-text").value;
    console.log("token: "+ aJWT)

    // const aUrl = 'https://'+ sv_ipaddress +'/api/payloadcodecs?limit=10&offset=0&type=custom';
    const aUrl = STR_PORT + '://'+ sv_ipaddress +'/api/payloadcodecs?limit=30&offset=0&type=';

    // リクエストオブジェクトを作成
    const xhr = new XMLHttpRequest();

    console.log("url: "+ aUrl);
//    console.log("param: "+ JSON.stringify(data));

    // リクエストの設定
    xhr.open("GET", aUrl);
    if ( CREDENTIALS ) {
        xhr.withCredentials = true;
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer "+ aJWT );
    xhr.send();

    // レスポンス処理
    xhr.onload = function() {
      if (xhr.status === 200) {
        // 成功した場合の処理
        console.log("送信成功");
        console.log(this.responseText);

        const myObj = JSON.parse(this.responseText);
        let text = this.responseText;

        document.getElementById("payloadcodecs-data").innerHTML = text;

      } else {
        // 失敗した場合の処理
        console.log("送信失敗:", xhr.status);
      }
    };

    // エラー処理
    xhr.onerror = function() {
      console.log("エラー:", xhr.statusText);
    };

}


/*
 * curl -b cookie.txt -X POST --header 'Accept: application/json' 
 * --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJsb3JhLWFwcC1zZXJ2ZXIiLCJleHAiOjE2OTU4ODU4OTYsImlzcyI6ImxvcmEtYXBwLXNlcnZlciIsIm5iZiI6MTY5NTc5OTQ5Niwic3ViIjoidXNlciIsInVzZXJuYW1lIjoiYWRtaW4ifQ.wYXV9uex-txdzQviqBq3Z0F_VLPz464bg24jYcCq7Dc'
 * -d '{"id":1,"execute":1,"core":"yruo_usermanagement","function":"set","values":[{"base":"security","index":"cfg00000","value":{"username":"admin","old_password":"password","new_password":"password1","confirm_password":"password1"}}]}'
 * --insecure
 * https://192.168.40.147:8080/api/gateway/user/update
 *
 curl -b cookie.txt -X POST --header 'Accept: application/json' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJsb3JhLWFwcC1zZXJ2ZXIiLCJleHAiOjE3MTExMDcyMDEsImlzcyI6ImxvcmEtYXBwLXNlcnZlciIsIm5iZiI6MTcxMTAyMDgwMSwic3ViIjoidXNlciIsInVzZXJuYW1lIjoiYWRtaW4ifQ.eK6ByjdEHWGGJdShnjFhkjIpsuL8MuXsQA3ueRHBx34' -d'{"id":1,"execute":1,"core":"yruo_usermanagement","function":"set","values":[{"base":"security","index":"cfg00000","value":{"username":"admin","old_password":"Ip69drqukm43U5TR0W03ZQ==","new_password":"g4AoN+7YVRChnMLqIVQPOQ==","confirm_password":"g4AoN+7YVRChnMLqIVQPOQ=="}}]}' --noproxy '192.168.23.150'  --insecure https://192.168.23.150/api/gateway/user/update
 */

/*
 * 1.2 Change username and password of administrator
 * Method ：POST
 * Request Address
 *   https://{gatewayIP}:8080/api/gateway/user/update 
 */
function chgPassword()
{
    let sv_ipaddress = document.getElementById("sv-ip-address").value;

let userName = getCookie('loginname');
console.log('loginname: ' + userName);

    let aJWT = document.getElementById("jwt-text").value;
    console.log("aJWT: "+ aJWT)
    let aChgUser = document.getElementById("chg-user-text").value;
    let aOldPass = document.getElementById("old-password-text").value;
    let aNewPass = document.getElementById("new-password-text").value;

   // const aUrl = 'https://'+ sv_ipaddress +'/api/gateway/user/update';
   const aUrl = STR_PORT + '://'+ sv_ipaddress +'/api/users/'+aChgUser+'/password';
   // const data = {
   //     id: 1, 
   //     execute:1, 
   //     core:"yruo_usermanagement", 
   //     function:"set",
   //     values:[
   //         {
   //             base:"security",
   //             index:"cfg00000",
   //             value:
   //             {
   //                 username: aChgUser,
   //                 old_password: aOldPass,
   //                 new_password: aNewPass,
   //                 confirm_password: aNewPass
   //             }
   //         }
   //     ]
   // };
    const data = {
        id:1,
        execute:1,
        core:"yruo_usermanagement",
        function:"add",
        values:[
            {
                base:"api_user_list",
                value:{
                    permission:"2",
                    username:aChgUser,
                    password:aNewPass
                },
                index:"cfgdefault0"
            }
        ]
    };

    console.log("url: "+ aUrl);
    console.log("param: "+ JSON.stringify(data));
  
    // リクエストオブジェクトを作成
    const xhr = new XMLHttpRequest();

    // リクエストの設定
    xhr.open("PUT", aUrl);
    if ( CREDENTIALS ) {
        xhr.withCredentials = true;
    }
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer "+ aJWT );
    xhr.send(JSON.stringify(data));

    // レスポンス処理
    xhr.onload = function() {
      if (xhr.status === 200) {
        // 成功した場合の処理
        console.log("送信成功");
        console.log(this.responseText);

        const myObj = JSON.parse(this.responseText);
        let text = this.responseText;

        document.getElementById("chgpass-data").innerHTML = text;

      } else {
        // 失敗した場合の処理
        console.log("送信失敗:", xhr.status);
      }
    };

    // エラー処理
    xhr.onerror = function() {
      console.log("エラー:", xhr.statusText);
    };

}

function encrypt(data, password, iv) {
    var key = CryptoJS.enc.Utf8.parse(password);
    var iv = CryptoJS.enc.Utf8.parse(iv);
    var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

function decrypt(data, password, iv) {
    var key = CryptoJS.enc.Utf8.parse(password);
    var iv = CryptoJS.enc.Utf8.parse(iv);
    var decrypted = CryptoJS.AES.decrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
