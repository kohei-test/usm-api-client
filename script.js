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
      credentials: "include", // ← クッキー送信のために追加
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`ログインAPIエラー: HTTP ${response.status}`);
    }

    const result = await response.json();
    document.getElementById("output").textContent = JSON.stringify(result, null, 2);

    // クッキーで認証される前提で、JWTが不要な場合はこちらを使用
    const deviceResponse = await fetch(`https://${ip}/api/urdevices?limit=10&offset=0&organizationID=1&applicationID=0`, {
      method: "GET",
      credentials: "include", // ← こちらにも必要
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!deviceResponse.ok) {
      throw new Error(`デバイス取得エラー: HTTP ${deviceResponse.status}`);
    }

    const deviceData = await deviceResponse.json();
    document.getElementById("output").textContent += `\n\n` + JSON.stringify(deviceData, null, 2);

  } catch (error) {
    document.getElementById("output").textContent = "ログインエラー: " + error.message;
  }
}
