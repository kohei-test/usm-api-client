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
  } catch (error) {
    document.getElementById("output").textContent = "エラー: " + error;
  }
}
