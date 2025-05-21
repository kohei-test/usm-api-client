async function login() {
  const ip = document.getElementById("ip").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const url = `https://${ip}/api/internal/login`;
  const data = {
    username: username,
    password: password
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    document.getElementById("output").textContent = JSON.stringify(result, null, 2);

    // ✅ ログイン成功後にデバイス一覧を取得
    if (result.jwt) {
      try {
        const deviceResponse = await fetch(`https://${ip}/api/urdevices?limit=10&offset=0&organizationID=1&applicationID=0`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${result.jwt}`,
            "Content-Type": "application/json"
          }
        });

        if (!deviceResponse.ok) {
          throw new Error(`HTTPエラー: ${deviceResponse.status}`);
        }

        const deviceData = await deviceResponse.json();
        document.getElementById("output").textContent += "\n\n" + JSON.stringify(deviceData, null, 2);
      } catch (err) {
        document.getElementById("output").textContent += `\n\nデバイス取得エラー: ${err.message}`;
      }
    }

  } catch (error) {
    document.getElementById("output").textContent = "ログインエラー: " + error.message;
  }
}
