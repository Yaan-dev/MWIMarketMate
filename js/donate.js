/**
 * 打赏页 — 加载排行榜
 */
(function () {
  const API_BASE = "https://mwi-api-proxy.colacolamwi.workers.dev";

  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang") || "zh";

  // 双语
  if (lang === "en") {
    document.getElementById("title").textContent = "❤ Support the Author";
    document.getElementById("subtitle").textContent = "Your support keeps development going!";
    document.getElementById("labelWechat").textContent = "WeChat Pay";
    document.getElementById("rankingTitle").textContent = "🏆 Donor Ranking";
    document.getElementById("loadingText").textContent = "Loading...";
    document.getElementById("backText").textContent = "Back to Home";
    document.title = "Support — MWI Market Mate";
  }

  const container = document.getElementById("rankingContent");

  async function loadDonors() {
    try {
      const resp = await fetch(API_BASE + "/api/donors");
      const data = await resp.json();

      if (!data.donors || data.donors.length === 0) {
        container.innerHTML = `<div class="empty-ranking">${lang === "en" ? "No donors yet. Be the first! 🎉" : "暂无打赏记录，快来成为第一个吧！🎉"}</div>`;
        return;
      }

      const headerName = lang === "en" ? "Name" : "昵称";
      const headerAmount = lang === "en" ? "Amount" : "金额";
      const headerDate = lang === "en" ? "Date" : "日期";
      const headerMsg = lang === "en" ? "Message" : "留言";

      let html = `<table class="ranking-table">
        <thead><tr>
          <th>#</th><th>${headerName}</th><th>${headerAmount}</th><th>${headerDate}</th><th>${headerMsg}</th>
        </tr></thead><tbody>`;

      data.donors.forEach(function (d, i) {
        const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : (i + 1);
        html += `<tr>
          <td>${medal}</td>
          <td>${escapeHtml(d.name)}</td>
          <td class="amount">¥${Number(d.amount).toFixed(2)}</td>
          <td>${escapeHtml(d.date || "")}</td>
          <td>${escapeHtml(d.message || "")}</td>
        </tr>`;
      });

      html += "</tbody></table>";
      container.innerHTML = html;
    } catch (err) {
      container.innerHTML = `<div class="empty-ranking" style="color:#f87171;">${lang === "en" ? "Failed to load ranking" : "排行榜加载失败"}</div>`;
    }
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  loadDonors();
})();
