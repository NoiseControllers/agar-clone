(function(wHandle, wjQuery) {
    /**
     * Enter url in the following format: HOST : PORT
     *
     * Example: 127.0.0.1:443
     * 
     */
    var CONNECTION_URL = "162.243.157.40:443";
    /**
     * Enter path to the skin image folder
     * To take skins from the official server enter: "http://agar.io/skins/"
     */
    var SKIN_URL = "./skins/";//skins folder
    function gameLoop() {
        ma = true;
        getServerList();
        setInterval(getServerList, 18E4);
        Canvas = nCanvas = document.getElementById("canvas");
        ctx = Canvas.getContext("2d");
        Canvas.onmousedown = function(a) {
            if (Ca) {
                var xOffset = a.clientX - (5 + r / 5 / 2),
                    yOffset = a.clientY - (5 + r / 5 / 2);
                if (Math.sqrt(xOffset * xOffset + yOffset * yOffset) <= r / 5 / 2) {
                    L();
                    D(17);
                    return
                }
            }
            U = a.clientX;
            V = a.clientY;
            oa();
            L()
        };
        Canvas.onmousemove = function(a) {
            U = a.clientX;
            V = a.clientY;
            oa()
        };
        Canvas.onmouseup = function() {};
        /firefox/i.test(navigator.userAgent) ? document.addEventListener("DOMMouseScroll", handleWheel, false) : document.body.onmousewheel = handleWheel;
        var a = false,
            b = false,
            c = false;
        wHandle.onkeydown = function(d) {
            32 != d.keyCode || a || (L(), D(17), a = true);
            81 != d.keyCode || b || (D(18), b = true);
            87 != d.keyCode || c || (L(), D(21), c = true);
            27 == d.keyCode && Ea(true)
        };
        wHandle.onkeyup = function(d) {
            32 == d.keyCode && (a = false);
            87 == d.keyCode && (c = false);
            81 == d.keyCode && b && (D(19), b = false)
        };
        wHandle.onblur = function() {
            D(19);
            c = b = a = false
        };

        wHandle.onresize = canvasResize;
        canvasResize();
        wHandle.requestAnimationFrame ? wHandle.requestAnimationFrame(redrawGameScene) : setInterval(drawGameScene, 1E3 / 60);
        setInterval(L, 40);
        w && wjQuery("#region").val(w);
        Ha();
        W(wjQuery("#region").val());
        null == ws && w && X();
        wjQuery("#overlays").show()
    }


    function handleWheel(a) {
        zoom *= Math.pow(.9, a.wheelDelta / -120 || a.detail || 0);
        1 > zoom && (zoom = 1);
        zoom > 4 / k && (zoom = 4 / k)
    }

    function Ua() {
        if (.4 > k) M = null;
        else {
            for (var a = Number.POSITIVE_INFINITY, b = Number.POSITIVE_INFINITY, c = Number.NEGATIVE_INFINITY, d = Number.NEGATIVE_INFINITY, e = 0, i = 0; i < v.length; i++) {
                var h = v[i];
                !h.shouldRender() || h.prepareData || 20 >= h.size * k || (e = Math.max(h.size, e), a = Math.min(h.x, a), b = Math.min(h.y, b), c = Math.max(h.x, c), d = Math.max(h.y, d))
            }
            M = Quad.init({
                minX: a - (e + 100),
                minY: b - (e + 100),
                maxX: c + (e + 100),
                maxY: d + (e + 100),
                maxChildren: 2,
                maxDepth: 4
            });
            for (i = 0; i < v.length; i++)
                if (h = v[i], h.shouldRender() && !(20 >= h.size * k))
                    for (a = 0; a < h.a.length; ++a) b = h.a[a].x, c = h.a[a].y, b < t - r / 2 / k || c < u - s / 2 / k || b > t + r / 2 / k || c > u + s / 2 / k || M.insert(h.a[a])
        }
    }

    function oa() {
        Y = (U - r / 2) / k + t;
        Z = (V - s / 2) / k + u
    }

    function getServerList() {
        null == $ && ($ = {}, wjQuery("#region").children().each(function() {
            var a = wjQuery(this),
                b = a.val();
            b && ($[b] = a.text())
        }));
        wjQuery.get("info.php", function(a) {
            var b = {}, c;
            for (c in a.regions) {
                var d = c.split(":")[0];
                b[d] = b[d] || 0;
                b[d] += a.regions[c].numPlayers
            }
            for (c in b) wjQuery('#region option[value="' + c + '"]').text($[c] + " (" + b[c] + " players)")
        }, "json")
    }

    function Ia() {
        wjQuery("#adsBottom").hide();
        wjQuery("#overlays").hide();
        Ha()
    }

    function W(a) {
        a && a != w && (wjQuery("#region").val() != a && wjQuery("#region").val(a), w = wHandle.localStorage.location = a, wjQuery(".region-message").hide(), wjQuery(".region-message." + a).show(), wjQuery(".btn-needs-server").prop("disabled", false), ma && X())
    }

    function Ea(a) {
        F = null;
        wjQuery("#overlays").fadeIn(a ? 200 : 3E3);
        a || wjQuery("#adsBottom").fadeIn(3E3)
    }

    function Ha() {
        wjQuery("#region").val() ? wHandle.localStorage.location = wjQuery("#region").val() : wHandle.localStorage.location && wjQuery("#region").val(wHandle.localStorage.location);
        wjQuery("#region").val() ? wjQuery("#locationKnown").append(wjQuery("#region")) : wjQuery("#locationUnknown").append(wjQuery("#region"))
    }

    function attemptConnection() {
        console.log("Find " + w + N);
        wjQuery.ajax("main.php", {
            error: function() {
                setTimeout(attemptConnection, 1E3)
            },
            success: function(a) {
                wsConnect("ws://" + CONNECTION_URL)
            },
            dataType: "text",
            method: "POST",
            cache: false,
            crossDomain: true,
            data: w + N || "?"
        })
    }

    function X() {
        ma && w && (wjQuery("#connecting").show(), attemptConnection())
    }

    function wsConnect(wsUrl) {
        if (ws) {
            ws.onopen = null;
            ws.onmessage = null;
            ws.onclose = null;
            try {
                ws.close()
            } catch (b) {}
            ws = null
        }
        var c = CONNECTION_URL;
        /^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]+$/.test(c) && 5 != +c.split(".")[0] && (wsUrl = "ws://" + c);
        localProtocolHttps && (wsUrl = wsUrl.split(":"), wsUrl = wsUrl[0] + "s://ip-" + wsUrl[1].replace(/\./g, "-").replace(/\//g, "") + ".tech.agar.io:" + (+wsUrl[2] + 2E3));
        G = [];
        n = [];
        A = {};
        v = [];
        Cells = [];
        leaderBoard = [];
        Canvas = y = null;
        J = 0;
        console.log("Connecting to " + wsUrl);
        ws = new WebSocket(wsUrl);
        ws.binaryType = "arraybuffer";
        ws.onopen = onWsOpen;
        ws.onmessage = onWsMessage;
        ws.onclose = onWsClose;
        ws.onerror = function() {
            console.log("socket error")
        }
    }

    function prepareData(a) {
        return new DataView(new ArrayBuffer(a))
    }

    function wsSend(a) {
        ws.send(a.buffer)
    }

    function onWsOpen() {
        var a;
        ba = 500;
        wjQuery("#connecting").hide();
        console.log("socket open");
        a = prepareData(5);
        a.setUint8(0, 254);
        a.setUint32(1, 4, true);
        wsSend(a);
        a = prepareData(5);
        a.setUint8(0, 255);
        a.setUint32(1, 673720361, true);
        wsSend(a);
        Ka()
    }

    function onWsClose() {
        console.log("socket close");
        setTimeout(X, ba);
        ba *= 1.5
    }

    function onWsMessage(a) {
        handleWsMessage(new DataView(a.data))
    }

    function handleWsMessage(a) {
        function b() {
            for (var b = "";;) {
                var d = a.getUint16(c, true);
                c += 2;
                if (0 == d) break;
                b += String.fromCharCode(d)
            }
            return b
        }
        var c = 0;
        240 == a.getUint8(c) && (c += 5);
        switch (a.getUint8(c++)) {
            case 16:
                ab(a, c);
                break;
            case 17:
                Q = a.getFloat32(c, true);
                c += 4;
                R = a.getFloat32(c, true);
                c += 4;
                S = a.getFloat32(c, true);
                c += 4;
                break;
            case 20:
                n = [];
                G = [];
                break;
            case 21:
                ra = a.getInt16(c, true);
                c += 2;
                sa = a.getInt16(c, true);
                c += 2;
                ta || (ta = true, ca = ra, da = sa);
                break;
            case 32:
                G.push(a.getUint32(c, true));
                c += 4;
                break;
            case 49:
                if (null != y) break;
                var d = a.getUint32(c, true),
                    c = c + 4;
                leaderBoard = [];
                for (var e = 0; e < d; ++e) {
                    var m = a.getUint32(c, true),
                        c = c + 4;
                    leaderBoard.push({
                        id: m,
                        name: b()
                    })
                }
                drawLeaderBoard();
                break;
            case 50:
                y = [];
                d = a.getUint32(c, true);
                c += 4;
                for (e = 0; e < d; ++e) y.push(a.getFloat32(c, true)), c += 4;
                drawLeaderBoard();
                break;
            case 64:
                ea = a.getFloat64(c, true), c += 8, fa = a.getFloat64(c, true), c += 8, ga = a.getFloat64(c, true), c += 8, ha = a.getFloat64(c, true), c += 8, Q = (ga + ea) / 2, R = (ha + fa) / 2, S = 1, 0 == n.length && (t = Q, u = R, k = S)
        }
    }

    function ab(a, b) {
        H = +new Date;
        var c = Math.random();
        ua = false;
        var d = a.getUint16(b, true);
        b += 2;
        for (var e = 0; e < d; ++e) {
            var m = A[a.getUint32(b, true)],
                h = A[a.getUint32(b + 4, true)];
            b += 8;
            m && h && (h.destory(), h.p = h.x, h.q = h.y, h.o = h.size, h.F = m.x, h.G = m.y, h.n = h.size, h.updateTime = H)
        }
        for (e = 0;;) {
            d = a.getUint32(b, true);
            b += 4;
            if (0 == d) break;
            ++e;
            var g, m = a.getInt16(b, true);
            b += 2;
            h = a.getInt16(b, true);
            b += 2;
            g = a.getInt16(b, true);
            b += 2;
            for (var f = a.getUint8(b++), k = a.getUint8(b++), l = a.getUint8(b++),
                    f = (f << 16 | k << 8 | l).toString(16); 6 > f.length;) f = "0" + f;
            var f = "#" + f,
                k = a.getUint8(b++),
                l = !! (k & 1),
                r = !! (k & 16);
            k & 2 && (b += 4);
            k & 4 && (b += 8);
            k & 8 && (b += 16);
            for (var q, p = "";;) {
                q = a.getUint16(b, true);
                b += 2;
                if (0 == q) break;
                p += String.fromCharCode(q)
            }
            q = p;
            p = null;
            A.hasOwnProperty(d) ? (p = A[d], p.updatePos(), p.p = p.x, p.q = p.y, p.o = p.size, p.color = f) : (p = new va(d, m, h, g, f, q), v.push(p), A[d] = p, p.ka = m, p.la = h);
            p.isVirus = l;
            p.isAgitated = r;
            p.F = m;
            p.G = h;
            p.n = g;
            p.updateCode = c;
            p.updateTime = H;
            p.nSize = k;
            q && p.setName(q); - 1 != G.indexOf(d) && -1 == n.indexOf(p) && (document.getElementById("overlays").style.display = "none", n.push(p), 1 == n.length && (t = p.x, u = p.y))
        }
        c = a.getUint32(b, true);
        b += 4;
        for (e = 0; e < c; e++) d = a.getUint32(b, true), b += 4, p = A[d], null != p && p.destory();
        ua && 0 == n.length && Ea(false)
    }

    function L() {
        var a;
        if (wsIsOpen()) {
            a = U - r / 2;
            var b = V - s / 2;
            64 > a * a + b * b || .01 > Math.abs(Ma - Y) && .01 > Math.abs(Na - Z) || (Ma = Y, Na = Z, a = prepareData(21), a.setUint8(0, 16), a.setFloat64(1, Y, true), a.setFloat64(9, Z, true), a.setUint32(17, 0, true), wsSend(a))
        }
    }

    function Ka() {
        if (wsIsOpen() && null != F) {
            var a = prepareData(1 + 2 * F.length);
            a.setUint8(0, 0);
            for (var b = 0; b < F.length; ++b) a.setUint16(1 + 2 * b, F.charCodeAt(b), true);
            wsSend(a)
        }
    }

    function wsIsOpen() {
        return null != ws && ws.readyState == ws.OPEN
    }

    function D(a) {
        if (wsIsOpen()) {
            var b = prepareData(1);
            b.setUint8(0, a);
            wsSend(b)
        }
    }

    function redrawGameScene() {
        drawGameScene();
        wHandle.requestAnimationFrame(redrawGameScene)
    }

    function canvasResize() {
        r = wHandle.innerWidth;
        s = wHandle.innerHeight;
        nCanvas.width = Canvas.width = r;
        nCanvas.height = Canvas.height = s;
        drawGameScene()
    }

    function viewRange() {
        var a;
        a = 1 * Math.max(s / 1080, r / 1920);
        return a *= zoom
    }

    function bb() {
        if (0 != n.length) {
            for (var a = 0, b = 0; b < n.length; b++) a += n[b].size;
            a = Math.pow(Math.min(64 / a, 1), .4) * viewRange();
            k = (9 * k + a) / 10
        }
    }

    function drawGameScene() {
        var a, b = Date.now();
        ++cb;
        H = b;
        if (0 < n.length) {
            bb();
            for (var c =
                a = 0, d = 0; d < n.length; d++) n[d].updatePos(), a += n[d].x / n.length, c += n[d].y / n.length;
            Q = a;
            R = c;
            S = k;
            t = (t + a) / 2;
            u = (u + c) / 2
        } else t = (29 * t + Q) / 30, u = (29 * u + R) / 30, k = (9 * k + S * viewRange()) / 10;
        Ua();
        oa();
        xa || ctx.clearRect(0, 0, r, s);
        xa ? (ctx.fillStyle = showDarkTheme ? "#111111" : "#F2FBFF", ctx.globalAlpha = .05, ctx.fillRect(0, 0, r, s), ctx.globalAlpha = 1) : drawGrid();
        v.sort(function(a, b) {
            return a.size == b.size ? a.id - b.id : a.size - b.size
        });
        ctx.save();
        ctx.translate(r / 2, s / 2);
        ctx.scale(k, k);
        ctx.translate(-t, -u);
        for (d = 0; d < Cells.length; d++) Cells[d].drawOneCell(ctx);

        for (d = 0; d < v.length; d++) v[d].drawOneCell(ctx);
        //console.log(Cells.length);
        if (ta) {
            ca = (3 * ca + ra) /
                4;
            da = (3 * da + sa) / 4;
            ctx.save();
            ctx.strokeStyle = "#FFAAAA";
            ctx.lineWidth = 10;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.globalAlpha = .5;
            ctx.beginPath();
            for (d = 0; d < n.length; d++) ctx.moveTo(n[d].x, n[d].y), ctx.lineTo(ca, da);
            ctx.stroke();
            ctx.restore()
        }
        ctx.restore();
        Canvas && Canvas.width && ctx.drawImage(Canvas, r - Canvas.width - 10, 10);
        J = Math.max(J, eb());
        0 != J && (null == ja && (ja = new ka(24, "#FFFFFF")), ja.u("Score: " + ~~(J / 100)), c = ja.H(), a = c.width, ctx.globalAlpha = .2, ctx.fillStyle = "#000000", ctx.fillRect(10, s - 10 - 24 - 10, a + 10, 34), ctx.globalAlpha = 1, ctx.drawImage(c, 15, s - 10 - 24 - 5));
        drawSplitIcon();
        b = Date.now() - b;
        b > 1E3 / 60 ? z -= .01 : b < 1E3 / 65 && (z += .01);.4 > z && (z = .4);
        1 < z && (z = 1)
    }

    function drawGrid() {
        ctx.fillStyle = showDarkTheme ? "#111111" : "#F2FBFF";
        ctx.fillRect(0, 0, r, s);
        ctx.save();
        ctx.strokeStyle = showDarkTheme ? "#AAAAAA" : "#000000";
        ctx.globalAlpha = .2;
        ctx.scale(k, k);
        for (var a = r / k, b = s / k, c = -.5 + (-t + a / 2) % 50; c < a; c += 50) ctx.beginPath(), ctx.moveTo(c, 0), ctx.lineTo(c, b), ctx.stroke();
        for (c = -.5 + (-u + b / 2) % 50; c < b; c += 50) ctx.beginPath(), ctx.moveTo(0, c), ctx.lineTo(a, c), ctx.stroke();
        ctx.restore()
    }

    function drawSplitIcon() {
        if (Ca && splitIcon.width) {
            var a = r / 5;
            ctx.drawImage(splitIcon, 5, 5, a, a)
        }
    }

    function eb() {
        for (var a = 0, b = 0; b < n.length; b++) a += n[b].n * n[b].n;
        return a
    }

    function drawLeaderBoard() {
        Canvas = null;
        if (null != y || 0 != leaderBoard.length)
            if (null != y || showName) {
                Canvas = document.createElement("canvas");
                var ctx = Canvas.getContext("2d"),
                    b = 60,
                    b = null == y ? b + 24 * leaderBoard.length : b + 180,
                    c = Math.min(200, .3 * r) / 200;
                Canvas.width = 200 * c;
                Canvas.height = b * c;
                ctx.scale(c, c);
                ctx.globalAlpha = .4;
                ctx.fillStyle = "#000000";
                ctx.fillRect(0, 0, 200, b);
                ctx.globalAlpha = 1;
                ctx.fillStyle = "#FFFFFF";
                c = null;
                c = "Leaderboard";
                ctx.font = "30px Ubuntu";
                ctx.fillText(c, 100 - ctx.measureText(c).width / 2, 40);
                if (null == y)
                    for (ctx.font = "20px Ubuntu", b = 0; b < leaderBoard.length; ++b) c =
                        leaderBoard[b].name || "An unnamed cell", showName || (c = "An unnamed cell"), -1 != G.indexOf(leaderBoard[b].id) ? (n[0].name && (c = n[0].name), ctx.fillStyle = "#FFAAAA") : ctx.fillStyle = "#FFFFFF", c = b + 1 + ". " + c, ctx.fillText(c, 100 - ctx.measureText(c).width / 2, 70 + 24 * b);
                else
                    for (b = c = 0; b < y.length; ++b) {
                        var d = c + y[b] * Math.PI * 2;
                        ctx.fillStyle = gb[b + 1];
                        ctx.beginPath();
                        ctx.moveTo(100, 140);
                        ctx.arc(100, 140, 80, c, d, false);
                        ctx.fill();
                        c = d
                    }
            }
    }

    function va(uid, ux, uy, usize, ucolor, m) {
        this.id = uid;
        this.p = this.x = ux;
        this.q = this.y = uy;
        this.o = this.size = usize;
        this.color = ucolor;
        this.a = [];
        this.l = [];
        this.createPoints();
        this.setName(m)
    }

    function ka(a, b, c, d) {
        a && (this.r = a);
        b && (this.P = b);
        this.R = !! c;
        d && (this.s = d)
    }
    var localProtocol = wHandle.location.protocol,
        localProtocolHttps = "https:" == localProtocol;
    if (wHandle.location.ancestorOrigins && wHandle.location.ancestorOrigins.length && "https://apps.facebook.com" != wHandle.location.ancestorOrigins[0]) wHandle.top.location = "http://agar.io/";
    else {
        var nCanvas, ctx, Canvas, r, s, M = null,
            ws = null,
            t = 0,
            u = 0,
            G = [],
            n = [],
            A = {}, v = [],
            Cells = [],
            leaderBoard = [],
            U = 0,
            V = 0,
            Y = -1,
            Z = -1,
            cb = 0,
            H = 0,
            F = null,
            ea = 0,
            fa = 0,
            ga = 1E4,
            ha = 1E4,
            k = 1,
            w = null,
            showSkin = true,
            showName = true,
            showColor = false,
            ua = false,
            J = 0,
            showDarkTheme = false,
            showMass = false,
            Q = t = ~~ ((ea + ga) / 2),
            R = u = ~~ ((fa + ha) / 2),
            S = 1,
            N = "",
            y = null,
            ma = false,
            ta = false,
            ra = 0,
            sa = 0,
            ca = 0,
            da = 0,
            Ra = 0,
            gb = ["#333333", "#FF3333", "#33FF33", "#3333FF"],
            xa = false,
            zoom = 1,
            Ca = "ontouchstart" in wHandle && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            splitIcon = new Image;
        splitIcon.src = "http://agar.io/img/split.png";
        var Sa = document.createElement("canvas");
        if ("undefined" == typeof console || "undefined" == typeof DataView || "undefined" == typeof WebSocket || null == Sa || null == Sa.getContext || null == wHandle.localStorage) alert("You browser does not support this game, we recommend you to use Firefox to play this");
        else {
            var $ = null;
            wHandle.setNick = function(a) {
                Ia();
                F = a;
                Ka();
                J = 0
            };
            wHandle.setRegion = W;
            wHandle.setSkins = function(a) {
                showSkin = a
            };
            wHandle.setNames = function(a) {
                showName = a
            };
            wHandle.setDarkTheme = function(a) {
                showDarkTheme = a
            };
            wHandle.setColors = function(a) {
                showColor = a
            };
            wHandle.setShowMass = function(a) {
                showMass = a
            };
            wHandle.spectate = function() {
                F = null;
                D(1);
                Ia()
            };
            wHandle.setGameMode = function(a) {
                a != N && (N = a, X())
            };
            wHandle.setAcid = function(a) {
                xa = a
            };
            null != wHandle.localStorage && (null == wHandle.localStorage.AB8 && (wHandle.localStorage.AB8 = 0 + ~~(100 * Math.random())), Ra = +wHandle.localStorage.AB8, wHandle.ABGroup = Ra);
            wjQuery.get(localProtocol + "//gc.agar.io", function(a) {
                var b = a.split(" ");
                a = b[0];
                b = b[1] || ""; - 1 == "DE IL PL HU BR AT UA".split(" ").indexOf(a) && knownNameDict.push("nazi"); - 1 == ["UA"].indexOf(a) && knownNameDict.push("ussr");
                T.hasOwnProperty(a) && ("string" == typeof T[a] ? w || W(T[a]) : T[a].hasOwnProperty(b) && (w || W(T[a][b])))
            }, "text");
            setTimeout(function() {}, 3E5);
            var T = {
                ZW: "EU-London"
            };
            wHandle.connect = wsConnect;

var data = {"action":"test"};


var response = null;


wjQuery.ajax({
 	type: "POST",
      dataType: "json",
      url: "checkdir.php", //Relative or absolute path to response.php file
      data: data,
      success: function(data) {
	//alert(data["names"]);
	response = JSON.parse(data["names"]);	
}

});



var interval1Id = setInterval(function(){
    //console.log("logging every 5 seconds");
    //console.log(Aa);
    


wjQuery.ajax({
 	type: "POST",
      dataType: "json",
      url: "checkdir.php", //Relative or absolute path to response.php file
      data: data,
      success: function(data) {
	//alert(data["names"]);
	response = JSON.parse(data["names"]);	
}

});
	//console.log(response);
	for (var i = 0; i < response.length; i++) {
    	//console.log(response[insert]);
	if (-1 == knownNameDict.indexOf(response[i])) {
	knownNameDict.push(response[i]);
	console.log("Add:"+response[i]);	
	}
}

},15000);



            var ba = 500,
                Ma = -1,
                Na = -1,
                Canvas = null,
                z = 1,
                ja = null,
                K = {},
                knownNameDict = "poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;hitler;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;belarus;wojak;doge;nasa;byzantium;imperial japan;french kingdom;somalia;turkey;mars;pokerface;8;irs;receita federal;facebook".split(";"),
		        hb = ["8", "nasa"],
                ib = ["m'blob"];
                va.prototype = {
                id: 0,
                a: null,
                l: null,
                name: null,
                k: null,
                L: null,
                x: 0,
                y: 0,
                size: 0,
                p: 0,
                q: 0,
                o: 0,
                F: 0,
                G: 0,
                n: 0,
                nSize: 0,
                updateTime: 0,
                updateCode: 0,
                drawTime: 0,
                destroyed: false,
                isVirus: false,
                isAgitated: false,
                wasSimpleDrawing: true,
                destory: function() {
                    var a;
                    for (a = 0; a < v.length; a++)
                        if (v[a] == this) {
                            v.splice(a, 1);
                            break
                        }
                    delete A[this.id];
                    a = n.indexOf(this); - 1 != a && (ua = true, n.splice(a, 1));
                    a = G.indexOf(this.id); - 1 != a && G.splice(a, 1);
                    this.destroyed = true;
                    Cells.push(this)
                },
                getNameSize: function() {
                    return Math.max(~~(.3 * this.size), 24)
                },
                setName: function(a) {
                    if (this.name = a) null == this.k ? this.k = new ka(this.getNameSize(), "#FFFFFF", true, "#000000") : this.k.J(this.getNameSize()), this.k.u(this.name)
                },
                createPoints: function() {
                    for (var a = this.getNumPoints(); this.a.length > a;) {
                        var b = ~~ (Math.random() * this.a.length);
                        this.a.splice(b, 1);
                        this.l.splice(b, 1)
                    }
                    0 == this.a.length && 0 < a && (this.a.push({
                        S: this,
                        e: this.size,
                        x: this.x,
                        y: this.y
                    }), this.l.push(Math.random() - .5));
                    for (; this.a.length < a;) {
                        var b = ~~ (Math.random() * this.a.length),
                            c = this.a[b];
                        this.a.splice(b, 0, {
                            S: this,
                            e: c.e,
                            x: c.x,
                            y: c.y
                        });
                        this.l.splice(b, 0, this.l[b])
                    }
                },
                getNumPoints: function() {
                    if (0 == this.id) return 16;
                    var a = 10;
                    20 > this.size && (a = 0);
                    this.isVirus && (a = 30);
                    var b = this.size;
                    this.isVirus || (b *= k);
                    b *= z;
                    this.nSize & 32 && (b *= .25);
                    return~~ Math.max(b, a)
                },
                movePoints: function() {
                    this.createPoints();
                    for (var a = this.a, b = this.l, c = a.length, d = 0; d < c; ++d) {
                        var e = b[(d - 1 + c) % c],
                            m = b[(d + 1) % c];
                        b[d] += (Math.random() - .5) * (this.isAgitated ? 3 : 1);
                        b[d] *= .7;
                        10 < b[d] && (b[d] = 10); - 10 > b[d] && (b[d] = -10);
                        b[d] = (e + m + 8 * b[d]) / 10
                    }
                    for (var h = this, g = this.isVirus ? 0 : (this.id / 1E3 + H / 1E4) % (2 * Math.PI), d = 0; d < c; ++d) {
                        var f = a[d].e,
                            e = a[(d - 1 + c) % c].e,
                            m = a[(d + 1) % c].e;
                        if (15 < this.size && null != M && 20 < this.size * k && 0 != this.id) {
                            var l = false,
                                n = a[d].x,
                                q = a[d].y;
                            M.retrieve2(n -
                                5, q - 5, 10, 10, function(a) {
                                    a.S != h && 25 > (n - a.x) * (n - a.x) + (q - a.y) * (q - a.y) && (l = true)
                                });
                            !l && (a[d].x < ea || a[d].y < fa || a[d].x > ga || a[d].y > ha) && (l = true);
                            l && (0 < b[d] && (b[d] = 0), b[d] -= 1)
                        }
                        f += b[d];
                        0 > f && (f = 0);
                        f = this.isAgitated ? (19 * f + this.size) / 20 : (12 * f + this.size) / 13;
                        a[d].e = (e + m + 8 * f) / 10;
                        e = 2 * Math.PI / c;
                        m = this.a[d].e;
                        this.isVirus && 0 == d % 2 && (m += 5);
                        a[d].x = this.x + Math.cos(e * d + g) * m;
                        a[d].y = this.y + Math.sin(e * d + g) * m
                    }
                },
                updatePos: function() {
                    if (0 == this.id) return 1;
                    var a;
                    a = (H - this.updateTime) / 120;
                    a = 0 > a ? 0 : 1 < a ? 1 : a;
                    var b = 0 > a ? 0 : 1 < a ? 1 : a;
                    this.getNameSize();
                    if (this.destroyed && 1 <= b) {
                        var c = Cells.indexOf(this); - 1 != c && Cells.splice(c, 1)
                    }
                    this.x = a * (this.F - this.p) + this.p;
                    this.y = a * (this.G - this.q) + this.q;
                    this.size = b * (this.n - this.o) + this.o;
                    return b
                },
                shouldRender: function() {
                    return 0 == this.id ? true : this.x + this.size + 40 < t - r / 2 / k || this.y + this.size + 40 < u - s / 2 / k || this.x - this.size - 40 > t + r / 2 / k || this.y - this.size - 40 > u + s / 2 / k ? false : true
                },
                drawOneCell: function(a) {
                    if (this.shouldRender()) {
                        var b = 0 != this.id && !this.isVirus && !this.isAgitated && .4 > k;
                        5 > this.getNumPoints() && (b = true);
                        if (this.wasSimpleDrawing && !b)
                            for (var c = 0; c < this.a.length; c++) this.a[c].e = this.size;
                        this.wasSimpleDrawing = b;
                        a.save();
                        this.drawTime = H;
                        c = this.updatePos();
                        this.destroyed && (a.globalAlpha *= 1 - c);
                        a.lineWidth = 10;
                        a.lineCap = "round";
                        a.lineJoin = this.isVirus ? "miter" : "round";
                        showColor ? (a.fillStyle = "#FFFFFF", a.strokeStyle = "#AAAAAA") : (a.fillStyle = this.color, a.strokeStyle = this.color);
                        if (b) a.beginPath(), a.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
                        else {
                            this.movePoints();
                            a.beginPath();
                            var d = this.getNumPoints();
                            a.moveTo(this.a[0].x, this.a[0].y);
                            for (c = 1; c <= d; ++c) {
                                var e = c % d;
                                a.lineTo(this.a[e].x, this.a[e].y)
                            }
                        }
                        a.closePath();
                        d = this.name.toLowerCase();
                        !this.isAgitated && showSkin && ":teams" != N ? -1 != knownNameDict.indexOf(d) ? (K.hasOwnProperty(d) || (K[d] = new Image, K[d].src = SKIN_URL + d + ".png"), c = 0 != K[d].width && K[d].complete ? K[d] : null) : c = null : c = null;
                        c = (e = c) ? -1 != ib.indexOf(d) : false;
                        b || a.stroke();
                        a.fill();
                        null == e || c || (a.save(), a.clip(), a.drawImage(e, this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size), a.restore());
                        (showColor || 15 < this.size) && !b && (a.strokeStyle = "#000000", a.globalAlpha *= .1, a.stroke());
                        a.globalAlpha = 1;
                        null != e && c && a.drawImage(e, this.x - 2 * this.size, this.y - 2 * this.size, 4 * this.size, 4 * this.size);
                        c = -1 != n.indexOf(this);
                        if (0 != this.id) {
                            b = ~~this.y;
                            if ((showName || c) && this.name && this.k && (null == e || -1 == hb.indexOf(d))) {
                                e = this.k;
                                e.u(this.name);
                                e.J(this.getNameSize());
                                d = Math.ceil(10 * k) / 10;
                                e.$(d);
                                var e = e.H(),
                                    m = ~~ (e.width / d),
                                    h = ~~ (e.height / d);
                                a.drawImage(e, ~~this.x - ~~(m / 2), b - ~~(h / 2), m, h);
                                b += e.height / 2 / d + 4
                            }
                            showMass && (c || 0 == n.length && (!this.isVirus || this.isAgitated) && 20 < this.size) && (null == this.L && (this.L = new ka(this.getNameSize() / 2, "#FFFFFF", true, "#000000")), c = this.L, c.J(this.getNameSize() / 2), c.u(~~(this.size * this.size / 100)), d = Math.ceil(10 * k) / 10, c.$(d), e = c.H(), m = ~~ (e.width / d), h = ~~ (e.height / d), a.drawImage(e, ~~this.x - ~~(m / 2), b - ~~(h / 2), m, h))
                        }
                        a.restore()
                    }
                }
            };
            ka.prototype = {
                w: "",
                P: "#000000",
                R: false,
                s: "#000000",
                r: 16,
                m: null,
                Q: null,
                g: false,
                v: 1,
                J: function(a) {
                    this.r != a && (this.r = a, this.g = true)
                },
                $: function(a) {
                    this.v != a && (this.v = a, this.g = true)
                },
                setStrokeColor: function(a) {
                    this.s != a && (this.s = a, this.g = true)
                },
                u: function(a) {
                    a != this.w && (this.w = a, this.g = true)
                },
                H: function() {
                    null == this.m && (this.m = document.createElement("canvas"), this.Q = this.m.getContext("2d"));
                    if (this.g) {
                        this.g = false;
                        var a = this.m,
                            b = this.Q,
                            c = this.w,
                            d = this.v,
                            e = this.r,
                            m = e + "px Ubuntu";
                        b.font = m;
                        var h = ~~ (.2 * e);
                        a.width = (b.measureText(c).width +
                            6) * d;
                        a.height = (e + h) * d;
                        b.font = m;
                        b.scale(d, d);
                        b.globalAlpha = 1;
                        b.lineWidth = 3;
                        b.strokeStyle = this.s;
                        b.fillStyle = this.P;
                        this.R && b.strokeText(c, 3, e - h / 2);
                        b.fillText(c, 3, e - h / 2)
                    }
                    return this.m
                }
            };
            Date.now || (Date.now = function() {
                return (new Date).getTime()
            });
            var Quad = {
                init: function(args) {
                    function Node(x, y, w, h, depth) {
                        this.x = x;
                        this.y = y;
                        this.f = w;
                        this.h = h;
                        this.depth = depth;
                        this.items = [];
                        this.nodes = []
                    }
                    var c = args.maxChildren || 2,
                        d = args.maxDepth || 4;
                    Node.prototype = {
                        x: 0,
                        y: 0,
                        f: 0,
                        getNameSize: 0,
                        depth: 0,
                        items: null,
                        nodes: null,
                        exists: function(selector) {
                            for (var i = 0; i < this.items.length; ++i) {
                                var item = this.items[i];
                                if (item.x >= selector.x && item.y >= selector.y && item.x < selector.x + selector.f && item.y < selector.y + selector.getNameSize) return true
                            }
                            if (0 != this.nodes.length) {
                                var self = this;
                                return this.findOverlappingNodes(selector, function(dir) {
                                    return self.nodes[dir].exists(selector)
                                })
                            }
                            return false;
                        },
                        retrieve: function(item, callback) {
                            for (var i = 0; i < this.items.length; ++i) callback(this.items[i]);
                            if (0 != this.nodes.length) {
                                var self = this;
                                this.findOverlappingNodes(item, function(dir) {
                                    self.nodes[dir].retrieve(item, callback)
                                })
                            }
                        },
                        insert: function(a) {
                            0 != this.nodes.length ? this.nodes[this.findInsertNode(a)].insert(a) : this.items.length >= c && this.depth < d ? (this.devide(), this.nodes[this.findInsertNode(a)].insert(a)) : this.items.push(a)
                        },
                        findInsertNode: function(a) {
                            return a.x < this.x + this.f / 2 ? a.y < this.y + this.h / 2 ? 0 : 2 : a.y < this.y + this.h / 2 ? 1 : 3
                        },
                        findOverlappingNodes: function(a, b) {
                            return a.x < this.x + this.f / 2 && (a.y < this.y + this.h / 2 && b(0) || a.y >= this.y + this.h / 2 && b(2)) || a.x >= this.x + this.f / 2 && (a.y < this.y + this.h / 2 && b(1) || a.y >= this.y + this.h / 2 && b(3)) ? true : false
                        },
                        devide: function() {
                            var a = this.depth + 1,
                                c = this.f / 2,
                                d = this.h / 2;
                            this.nodes.push(new Node(this.x, this.y, c, d, a));
                            this.nodes.push(new Node(this.x + c, this.y, c, d, a));
                            this.nodes.push(new Node(this.x, this.y + d, c, d, a));
                            this.nodes.push(new Node(this.x + c, this.y + d, c, d, a));
                            a = this.items;
                            this.items = [];
                            for (c = 0; c < a.length; c++) this.insert(a[c])
                        },
                        clear: function() {
                            for (var a = 0; a < this.nodes.length; a++) this.nodes[a].clear();
                            this.items.length = 0;
                            this.nodes.length = 0
                        }
                    };
                    var internalSelector = {
                        x: 0,
                        y: 0,
                        f: 0,
                        getNameSize: 0
                    };
                    return {
                        root: new Node(args.minX, args.minY, args.maxX - args.minX, args.maxY - args.minY, 0),
                        insert: function(a) {
                            this.root.insert(a)
                        },
                        retrieve: function(a, b) {
                            this.root.retrieve(a, b)
                        },
                        retrieve2: function(a, b, c, d, callback) {
                            internalSelector.x = a;
                            internalSelector.y = b;
                            internalSelector.f = c;
                            internalSelector.getNameSize = d;
                            this.root.retrieve(internalSelector, callback)
                        },
                        exists: function(a) {
                            return this.root.exists(a)
                        },
                        clear: function() {
                            this.root.clear()
                        }
                    }
                }
            };
            wjQuery(function() {
                function a() {
                    0 < n.length && (b.color = n[0].color, b.setName(n[0].name));
                    ctx.clearRect(0, 0, 32, 32);
                    ctx.save();
                    ctx.translate(16, 16);
                    ctx.scale(.4, .4);
                    b.drawOneCell(ctx);
                    ctx.restore();
                    var favicon = document.getElementById("favicon"),
                        f = favicon.cloneNode(true);
                    f.setAttribute("href", Canvas.toDataURL("image/png"));
                    favicon.parentNode.replaceChild(f, favicon)
                }
                var b = new va(0, 0, 0, 32, "#ED1C24", ""),
                    Canvas = document.createElement("canvas");
                Canvas.width = 32;
                Canvas.height = 32;
                var ctx = Canvas.getContext("2d");
                a();
                setInterval(a, 1E3)
            });
            wHandle.onload = gameLoop
        }
    }
//console.log(knownNameDict);
})(window, window.jQuery);
