/**
 * 社区中心 — 建议列表 + 打赏排行 + 提交建议
 */
(function () {
  const API_BASE = "https://api-mate.colacola.cloud";

  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang") || "zh";

  // ── 双语 ──
  if (lang === "en") {
    document.getElementById("title-feedback").textContent = "\ud83d\udcac Community Feedback";
    document.getElementById("subtitle-feedback").textContent = "Share your ideas to help improve the plugin";
    document.getElementById("labelText").textContent = "Your Suggestion *";
    document.getElementById("text").placeholder = "Describe the feature or improvement you'd like...";
    document.getElementById("charHint").textContent = "Max 2000 characters";
    document.getElementById("labelNick").textContent = "Nickname (optional)";
    document.getElementById("nickname").placeholder = "Your in-game name or alias";
    document.getElementById("submitBtn").textContent = "Submit Suggestion";
    document.getElementById("recentTitle").textContent = "\ud83d\udccb Recent Feedback";
    document.getElementById("loadingFeedback").textContent = "Loading...";
    document.getElementById("title-donate").textContent = "\u2764 Support the Author";
    document.getElementById("subtitle-donate").textContent = "Your support keeps development going!";
    document.getElementById("labelWechat").textContent = "WeChat Pay";
    document.getElementById("rankingTitle").textContent = "\ud83c\udfc6 Donor Ranking";
    document.getElementById("loadingDonors").textContent = "Loading...";
    document.getElementById("backText").textContent = "Back to Home";
    document.title = "Community \u2014 MWI Market Mate";
  }

  const version = params.get("v") || "";

  // ══════════════════════════════════════
  //  提交建议
  // ══════════════════════════════════════
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
    submitBtn.textContent = lang === "en" ? "Submitting..." : "\u63d0\u4ea4\u4e2d...";

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
          ? "\u2705 Thank you! Your suggestion has been submitted."
          : "\u2705 \u611f\u8c22\uff01\u4f60\u7684\u5efa\u8bae\u5df2\u63d0\u4ea4\u3002";
        form.reset();
        loadFeedback(); // 刷新列表
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err) {
      msgEl.className = "msg error";
      msgEl.textContent = (lang === "en" ? "\u274c Submission failed: " : "\u274c \u63d0\u4ea4\u5931\u8d25\uff1a") + err.message;
    } finally {
      msgEl.style.display = "block";
      submitBtn.disabled = false;
      submitBtn.textContent = lang === "en" ? "Submit Suggestion" : "\u63d0\u4ea4\u5efa\u8bae";
    }
  });

  // ══════════════════════════════════════
  //  加载建议列表
  // ══════════════════════════════════════
  const feedbackContainer = document.getElementById("feedbackList");

  async function loadFeedback() {
    try {
      const resp = await fetch(API_BASE + "/api/feedback");
      const data = await resp.json();

      if (!data.feedback || data.feedback.length === 0) {
        feedbackContainer.innerHTML = '<div class="empty-ranking">'
          + (lang === "en" ? "No feedback yet. Be the first!" : "\u8fd8\u6ca1\u6709\u53cd\u9988\uff0c\u6765\u63d0\u4e2a\u5efa\u8bae\u5427\uff01")
          + "</div>";
        return;
      }

      let html = "";
      data.feedback.forEach(function (f) {
        const name = escapeHtml(f.nickname || (lang === "en" ? "Anonymous" : "\u533f\u540d"));
        const time = f.created_at ? f.created_at.slice(0, 10) : "";

        html += '<div class="fb-card">';
        html += '<div class="fb-header">';
        html += '<span class="fb-name">' + name + "</span>";
        html += '<span class="fb-time">' + time + "</span>";
        html += "</div>";
        html += '<div class="fb-body">' + escapeHtml(f.text) + "</div>";

        if (f.reply) {
          html += '<div class="fb-reply">';
          html += '<span class="fb-reply-label">' + (lang === "en" ? "\ud83d\udc68\u200d\ud83d\udcbb Dev:" : "\ud83d\udc68\u200d\ud83d\udcbb \u4f5c\u8005\u56de\u590d\uff1a") + "</span> ";
          html += escapeHtml(f.reply);
          html += "</div>";
        }

        html += "</div>";
      });

      feedbackContainer.innerHTML = html;
    } catch (err) {
      feedbackContainer.innerHTML = '<div class="empty-ranking" style="color:#f87171;">'
        + (lang === "en" ? "Failed to load feedback" : "\u52a0\u8f7d\u53cd\u9988\u5931\u8d25") + "</div>";
    }
  }

  // ══════════════════════════════════════
  //  加载打赏排行
  // ══════════════════════════════════════
  const rankingContainer = document.getElementById("rankingContent");

  async function loadDonors() {
    try {
      const resp = await fetch(API_BASE + "/api/donors");
      const data = await resp.json();

      if (!data.donors || data.donors.length === 0) {
        rankingContainer.innerHTML = '<div class="empty-ranking">'
          + (lang === "en" ? "No donors yet. Be the first! \ud83c\udf89" : "\u6682\u65e0\u6253\u8d4f\u8bb0\u5f55\uff0c\u5feb\u6765\u6210\u4e3a\u7b2c\u4e00\u4e2a\u5427\uff01\ud83c\udf89")
          + "</div>";
        return;
      }

      var headerRank = lang === "en" ? "#" : "\u6392\u540d";
      var headerName = lang === "en" ? "Name" : "\u6635\u79f0";
      var headerAmount = lang === "en" ? "Amount" : "\u91d1\u989d";
      var headerMsg = lang === "en" ? "Message" : "\u7559\u8a00";

      let html = '<table class="ranking-table"><thead><tr>';
      html += "<th>" + headerRank + "</th><th>" + headerName + "</th><th>" + headerAmount + "</th><th>" + headerMsg + "</th>";
      html += "</tr></thead><tbody>";

      data.donors.forEach(function (d, i) {
        var medal = i === 0 ? "\ud83e\udd47" : i === 1 ? "\ud83e\udd48" : i === 2 ? "\ud83e\udd49" : (i + 1);

        // 名字特效
        var nameHtml;
        if (d.css) {
          nameHtml = '<span class="donor-name-effect" style="' + escapeAttr(d.css) + '">' + escapeHtml(d.name) + "</span>";
        } else {
          nameHtml = escapeHtml(d.name);
        }

        // 留言：图片URL自动渲染为图片
        var msgHtml;
        var msg = (d.message || "").trim();
        if (/^https?:\/\/.+\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(msg)) {
          msgHtml = '<img src="' + escapeAttr(msg) + '" class="donor-msg-img">';
        } else {
          msgHtml = escapeHtml(msg);
        }

        // 有特效的行加整行扫光class
        var rowClass = d.css ? ' class="donor-row-effect"' : "";

        html += "<tr" + rowClass + ">";
        html += "<td>" + medal + "</td>";
        html += "<td>" + nameHtml + "</td>";
        html += '<td class="amount">\u00a5' + Number(d.amount).toFixed(2) + "</td>";
        html += "<td>" + msgHtml + "</td>";
        html += "</tr>";
      });

      html += "</tbody></table>";
      rankingContainer.innerHTML = html;
    } catch (err) {
      rankingContainer.innerHTML = '<div class="empty-ranking" style="color:#f87171;">'
        + (lang === "en" ? "Failed to load ranking" : "\u6392\u884c\u699c\u52a0\u8f7d\u5931\u8d25") + "</div>";
    }
  }

  // ── 工具函数 ──
  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ── 注入动画与样式（一次性，以后所有特效只需在 admin.py 改 CSS 字段） ──
  var styleEl = document.createElement("style");
  styleEl.textContent = [
    // 名字扫光
    "@keyframes donor-shine{0%{background-position:200% center}100%{background-position:-200% center}}",
    // 呼吸发光
    "@keyframes donor-breathe{0%,100%{filter:drop-shadow(0 0 2px rgba(244,64,64,.35)) drop-shadow(0 0 2px rgba(244,64,64,.35))}50%{filter:drop-shadow(0 0 8px rgba(244,64,64,1)) drop-shadow(0 0 16px rgba(244,80,60,.6))}}",
    // 整行扫光
    "@keyframes row-shine{0%{background-position:200% 0}100%{background-position:-200% 0}}",
    // 彩虹色相旋转
    "@keyframes donor-rainbow{0%{filter:hue-rotate(0deg)}100%{filter:hue-rotate(360deg)}}",
    // 缩放脉冲
    "@keyframes donor-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}",
    // 文字发光
    "@keyframes donor-glow{0%,100%{text-shadow:0 0 4px currentColor}50%{text-shadow:0 0 16px currentColor,0 0 30px currentColor}}",
    // 整行扫光样式
    ".donor-row-effect{background:linear-gradient(90deg,transparent 0%,rgba(212,165,60,.06) 20%,rgba(245,214,128,.18) 45%,rgba(212,165,60,.06) 80%,transparent 100%);background-size:300% 100%;animation:row-shine 6s linear infinite}",
    // 留言图片样式
    ".donor-msg-img{max-height:36px;max-width:120px;border-radius:4px;vertical-align:middle}",
  ].join("\n");
  document.head.appendChild(styleEl);

  // ── 初始化 ──
  loadFeedback();
  loadDonors();

  // 锚点滚动
  if (window.location.hash) {
    var target = document.querySelector(window.location.hash);
    if (target) setTimeout(function () { target.scrollIntoView({ behavior: "smooth" }); }, 300);
  }
})();
