!function(){
    const n="difyChatbotConfig",
        a="dify-chatbot-bubble-button",
        c="dify-chatbot-bubble-window",
        p=window[n],
        h={
            open:`<svg id="openIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="..." fill="white"/>
            </svg>`,
            close:`<svg id="closeIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 18L6 6M6 18L18 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`
        };

    async function e() {
        if (p && p.token) {
            const e = new URLSearchParams(await async function(){
                const e = p?.inputs || {}, n = {};
                return await Promise.all(Object.entries(e).map(async([e, t]) => {
                    n[e] = (t = new TextEncoder().encode(t),
                            t = await new Response(new Blob([t]).stream().pipeThrough(new CompressionStream("gzip"))).arrayBuffer(),
                            btoa(String.fromCharCode(...new Uint8Array(t))))
                })), n;
            }());
            
            const i = `${p.baseUrl || `https://${p.isDev ? "dev." : ""}udify.app`}/chatbot/${p.token}?` + e;

            function o() {
                const e = document.getElementById(c),
                    t = document.getElementById(a);
                if (e && t) {
                    const n = t.getBoundingClientRect();
                    n.top - 5 > e.clientHeight ? (e.style.bottom = n.height + 5 + "px", e.style.top = "unset")
                                              : (e.style.bottom = "unset", e.style.top = n.height + 5 + "px"),
                    n.right > e.clientWidth ? (e.style.right = "0", e.style.left = "unset")
                                            : (e.style.right = "unset", e.style.left = 0)
                }
            }

            function t() {
                const n = document.createElement("div");
                n.id = a;

                const t = document.createElement("style");
                document.head.appendChild(t);
                t.sheet.insertRule(`
                    #${n.id} { position: fixed; bottom: 1rem; right: 1rem; width: 50px; height: 50px; border-radius: 25px; background-color: #155EEF; cursor: pointer; z-index: 2147483647; }
                `);

                const s = document.createElement("iframe");
                s.allow = "fullscreen;microphone";
                s.title = "dify chatbot bubble window";
                s.id = c;
                s.src = i;
                s.style.cssText = `border: none; position: absolute; flex-direction: column; justify-content: space-between;
                bottom: 55px; right: 0; width: 24rem; height: 40rem; border-radius: 0.75rem; display: flex; z-index: 2147483647; overflow: hidden; background-color: #F3F4F6;`;

                document.body.appendChild(n);
                n.appendChild(s);
                n.innerHTML = h.close; // 初期状態で閉じるボタンを表示

                n.addEventListener("click", function () {
                    s.style.display = "none" === s.style.display ? "block" : "none";
                    n.innerHTML = "none" === s.style.display ? h.open : h.close;
                });
            }
            
            t();
        }
    }
    document.body.onload = e;
}();
