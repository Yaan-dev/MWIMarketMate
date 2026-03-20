/**
 * 功能建议页 — 提交逻辑
 */
(function () {
  const API_BASE = "https://mwi-api-proxy.colacolamwi.workers.dev";

  // 从 URL 读取参数
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang") || "zh";
  const version = params.get("v") || "";

  // 简单双语
  if (lang === "en") {
    document.getElementById("title").textContent = "💡 Feature Suggestions";
    document.getElementById("subtitle").textContent = "Share your ideas to help improve the plugin";
    document.getElementById("labelText").textContent = "Your Suggestion *";
    document.getElementById("text").placeholder = "Describe the feature or improvement you'd like...";
    document.getElementById("charHint").textContent = "Max 2000 characters";
    document.getElementById("labelNick").textContent = "Nickname (optional)";
    document.getElementById("nickname").placeholder = "Your in-game name or alias";
    document.getElementById("submitBtn").textContent = "Submit Suggestion";
    document.title = "Suggestions — MWI Market Mate";
  }

  const form = document.getElementById("feedbackForm");
  const msgEl = document.getElementById("msg");
  const submitBtn = document.getElementById("submitBtn");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    msgEl.className = "msg";
    msgEl.style.display = "none";

    const text = document.getElementById("text").value.trim();
    const nickname = document.getElementById("nickname").value.trim();

    if (!text) return;

    submitBtn.disabled = true;
    submitBtn.textContent = lang === "en" ? "Submitting..." : "提交中...";

    try {
      const resp = await fetch(API_BASE + "/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, nickname, version, lang }),
      });

      const data = await resp.json();

      if (data.ok) {
        msgEl.className = "msg success";
        msgEl.textContent = lang === "en"
          ? "✅ Thank you! Your suggestion has been submitted."
          : "✅ 感谢！你的建议已提交。";
        form.reset();
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err) {
      msgEl.className = "msg error";
      msgEl.textContent = lang === "en"
        ? "❌ Submission failed: " + err.message
        : "❌ 提交失败：" + err.message;
    } finally {
      msgEl.style.display = "block";
      submitBtn.disabled = false;
      submitBtn.textContent = lang === "en" ? "Submit Suggestion" : "提交建议";
    }
  });
})();
