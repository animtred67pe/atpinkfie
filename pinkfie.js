"use strict";
/*
OOOOOOO    OOO   OOOOO      OOO   OOO     OOO  OOOOOOOOO  OOO   OOOOOOOOOO
OOOOOOOO   OOO   OOOOOO     OOO   OOO    OOO   OOOOOOOOO  OOO   OOOOOOOOOO
OOO   OOO  OOO   OOOOOOO    OOO   OOO   OOO    OOO        OOO   OOO       
OOO   OOO  OOO   OOO OOOO   OOO   OOO  OOO     OOO        OOO   OOO       
OOOOOOOO   OOO   OOO  OOOO  OOO   OOOOOOO      OOOOOOOOO  OOO   OOOOOOOOOO
OOOOOOO    OOO   OOO   OOOO OOO   OOOOOOO      OOOOOOOOO  OOO   OOOOOOOOOO
OOO        OOO   OOO    OOOOOOO   OOO  OOO     OOO        OOO   OOO       
OOO        OOO   OOO     OOOOOO   OOO   OOO    OOO        OOO   OOO       
OOO        OOO   OOO      OOOOO   OOO    OOO   OOO        OOO   OOOOOOOOOO
OOO        OOO   OOO       OOOO   OOO     OOO  OOO        OOO   OOOOOOOOOO

Pinkfie - an html5 player for Movie SWF

Version: 1.1 2/05/2024

Made in the Peru

(c) 2022-2024 Anim-Tred-Studio.
*/

var PKF = (function() {
	const audioContext = new AudioContext();
	function getDuraction(num) {
		var txt = '';
		var ms = Math.floor(num) % 60;
		var mm = Math.floor(num / 60) % 60;
		var mh = Math.floor(num / 3600);
		if (ms >= 3600) {
			txt += '' + mh;
			txt += ':';
			if (mm >= 10) {
				txt += '' + mm;
			} else {
				txt += '0' + mm;
			}
			txt += ':';
			if (ms >= 10) {
				txt += '' + ms;
			} else {
				txt += '0' + ms;
			}
		} else {
			txt += '' + mm;
			txt += ':';
			if (ms >= 10) {
				txt += '' + ms;
			} else {
				txt += '0' + ms;
			}
		}
		return txt;
	}
    const JCT11280 = new Function('var a="zKV33~jZ4zN=~ji36XazM93y!{~k2y!o~k0ZlW6zN?3Wz3W?{EKzK[33[`y|;-~j^YOTz$!~kNy|L1$353~jV3zKk3~k-4P4zK_2+~jY4y!xYHR~jlz$_~jk4z$e3X5He<0y!wy|X3[:~l|VU[F3VZ056Hy!nz/m1XD61+1XY1E1=1y|bzKiz!H034zKj~mEz#c5ZA3-3X$1~mBz$$3~lyz#,4YN5~mEz#{ZKZ3V%7Y}!J3X-YEX_J(3~mAz =V;kE0/y|F3y!}~m>z/U~mI~j_2+~mA~jp2;~m@~k32;~m>V}2u~mEX#2x~mBy+x2242(~mBy,;2242(~may->2&XkG2;~mIy-_2&NXd2;~mGz,{4<6:.:B*B:XC4>6:.>B*BBXSA+A:X]E&E<~r#z+625z s2+zN=`HXI@YMXIAXZYUM8X4K/:Q!Z&33 3YWX[~mB`{zKt4z (zV/z 3zRw2%Wd39]S11z$PAXH5Xb;ZQWU1ZgWP%3~o@{Dgl#gd}T){Uo{y5_d{e@}C(} WU9|cB{w}bzvV|)[} H|zT}d||0~{]Q|(l{|x{iv{dw}(5}[Z|kuZ }cq{{y|ij}.I{idbof%cu^d}Rj^y|-M{ESYGYfYsZslS`?ZdYO__gLYRZ&fvb4oKfhSf^d<Yeasc1f&a=hnYG{QY{D`Bsa|u,}Dl|_Q{C%xK|Aq}C>|c#ryW=}eY{L+`)][YF_Ub^h4}[X|?r|u_ex}TL@YR]j{SrXgo*|Gv|rK}B#mu{R1}hs|dP{C7|^Qt3|@P{YVV |8&}#D}ef{e/{Rl|>Hni}R1{Z#{D[}CQlQ||E}[s{SG_+i8eplY[=[|ec[$YXn#`hcm}YR|{Ci(_[ql|?8p3]-}^t{wy}4la&pc|3e{Rp{LqiJ],] `kc(]@chYnrM`O^,ZLYhZB]ywyfGY~aex!_Qww{a!|)*lHrM{N+n&YYj~Z b c#e_[hZSon|rOt`}hBXa^i{lh|<0||r{KJ{kni)|x,|0auY{D!^Sce{w;|@S|cA}Xn{C1h${E]Z-XgZ*XPbp]^_qbH^e[`YM|a||+=]!Lc}]vdBc=j-YSZD]YmyYLYKZ9Z>Xcczc2{Yh}9Fc#Z.l{}(D{G{{mRhC|L3b#|xK[Bepj#ut`H[,{E9Yr}1b{[e]{ZFk7[ZYbZ0XL]}Ye[(`d}c!|*y`Dg=b;gR]Hm=hJho}R-[n}9;{N![7k_{UbmN]rf#pTe[x8}!Qcs_rs[m`|>N}^V})7{^r|/E}),}HH{OYe2{Skx)e<_.cj.cjoMhc^d}0uYZd!^J_@g,[[[?{i@][|3S}Yl3|!1|eZ|5IYw|1D}e7|Cv{OHbnx-`wvb[6[4} =g+k:{C:}ed{S]|2M]-}WZ|/q{LF|dYu^}Gs^c{Z=}h>|/i|{W]:|ip{N:|zt|S<{DH[p_tvD{N<[8Axo{X4a.^o^X>Yfa59`#ZBYgY~_t^9`jZHZn`>G[oajZ;X,i)Z.^~YJe ZiZF^{][[#Zt^|]Fjx]&_5dddW]P0C[-]}]d|y {C_jUql] |OpaA[Z{lp|rz}:Mu#]_Yf6{Ep?f5`$[6^D][^u[$[6^.Z8]]ePc2U/=]K^_+^M{q*|9tYuZ,s(dS{i=|bNbB{uG}0jZOa:[-]dYtu3]:]<{DJ_SZIqr_`l=Yt`gkTnXb3d@kiq0a`Z{|!B|}e}Ww{Sp,^Z|0>_Z}36|]A|-t}lt{R6pi|v8hPu#{C>YOZHYmg/Z4nicK[}hF_Bg|YRZ7c|crkzYZY}_iXcZ.|)U|L5{R~qi^Uga@Y[xb}&qdbd6h5|Btw[}c<{Ds53[Y7]?Z<|e0{L[ZK]mXKZ#Z2^tavf0`PE[OSOaP`4gi`qjdYMgys/?[nc,}EEb,eL]g[n{E_b/vcvgb.{kcwi`~v%|0:|iK{Jh_vf5lb}KL|(oi=LrzhhY_^@`zgf[~g)[J_0fk_V{T)}I_{D&_/d9W/|MU[)f$xW}?$xr4<{Lb{y4}&u{XJ|cm{Iu{jQ}CMkD{CX|7A}G~{kt)nB|d5|<-}WJ}@||d@|Iy}Ts|iL|/^|no|0;}L6{Pm]7}$zf:|r2}?C_k{R(}-w|`G{Gy[g]bVje=_0|PT{^Y^yjtT[[[l!Ye_`ZN]@[n_)j3nEgMa]YtYpZy].d-Y_cjb~Y~[nc~sCi3|zg}B0}do{O^{|$`_|D{}U&|0+{J3|8*]iayx{a{xJ_9|,c{Ee]QXlYb]$[%YMc*]w[aafe]aVYi[fZEii[xq2YQZHg]Y~h#|Y:thre^@^|_F^CbTbG_1^qf7{L-`VFx Zr|@EZ;gkZ@slgko`[e}T:{Cu^pddZ_`yav^Ea+[#ZBbSbO`elQfLui}.F|txYcbQ`XehcGe~fc^RlV{D_0ZAej[l&jShxG[ipB_=u:eU}3e8[=j|{D(}dO{Do[BYUZ0/]AYE]ALYhZcYlYP/^-^{Yt_1_-;YT`P4BZG=IOZ&]H[e]YYd[9^F[1YdZxZ?Z{Z<]Ba2[5Yb[0Z4l?]d_;_)a?YGEYiYv`_XmZs4ZjY^Zb]6gqGaX^9Y}dXZr[g|]Y}K aFZp^k^F]M`^{O1Ys]ZCgCv4|E>}8eb7}l`{L5[Z_faQ|c2}Fj}hw^#|Ng|B||w2|Sh{v+[G}aB|MY}A{|8o}X~{E8paZ:]i^Njq]new)`-Z>haounWhN}c#{DfZ|fK]KqGZ=:u|fqoqcv}2ssm}.r{]{nIfV{JW)[K|,Z{Uxc|]l_KdCb%]cfobya3`p}G^|LZiSC]U|(X|kBlVg[kNo({O:g:|-N|qT}9?{MBiL}Sq{`P|3a|u.{Uaq:{_o|^S}jX{Fob0`;|#y_@[V[K|cw[<_ }KU|0F}d3|et{Q7{LuZttsmf^kYZ`Af`}$x}U`|Ww}d]| >}K,r&|XI|*e{C/a-bmr1fId4[;b>tQ_:]hk{b-pMge]gfpo.|(w[jgV{EC1Z,YhaY^q,_G[c_g[J0YX]`[h^hYK^_Yib,` {i6vf@YM^hdOKZZn(jgZ>bzSDc^Z%[[o9[2=/YHZ(_/Gu_`*|8z{DUZxYt^vuvZjhi^lc&gUd4|<UiA`z]$b/Z?l}YI^jaHxe|;F}l${sQ}5g}hA|e4}?o{ih}Uz{C)jPe4]H^J[Eg[|AMZMlc}:,{iz}#*|gc{Iq|/:|zK{l&}#u|myd{{M&v~nV};L|(g|I]ogddb0xsd7^V})$uQ{HzazsgxtsO^l}F>ZB]r|{7{j@cU^{{CbiYoHlng]f+nQ[bkTn/}<-d9q {KXadZYo+n|l[|lc}V2{[a{S4Zam~Za^`{HH{xx_SvF|ak=c^[v^7_rYT`ld@]:_ub%[$[m](Shu}G2{E.ZU_L_R{tz`vj(f?^}hswz}GdZ}{S:h`aD|?W|`dgG|if{a8|J1{N,}-Ao3{H#{mfsP|[ bzn+}_Q{MT{u4kHcj_q`eZj[8o0jy{p7}C|[}l){MuYY{|Ff!Ykn3{rT|m,^R|,R}$~Ykgx{P!]>iXh6[l[/}Jgcg{JYZ.^qYfYIZl[gZ#Xj[Pc7YyZD^+Yt;4;`e8YyZVbQ7YzZxXja.7SYl[s]2^/Ha$[6ZGYrb%XiYdf2]H]kZkZ*ZQ[ZYS^HZXcCc%Z|[(bVZ]]:OJQ_DZCg<[,]%Zaa [g{C00HY[c%[ChyZ,Z_`PbXa+eh`^&jPi0a[ggvhlekL]w{Yp^v}[e{~;k%a&k^|nR_z_Qng}[E}*Wq:{k^{FJZpXRhmh3^p>de^=_7`|ZbaAZtdhZ?n4ZL]u`9ZNc3g%[6b=e.ZVfC[ZZ^^^hD{E(9c(kyZ=bb|Sq{k`|vmr>izlH[u|e`}49}Y%}FT{[z{Rk}Bz{TCc/lMiAqkf(m$hDc;qooi[}^o:c^|Qm}a_{mrZ(pA`,}<2sY| adf_%|}`}Y5U;}/4|D>|$X{jw{C<|F.hK|*A{MRZ8Zsm?imZm_?brYWZrYx`yVZc3a@f?aK^ojEd {bN}/3ZH]/$YZhm^&j 9|(S|b]mF}UI{q&aM]LcrZ5^.|[j`T_V_Gak}9J[ ZCZD|^h{N9{~&[6Zd{}B}2O|cv]K}3s}Uy|l,fihW{EG`j_QOp~Z$F^zexS`dcISfhZBXP|.vn|_HYQ|)9|cr]<`&Z6]m_(ZhPcSg>`Z]5`~1`0Xcb4k1{O!bz|CN_T{LR|a/gFcD|j<{Z._[f)mPc:1`WtIaT1cgYkZOaVZOYFrEe[}T$}Ch}mk{K-^@]fH{Hdi`c*Z&|Kt{if[C{Q;{xYB`dYIX:ZB[}]*[{{p9|4GYRh2ao{DS|V+[zd$`F[ZXKadb*A] Ys]Maif~a/Z2bmclb8{Jro_rz|x9cHojbZ{GzZx_)]:{wAayeDlx}<=`g{H1{l#}9i|)=|lP{Qq}.({La|!Y{i2EZfp=c*}Cc{EDvVB|;g}2t{W4av^Bn=]ri,|y?|3+}T*ckZ*{Ffr5e%|sB{lx^0]eZb]9[SgAjS_D|uHZx]dive[c.YPkcq/}db{EQh&hQ|eg}G!ljil|BO]X{Qr_GkGl~YiYWu=c3eb}29v3|D|}4i||.{Mv})V{SP1{FX}CZW6{cm|vO{pS|e#}A~|1i}81|Mw}es|5[}3w{C`h9aL]o{}p[G`>i%a1Z@`Ln2bD[$_h`}ZOjhdTrH{[j_:k~kv[Sdu]CtL}41{I |[[{]Zp$]XjxjHt_eThoa#h>sSt8|gK|TVi[Y{t=}Bs|b7Zpr%{gt|Yo{CS[/{iteva|cf^hgn}($_c^wmb^Wm+|55jrbF|{9^ q6{C&c+ZKdJkq_xOYqZYSYXYl`8]-cxZAq/b%b*_Vsa[/Ybjac/OaGZ4fza|a)gY{P?| I|Y |,pi1n7}9bm9ad|=d{aV|2@[(}B`d&|Uz}B}{`q|/H|!JkM{FU|CB|.{}Az}#P|lk}K{|2rk7{^8^?`/|k>|Ka{Sq}Gz}io{DxZh[yK_#}9<{TRdgc]`~Z>JYmYJ]|`!ZKZ]gUcx|^E[rZCd`f9oQ[NcD_$ZlZ;Zr}mX|=!|$6ZPZYtIo%fj}CpcN|B,{VDw~gb}@hZg`Q{LcmA[(bo`<|@$|o1|Ss}9Z_}tC|G`{F/|9nd}i=}V-{L8aaeST]daRbujh^xlpq8|}zs4bj[S`J|]?G{P#{rD{]I`OlH{Hm]VYuSYUbRc*6[j`8]pZ[bt_/^Jc*[<Z?YE|Xb|?_Z^Vcas]h{t9|Uwd)_(=0^6Zb{Nc} E[qZAeX[a]P^|_J>e8`W^j_Y}R{{Jp__]Ee#e:iWb9q_wKbujrbR}CY`,{mJ}gz{Q^{t~N|? gSga`V_||:#mi}3t|/I`X{N*|ct|2g{km}gi|{={jC}F;|E}{ZZjYf*frmu}8Tdroi{T[|+~}HG{cJ}DM{Lp{Ctd&}$hi3|FZ| m}Kr|38}^c|m_|Tr{Qv|36}?Up>|;S{DV{k_as}BK{P}}9p|t`jR{sAm4{D=b4pWa[}Xi{EjwEkI}3S|E?u=X0{jf} S|NM|JC{qo^3cm]-|JUx/{Cj{s>{Crt[UXuv|D~|j|d{YXZR}Aq}0r}(_{pJfi_z}0b|-vi)Z mFe,{f4|q`b{}^Z{HM{rbeHZ|^x_o|XM|L%|uFXm}@C_{{Hhp%a7|0p[Xp+^K}9U{bP}: tT}B|}+$|b2|[^|~h{FAby[`{}xgygrt~h1[li`c4vz|,7p~b(|mviN}^pg[{N/|g3|^0c,gE|f%|7N{q[|tc|TKA{LU}I@|AZp(}G-sz{F |qZ{}F|f-}RGn6{Z]_5})B}UJ{FFb2]4ZI@v=k,]t_Dg5Bj]Z-]L]vrpdvdGlk|gF}G]|IW}Y0[G| /bo|Te^,_B}#n^^{QHYI[?hxg{[`]D^IYRYTb&kJ[cri[g_9]Ud~^_]<p@_e_XdNm-^/|5)|h_{J;{kacVopf!q;asqd}n)|.m|bf{QW|U)}b+{tL|w``N|to{t ZO|T]jF}CB|0Q{e5Zw|k |We}5:{HO{tPwf_uajjBfX}-V_C_{{r~gg|Ude;s+}KNXH}! `K}eW{Upwbk%ogaW}9EYN}YY|&v|SL{C3[5s.]Y]I]u{M6{pYZ`^,`ZbCYR[1mNg>rsk0Ym[jrE]RYiZTr*YJ{Ge|%-lf|y(`=[t}E6{k!|3)}Zk} ][G{E~cF{u3U.rJ|a9p#o#ZE|?|{sYc#vv{E=|LC}cu{N8`/`3`9rt[4|He{cq|iSYxY`}V |(Q|t4{C?]k_Vlvk)BZ^r<{CL}#h}R+[<|i=}X|{KAo]|W<`K{NW|Zx}#;|fe{IMr<|K~tJ_x}AyLZ?{GvbLnRgN}X&{H7|x~}Jm{]-| GpNu0}.ok>|c4{PYisrDZ|fwh9|hfo@{H~XSbO]Odv]%`N]b1Y]]|eIZ}_-ZA]aj,>eFn+j[aQ_+]h[J_m_g]%_wf.`%k1e#Z?{CvYu_B^|gk`Xfh^M3`afGZ-Z|[m{L}|k3cp[it ^>YUi~d>{T*}YJ{Q5{Jxa$hg|%4`}|LAgvb }G}{P=|<;Ux{_skR{cV|-*|s-{Mp|XP|$G|_J}c6cM{_=_D|*9^$ec{V;|4S{qO|w_|.7}d0|/D}e}|0G{Dq]Kdp{}dfDi>}B%{Gd|nl}lf{C-{y}|ANZr}#={T~|-(}c&{pI|ft{lsVP}){|@u}!W|bcmB{d?|iW|:dxj{PSkO|Hl]Li:}VYk@|2={fnWt{M3`cZ6|)}|Xj}BYa?vo{e4|L7|B7{L7|1W|lvYO}W8nJ|$Vih|{T{d*_1|:-n2dblk``fT{Ky|-%}m!|Xy|-a{Pz}[l{kFjz|iH}9N{WE{x,|jz}R {P|{D)c=nX|Kq|si}Ge{sh|[X{RF{t`|jsr*fYf,rK|/9}$}}Nf{y!1|<Std}4Wez{W${Fd_/^O[ooqaw_z[L`Nbv[;l7V[ii3_PeM}.h^viqYjZ*j1}+3{bt{DR[;UG}3Og,rS{JO{qw{d<_zbAh<R[1_r`iZTbv^^a}c{iEgQZ<exZFg.^Rb+`Uj{a+{z<[~r!]`[[|rZYR|?F|qppp]L|-d|}K}YZUM|=Y|ktm*}F]{D;g{uI|7kg^}%?Z%ca{N[_<q4xC]i|PqZC]n}.bDrnh0Wq{tr|OMn6tM|!6|T`{O`|>!]ji+]_bTeU}Tq|ds}n|{Gm{z,f)}&s{DPYJ`%{CGd5v4tvb*hUh~bf]z`jajiFqAii]bfy^U{Or|m+{I)cS|.9k:e3`^|xN}@Dnlis`B|Qo{`W|>||kA}Y}{ERYuYx`%[exd`]|OyiHtb}HofUYbFo![5|+]gD{NIZR|Go}.T{rh^4]S|C9_}xO^i`vfQ}C)bK{TL}cQ|79iu}9a];sj{P.o!f[Y]pM``Jda^Wc9ZarteBZClxtM{LW}l9|a.mU}KX}4@{I+f1}37|8u}9c|v${xGlz}jP{Dd1}e:}31}%3X$|22i<v+r@~mf{sN{C67G97855F4YL5}8f{DT|xy{sO{DXB334@55J1)4.G9A#JDYtXTYM4, YQD9;XbXm9SX]IB^4UN=Xn<5(;(F3YW@XkH-X_VM[DYM:5XP!T&Y`6|,^{IS-*D.H>:LXjYQ0I3XhAF:9:(==.F*3F1189K/7163D,:@|e2{LS36D4hq{Lw/84443@4.933:0307::6D7}&l{Mx657;89;,K5678H&93D(H<&<>0B90X^I;}Ag1{P%3A+>><975}[S{PZE453?4|T2{Q+5187;>447:81{C=hL6{Me^:=7ii{R=.=F<81;48?|h8}Uh{SE|,VxL{ST,7?9Y_5Xk3A#:$%YSYdXeKXOD8+TXh7(@>(YdXYHXl9J6X_5IXaL0N?3YK7Xh!1?XgYz9YEXhXaYPXhC3X`-YLY_XfVf[EGXZ5L8BXL9YHX]SYTXjLXdJ: YcXbQXg1PX]Yx4|Jr{Ys4.8YU+XIY`0N,<H%-H;:0@,74/:8546I=9177154870UC]d<C3HXl7ALYzXFXWP<<?E!88E5@03YYXJ?YJ@6YxX-YdXhYG|9o{`iXjY_>YVXe>AYFX[/(I@0841?):-B=14337:8=|14{c&93788|di{cW-0>0<097/A;N{FqYpugAFT%X/Yo3Yn,#=XlCYHYNX[Xk3YN:YRT4?)-YH%A5XlYF3C1=NWyY}>:74-C673<69545v {iT85YED=64=.F4..9878/D4378?48B3:7:7/1VX[f4{D,{l<5E75{dAbRB-8-@+;DBF/$ZfW8S<4YhXA.(5@*11YV8./S95C/0R-A4AXQYI7?68167B95HA1*<M3?1/@;/=54XbYP36}lc{qzSS38:19?,/39193574/66878Yw1X-87E6=;964X`T734:>86>1/=0;(I-1::7ALYGXhF+Xk[@W%TYbX7)KXdYEXi,H-XhYMRXfYK?XgXj.9HX_SX]YL1XmYJ>Y}WwIXiI-3-GXcYyXUYJ$X`Vs[7;XnYEZ;XF! 3;%8;PXX(N3Y[)Xi1YE&/ :;74YQ6X`33C;-(>Xm0(TYF/!YGXg8 9L5P01YPXO-5%C|qd{{/K/E6,=0144:361:955;6443@?B7*7:F89&F35YaX-CYf,XiFYRXE_e{}sF 0*7XRYPYfXa5YXXY8Xf8Y~XmA[9VjYj*#YMXIYOXk,HHX40YxYMXU8OXe;YFXLYuPXP?EB[QV0CXfY{:9XV[FWE0D6X^YVP*$4%OXiYQ(|xp|%c3{}V`1>Y`XH00:8/M6XhQ1:;3414|TE|&o@1*=81G8<3}6<|(f6>>>5-5:8;093B^3U*+*^*UT30XgYU&7*O1953)5@E78--F7YF*B&0:%P68W9Zn5974J9::3}Vk|-,C)=)1AJ4+<3YGXfY[XQXmT1M-XcYTYZXCYZXEYXXMYN,17>XIG*SaS|/eYJXbI?XdNZ+WRYP<F:R PXf;0Xg`$|1GX9YdXjLYxWX!ZIXGYaXNYm6X9YMX?9EXmZ&XZ#XQ>YeXRXfAY[4 ;0X!Zz0XdN$XhYL XIY^XGNXUYS/1YFXhYk.TXn4DXjB{jg|4DEX]:XcZMW=A.+QYL<LKXc[vV$+&PX*Z3XMYIXUQ:ZvW< YSXFZ,XBYeXMM)?Xa XiZ4/EXcP3%}&-|6~:1(-+YT$@XIYRBC<}&,|7aJ6}bp|8)K1|Xg|8C}[T|8Q.89;-964I38361<=/;883651467<7:>?1:.}le|:Z=39;1Y^)?:J=?XfLXbXi=Q0YVYOXaXiLXmJXO5?.SFXiCYW}-;|=u&D-X`N0X^,YzYRXO(QX_YW9`I|>hZ:N&X)DQXP@YH#XmNXi$YWX^=!G6YbYdX>XjY|XlX^XdYkX>YnXUXPYF)FXT[EVTMYmYJXmYSXmNXi#GXmT3X8HOX[ZiXN]IU2>8YdX1YbX<YfWuZ8XSXcZU%0;1XnXkZ_WTG,XZYX5YSX Yp 05G?XcYW(IXg6K/XlYP4XnI @XnO1W4Zp-9C@%QDYX+OYeX9>--YSXkD.YR%Q/Yo YUX].Xi<HYEZ2WdCE6YMXa7F)=,D>-@9/8@5=?7164;35387?N<618=6>7D+C50<6B03J0{Hj|N9$D,9I-,.KB3}m |NzE0::/81YqXjMXl7YG; [.W=Z0X4XQY]:MXiR,XgM?9$9>:?E;YE77VS[Y564760391?14941:0=:8B:;/1DXjFA-564=0B3XlH1+D85:0Q!B#:-6&N/:9<-R3/7Xn<*3J4.H:+334B.=>30H.;3833/76464665755:/83H6633:=;.>5645}&E|Y)?1/YG-,93&N3AE@5 <L1-G/8A0D858/30>8<549=@B8] V0[uVQYlXeD(P#ID&7T&7;Xi0;7T-$YE)E=1:E1GR):--0YI7=E<}n9|aT6783A>D7&4YG7=391W;Zx<5+>F#J39}o/|cc;6=A050EQXg8A1-}D-|d^5548083563695D?-.YOXd37I$@LYLWeYlX<Yd+YR A$;3-4YQ-9XmA0!9/XLY_YT(=5XdDI>YJ5XP1ZAW{9>X_6R(XhYO65&J%DA)C-!B:97#A9;@?F;&;(9=11/=657/H,<8}bz|j^5446>.L+&Y^8Xb6?(CYOXb*YF(8X`FYR(XPYVXmPQ%&DD(XmZXW??YOXZXfCYJ79,O)XnYF7K0!QXmXi4IYFRXS,6<%-:YO(+:-3Q!1E1:W,Zo}Am|n~;3580534*?3Zc4=9334361693:30C<6/717:<1/;>59&:4}6!|rS36=1?75<8}[B|s809983579I.A.>84758=108564741H*9E{L{|u%YQ<%6XfH.YUXe4YL@,>N}Tv|ve*G0X)Z;/)3@A74(4P&A1X:YVH97;,754*A66:1 D739E3553545558E4?-?K17/770843XAYf838A7K%N!YW4.$T19Z`WJ*0XdYJXTYOXNZ 1XaN1A+I&Xi.Xk3Z3GB&5%WhZ1+5#Y[X<4YMXhQYoQXVXbYQ8XSYUX4YXBXWDMG0WxZA[8V+Z8X;D],Va$%YeX?FXfX[XeYf<X:Z[WsYz8X_Y]%XmQ(!7BXIZFX]&YE3F$(1XgYgYE& +[+W!<YMYFXc;+PXCYI9YrWxGXY9DY[!GXiI7::)OC;*$.>N*HA@{C|}&k=:<TB83X`3YL+G4XiK]i}(fYK<=5$.FYE%4*5*H*6XkCYL=*6Xi6!Yi1KXR4YHXbC8Xj,B9ZbWx/XbYON#5B}Ue}+QKXnF1&YV5XmYQ0!*3IXBYb71?1B75XmF;0B976;H/RXU:YZX;BG-NXj;XjI>A#D3B636N;,*%<D:0;YRXY973H5)-4FXOYf0:0;/7759774;7;:/855:543L43<?6=E,.A4:C=L)%4YV!1(YE/4YF+ F3%;S;&JC:%/?YEXJ4GXf/YS-EXEYW,9;E}X$}547EXiK=51-?71C%?57;5>463553Zg90;6447?<>4:9.7538XgN{|!}9K/E&3-:D+YE1)YE/3;37/:05}n<}:UX8Yj4Yt864@JYK..G=.(A Q3%6K>3(P3#AYE$-6H/456*C=.XHY[#S.<780191;057C)=6HXj?955B:K1 E>-B/9,;5.!L?:0>/.@//:;7833YZ56<4:YE=/:7Z_WGC%3I6>XkC*&NA16X=Yz2$X:Y^&J48<99k8}CyB-61<18K946YO4{|N}E)YIB9K0L>4=46<1K0+R;6-=1883:478;4,S+3YJX`GJXh.Yp+Xm6MXcYpX(>7Yo,/:X=Z;Xi0YTYHXjYmXiXj;*;I-8S6N#XgY}.3XfYGO3C/$XjL$*NYX,1 6;YH&<XkK9C#I74.>}Hd`A748X[T450[n75<4439:18A107>|ET}Rf<1;14876/Yb983E<5.YNXd4149>,S=/4E/<306443G/06}0&}UkYSXFYF=44=-5095=88;63844,9E6644{PL}WA8:>)7+>763>>0/B3A545CCnT}Xm|dv}Xq1L/YNXk/H8;;.R63351YY747@15YE4J8;46;.38.>4A369.=-83,;Ye3?:3@YE.4-+N353;/;@(X[YYD>@/05-I*@.:551741Yf5>6A443<3535;.58/86=D4753442$635D1>0359NQ @73:3:>><Xn?;43C14 ?Y|X611YG1&<+,4<*,YLXl<1/AIXjF*N89A4Z576K1XbJ5YF.ZOWN.YGXO/YQ01:4G38Xl1;KI0YFXB=R<7;D/,/4>;$I,YGXm94@O35Yz66695385.>:6A#5}W7n^4336:4157597434433<3|XA}m`>=D>:4A.337370?-6Q96{`E|4A}C`|Qs{Mk|J+~r>|o,wHv>Vw}!c{H!|Gb|*Ca5}J||,U{t+{CN[!M65YXOY_*B,Y[Z9XaX[QYJYLXPYuZ%XcZ8LY[SYPYKZM<LMYG9OYqSQYM~[e{UJXmQYyZM_)>YjN1~[f3{aXFY|Yk:48YdH^NZ0|T){jVFYTZNFY^YTYN~[h{nPYMYn3I]`EYUYsYIZEYJ7Yw)YnXPQYH+Z.ZAZY]^Z1Y`YSZFZyGYHXLYG 8Yd#4~[i|+)YH9D?Y^F~Y7|-eYxZ^WHYdYfZQ~[j|3>~[k|3oYmYqY^XYYO=Z*4[]Z/OYLXhZ1YLZIXgYIHYEYK,<Y`YEXIGZI[3YOYcB4SZ!YHZ*&Y{Xi3~[l|JSY`Zz?Z,~[m|O=Yi>??XnYWXmYS617YVYIHZ(Z4[~L4/=~[n|Yu{P)|];YOHHZ}~[o33|a>~[r|aE]DH~[s|e$Zz~[t|kZFY~XhYXZB[`Y}~[u|{SZ&OYkYQYuZ2Zf8D~[v}% ~[w3},Q[X]+YGYeYPIS~[y}4aZ!YN^!6PZ*~[z}?E~[{3}CnZ=~[}}EdDZz/9A3(3S<,YR8.D=*XgYPYcXN3Z5 4)~[~}JW=$Yu.XX~] }KDX`PXdZ4XfYpTJLY[F5]X~[2Yp}U+DZJ::<446[m@~]#3}]1~]%}^LZwZQ5Z`/OT<Yh^ -~]&}jx[ ~m<z!%2+~ly4VY-~o>}p62yz!%2+Xf2+~ly4VY-zQ`z (=] 2z~o2",C={" ":0,"!":1},c=34,i=2,p,s="",u=String.fromCharCode,t=u(12539);for(;++c<127;)C[u(c)]=c^39&&c^92?i++:0;i=0;for(;0<=(c=C[a.charAt(i++)]);)if(16===c)if((c=C[a.charAt(i++)])<87){if(86===c)c=1879;for(;c--;)s+=u(++p)}else s+=s.substr(8272,360);else if(c<86)s+=u(p+=c<51?c-16:(c-55)*92+C[a.charAt(i++)]);else if((c=((c-86)*92+C[a.charAt(i++)])*92+C[a.charAt(i++)])<49152)s+=u(p=c<40960?c:c|57344);else{c&=511;for(;c--;)s+=t;p=12539}return s')();
	function decodeToShiftJis(str) {
		return str.replace(/%(8[1-9A-F]|[9E][0-9A-F]|F[0-9A-C])(%[4-689A-F][0-9A-F]|%7[0-9A-E]|[@-~])|%([0-7][0-9A-F]|A[1-9A-F]|[B-D][0-9A-F])/ig, function (s) {
			var c = parseInt(s.substring(1, 3), 16);
			var l = s.length;
			return 3 === l ? String.fromCharCode(c < 160 ? c : c + 65216) : JCT11280.charAt((c < 160 ? c - 129 : c - 193) * 188 + (4 === l ? s.charCodeAt(3) - 64 : (c = parseInt(s.substring(4), 16)) < 127 ? c - 64 : c - 65));
		});
	}
    function multiplicationMatrix(a, b) {
		return [
			a[0] * b[0] + a[2] * b[1], // ScaleX
			a[1] * b[0] + a[3] * b[1], // RotateSkew0
			a[0] * b[2] + a[2] * b[3], // RotateSkew1
			a[1] * b[2] + a[3] * b[3], // ScaleY
			a[0] * b[4] + a[2] * b[5] + a[4], // TranslateX
			a[1] * b[4] + a[3] * b[5] + a[5] // TranslateY
		];
	}
	function multiplicationColor(a, b) {
		return [
			a[0] * b[0], // Red Multiply
			a[1] * b[1], // Green Multiply
			a[2] * b[2], // Blue Multiply
			a[3] * b[3], // Alpha Multiply
			a[0] * b[4] + a[4], // Red Addition
			a[1] * b[5] + a[5], // Green Addition
			a[2] * b[6] + a[6], // Blue Addition
			a[3] * b[7] + a[7] // Transparency Addition
		];
	}
	// resultX: x * ScaleX + y * RotateSkew1 + TranslateX
	// resultY: x * RotateSkew0 + y * ScaleY + TranslateY
	function generateMatrix(point, data) {
		return [(point[0] * data[0] + point[1] * data[2] + data[4]), point[0] * data[1] + point[1] * data[3] + data[5]];
	}
	function generateColorTransform(color, data) {
		return [
			Math.max(0, Math.min((color[0] * data[0]) + data[4], 255)) | 0, // Red
			Math.max(0, Math.min((color[1] * data[1]) + data[5], 255)) | 0, // Green
			Math.max(0, Math.min((color[2] * data[2]) + data[6], 255)) | 0, // Blue
			Math.max(0, Math.min((color[3] * 255 * data[3]) + data[7], 255)) / 255 // Alpha
		];		
	}
	function boundsMatrix(bounds, matrix, object) {
		var no = Number.MAX_VALUE;
		var xMax = -no;
		var yMax = -no;
		var xMin = no;
		var yMin = no;
		if (object) {
			xMin = object.xMin;
			xMax = object.xMax;
			yMin = object.yMin;
			yMax = object.yMax;
		}
		var _xMin = bounds.xMin;
		var _xMax = bounds.xMax;
		var _yMin = bounds.yMin;
		var _yMax = bounds.yMax;
		var x0 = _xMax * matrix[0] + _yMax * matrix[2] + matrix[4];
		var x1 = _xMax * matrix[0] + _yMin * matrix[2] + matrix[4];
		var x2 = _xMin * matrix[0] + _yMax * matrix[2] + matrix[4];
		var x3 = _xMin * matrix[0] + _yMin * matrix[2] + matrix[4];
		var y0 = _xMax * matrix[1] + _yMax * matrix[3] + matrix[5];
		var y1 = _xMax * matrix[1] + _yMin * matrix[3] + matrix[5];
		var y2 = _xMin * matrix[1] + _yMax * matrix[3] + matrix[5];
		var y3 = _xMin * matrix[1] + _yMin * matrix[3] + matrix[5];
		return {
			xMin: Math.min(Math.min(Math.min(Math.min(xMin, x0), x1), x2), x3),
			xMax: Math.max(Math.max(Math.max(Math.max(xMax, x0), x1), x2), x3),
			yMin: Math.min(Math.min(Math.min(Math.min(yMin, y0), y1), y2), y3),
			yMax: Math.max(Math.max(Math.max(Math.max(yMax, y0), y1), y2), y3)
		};
	}
	const toInt16 = function(value) {
		return (value < 0x8000) ? value : (value - 0x10000);
	}
	function _executeCmdCtx2dPath(ctx, cmd) {
		for (let i = 0; i < cmd.length; i++) {
			const cmm = cmd[i];
			if (cmm[0] == 0) {
				ctx.moveTo(cmm[1], cmm[2]);
			} else if (cmm[0] == 1) {
				ctx.quadraticCurveTo(cmm[1], cmm[2], cmm[3], cmm[4]);
			} else if (cmm[0] == 2) {
				ctx.lineTo(cmm[1], cmm[2]);
			}
		}
	}
	const ByteStream = function(arrayBuffer, start = 0, end = arrayBuffer.byteLength) {
		this.arrayBuffer = arrayBuffer;
		this.dataView = new DataView(arrayBuffer);
		this.start = start;
		this.end = end;
		this.bit_offset = 0;
		this._position = 0;
		this.littleEndian = true;
	}
	Object.defineProperties(ByteStream.prototype, {
		"position": {
			get: function() {
				return this._position - this.start;
			},
			set: function(value) {
				this._position = (value + this.start);
			}
		}
	});
	ByteStream.prototype.readString = function(length) {
		var str = "";
		var count = length;
		while (count) {
			var code = this.dataView.getUint8(this._position++);
			str += String.fromCharCode(code);
			count--;
		}
		return str;
	}
	ByteStream.prototype.readBytes = function(length) {
		this.byteAlign();
		var bytes = this.arrayBuffer.slice(this._position, this._position + length);
		this._position += length;
		return bytes;
	}
	ByteStream.prototype.readStringWithUntil = function() {
		this.byteAlign();
		var bo = this._position;
		var offset = 0;
		var length = this.end;
		var ret = '';
		while (true) {
			var val = this.dataView.getUint8(bo + offset);
			offset++;
			if (val === 0 || (bo + offset) >= length) {
				break;
			}
			ret += String.fromCharCode(val);
		}
		this._position = bo + offset;
		return ret;
	}
	ByteStream.prototype.readStringWithLength = function() {
		var count = this.readUint8();
		var val = '';
		while (count--) {
			var dat = this.dataView.getUint8(this._position++);;
			if (dat == 0) {
				continue;
			}
			val += String.fromCharCode(dat);
		}
		return val;
	}
	ByteStream.prototype.incrementOffset = function(byteInt, bitInt) {
		this._position += byteInt;
		this.bit_offset += bitInt;
		this.byteCarry();
	}
	ByteStream.prototype.setOffset = function(byteInt, bitInt) {
		this._position = byteInt + this.start;
		this.bit_offset = bitInt;
	}
	ByteStream.prototype.getLength = function() {
		return this.end - this.start;
	};
	ByteStream.prototype.getBytesAvailable = function() {
		return this.end - this._position;
	};
	//////// ByteReader ////////
	ByteStream.prototype.byteAlign = function() {
		if (!this.bit_offset) return;
		this._position += ((this.bit_offset + 7) / 8) | 0;
		this.bit_offset = 0;
	}
	ByteStream.prototype.readUint8 = function() {
		this.byteAlign();
		return this.dataView.getUint8(this._position++);
	}
	ByteStream.prototype.readUint16 = function() {
		this.byteAlign();
		var value = this.dataView.getUint16(this._position, this.littleEndian);
		this._position += 2;
		return value;
	}
	ByteStream.prototype.readUint24 = function() {
		this.byteAlign();
		var value = this.dataView.getUint8(this._position++);
		value += (0x100 * this.dataView.getUint8(this._position++));
		value += (0x10000 * this.dataView.getUint8(this._position++));
		return value;
	}
	ByteStream.prototype.readUint32 = function() {
		this.byteAlign();
		var value = this.dataView.getUint32(this._position, this.littleEndian);
		this._position += 4;
		return value;
	}
	ByteStream.prototype.readUint64 = function() {
		this.byteAlign();
		var value = this.dataView.getUint8(this._position++);
		value += (0x100 * this.dataView.getUint8(this._position++));
		value += (0x10000 * this.dataView.getUint8(this._position++));
		value += (0x1000000 * this.dataView.getUint8(this._position++));
		value += (0x100000000 * this.dataView.getUint8(this._position++));
		value += (0x10000000000 * this.dataView.getUint8(this._position++));
		value += (0x1000000000000 * this.dataView.getUint8(this._position++));
		value += ((0x100000000 * 0x1000000) * this.dataView.getUint8(this._position++));
		return value;
	}
	ByteStream.prototype.readInt8 = function() {
		this.byteAlign();
		return this.dataView.getInt8(this._position++);
	}
	ByteStream.prototype.readInt16 = function() {
		this.byteAlign();
		var value = this.dataView.getInt16(this._position, this.littleEndian);
		this._position += 2;
		return value;
	}
	ByteStream.prototype.readInt24 = function() {
		let t = this.readUint24();
		return t >> 23 && (t -= 16777216),t
	}
	ByteStream.prototype.readInt32 = function() {
		this.byteAlign();
		var value = this.dataView.getInt32(this._position, this.littleEndian);
		this._position += 4;
		return value;
	}
	ByteStream.prototype.readFixed8 = function() {
		return +(this.readInt16() / 0x100).toFixed(1);
	}
	ByteStream.prototype.readFixed16 = function() {
		return +(this.readInt32() / 0x10000).toFixed(2);
	}
	ByteStream.prototype.readFloat16 = function() {
		const t = this.dataView.getUint8(this._position++);
		let e = 0;
		return e |= this.dataView.getUint8(this._position++) << 8,e |= t << 0,e
	}
	ByteStream.prototype.readFloat32 = function() {
		var t = this.dataView.getUint8(this._position++);
		var e = this.dataView.getUint8(this._position++)
		var s = this.dataView.getUint8(this._position++);
		var a = 0;
		a |= this.dataView.getUint8(this._position++) << 24,a |= s << 16,a |= e << 8,a |= t << 0;
		const i = a >> 23 & 255;
		return a && 2147483648 !== a ? (2147483648 & a ? -1 : 1) * (8388608 | 8388607 & a) * Math.pow(2, i - 127 - 23) : 0
	}
	ByteStream.prototype.readFloat64 = function() {
		var upperBits = this.readUint32();
		var lowerBits = this.readUint32();
		var sign = upperBits >>> 31 & 0x1;
		var exp = upperBits >>> 20 & 0x7FF;
		var upperFraction = upperBits & 0xFFFFF;
		return (!upperBits && !lowerBits) ? 0 : ((sign === 0) ? 1 : -1) * (upperFraction / 1048576 + lowerBits / 4503599627370496 + 1) * Math.pow(2, exp - 1023);
	}
	ByteStream.prototype.readDouble = function() {
		var v = this.dataView.getFloat64(this._position, this.littleEndian);
		this._position += 8;
		return v;
	}
	ByteStream.prototype.getU30 = function() {
		this.byteAlign();
		let t = 0;
		for (let e = 0; 5 > e; ++e) {
			const s = this.dataView.getUint8(this._position++);
			if (t |= (127 & s) << 7 * e, !(128 & s)) break
		}
		return t
	}
	ByteStream.prototype.getS30 = function() {
		const t = this._position;
		let e = this.getU30();
		const s = 8 * (this._position - t) | 0;
		return e >> s - 1 && (e -= Math.pow(2, s)),e
	}
	//////// BitReader ////////
	ByteStream.prototype.byteCarry = function() {
		if (this.bit_offset > 7) {
			this._position += ((this.bit_offset + 7) / 8) | 0;
			this.bit_offset &= 0x07;
		} else {
			while (this.bit_offset < 0) {
				this._position--;
				this.bit_offset += 8;
			}
		}
	}
	ByteStream.prototype.getUIBits = function(n) {
		var value = 0;
		while (n--) {
			value <<= 1;
			value |= this.getUIBit();
		}
		return value;
	}
	ByteStream.prototype.getUIBit = function() {
		this.byteCarry();
		return (this.dataView.getUint8(this._position) >> (7 - this.bit_offset++)) & 0x1;	
	}
	ByteStream.prototype.getSIBits = function(n) {
		var value = this.getUIBits(n);
		var msb = value & (0x1 << (n - 1));
		if (msb) {
			var bitMask = (2 * msb) - 1;
			return -(value ^ bitMask) - 1;
		}
		return value;
	}
	ByteStream.prototype.getSIBitsFixed8 = function(n) {
		return +(this.getSIBits(n) / 0x100).toFixed(2);
	}
	ByteStream.prototype.getSIBitsFixed16 = function(n) {
		return +(this.getSIBits(n) / 0x10000).toFixed(4);
	}
    const ZLib = function(data, size, startOffset) {
		this.stream = new Uint8Array(data);
		this.isEnd = false;
		this.result = null;
		this.size = size + startOffset;
		this.loaded = 0;
		this.isLoad = false;
		this._data = new Uint8Array(size);
		for (let i = 0; i < startOffset; i++) {
			this._data[i] = this.stream[i];
		}
		this._size = startOffset;
		this.byte_offset = startOffset + 2;
		this.bit_offset = 8;
		this.bit_buffer = null;
	}
	ZLib.fixedDistTable = {
		key: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
		value: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
	}
	ZLib.fixedLitTable = {
		key: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
		value: [256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 280, 281, 282, 283, 284, 285, 286, 287, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255]
	}
	ZLib.ORDER = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
	ZLib.LEXT = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99]);
	ZLib.LENS = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]);
	ZLib.DEXT = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]);
	ZLib.DISTS = new Uint16Array([ 1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577]);
	ZLib.decompress = function(arrayBuffer, uncompressedSizesize, startOffset) {
		var r = new ZLib(arrayBuffer, uncompressedSizesize, startOffset || 0);
		return r.tick(true);
	}
	ZLib.prototype.readUB = function(length) {
		var value = 0;
		for (var i = 0; i < length; i++) {
			if (this.bit_offset === 8) {
				this.bit_buffer = this.readNumber(1);
				this.bit_offset = 0;
			}
			value |= (this.bit_buffer & (1 << this.bit_offset++) ? 1 : 0) << i;
		}
		return value;
	}
	ZLib.prototype.readNumber = function(n) {
		var value = 0;
		var o = this.byte_offset;
		var i = o + n;
		while (i > o) {
			value = (value << 8) | this.stream[--i];
		}
		this.byte_offset += n;
		return value;
	}
	ZLib.prototype.tick = function(tsTurbo) {
		if (this.isEnd) {
			return;
		}
		var _buildHuffTable = this.buildHuffTable.bind(this);
		var _decodeSymbol = this.decodeSymbol.bind(this);
		var sym = 0;
		var i = 0;
		var length = 0;
		var data = this._data;
		var _this = this;
		var flag = 0;
		var _size = this._size;
		var startTime = Date.now();
		while (true) {
			flag = _this.readUB(1);
			var type = _this.readUB(2);
			var distTable = null;
			var litTable = null;
			switch (type) {
				case 0:
					this.bit_offset = 8;
					this.bit_buffer = null;
					length = _this.readNumber(2);
					_this.readNumber(2);
					while (length--) {
						data[_size++] = _this.readNumber(1);
					}
					break;
				default:
					switch (type) {
						case 1:
							distTable = ZLib.fixedDistTable;
							litTable = ZLib.fixedLitTable;
							break;
						default:
							const numLitLengths = _this.readUB(5) + 257;
							const numDistLengths = _this.readUB(5) + 1;
							const numCodeLengths = _this.readUB(4) + 4;
							var codeLengths = new Uint8Array(19);
							for (i = 0; i < numCodeLengths; i++) {
								codeLengths[ZLib.ORDER[i]] = _this.readUB(3);
							}
							const codeTable = _buildHuffTable(codeLengths);
							codeLengths = null;
							var prevCodeLen = 0;
							const maxLengths = numLitLengths + numDistLengths;
							const litLengths = new Array(maxLengths);
							let litLengthSize = 0;
							while (litLengthSize < maxLengths) {
								sym = _decodeSymbol(_this, codeTable.key, codeTable.value);
								switch (sym) {
									case 0:
									case 1:
									case 2:
									case 3:
									case 4:
									case 5:
									case 6:
									case 7:
									case 8:
									case 9:
									case 10:
									case 11:
									case 12:
									case 13:
									case 14:
									case 15:
										litLengths[litLengthSize++] = sym;
										prevCodeLen = sym;
										break;
									case 16:
										i = _this.readUB(2) + 3;
										while (i--) {
											litLengths[litLengthSize++] = prevCodeLen;
										}
										break;
									case 17:
										i = _this.readUB(3) + 3;
										while (i--) {
											litLengths[litLengthSize++] = 0;
										}
										break;
									case 18:
										i = _this.readUB(7) + 11;
										while (i--) {
											litLengths[litLengthSize++] = 0;
										}
										break;
								}
							}
							distTable = _buildHuffTable(litLengths.splice(numLitLengths, numDistLengths));
							litTable = _buildHuffTable(litLengths);
					}
					sym = 0;
					while (true) {
						sym = (0 | _decodeSymbol(_this, litTable.key, litTable.value));
						if (256 === sym) break;
						if (sym < 256) {
							data[_size++] = sym;
						} else {
							const mapIdx = sym - 257 | 0;
							length = ZLib.LENS[mapIdx] + _this.readUB(ZLib.LEXT[mapIdx]) | 0;
							const distMap = _decodeSymbol(_this, distTable.key, distTable.value);
							i = _size - (ZLib.DISTS[distMap] + _this.readUB(ZLib.DEXT[distMap]) | 0) | 0;
							while (length--) {
								data[_size++] = data[i++];
							}
						}
					}
			}
			if (flag) {
				this.isEnd = true;
				this.isLoad = true;
				if (_size !== this._data.length) {
					console.log("ZLib: " + _size + " == " + this._data.length + " has gone");
				}
				this.result = data.buffer;
				break;
			}
			if (!tsTurbo && ((Date.now() - startTime) > 20)) {
				break;
			}
		}
		if (tsTurbo) {
			return this.result;
		}
		this._size = _size;
		this.loaded = (_size / this.size);
	}
	ZLib.prototype.buildHuffTable = function(data) {
		const length = data.length;
		const blCount = [];
		const nextCode = [];
		var maxBits = 0;
		for (var i = 0; i < length; i++) {
			maxBits = Math.max(maxBits, data[i]);
		}
		maxBits++;
		i = length;
		var len = 0;
		while (i--) {
			len = data[i];
			blCount[len] = (blCount[len] || 0) + (len > 0);
		}
		var code = 0;
		for (i = 1; i < maxBits; i++) {
			len = i - 1;
			if (!(len in blCount)) {
				blCount[len] = 0;
			}
			code = (code + blCount[len]) << 1;
			nextCode[i] = code | 0;
		}
		var key = [];
		var value = [];
		for (i = 0; i < length; i++) {
			len = data[i];
			if (len) {
				const tt = nextCode[len];
				key[tt] = len;
				value[tt] = i;
				nextCode[len] = tt + 1 | 0;
			}
		}
		return {key, value};
	}
	ZLib.prototype.decodeSymbol = function(b, key, value) {
		var len = 0;
		var code = 0;
		while (true) {
			code = (code << 1) | b.readUB(1);
			len++;
			if (!(code in key)) {
				continue;
			}
			if (key[code] === len) {
				return value[code];
			}
		}
	}
    const LZMA = (function () {
		function __init(e) {
			const t = [];
			t.push(e[12], e[13], e[14], e[15], e[16], e[4], e[5], e[6], e[7]);
			let s = 8;
			for (let e = 5; e < 9; ++e) {
				if (t[e] >= s) {
					t[e] = t[e] - s | 0;
					break
				}
				t[e] = 256 + t[e] - s | 0,s = 1
			}
			return t.push(0, 0, 0, 0), e.set(t, 4),e.subarray(4)
		}
		function __reverseDecode2(e, t, s, i) {
			let r = 1, o = 0, d = 0;
			for (; d < i; ++d) {
				const i = s.decodeBit(e, t + r);
				r = r << 1 | i,o |= i << d
			}
			return o
		}
		function __decompress(e, t) {
			const s = new Decoder, i = s.decodeHeader(e), r = i.uncompressedSize;
			if (s.setProperties(i),!s.decodeBody(e, t, r))
				throw new Error("Error in lzma data stream");
			return t
		}
		const OutWindow = function() {
			this._buffer = null,
			this._stream = null,
			this._pos = 0,
			this._streamPos = 0,
			this._windowSize = 0
		}
		OutWindow.prototype.create = function(e) {
			this._buffer && this._windowSize === e || (this._buffer = new Uint8Array(e)),
			this._windowSize = e
		}
		OutWindow.prototype.flush = function() {
			const e = this._pos - this._streamPos;
			e && (this._stream.writeBytes(this._buffer, e),
			this._pos >= this._windowSize && (this._pos = 0),
			this._streamPos = this._pos)
		}
		OutWindow.prototype.releaseStream = function() {
			this.flush(),
			this._stream = null
		}
		OutWindow.prototype.setStream = function(e) {
			this._stream = e
		}
		OutWindow.prototype.init = function(e=!1) {
			e || (this._streamPos = 0,this._pos = 0)
		}
		OutWindow.prototype.copyBlock = function(e, t) {
			let s = this._pos - e - 1;
			for (s < 0 && (s += this._windowSize); t--; )
				s >= this._windowSize && (s = 0),
				this._buffer[this._pos++] = this._buffer[s++],
				this._pos >= this._windowSize && this.flush()
		}
		OutWindow.prototype.putByte = function(e) {
			this._buffer[this._pos++] = e,
			this._pos >= this._windowSize && this.flush()
		}
		OutWindow.prototype.getByte = function(e) {
			let t = this._pos - e - 1;
			return t < 0 && (t += this._windowSize),this._buffer[t]
		}
		const RangeDecoder = function() {
			this._stream = null,
			this._code = 0,
			this._range = -1
		}
		RangeDecoder.prototype.setStream = function(e) {
			this._stream = e
		}
		RangeDecoder.prototype.releaseStream = function() {
			this._stream = null
		}
		RangeDecoder.prototype.init = function() {
			let e = 5;
			for (this._code = 0,this._range = -1; e--; ) this._code = this._code << 8 | this._stream.readByte()
		}
		RangeDecoder.prototype.decodeDirectBits = function(e) {
			let t = 0, s = e;
			for (; s--; ) {
				this._range >>>= 1;
				const e = this._code - this._range >>> 31;
				this._code -= this._range & e - 1,t = t << 1 | 1 - e,0 == (4278190080 & this._range) && (this._code = this._code << 8 | this._stream.readByte(),this._range <<= 8)
			}
			return t
		}
		RangeDecoder.prototype.decodeBit = function(e, t) {
			const s = e[t], i = (this._range >>> 11) * s;
			return (2147483648 ^ this._code) < (2147483648 ^ i) ? (this._range = i,e[t] += 2048 - s >>> 5,0 == (4278190080 & this._range) && (this._code = this._code << 8 | this._stream.readByte(),this._range <<= 8),0) : (this._range -= i,this._code -= i,e[t] -= s >>> 5,0 == (4278190080 & this._range) && (this._code = this._code << 8 | this._stream.readByte(),this._range <<= 8),1)
		}
		const BitTreeDecoder = function(e) {
			this._models = Array(1 << e).fill(1024),
			this._numBitLevels = e
		}
		BitTreeDecoder.prototype.decode = function(e) {
			let t = 1, s = this._numBitLevels;
			for (; s--; )t = t << 1 | e.decodeBit(this._models, t);
			return t - (1 << this._numBitLevels)
		}
		BitTreeDecoder.prototype.reverseDecode = function(e) {
			let t = 1, s = 0, i = 0;
			for (; i < this._numBitLevels; ++i) {
				const r = e.decodeBit(this._models, t);
				t = t << 1 | r,s |= r << i
			}
			return s
		}
		const LenDecoder = function() {
			this._choice = [1024, 1024],
			this._lowCoder = [],
			this._midCoder = [],
			this._highCoder = new BitTreeDecoder(8),
			this._numPosStates = 0
		}
		LenDecoder.prototype.create = function(e) {
			for (; this._numPosStates < e; ++this._numPosStates) this._lowCoder[this._numPosStates] = new BitTreeDecoder(3),this._midCoder[this._numPosStates] = new BitTreeDecoder(3)
		}
		LenDecoder.prototype.decode = function(e, t) {
			return 0 === e.decodeBit(this._choice, 0) ? this._lowCoder[t].decode(e) : 0 === e.decodeBit(this._choice, 1) ? 8 + this._midCoder[t].decode(e) : 16 + this._highCoder.decode(e)
		}
		const Decoder2 = function() {
            this._decoders = Array(768).fill(1024)
		}
		Decoder2.prototype.decodeNormal = function(e) {
			let t = 1;
			do {
				t = t << 1 | e.decodeBit(this._decoders, t)
			} while (t < 256);return 255 & t
		}
		Decoder2.prototype.decodeWithMatchByte = function(e, t) {
			let s = 1;
			do {
				const i = t >> 7 & 1;
				t <<= 1;
				const r = e.decodeBit(this._decoders, (1 + i << 8) + s);
				if (s = s << 1 | r,i !== r) {
					for (; s < 256; )s = s << 1 | e.decodeBit(this._decoders, s);
					break
				}
			} while (s < 256);return 255 & s
		}
		const LiteralDecoder = function() {
		}
		LiteralDecoder.prototype.create = function(e, t) {
			if (this._coders && this._numPrevBits === t && this._numPosBits === e) return;
			this._numPosBits = e,
			this._posMask = (1 << e) - 1,
			this._numPrevBits = t,
			this._coders = [];
			let s = 1 << this._numPrevBits + this._numPosBits;
			for (; s--; )this._coders[s] = new Decoder2
		}
		LiteralDecoder.prototype.getDecoder = function(e, t) {
			return this._coders[((e & this._posMask) << this._numPrevBits) + ((255 & t) >>> 8 - this._numPrevBits)]
		}
		const Decoder = function() {
			this._outWindow = new OutWindow,
			this._rangeDecoder = new RangeDecoder,
			this._isMatchDecoders = Array(192).fill(1024),
			this._isRepDecoders = Array(12).fill(1024),
			this._isRepG0Decoders = Array(12).fill(1024),
			this._isRepG1Decoders = Array(12).fill(1024),
			this._isRepG2Decoders = Array(12).fill(1024),
			this._isRep0LongDecoders = Array(192).fill(1024),
			this._posDecoders = Array(114).fill(1024),
			this._posAlignDecoder = new BitTreeDecoder(4),
			this._lenDecoder = new LenDecoder,
			this._repLenDecoder = new LenDecoder,
			this._literalDecoder = new LiteralDecoder,
			this._dictionarySize = -1,
			this._dictionarySizeCheck = -1,
			this._posSlotDecoder = [new BitTreeDecoder(6), new BitTreeDecoder(6), new BitTreeDecoder(6), new BitTreeDecoder(6)]
		}
		Decoder.prototype.setDictionarySize = function(e) {
			return !(e < 0) && (this._dictionarySize !== e && (this._dictionarySize = e,this._dictionarySizeCheck = Math.max(this._dictionarySize, 1),this._outWindow.create(Math.max(this._dictionarySizeCheck, 4096))),!0)
		}
		Decoder.prototype.setLcLpPb = function(e, t, s) {
			if (e > 8 || t > 4 || s > 4)return !1;
			const i = 1 << s;
			return this._literalDecoder.create(t, e),this._lenDecoder.create(i),this._repLenDecoder.create(i),this._posStateMask = i - 1,!0
		}
		Decoder.prototype.setProperties = function(e) {
			if (!this.setLcLpPb(e.lc, e.lp, e.pb))throw Error("Incorrect stream properties");
			if (!this.setDictionarySize(e.dictionarySize))throw Error("Invalid dictionary size")
		}
		Decoder.prototype.decodeHeader = function(e) {
			if (e._$size < 13)return !1;
			let t = e.readByte();
			const s = t % 9;
			t = ~~(t / 9);
			const i = t % 5, r = ~~(t / 5);let o = e.readByte();o |= e.readByte() << 8,o |= e.readByte() << 16,o += 16777216 * e.readByte();let d = e.readByte();return d |= e.readByte() << 8,d |= e.readByte() << 16,d += 16777216 * e.readByte(),e.readByte(),e.readByte(),e.readByte(),e.readByte(),{lc: s,lp: i,pb: r,dictionarySize: o,uncompressedSize: d}
		}
		Decoder.prototype.decodeBody = function(e, t, s) {
			let i, r, o = 0, d = 0, h = 0, c = 0, n = 0, _ = 0, a = 0;
			for (this._rangeDecoder.setStream(e),this._rangeDecoder.init(),this._outWindow.setStream(t),this._outWindow.init(!1); _ < s; ) {
				const e = _ & this._posStateMask;if (0 === this._rangeDecoder.decodeBit(this._isMatchDecoders, (o << 4) + e)) {
					const e = this._literalDecoder.getDecoder(_++, a);a = o >= 7 ? e.decodeWithMatchByte(this._rangeDecoder, this._outWindow.getByte(d)) : e.decodeNormal(this._rangeDecoder),this._outWindow.putByte(a),o = o < 4 ? 0 : o - (o < 10 ? 3 : 6)
				} else {
					if (1 === this._rangeDecoder.decodeBit(this._isRepDecoders, o))i = 0,0 === this._rangeDecoder.decodeBit(this._isRepG0Decoders, o) ? 0 === this._rangeDecoder.decodeBit(this._isRep0LongDecoders, (o << 4) + e) && (o = o < 7 ? 9 : 11,i = 1) : (0 === this._rangeDecoder.decodeBit(this._isRepG1Decoders, o) ? r = h : (0 === this._rangeDecoder.decodeBit(this._isRepG2Decoders, o) ? r = c : (r = n,n = c),c = h),h = d,d = r),0 === i && (i = 2 + this._repLenDecoder.decode(this._rangeDecoder, e),o = o < 7 ? 8 : 11);else {n = c,c = h,h = d,i = 2 + this._lenDecoder.decode(this._rangeDecoder, e),o = o < 7 ? 7 : 10;const t = this._posSlotDecoder[i <= 5 ? i - 2 : 3].decode(this._rangeDecoder);
						if (t >= 4) {
							const e = (t >> 1) - 1;if (d = (2 | 1 & t) << e,t < 14)d += __reverseDecode2(this._posDecoders, d - t - 1, this._rangeDecoder, e);
							else if (d += this._rangeDecoder.decodeDirectBits(e - 4) << 4,d += this._posAlignDecoder.reverseDecode(this._rangeDecoder),d < 0) {
								if (-1 === d)break;
								return !1
							}
						} else d = t
					}
					if (d >= _ || d >= this._dictionarySizeCheck)return !1;
					this._outWindow.copyBlock(d, i),_ += i,a = this._outWindow.getByte(0)
				}
			}
			return this._outWindow.releaseStream(),this._rangeDecoder.releaseStream(),!0
		}
		const InStream = function(e) {
			this._$data = e;
			this._$size = e.length;this._$offset = 0;
		}
		InStream.prototype.readByte = function() {
			return this._$data[this._$offset++];
		}
		const OutStream = function(e) {
			this.size = 8;
			this.buffers = e;
		}
		OutStream.prototype.writeBytes = function(e, t) {
			if (e.length === t) {
				this.buffers.set(e, this.size);
			} else {
				this.buffers.set(e.subarray(0, t), this.size);
			}
			this.size += t;
		}
        return {
            parse: function (data, fileLength) {
                const t = fileLength,s = data,i = new Uint8Array(t + 8);
                i.set(s.slice(0, 8), 0);
                __decompress(new InStream(__init(s)), new OutStream(i));
                return i
            }
        };
    }());
	//! The data structures used in an Adobe SWF file.
	//!
	//! These structures are documented in the Adobe SWF File Format Specification
    const SwfParser = function(data) {
		this.byteStream = new ByteStream(data);
		this.clear();
		this.tick = this.tick.bind(this);
	}
	SwfParser.tagCodes = {0: "End", 1: "ShowFrame", 2: "DefineShape", 4: "PlaceObject", 5: "RemoveObject", 6: "DefineBits", 7: "DefineButton", 8: "JpegTables", 9: "SetBackgroundColor", 10: "DefineFont", 11: "DefineText", 12: "DoAction", 13: "DefineFontInfo", 14: "DefineSound", 15: "StartSound", 17: "DefineButtonSound", 18: "SoundStreamHead", 19: "SoundStreamBlock", 20: "DefineBitsLossless", 21: "DefineBitsJpeg2", 22: "DefineShape2", 23: "DefineButtonCxform", 24: "Protect", 26: "PlaceObject2", 28: "RemoveObject2", 32: "DefineShape3", 33: "DefineText2", 34: "DefineButton2", 35: "DefineBitsJpeg3", 36: "DefineBitsLossless2", 37: "DefineEditText", 39: "DefineSprite", 40: "NameCharacter", 41: "ProductInfo", 43: "FrameLabel", 45: "SoundStreamHead2", 46: "DefineMorphShape", 48: "DefineFont2", 56: "ExportAssets", 57: "ImportAssets", 58: "EnableDebugger", 59: "DoInitAction", 60: "DefineVideoStream", 61: "VideoFrame", 62: "DefineFontInfo2", 63: "DebugId", 64: "EnableDebugger2", 65: "ScriptLimits", 66: "SetTabIndex", 69: "FileAttributes", 70: "PlaceObject3", 71: "ImportAssets2", 73: "DefineFontAlignZones", 74: "CsmTextSettings", 75: "DefineFont3", 76: "SymbolClass", 77: "Metadata", 78: "DefineScalingGrid", 82: "DoAbc", 83: "DefineShape4", 84: "DefineMorphShape2", 86: "DefineSceneAndFrameLabelData", 87: "DefineBinaryData", 88: "DefineFontName", 89: "StartSound2", 90: "DefineBitsJpeg4", 91: "DefineFont4", 93: "EnableTelemetry", 94: "PlaceObject4"};
	SwfParser.prototype.clear = function() {
		this.isLoad = false;
		this.result = null;
		this.header = null;
		this.headerMovie = null;
		this._interval = null;
		this._swfVersion = 0;
		this._stopped = false;
		this._loadedType = 0;
		this._compression = null;
		this._uncompressedLength = 0;
		this._compressStream = null;
		this.tagstack = [];
		this.tagstackSize = 0;
		this.taglengthstack = [];
		this.taglengthstackSize = 0;
		this.aborted = false;

		this.onload = null;
		this.onerror = null;
		this.onprogress = null;
	}
	SwfParser.prototype.cancel = function() {
		if (this._interval) {
			clearInterval(this._interval);
			this._interval = null;
		}
		this.onload = null;
		this.onerror = null;
		this.onprogress = null;
		this.aborted = true;
	}
	SwfParser.prototype.load = function() {
		this._interval = setInterval(this.tick, 5);
	}
	SwfParser.prototype.getTagStack = function() {
		return this.tagstack[this.tagstackSize - 1];
	}
	SwfParser.prototype.getTagLengthStack = function() {
		return this.taglengthstack[this.taglengthstackSize - 1];
	}
	SwfParser.prototype.tick = function() {
		if (this.isLoad) {
			return;
		}
		if (this._stopped) {
			return;
		}
		this._stopped = true;
		try {
			this.tickParse();
		} catch(e) {
			if (this._interval) {
				clearInterval(this._interval);
				this._interval = null;
			}
			if (this.onerror) {
				this.onerror(e);
			}
		}
		if (this.isLoad) {
			if (!this.aborted) {
				if (this.onload) {
					this.onload();
				}	
			}
		}
		this._stopped = false;
	}
	SwfParser.prototype.tickParse = function() {
		if (this._loadedType == 4) {
			if (this._interval) {
				clearInterval(this._interval);
				this._interval = null;
			}
			var resultTags = this.tagstack[0];
			this.result = {
				header: this.header,
				movieInfo: this.headerMovie,
				tags: resultTags
			};
			this.isLoad = true;
		} else {
			if (this._loadedType == 3) {
				if (this.onprogress) {
					this.onprogress([1, this.byteStream.position / this._uncompressedLength]);
				}
				var stopped = false;
				var startTime = Date.now();
				while (true) {
					var stack = this.getTagStack();
					while (true) {
						var tag = this.parseTag();
						if (tag) {
							if ((tag.tagcode == 0) || !(this.byteStream.position < this.getTagLengthStack())) {
								if (this.tagstackSize == 1) {
									this._loadedType++;
									stopped = true;
								} else {
									this.byteStream.position = this.getTagLengthStack();
									this.byteStream.bit_offset = 0;
									this.tagstackSize--;
									this.taglengthstackSize--;
								}
								break;
							}
							stack.push(tag);
							if (tag.tagcode == 39) break;	
						}
						if ((Date.now() - startTime) > 20) {
							stopped = true;
							break;
						}
					}
					if (stopped) break;
				}
			} else {
				if (this._loadedType == 2) {
					// Some SWF streams may not be compressed correctly,
					// (e.g. incorrect data length in the stream), so decompressing
					// may throw an error even though the data otherwise comes
					// through the stream.
					// We'll still try to parse what we get if the full decompression fails.
					// (+ 8 for header size)
					if (this.byteStream.getLength() !== this._uncompressedLength) {
						console.log("SWF length doesn't match header, may be corrupt " + this.byteStream.data.length + " == " + this._uncompressedLength);
					}
					var headerMovie = this.parseHeaderMovie();
					this.headerMovie = headerMovie;
					this.rectangle = headerMovie.bounds;
					this.frameRate = headerMovie.frameRate;
					this.numframes = headerMovie.frameCount;
					this.taglengthstack[this.taglengthstackSize++] = this._uncompressedLength;
					this.parseTags();
					this.onprogress([1, 0]);
					this._loadedType++;
				} else {
					if (this._loadedType == 1) {
						// Now the SWF switches to a compressed stream.
						if (this._compressStream) {
							this._compressStream.tick();
							this.onprogress([0, this._compressStream.loaded]);
							if (this._compressStream.isLoad) {
								this.byteStream = new ByteStream(this._compressStream.result);
								this.byteStream.setOffset(8, 0);
								this._compressStream = null;
								this._loadedType++;
							}
						} else {
							var _fileLength = this._uncompressedLength;
							var compressStream = this.decompressStream(this._compression, this._uncompressedLength);
							if (compressStream) {
								if (compressStream instanceof Uint8Array) {
									var FixedData = new Uint8Array(_fileLength);
									for (let i = 0; i < _fileLength; i++) {
										FixedData[i] = compressStream[i];
									}
									this.byteStream = new ByteStream(FixedData.buffer);
									this.byteStream.setOffset(8, 0);
									this._loadedType++;
								} else {
									this._compressStream = compressStream;
								}
							} else {
								this._loadedType++;
							}
						}
						if (this._loadedType == 2) {
							this.onprogress([1, 0]);
						}
					} else {
						var header = this.parseHeader();
						this.header = header;
						this._compression = header.compression;
						this._swfVersion = header.version;
						this._uncompressedLength = header.uncompressedLength;
						this.onprogress([0, 0]);
						this._loadedType++;
					}
				}
			}
		}
	}
	SwfParser.prototype.parseHeader = function() {
		// Read SWF header.
		var compression = this.byteStream.readString(3);
		var version = this.byteStream.readUint8();

		// Check whether the SWF version is 0.
		// Note that the behavior should actually vary, depending on the player version:
		// - Flash Player 9 and later bail out (the behavior we implement).
		// - Flash Player 8 loops through all the frames, without running any AS code.
		// - Flash Player 7 and older don't fail and use the player version instead: a
		// function like `getSWFVersion()` in AVM1 will then return the player version.
		if (version == 0) {
			throw new Error("Invalid SWF version");
		}
		var uncompressedLength = this.byteStream.readUint32();
		return {compression, version, uncompressedLength}
	}
	SwfParser.prototype.decompressStream = function(compression, size) {
		// Now the SWF switches to a compressed stream.
		switch (compression) {
			case "FWS":
				return null;
			case "CWS":
				return new ZLib(this.byteStream.arrayBuffer, size, 8);
			case "ZWS":
				return LZMA.parse(new Uint8Array(this.byteStream.arrayBuffer), size);
			default:
				throw new Error("Invalid SWF");
		}
	}
	SwfParser.prototype.parseHeaderMovie = function() {
		var bounds = this.rect();
		var frameRate = this.byteStream.readFixed8();
		var numFrames = this.byteStream.readUint16();
		return {bounds, frameRate, numFrames}
	}
	SwfParser.prototype.parseTags = function() {
		this.tagstack[this.tagstackSize++] = [];
		return this.getTagStack();
	}
	SwfParser.prototype.parseTag = function() {
		var {tagcode, length} = this.parseTagCodeLength();
		var tagDataStartOffset = this.byteStream.position;
		var result = this.parseTagWithCode(tagcode, length);
		result.tagcode = tagcode;
		result.tagType = SwfParser.tagCodes[tagcode] || "Unknown";
		result._byteLength = length;
		if (result.tagcode !== 39) { // Sprite
			if ((tagDataStartOffset + length) !== this.byteStream.position) {
				console.log(this.byteStream.position - tagDataStartOffset, length, SwfParser.tagCodes[tagcode]);
				this.byteStream.position = (tagDataStartOffset + length);
				this.byteStream.bit_offset = 0;
			}
		}
		return result;
	}
	SwfParser.prototype.parseTagCodeLength = function() {
		var tagCodeAndLength = this.byteStream.readUint16();
		var tagcode = tagCodeAndLength >> 6;
		var length = (tagCodeAndLength & 0b111111);
		if (length == 0b111111) {
			// Extended tag.
			length = this.byteStream.readUint32();
		}
		return {tagcode, length}
	}
	SwfParser.prototype.parseTagWithCode = function(tagType, length) {
		var byteStream = this.byteStream;
		var obj = {};
		switch (tagType) {
			case 0: // End
			case 1: // ShowFrame
				break;
			case 2:  // DefineShape
				obj = this.parseDefineShape(1);
				break;
			case 22: // DefineShape2
				obj = this.parseDefineShape(2);
				break;
			case 32: // DefineShape3
				obj = this.parseDefineShape(3);
				break;
			case 83: // DefineShape4
				obj = this.parseDefineShape(4);
				break;
			case 6: // DefineBits
				obj = this.parseDefineBits(1, length);
				break;
			case 21: // DefineBitsJPEG2
				obj = this.parseDefineBits(2, length);
				break;
			case 35: // DefineBitsJPEG3
				obj = this.parseDefineBits(3, length);
				break;
			case 90: // DefineBitsJPEG4
				obj = this.parseDefineBits(4, length);
				break;
			case 7: // DefineButton
				obj = this.parseDefineButton(1, length);
				break;
			case 34: // DefineButton2
				obj = this.parseDefineButton(2, length);
				break;
			case 10: // DefineFont
				obj = this.parseDefineFont1(length);
				break;
			case 48: // DefineFont2
				obj = this.parseDefineFont2(2, length);
				break;
			case 75: // DefineFont3
				obj = this.parseDefineFont2(3, length);
				break;
			case 91: // DefineFont4
				obj = this.parseDefineFont4(length);
				break;
			case 11: // DefineText
				obj = this.parseDefineText(1);
				break;
			case 33: // DefineText2
				obj = this.parseDefineText(2);
				break;
			case 13: // DefineFontInfo
				obj = this.parseDefineFontInfo(1, length);
				break;
			case 62: // DefineFontInfo2
				obj = this.parseDefineFontInfo(2, length);
				break;
			case 14: // DefineSound
				obj = this.parseDefineSound(length);
				break;
			case 17: // DefineButtonSound
				obj = this.parseDefineButtonSound();
				break;
			case 20: // DefineBitsLossless
				obj = this.parseDefineBitsLossLess(1, length);
				break;
			case 36: // DefineBitsLossless2
				obj = this.parseDefineBitsLossLess(2, length);
				break;
			case 23: // DefineButtonCxform
				obj = this.parseDefineButtonCxform(length);
				break;
			case 37: // DefineEditText
				obj = this.parseDefineEditText();
				break;
			case 39: // DefineSprite
				obj = this.parseDefineSprite(length);
				break;
			case 46: // DefineMorphShape
				obj = this.parseDefineMorphShape(1);
				break;
			case 84: // DefineMorphShape2
				obj = this.parseDefineMorphShape(2);
				break;
			case 60: // DefineVideoStream
				obj = this.parseDefineVideoStream();
				break;
			case 73: // DefineFontAlignZones
				obj = this.parseDefineFontAlignZones(length);
				break;
			case 78: // DefineScalingGrid
				obj = this.parseDefineScalingGrid();
				break;
			case 86: // DefineSceneAndFrameLabelData
				obj = this.parseDefineSceneAndFrameLabelData();
				break;
			case 87: // DefineBinaryData
				obj = this.parseDefineBinaryData(length);
				break;
			case 88: // DefineFontName
				obj = this.parseDefineFontName();
				break;
			case 4: // PlaceObject
				obj = this.parsePlaceObject(1, length);
				break;
			case 26: // PlaceObject2
				obj = this.parsePlaceObject(2, length);
				break;
			case 70: // PlaceObject3
				obj = this.parsePlaceObject(3, length);
				break;
			case 94: // PlaceObject4
				obj = this.parsePlaceObject(4, length);
				break;
			case 5: // RemoveObject1
				obj = this.parseRemoveObject(1);
				break;
			case 28: // RemoveObject2
				obj = this.parseRemoveObject(2);
				break;
			case 8: // JpegTables
				obj.jpegtable = byteStream.readBytes(length);
				break;
			case 9: // SetBackgroundColor
				obj.rgb = this.rgb();
				break;
			case 12: // DoAction
				obj = this.parseDoAction(length);
				break;
			case 15: // StartSound
				obj = this.parseStartSound(1);
				break;
			case 89: // StartSound2
				obj = this.parseStartSound(2);
				break;
			case 18: // SoundStreamHead
				obj = this.parseSoundStreamHead(1);
				break;
			case 45: // SoundStreamHead2
				obj = this.parseSoundStreamHead(2);
				break;
			case 19: // SoundStreamBlock
				obj = this.parseSoundStreamBlock(length);
				break;
			case 24: // Protect
				if (length > 0) {
					byteStream.readUint16(); // Reserved
					obj.data = byteStream.readBytes(length - 2);
				}
				break;
			case 40: // NameCharacter
				obj = this.parseNameCharacter();
				break;
			case 41: // ProductInfo
				obj = this.parseProductInfo();
				break;
			case 43: // FrameLabel
				obj = this.parseFrameLabel(length);
				break;
			case 56: // ExportAssets
				obj = this.parseExportAssets();
				break;
			case 57: // ImportAssets
				obj = this.parseImportAssets(1);
				break;
			case 71: // ImportAssets2
				obj = this.parseImportAssets(2);
				break;
			case 58: // EnableDebugger
				obj.debugger = byteStream.readStringWithUntil();
				break;
			case 64: // EnableDebugger2
				byteStream.readUint16(); // Reserved
				obj.debugger = byteStream.readStringWithUntil();
				break;
			case 59: // DoInitAction
				obj = this.parseDoInitAction(length);
				break;
			case 61: // VideoFrame
				obj = this.parseVideoFrame(length);
				break;
			case 63: // DebugID
				obj = this.parseDebugID(length);
				break;
			case 65: // ScriptLimits
				obj.maxRecursionDepth = byteStream.readUint16();
				obj.timeoutSeconds = byteStream.readUint16();
				break;
			case 66: // SetTabIndex
				obj.depth = byteStream.readUint16();
				obj.tabIndex = byteStream.readUint16();
				break;
			case 69: // FileAttributes
				obj = this.parseFileAttributes();
				break;
			case 72: // DoAbc
				obj = this.parseDoABC(1, length);
				break;
			case 82: // DoAbc2
				obj = this.parseDoABC(2, length);
				break;
			case 74: // CsmTextSettings
				obj = this.parseCSMTextSettings();
				break;
			case 76: // SymbolClass
				obj = this.parseSymbolClass();
				break;
			case 77: // Metadata
				obj.metadata = byteStream.readStringWithUntil();
				break;
			case 93: // EnableTelemetry
				byteStream.readUint16(); // Reserved
				if (length > 2) {
					obj.passwordHash = byteStream.readBytes(32);
				}
				break;
			case 38: // DefineVideo
			case 42: // DefineTextFormat
			case 44: // DefineBehavior
			case 50: // DefineCommandObject
			case 53: // DefineFunction
			case 3:  // FreeCharacter
			case 16: // StopSound
			case 25: // PathsArePostScript
			case 29: // SyncFrame
			case 31: // FreeAll
			case 47: // FrameTag
			case 49: // GeProSet
			case 51: // CharacterSet
			case 52: // FontRef
			case 54: // PlaceFunction
			case 55: // GenTagObject
				console.log("[base] tagType -> " + tagType);
				this.byteStream.position += length;
				break;
			case 27: // 27 (invalid)
			case 30: // 30 (invalid)
			case 67: // 67 (invalid)
			case 68: // 68 (invalid)
			case 79: // 79 (invalid)
			case 80: // 80 (invalid)
			case 81: // 81 (invalid)
			case 85: // 85 (invalid)
			case 92: // 92 (invalid)
				this.byteStream.position += length;
				break;
			default: // null
				this.byteStream.position += length;
				break;
		}
		return obj;
	}
	
	//////// color rect matrix ////////
	SwfParser.prototype.rect = function() {
		var byteStream = this.byteStream;
		byteStream.byteAlign();
		var nBits = byteStream.getUIBits(5);
		var obj = {};
		obj.xMin = byteStream.getSIBits(nBits);
		obj.xMax = byteStream.getSIBits(nBits);
		obj.yMin = byteStream.getSIBits(nBits);
		obj.yMax = byteStream.getSIBits(nBits);
		return obj;
	}
	SwfParser.prototype.rgb = function() {
		var byteStream = this.byteStream;
		return [byteStream.readUint8(), byteStream.readUint8(), byteStream.readUint8(), 1];
	}
	SwfParser.prototype.rgba = function() {
		var byteStream = this.byteStream;
		return [byteStream.readUint8(), byteStream.readUint8(), byteStream.readUint8(), byteStream.readUint8() / 255];
	}
	SwfParser.prototype.colorTransform = function(hasAlpha) {
		var byteStream = this.byteStream;
		byteStream.byteAlign();
		var result = [1, 1, 1, 1, 0, 0, 0, 0];
		var first6bits = byteStream.getUIBits(6);
		var hasAddTerms = first6bits >> 5;
		var hasMultiTerms = (first6bits >> 4) & 1;
		var nbits = first6bits & 0x0f;
		if (hasMultiTerms) {
			result[0] = byteStream.getSIBitsFixed8(nbits);
			result[1] = byteStream.getSIBitsFixed8(nbits);
			result[2] = byteStream.getSIBitsFixed8(nbits);
			if (hasAlpha) {
				result[3] = byteStream.getSIBitsFixed8(nbits);
			}
		}
		if (hasAddTerms) {
			result[4] = byteStream.getSIBits(nbits);
			result[5] = byteStream.getSIBits(nbits);
			result[6] = byteStream.getSIBits(nbits);
			if (hasAlpha) {
				result[7] = byteStream.getSIBits(nbits);
			}
		}
		return result;
	}
	SwfParser.prototype.matrix = function() {
		var byteStream = this.byteStream;
		byteStream.byteAlign();
		var result = [1, 0, 0, 1, 0, 0];
		// Scale
		if (byteStream.getUIBit()) {
			var nScaleBits = byteStream.getUIBits(5);
			result[0] = byteStream.getSIBitsFixed16(nScaleBits);
			result[3] = byteStream.getSIBitsFixed16(nScaleBits);
		}
		// Rotate/Skew
		if (byteStream.getUIBit()) {
			var nRotateBits = byteStream.getUIBits(5);
			result[1] = byteStream.getSIBitsFixed16(nRotateBits);
			result[2] = byteStream.getSIBitsFixed16(nRotateBits);
		}
		// Translate (always present)
		var nTranslateBits = byteStream.getUIBits(5);
		result[4] = byteStream.getSIBits(nTranslateBits);
		result[5] = byteStream.getSIBits(nTranslateBits);
		return result;
	}
	//////// Structure ////////

	//////// Shapes ////////
	SwfParser.prototype.gradientSpread = function(code) {
		switch (code) {
			case 0: // Pad
			// Per SWF19 p. 136, SpreadMode 3 is reserved.
			// Flash treats it as pad mode.
			case 3:
				return "pad";
			case 1: // Reflect
				return "reflect";
			case 2: // Repeat
				return "repeat";
			default:
				throw new Error("Invalid gradient spread mode:" + code);
		}
	}
	SwfParser.prototype.gradientInterpolation = function(code) {
		switch (code) {
			case 0: // Rgb
			// Per SWF19 p. 136, InterpolationMode 2 and 3 are reserved.
			// Flash treats them as normal RGB mode interpolation.
			case 2:
			case 3:
				return "rgb";
			case 1: // LinearRgb
				return "linearRgb";
			default:
				throw new Error("Invalid gradient interpolation mode:" + code);
		}
	}
	SwfParser.prototype.shapeWithStyle = function(shapeVersion) {
		var byteStream = this.byteStream;
		var fillStyles = this.fillStyleArray(shapeVersion);
		var lineStyles = this.lineStyleArray(shapeVersion);
		var numBits = byteStream.readUint8();
		var numFillBits = numBits >> 4;
		var numLineBits = numBits & 0b1111;
		var shapeRecords = this.shapeRecords(shapeVersion, {
			fillBits: numFillBits,
			lineBits: numLineBits
		});
		return {fillStyles, lineStyles, shapeRecords, numFillBits, numLineBits};
	}
	SwfParser.prototype.fillStyleArray = function(shapeVersion) {
		var byteStream = this.byteStream;
		var count = byteStream.readUint8();
		if ((shapeVersion >= 2) && (count == 0xff)) {
			count = byteStream.readUint16();
		}
		var fillStyles = [];
		while (count--) {
			fillStyles.push(this.fillStyle(shapeVersion));
		}
		return fillStyles;
	}
	SwfParser.prototype.gradient = function(shapeVersion) {
		var byteStream = this.byteStream;
		var matrix = this.matrix();
		var flags = byteStream.readUint8();
		var spreadMode = this.gradientSpread((flags >> 6) & 0b11);
		var interpolationMode = this.gradientInterpolation((flags >> 4) & 0b11);
		var numGradients = (flags & 0b1111);
		var gradientRecords = [];
		for (var i = numGradients; i--;) {
			var ratio = byteStream.readUint8() / 255;
			var color = ((shapeVersion >= 3) ? this.rgba() : this.rgb());
			gradientRecords.push({ratio, color});
		}
		return {
			spreadMode,
			interpolationMode,
			gradientRecords,
			matrix: matrix
		};
	}
	SwfParser.prototype.fillStyle = function(shapeVersion) {
		var byteStream = this.byteStream;
		var obj = {};
		var bitType = byteStream.readUint8();
		obj.type = bitType;
		switch (bitType) {
			case 0x00:
				if (shapeVersion >= 3) {
					obj.color = this.rgba();
				} else {
					obj.color = this.rgb();
				}
				break;
			case 0x10:
				obj.linearGradient = this.gradient(shapeVersion);
				break;
			case 0x12:
				obj.radialGradient = this.gradient(shapeVersion);
				break;
			case 0x13:
				// SWF19 says focal gradients are only allowed in SWFv8+ and DefineShape4,
				// but it works even in earlier tags (#2730).
				obj.gradient = this.gradient(shapeVersion);
				obj.focalPoint = byteStream.readFixed8();
				break;
			case 0x40:
			case 0x41:
			case 0x42:
			case 0x43:
				obj.bitmapId = byteStream.readUint16();
				obj.bitmapMatrix = this.matrix();
                // Bitmap smoothing only occurs in SWF version 8+.
				obj.isSmoothed = ((this._swfVersion >= 8) && ((bitType & 0b10) == 0));
				obj.isRepeating = (bitType & 0b01);
				break;
			default:
				throw new Error("Invalid fill style.");
		}
		return obj;
	}
	SwfParser.prototype.lineStyleArray = function(shapeVersion) {
		var byteStream = this.byteStream;
		var count = byteStream.readUint8();
		if ((shapeVersion >= 2) && (count === 0xff)) {
			count = byteStream.readUint16();
		}
		var lineStyles = [];
		while (count--) {
			lineStyles.push(this.lineStyles(shapeVersion));
		}
		return lineStyles;
	}
	SwfParser.prototype.lineStyles = function(shapeVersion) {
		var byteStream = this.byteStream;
		var obj = {};
		obj.width = byteStream.readUint16();
		if (shapeVersion == 4) {
			// LineStyle2 in DefineShape4
			obj.startCapStyle = byteStream.getUIBits(2);
			obj.joinStyle = byteStream.getUIBits(2);
			obj.hasFill = byteStream.getUIBit();
			obj.noHScale = byteStream.getUIBit();
			obj.noVScale = byteStream.getUIBit();
			obj.pixelHinting = byteStream.getUIBit();
			byteStream.getUIBits(5); // Reserved
			obj.noClose = byteStream.getUIBit();
			obj.endCapStyle = byteStream.getUIBits(2);
			if (obj.joinStyle === 2) {
				obj.miterLimitFactor = byteStream.readFixed8();
			}
			if (obj.hasFill) {
				obj.fillType = this.fillStyle(shapeVersion);
			} else {
				obj.color = this.rgba();
			}
		} else {
			// LineStyle1
			if (shapeVersion >= 3) {
				obj.color = this.rgba();
			} else {
				obj.color = this.rgb();
			}
		}
		return obj;
	}
	SwfParser.prototype.shapeRecords = function(shapeVersion, currentNumBits) {
		var byteStream = this.byteStream;
		var shapeRecords = [];
		while (true) {
			var first6Bits = byteStream.getUIBits(6);
			var shape = null;
			if (first6Bits & 0x20) {
				var numBits = first6Bits & 0b1111;
				if (first6Bits & 0x10) {
					shape = this.straightEdgeRecord(numBits);
				} else {
					shape = this.curvedEdgeRecord(numBits);
				}
			} else {
				if (first6Bits) {
					shape = this.styleChangeRecord(shapeVersion, first6Bits, currentNumBits);
				}
			}
			if (!shape) {
				byteStream.byteAlign();
				break;
			} else {
				shapeRecords.push(shape);
			}
		}
		return shapeRecords;
	}
	SwfParser.prototype.straightEdgeRecord = function(numBits) {
		var byteStream = this.byteStream;
		var deltaX = 0;
		var deltaY = 0;
		var GeneralLineFlag = byteStream.getUIBit();
		if (GeneralLineFlag) {
			deltaX = byteStream.getSIBits(numBits + 2);
			deltaY = byteStream.getSIBits(numBits + 2);
		} else {
			var VertLineFlag = byteStream.getUIBit();
			if (VertLineFlag) {
				deltaX = 0;
				deltaY = byteStream.getSIBits(numBits + 2);
			} else {
				deltaX = byteStream.getSIBits(numBits + 2);
				deltaY = 0;
			}
		}
		return {
			deltaX,
			deltaY,
			isCurved: false,
			isChange: false
		};
	}
	SwfParser.prototype.curvedEdgeRecord = function(numBits) {
		var byteStream = this.byteStream;
		var controlDeltaX = byteStream.getSIBits(numBits + 2);
		var controlDeltaY = byteStream.getSIBits(numBits + 2);
		var anchorDeltaX = byteStream.getSIBits(numBits + 2);
		var anchorDeltaY = byteStream.getSIBits(numBits + 2);
		return {
			controlDeltaX,
			controlDeltaY,
			anchorDeltaX,
			anchorDeltaY,
			isCurved: true,
			isChange: false
		};
	}
	SwfParser.prototype.styleChangeRecord = function(shapeVersion, changeFlag, currentNumBits) {
		var byteStream = this.byteStream;
		var obj = {};
		obj.stateMoveTo = changeFlag & 1;
		obj.stateFillStyle0 = (changeFlag >> 1) & 1;
		obj.stateFillStyle1 = (changeFlag >> 2) & 1;
		obj.stateLineStyle = (changeFlag >> 3) & 1;
		obj.stateNewStyles = (changeFlag >> 4) & 1;
		if (obj.stateMoveTo) {
			var moveBits = byteStream.getUIBits(5);
			obj.moveX = byteStream.getSIBits(moveBits);
			obj.moveY = byteStream.getSIBits(moveBits);
		}
		obj.fillStyle0 = 0;
		if (obj.stateFillStyle0) {
			obj.fillStyle0 = byteStream.getUIBits(currentNumBits.fillBits);
		}
		obj.fillStyle1 = 0;
		if (obj.stateFillStyle1) {
			obj.fillStyle1 = byteStream.getUIBits(currentNumBits.fillBits);
		}
		obj.lineStyle = 0;
		if (obj.stateLineStyle) {
			obj.lineStyle = byteStream.getUIBits(currentNumBits.lineBits);
		}
		if (obj.stateNewStyles) {
			obj.fillStyles = this.fillStyleArray(shapeVersion);
			obj.lineStyles = this.lineStyleArray(shapeVersion);
			var numBits = byteStream.readUint8();
			currentNumBits.fillBits = obj.numFillBits = numBits >> 4;
			currentNumBits.lineBits = obj.numLineBits = numBits & 0b1111;
		}
		obj.isChange = true;
		return obj;
	}
	SwfParser.prototype.morphFillStyleArray = function(shapeVersion) {
		var byteStream = this.byteStream;
		var fillStyleCount = byteStream.readUint8();
		if ((shapeVersion >= 2) && (fillStyleCount == 0xff)) {
			fillStyleCount = byteStream.readUint16();
		}
		var fillStyles = [];
		for (var i = fillStyleCount; i--;) {
			fillStyles[fillStyles.length] = this.morphFillStyle();
		}
		return fillStyles;
	}
	SwfParser.prototype.morphFillStyle = function() {
		var byteStream = this.byteStream;
		var obj = {};
		var bitType = byteStream.readUint8();
		obj.type = bitType;
		switch (bitType) {
			case 0x00:
				obj.startColor = this.rgba();
				obj.endColor = this.rgba();
				break;
			case 0x10:
				obj.linearGradient = this.morphGradient();
				break;
			case 0x12:
				obj.radialGradient = this.morphGradient();
				break;
			case 0x13:
				// SWF19 says focal gradients are only allowed in SWFv8+ and DefineMorphShapeShape2,
				// but it works even in earlier tags (#2730).
				// TODO(Herschel): How is focal_point stored?
				obj.gradient = this.morphGradient();
				obj.startFocalPoint = byteStream.readFixed8();
				obj.endFocalPoint = byteStream.readFixed8();
				break;
			case 0x40:
			case 0x41:
			case 0x42:
			case 0x43:
				obj.bitmapId = byteStream.readUint16();
				obj.bitmapStartMatrix = this.matrix();
				obj.bitmapEndMatrix = this.matrix();
				obj.isSmoothed = (bitType & 0b10) == 0;
				obj.isRepeating = (bitType & 0b01) == 0;
				break;
			default:
				throw new Error("Invalid fill style.");
		}
		return obj;
	}
	SwfParser.prototype.morphGradient = function() {
		var obj = {};
		var byteStream = this.byteStream;
		obj.startMatrix = this.matrix();
		obj.endMatrix = this.matrix();
		var flags = byteStream.readUint8();
		obj.spreadMode = this.gradientSpread((flags >> 6) & 0b11);
		obj.interpolationMode = this.gradientInterpolation((flags >> 4) & 0b11);
		var numGradients = (flags & 0b1111);
		var startRecords = [];
		var endRecords = [];
		for (var i = numGradients; i--;) {
			startRecords[startRecords.length] = {ratio: byteStream.readUint8() / 255, color: this.rgba()};
			endRecords[endRecords.length] = {ratio: byteStream.readUint8() / 255, color: this.rgba()};
		}
		obj.startRecords = startRecords;
		obj.endRecords = endRecords;
		return obj;
	}
	SwfParser.prototype.morphLineStyleArray = function(shapeVersion) {
		var byteStream = this.byteStream;
		var lineStyleCount = byteStream.readUint8();
		if ((shapeVersion >= 2) && (lineStyleCount == 0xff)) {
			lineStyleCount = byteStream.readUint16();
		}
		var lineStyles = [];
		for (var i = lineStyleCount; i--;) {
			lineStyles[lineStyles.length] = this.morphLineStyle(shapeVersion);
		}
		return lineStyles;
	}
	SwfParser.prototype.morphLineStyle = function(shapeVersion) {
		var byteStream = this.byteStream;
		var obj = {};
		obj.startWidth = byteStream.readUint16();
		obj.endWidth = byteStream.readUint16();
		if (shapeVersion < 2) {
			obj.startColor = this.rgba();
			obj.endColor = this.rgba();
		} else {
			// MorphLineStyle2 in DefineMorphShape2
			obj.startCapStyle = byteStream.getUIBits(2);
			obj.joinStyle = byteStream.getUIBits(2);
			obj.hasFill = byteStream.getUIBit();
			obj.noHScale = byteStream.getUIBit();
			obj.noVScale = byteStream.getUIBit();
			obj.pixelHinting = byteStream.getUIBit();
			byteStream.getUIBits(5); // Reserved
			obj.noClose = byteStream.getUIBit();
			obj.endCapStyle = byteStream.getUIBits(2);
			if (obj.joinStyle === 2) {
				obj.miterLimitFactor = byteStream.readFixed8();
			}
			if (obj.hasFill) {
				obj.fillType = this.morphFillStyle();
			} else {
				obj.startColor = this.rgba();
				obj.endColor = this.rgba();
			}
		}
		return obj;
	}
	SwfParser.prototype.morphShapeWithStyle = function(shapeVersion, t) {
		var byteStream = this.byteStream;
		var numBits = byteStream.readUint8();
		var NumFillBits = numBits >> 4;
		var NumLineBits = numBits & 0b1111;
		// NumFillBits and NumLineBits are written as 0 for the end shape.
		if (t) {
			NumFillBits = 0;
			NumLineBits = 0;
		}
		var ShapeRecords = this.shapeRecords(shapeVersion, {
			fillBits: NumFillBits,
			lineBits: NumLineBits
		});
		return ShapeRecords;
	}

	//////// Font Text ////////
	SwfParser.prototype.parseLanguage = function() {
		var languageCode = this.byteStream.readUint8();
		switch (languageCode) {
			case 0: // Unknown
				return "";
			case 1: // Latin
				return "latin";
			case 2: // Japanese
				return "japanese";
			case 3: // Korean
				return "korean";
			case 4: // SimplifiedChinese
				return "simplifiedChinese";
			case 5: // TraditionalChinese
				return "traditionalChinese";
			default:
				throw new Error("Invalid language code:" + languageCode);
		}
	}
	SwfParser.prototype.getTextRecords = function(ver, GlyphBits, AdvanceBits) {
		var byteStream = this.byteStream;
		var array = [];
		while (true) {
			var flags = byteStream.readUint8();
			if (flags == 0) {
				// End of text records.
				break;
			}
			var obj = {};
			if (flags & 0b1000) {
				obj.fontId = byteStream.readUint16();
			}
			if (flags & 0b100) {
				if (ver === 1) {
					obj.textColor = this.rgb();
				} else {
					obj.textColor = this.rgba();
				}
			}
			if (flags & 0b1) {
				obj.XOffset = byteStream.readInt16();
			}
			if (flags & 0b10) {
				obj.YOffset = byteStream.readInt16();
			}
			if (flags & 0b1000) {
				obj.textHeight = byteStream.readUint16();
			}
			obj.glyphEntries = this.getGlyphEntries(GlyphBits, AdvanceBits);
			array.push(obj);
		}
		return array;
	}
	SwfParser.prototype.textAlign = function(type) {
		switch (type) {
			case 0:
				return "left";
			case 1:
				return "right";
			case 2:
				return "center";
			case 3:
				return "justify";
			default:
				throw new Error("Invalid language code:" + type);
		}
	}
	SwfParser.prototype.getGlyphEntries = function(GlyphBits, AdvanceBits) {
		// TODO(Herschel): font_id and height are tied together. Merge them into a struct?
		var byteStream = this.byteStream;
		var count = byteStream.readUint8();
		var array = [];
		while (count--) {
			array.push({
				index: byteStream.getUIBits(GlyphBits),
				advance: byteStream.getSIBits(AdvanceBits)
			});
		}
		return array;
	}

	SwfParser.prototype.buttonRecords = function(ver) {
		var records = [];
		var byteStream = this.byteStream;
		while (true) {
			var flags = byteStream.readUint8();
			if (flags == 0) break;
			var obj = {};
			obj.buttonStateUp = flags & 1;
			obj.buttonStateOver = (flags >>> 1) & 1;
			obj.buttonStateDown = (flags >>> 2) & 1;
			obj.buttonStateHitTest = (flags >>> 3) & 1;
			obj.characterId = byteStream.readUint16();
			obj.depth = byteStream.readUint16();
			obj.matrix = this.matrix();
			if (ver == 2) {
				obj.colorTransform = this.colorTransform(true);
			}
			if (flags & 16) {
				obj.filters = this.getFilterList();
			}
			if (flags & 32) {
				obj.blendMode = this.parseBlendMode();
			}
			records.push(obj);
		}
		return records;
	}
	SwfParser.prototype.buttonActions = function(endOffset) {
		var byteStream = this.byteStream;
		var results = [];
		while (true) {
			var obj = {};
			var condActionSize = byteStream.readUint16();
			var flags = byteStream.readUint16();
			obj.condIdleToOverUp = flags & 1;
			obj.condOverUpToIdle = (flags >>> 1) & 1;
			obj.condOverUpToOverDown = (flags >>> 2) & 1;
			obj.condOverDownToOverUp = (flags >>> 3) & 1;
			obj.condOverDownToOutDown = (flags >>> 4) & 1;
			obj.condOutDownToOverDown = (flags >>> 5) & 1;
			obj.condOutDownToIdle = (flags >>> 6) & 1;
			obj.condIdleToOverDown = (flags >>> 7) & 1;
			obj.condOverDownToIdle = (flags >>> 8) & 1;
			obj.condKeyPress = (flags >> 9);
			byteStream.byteAlign();
			if (condActionSize >= 4) {
				obj.actionScript = this.parseAction(byteStream.readBytes(condActionSize - 4));
			} else if (condActionSize == 0) {
				// Last action, read to end.
				obj.actionScript = this.parseAction(byteStream.readBytes(endOffset - byteStream.position));
			} else {
				// Some SWFs have phantom action records with an invalid length.
				// See 401799_pre_Scene_1.swf
				// TODO: How does Flash handle this?
			}
			results.push(obj);
			if (condActionSize == 0) {
				break;
			}
			if (byteStream.position > endOffset) {
				break;
			}
		}
		return results;
	}
	SwfParser.prototype.parseSoundFormat = function() {
		var byteStream = this.byteStream;
		var obj = {};
		var frags = byteStream.readUint8();
		var compression;
		switch (frags >> 4) {
			case 0: // UncompressedUnknownEndian
				compression = "uncompressedUnknownEndian";
				break;
			case 1: // ADPCM
				compression = "ADPCM";
				break;
			case 2: // MP3
				compression = "MP3";
				break;
			case 3: // Uncompressed
				compression = "uncompressed";
				break;
			case 4: // Nellymoser16Khz
				compression = "nellymoser16Khz";
				break;
			case 5: // Nellymoser8Khz
				compression = "nellymoser8Khz";
				break;
			case 6: // Nellymoser
				compression = "nellymoser";
				break;
			case 11: // Speex
				compression = "speex";
				break;
			default:
				throw new Error("Invalid audio format.");
		}
		obj.compression = compression;
		var sampleRate;
		switch ((frags & 0b1100) >> 2) {
			case 0:
				sampleRate = 5512;
				break;
			case 1:
				sampleRate = 11025;
				break;
			case 2:
				sampleRate = 22050;
				break;
			case 3:
				sampleRate = 44100;
				break;
			default:
				console.log("unreachable");
		}
		obj.sampleRate = sampleRate;
		obj.is16Bit = frags & 0b10;
		obj.isStereo = frags & 0b1;
		return obj;
	}
	SwfParser.prototype.parseBlendMode = function() {
		var blendMode = this.byteStream.readUint8()
		switch (blendMode) {
			case 0:
			case 1:
				return "normal";
			case 2:
				return "layer";
			case 3:
				return "multiply";
			case 4:
				return "screen";
			case 5:
				return "lighten";
			case 6:
				return "darken";
			case 7:
				return "difference";
			case 8:
				return "add";
			case 9:
				return "subtract";
			case 10:
				return "invert";
			case 11:
				return "alpha";
			case 12:
				return "erase";
			case 13:
				return "overlay";
			case 14:
				return "hardlight";
			default:
				throw new Error("Invalid blend mode: " + blendMode);
		}
	}
	SwfParser.prototype.parseClipActions = function(startOffset, length) {
		var byteStream = this.byteStream;
		byteStream.readUint16();
		var allEventFlags = this.parseClipEventFlags();
		var endLength = startOffset + length;
		var actionRecords = [];
		while (byteStream.position < endLength) {
			var clipActionRecord = this.parseClipActionRecord(endLength);
			actionRecords[actionRecords.length] = clipActionRecord;
			if (endLength <= byteStream.position) {
				break;
			}
			var endFlag = (this._swfVersion <= 5) ? byteStream.readUint16() : byteStream.readUint32();
			if (!endFlag) {
				break;
			}
			if (this._swfVersion <= 5) {
				byteStream.position -= 2;
			} else {
				byteStream.position -= 4;
			}
			if (clipActionRecord.keyCode) {
				byteStream.position -= 1;
			}
		}
		return {allEventFlags, actionRecords};
	}
	SwfParser.prototype.parseClipActionRecord = function(endLength) {
		var byteStream = this.byteStream;
		var obj = {};
		var eventFlags = this.parseClipEventFlags();
		if (endLength > byteStream.position) {
			var ActionRecordSize = byteStream.readUint32();
			if (eventFlags.keyPress) {
				obj.keyCode = byteStream.readUint8();
			}
			obj.eventFlags = eventFlags;
			obj.actions = this.parseAction(byteStream.readBytes(ActionRecordSize));
		}
		return obj;
	}
	SwfParser.prototype.parseClipEventFlags = function() {
		var obj = {};
		var byteStream = this.byteStream;
		obj.keyUp = byteStream.getUIBits(1);
		obj.keyDown = byteStream.getUIBits(1);
		obj.mouseUp = byteStream.getUIBits(1);
		obj.mouseDown = byteStream.getUIBits(1);
		obj.mouseMove = byteStream.getUIBits(1);
		obj.unload = byteStream.getUIBits(1);
		obj.enterFrame = byteStream.getUIBits(1);
		obj.load = byteStream.getUIBits(1);
		if (this._swfVersion >= 6) {
			obj.dragOver = byteStream.getUIBits(1);
			obj.rollOut = byteStream.getUIBits(1);
			obj.rollOver = byteStream.getUIBits(1);
			obj.releaseOutside = byteStream.getUIBits(1);
			obj.release = byteStream.getUIBits(1);
			obj.press = byteStream.getUIBits(1);
			obj.initialize = byteStream.getUIBits(1);
		}
		obj.data = byteStream.getUIBits(1);
		if (this._swfVersion >= 6) {
			byteStream.getUIBits(5);
			obj.construct = byteStream.getUIBits(1);
			obj.keyPress = byteStream.getUIBits(1);
			obj.dragOut = byteStream.getUIBits(1);
			byteStream.getUIBits(8);
		}
		byteStream.byteAlign();
		return obj;
	}
	SwfParser.prototype.getFilterList = function() {
		var byteStream = this.byteStream;
		var result = [];
		var numberOfFilters = byteStream.readUint8();
		while (numberOfFilters--) {
			result.push(this.getFilter());
		}
		return result;
	}
	SwfParser.prototype.getFilter = function() {
		var byteStream = this.byteStream;
		var filterId = byteStream.readUint8();
		var filter;
		switch (filterId) {
			case 0:
				filter = this.dropShadowFilter();
				break;
			case 1:
				filter = this.blurFilter();
				break;
			case 2:
				filter = this.glowFilter();
				break;
			case 3:
				filter = this.bevelFilter();
				break;
			case 4:
				filter = this.gradientGlowFilter();
				break;
			case 5:
				filter = this.convolutionFilter();
				break;
			case 6:
				filter = this.colorMatrixFilter();
				break;
			case 7:
				filter = this.gradientBevelFilter();
				break;
			default: 
				throw new Error("Invalid filter type");
		}
		return {filterId, filter};
	}
	SwfParser.prototype.dropShadowFilter = function() {
		var byteStream = this.byteStream;
		var rgba = this.rgba();
		var alpha = rgba[3];
		var color = rgba[0] << 16 | rgba[1] << 8 | rgba[2];
		var blurX = byteStream.readFixed16();
		var blurY = byteStream.readFixed16();
		var angle = byteStream.readFixed16() * 180 / Math.PI;
		var distance = byteStream.readFixed16();
		var strength = byteStream.readFloat16() / 256;
		var inner = (byteStream.getUIBits(1)) ? true : false;
		var knockout = (byteStream.getUIBits(1)) ? true : false;
		var hideObject = (byteStream.getUIBits(1)) ? false : true;
		var quality = byteStream.getUIBits(5);
		if (!strength) {
			return null;
		}
		return {distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout, hideObject}
	}
	SwfParser.prototype.blurFilter = function() {
		var byteStream = this.byteStream;
		var blurX = byteStream.readFixed16();
		var blurY = byteStream.readFixed16();
		var quality = byteStream.getUIBits(5);
		byteStream.getUIBits(3);
		return {blurX, blurY, quality}
	}
	SwfParser.prototype.glowFilter = function() {
		var byteStream = this.byteStream;
		var rgba = this.rgba();
		var alpha = rgba[3];
		var color = rgba[0] << 16 | rgba[1] << 8 | rgba[2];
		var blurX = byteStream.readFixed16();
		var blurY = byteStream.readFixed16();
		var strength = byteStream.readFloat16() / 256;
		var inner = (byteStream.getUIBits(1)) ? true : false;
		var knockout = (byteStream.getUIBits(1)) ? true : false;
		byteStream.getUIBits(1);
		var quality = byteStream.getUIBits(5);
		if (!strength) {
			return null;
		}
		return {color, alpha, blurX, blurY, strength, quality, inner, knockout};
	}
	SwfParser.prototype.bevelFilter = function() {
		var byteStream = this.byteStream;
		var rgba;
		rgba = this.rgba();
		var highlightAlpha = rgba[3];
		var highlightColor = rgba[0] << 16 | rgba[1] << 8 | rgba[2];
		rgba = this.rgba();
		var shadowAlpha = rgba[3];
		var shadowColor = rgba[0] << 16 | rgba[1] << 8 | rgba[2];
		var blurX = byteStream.readFixed16();
		var blurY = byteStream.readFixed16();
		var angle = byteStream.readFixed16() * 180 / Math.PI;
		var distance = byteStream.readFixed16();
		var strength = byteStream.readFloat16() / 256;
		var inner = (byteStream.getUIBits(1)) ? true : false;
		var knockout = (byteStream.getUIBits(1)) ? true : false;
		byteStream.getUIBits(1);
		var OnTop = byteStream.getUIBits(1);
		var quality = byteStream.getUIBits(4);
		var type = "inner";
		if (!inner) {
			if (OnTop) {
				type = "full";
			} else {
				type = "outer";
			}
		}
		if (!strength) {
			return null;
		}
		return {distance, angle, highlightColor, highlightAlpha, shadowColor, shadowAlpha, blurX, blurY, strength, quality, type, knockout};
	}
	SwfParser.prototype.gradientGlowFilter = function() {
		var byteStream = this.byteStream;
		var i;
		var numColors = byteStream.readUint8();
		var colors = [];
		var alphas = [];
		for (i = 0; i < numColors; i++) {
			var rgba = this.rgba();
			alphas[alphas.length] = rgba[3];
			colors[colors.length] = rgba[0] << 16 | rgba[1] << 8 | rgba[2];
		}
		var ratios = [];
		for (i = 0; i < numColors; i++) {
			ratios[ratios.length] = byteStream.readUint8();
		}
		var blurX = byteStream.readFixed16();
		var blurY = byteStream.readFixed16();
		var angle = byteStream.readFixed16() * 180 / Math.PI;
		var distance = byteStream.readFixed16();
		var strength = byteStream.readFloat16() / 256;
		var inner = (byteStream.getUIBits(1)) ? true : false;
		var knockout = (byteStream.getUIBits(1)) ? true : false;
		byteStream.getUIBits(1);
		var onTop = byteStream.getUIBits(1);
		var quality = byteStream.getUIBits(4);
		var type = "inner";
		if (!inner) {
			if (onTop) {
				type = "full";
			} else {
				type = "outer";
			}
		}
		if (!strength) {
			return null;
		}
		return {distance, angle, colors, alphas, ratios, blurX, blurY, strength, quality, type, knockout};
	}
	SwfParser.prototype.convolutionFilter = function() {
		var byteStream = this.byteStream;
		var obj = {};
		obj.matrixX = byteStream.readUint8();
		obj.matrixY = byteStream.readUint8();
		obj.divisor = byteStream.readFloat16() | byteStream.readFloat16();
		obj.bias = byteStream.readFloat16() | byteStream.readFloat16();
		var count = obj.matrixX * obj.matrixY;
		var matrixArr = [];
		while (count--) {
			matrixArr.push(byteStream.readUint32());
		}
		obj.defaultColor = this.rgba();
		byteStream.getUIBits(6);
		obj.clamp = byteStream.getUIBits(1);
		obj.preserveAlpha = byteStream.getUIBits(1);
		return obj;
	}
	SwfParser.prototype.gradientBevelFilter = function() {
		var byteStream = this.byteStream;
		var NumColors = byteStream.readUint8();
		var i;
		var colors = [];
		var alphas = [];
		for (i = 0; i < NumColors; i++) {
			var rgba = this.rgba();
			alphas[alphas.length] = rgba[3];
			colors[colors.length] = rgba[0] << 16 | rgba[1] << 8 | rgba[2];
		}
		var ratios = [];
		for (i = 0; i < NumColors; i++) {
			ratios[ratios.length] = byteStream.readUint8();
		}
		var blurX = byteStream.readFixed16();
		var blurY = byteStream.readFixed16();
		var angle = byteStream.readFixed16() * 180 / Math.PI;
		var distance = byteStream.readFixed16();
		var strength = byteStream.readFloat16() / 256;
		var inner = (byteStream.getUIBits(1)) ? true : false;
		var knockout = (byteStream.getUIBits(1)) ? true : false;
		byteStream.getUIBits(1);
		var OnTop = byteStream.getUIBits(1);
		var quality = byteStream.getUIBits(4);
		var type = "inner";
		if (!inner) {
			if (OnTop) {
				type = "full";
			} else {
				type = "outer";
			}
		}
		if (!strength) {
			return null;
		}
		return {distance, angle, colors, alphas, ratios, blurX, blurY, strength, quality, type, knockout};
	}
	SwfParser.prototype.colorMatrixFilter = function() {
		var byteStream = this.byteStream;
		var matrixArr = [];
		for (var i = 0; i < 20; i++) {
			matrixArr.push(byteStream.readUint32());
		}
		return matrixArr;
	}
	SwfParser.prototype.parseSoundInfo = function() {
		var obj = {};
		var byteStream = this.byteStream;
		var flags = byteStream.readUint8();
		switch ((flags >> 4) & 0b11) {
			case 0: // Event
				obj.event = 'event';
				break;
			case 1: // Start
				obj.event = 'start';
				break;
			case 2: // Stop
				obj.event = 'stop';
				break;
		}
		if (flags & 0b1) {
			obj.inSample = byteStream.readUint32()
		}
		if (flags & 0b10) {
			obj.outSample = byteStream.readUint32();
		}
		if (flags & 0b100) {
			obj.numLoops = byteStream.readUint16();
		}
		if (flags & 0b1000) {
			var count = byteStream.readUint8();
			var envelope = [];
			while (count--) {
				envelope.push({
					sample: byteStream.readUint32(),
					leftVolume: byteStream.readUint16(),
					rightVolume: byteStream.readUint16()
				});
			}
			obj.envelope = envelope;
		}
		return obj;
	}
	SwfParser.prototype.parseAction = function(data) {
		var actionParser = new ActionParser(data);
		return actionParser.parse();
	}
	SwfParser.prototype.parseABC = function(data) {
		var abcParser = new AbcParser(data);
		return abcParser.parse();
	}

	//////// Define ////////
	SwfParser.prototype.parseDefineButton = function(ver, length) {
		var byteStream = this.byteStream;
		var obj = {};
		var endOffset = byteStream.position + length;
		obj.id = byteStream.readUint16();
		var ActionOffset = 0;
		if (ver == 2) {
			obj.flag = byteStream.readUint8();
			obj.trackAsMenu = (obj.flag & 0b1);
			ActionOffset = byteStream.readUint16();
		}
		obj.records = this.buttonRecords(ver);
		byteStream.byteAlign();
		if (ver === 1) {
			obj.actions = this.parseAction(byteStream.readBytes(endOffset - byteStream.position));
		} else {
			if (ActionOffset > 0) {
				obj.actions = this.buttonActions(endOffset);
			}
		}
		byteStream.byteAlign();
		return obj;
	}
	SwfParser.prototype.parseDefineButtonSound = function() {
		var byteStream = this.byteStream;
		var obj = {};
		obj.buttonId = byteStream.readUint16();

		// Some SWFs (third-party soundboard creator?) create SWFs with a malformed
		// DefineButtonSound tag that has fewer than all 4 sound IDs.
		for (var i = 0; i < 4; i++) {
			var soundId = byteStream.readUint16();
			if (soundId) {
				var soundInfo = this.parseSoundInfo();
				switch (i) {
					case 0:
						obj.buttonStateUpSoundInfo = soundInfo;
						obj.buttonStateUpSoundId = soundId;
						break;
					case 1:
						obj.buttonStateOverSoundInfo = soundInfo;
						obj.buttonStateOverSoundId = soundId;
						break;
					case 2:
						obj.buttonStateDownSoundInfo = soundInfo;
						obj.buttonStateDownSoundId = soundId;
						break;
					case 3:
						obj.buttonStateHitTestSoundInfo = soundInfo;
						obj.buttonStateHitTestSoundId = soundId;
						break;
				}
			}
		}
		return obj;
	}
	SwfParser.prototype.parseDefineFont1 = function(length) {
		var byteStream = this.byteStream;
		var obj = {};
		obj.version = 1;
		var endOffset = byteStream.position + length;
		var i;
		obj.id = byteStream.readUint16();
		var offset = byteStream.position;
		var numGlyphs = byteStream.readUint16();
		var offsetTable = [];
		offsetTable.push(numGlyphs);
		numGlyphs /= 2;
		numGlyphs--;
		for (i = numGlyphs; i--;) {
			offsetTable.push(byteStream.readUint16());
		}
		numGlyphs++;
		var glyphs = [];
		for (i = 0; i < numGlyphs; i++) {
			byteStream.setOffset(offset + offsetTable[i], 0);
			var numBits = byteStream.readUint8();
			glyphs.push(this.shapeRecords(1, {
				fillBits: numBits >> 4,
				lineBits: numBits & 0b1111
			}));
		}
		obj.glyphs = glyphs;
		byteStream.position = endOffset;
		byteStream.bit_offset = 0;
		return obj;
	}
	SwfParser.prototype.parseDefineFont2 = function(ver, length) {
		var byteStream = this.byteStream;
		var startOffset = byteStream.position;
		var obj = {};
		obj.version = ver;
		obj.id = byteStream.readUint16();
		var i = 0;
		var fontFlags = byteStream.readUint8();
		obj.isBold = (fontFlags) & 1;
		obj.isItalic = (fontFlags >>> 1) & 1;
		var isWideCodes = (fontFlags >>> 2) & 1;
		obj.isWideCodes = isWideCodes;
		var isWideOffsets = (fontFlags >>> 3) & 1;
		obj.isWideOffsets = isWideOffsets;
		obj.isANSI = (fontFlags >>> 4) & 1;
		obj.isSmallText = (fontFlags >>> 5) & 1;
		obj.isShiftJIS = (fontFlags >>> 6) & 1;
		var hasLayout = (fontFlags >>> 7) & 1;
		obj.language = this.parseLanguage();
		
		// SWF19 states that the font name should not have a terminating null byte,
		// but it often does (depends on Flash IDE version?)
		obj.fontNameData = byteStream.readStringWithLength();

		var numGlyphs = byteStream.readUint16();
		obj.numGlyphs = numGlyphs;
		
		// SWF19 p. 164 doesn't make it super clear: If there are no glyphs,
		// then the following tables are omitted. But the table offset values
		// may or may not be written... (depending on Flash IDE version that was used?)
		if (numGlyphs == 0) {
			// Try to read the CodeTableOffset. It may or may not be present,
			// so just dump any error.
			if (isWideOffsets) {
				byteStream.readUint32();
			} else {
				byteStream.readUint16();
			}
		} else {
			var offset = byteStream.position;
			// OffsetTable
			var OffsetTable = [];
			if (isWideOffsets) {
				for (i = numGlyphs; i--;) {
					OffsetTable[OffsetTable.length] = byteStream.readUint32();
				}
			} else {
				for (i = numGlyphs; i--;) {
					OffsetTable[OffsetTable.length] = byteStream.readUint16();
				}
			}

			// CodeTableOffset
			var codeTableOffset;
			if (isWideOffsets) {
				codeTableOffset = byteStream.readUint32();
			} else {
				codeTableOffset = byteStream.readUint16();
			}

			// GlyphShapeTable
			var glyphShapeTable = [];
			for (i = 0; i < numGlyphs; i++) {
				// The glyph shapes are assumed to be positioned per the offset table.
				// Panic on debug builds if this assumption is wrong, maybe we need to
				// seek into these offsets instead?
				byteStream.setOffset(offset + OffsetTable[i], 0);

				// The glyph shapes must not overlap. Avoid exceeding to the next one.
				// TODO: What happens on decreasing offsets?
				var availableBytes;
				if (i < (numGlyphs - 1)) {
					availableBytes = (OffsetTable[i + 1] - OffsetTable[i]);
				} else {
					availableBytes = (codeTableOffset - OffsetTable[i]);
				}
				if (availableBytes == 0) {
					continue;
				}
				var numBits = byteStream.readUint8();
				if (availableBytes == 1) {
					continue;
				}
				// TODO: Avoid reading more than `available_bytes - 1`?
				var numFillBits = numBits >> 4;
				var numLineBits = numBits & 0b1111;
				glyphShapeTable.push(this.shapeRecords(1, {
					fillBits: numFillBits,
					lineBits: numLineBits
				}));
			}
			obj.glyphs = glyphShapeTable;

			// The code table is assumed to be positioned right after the glyph shapes.
			// Panic on debug builds if this assumption is wrong, maybe we need to seek
			// into the code table offset instead?
			byteStream.setOffset(offset + codeTableOffset, 0);

			// CodeTable
			var CodeTable = [];
			if (isWideCodes) {
				for (i = numGlyphs; i--;) {
					CodeTable.push(byteStream.readUint16());
				}
			} else {
				for (i = numGlyphs; i--;) {
					CodeTable.push(byteStream.readUint8());
				}
			}
			obj.codeTables = CodeTable;
		}

		// TODO: Is it possible to have a layout when there are no glyphs?
		if (hasLayout) {
			obj.layout = {};
			obj.layout.ascent = byteStream.readUint16();
			obj.layout.descent = byteStream.readUint16();
			obj.layout.leading = byteStream.readInt16();
			var advanceTable = [];
			for (i = numGlyphs; i--;) {
				advanceTable.push(byteStream.readInt16());
			}
			obj.layout.advanceTable = advanceTable;
			// Some older SWFs end the tag here, as this data isn't used until v7.
			var boundsTable = [];
			if ((byteStream.position - startOffset) < length) {
				for (i = numGlyphs; i--;) {
					boundsTable.push(this.rect());
				}
				byteStream.byteAlign();
			}
			obj.layout.boundsTable = boundsTable;
			var kernings = [];
			if ((byteStream.position - startOffset) < length) {
				var kerningCount = byteStream.readUint16();
				for (i = kerningCount; i--;) {
					var kerningCode1 = ((isWideCodes) ? byteStream.readUint16() : byteStream.readUint8());
					var kerningCode2 = ((isWideCodes) ? byteStream.readUint16() : byteStream.readUint8());
					var kerningAdjustment = byteStream.readInt16();
					kernings.push({
						leftCode: kerningCode1,
						rightCode: kerningCode2,
						adjustment: kerningAdjustment
					});
				}
			}
			obj.kernings = kernings;
		}
		return obj;
	}
	SwfParser.prototype.parseDefineFont4 = function(length) {
		var byteStream = this.byteStream;
		var startOffset = byteStream.position;
		var obj = {};
		obj.version = 4;
		obj.id = byteStream.readUint16();
		var flags = byteStream.readUint8();
		obj.name = byteStream.readStringWithUntil();
		if (flags & 0b100) {
			obj.data = byteStream.readBytes(length - (byteStream.position - startOffset));
		} else {
			var e = (length - (byteStream.position - startOffset));
			byteStream.position += e;
		}
		obj.isItalic = (flags & 0b10);
		obj.isBold = (flags & 0b1);
		return obj;
	}
	SwfParser.prototype.parseDefineFontInfo = function(ver, length) {
		var byteStream = this.byteStream;
		var endOffset = byteStream.position + length;
		var obj = {};
		obj.id = byteStream.readUint16();
		obj.version = ver;
		obj.fontNameData = byteStream.readStringWithLength();
		var flags = byteStream.readUint8();
		obj.isWideCodes = flags & 1;
		obj.isBold = (flags >>> 1) & 1;
		obj.isItalic = (flags >>> 2) & 1;
		obj.isShiftJIS = (flags >>> 3) & 1;
		obj.isANSI = (flags >>> 4) & 1;
		obj.isSmallText = (flags >>> 5) & 1;
		byteStream.byteAlign();
		if (ver === 2) {
			obj.language = this.parseLanguage();
		}
		var codeTable = [];
		var tLen = endOffset - byteStream.position;
		if (obj.isWideCodes) {
			while (tLen > 1) {
				codeTable[codeTable.length] = byteStream.readUint16();
				tLen -= 2;
			}
		} else {
			// TODO(Herschel): Warn for version 2.
			while (tLen > 0) {
				codeTable[codeTable.length] = byteStream.readUint8();
				tLen--;
			}
		}
		obj.codeTable = codeTable;

		// SWF19 has ANSI and Shift-JIS backwards?
		return obj;
	}
	SwfParser.prototype.parseDefineEditText = function() {
		var byteStream = this.byteStream;
		var obj = {};
		obj.id = byteStream.readUint16();
		obj.bounds = this.rect();
		var flag1 = byteStream.readUint16();

		var hasFont = flag1 & 1;
		var hasMaxLength = (flag1 >>> 1) & 1;
		var hasTextColor = (flag1 >>> 2) & 1;
		var isReadOnly = (flag1 >>> 3) & 1;
		var isPassword = (flag1 >>> 4) & 1;
		var isMultiline = (flag1 >>> 5) & 1;
		var isWordWrap = (flag1 >>> 6) & 1;
		var hasInitialText = (flag1 >>> 7) & 1;
		var outlines = (flag1 >>> 8) & 1;
		var HTML = (flag1 >>> 9) & 1;
		var wasStatic = (flag1 >>> 10) & 1;
		var border = (flag1 >>> 11) & 1;
		var noSelect = (flag1 >>> 12) & 1;
		var hasLayout = (flag1 >>> 13) & 1;
		var autoSize = (flag1 >>> 14) & 1;
		var hasFontClass = (flag1 >>> 15) & 1;

		obj.isReadOnly = isReadOnly;
		obj.isPassword = isPassword;
		obj.isMultiline = isMultiline;
		obj.isWordWrap = isWordWrap;
		obj.outlines = outlines;
		obj.HTML = HTML;
		obj.wasStatic = wasStatic;
		obj.border = border;
		obj.noSelect = noSelect;
		obj.autoSize = autoSize;

		if (hasFont) {
			obj.fontID = byteStream.readUint16();
		}
		if (hasFontClass) {
			obj.fontClass = byteStream.readStringWithUntil();
		}
		if (hasFont && !hasFontClass) {
			obj.fontHeight = byteStream.readUint16();
		}
		if (hasTextColor) {
			obj.textColor = this.rgba();
		}
		if (hasMaxLength) {
			obj.maxLength = byteStream.readUint16();
		}
		if (hasLayout) {
			obj.layout = {};
			obj.layout.align = this.textAlign(byteStream.readUint8());
			obj.layout.leftMargin = byteStream.readUint16();
			obj.layout.rightMargin = byteStream.readUint16();
			obj.layout.indent = byteStream.readUint16();
			obj.layout.leading = byteStream.readInt16();
		}
		obj.variableName = byteStream.readStringWithUntil();
		if (hasInitialText) {
			obj.initialText = byteStream.readStringWithUntil();
		}
		return obj;
	}
	SwfParser.prototype.parseDefineSprite = function(length) {
		var obj = {};
		var byteStream = this.byteStream;
		obj.id = byteStream.readUint16();
		obj.numFrames = byteStream.readUint16();
		this.taglengthstack[this.taglengthstackSize++] = (this.byteStream.position + (length - 4));
		obj.tags = this.parseTags();
		return obj;
	}
	SwfParser.prototype.parseDefineShape = function(version) {
		var byteStream = this.byteStream;
		var obj = {};
		obj.id = byteStream.readUint16();
		obj.bounds = this.rect();
		obj.version = version;
		if (version >= 4) {
			obj.edgeBounds = this.rect();
			var flags = byteStream.readUint8();
			obj.scalingStrokes = flags & 1;
			obj.nonScalingStrokes = (flags >>> 1) & 1;
			obj.fillWindingRule = (flags >>> 2) & 1;
		}
		obj.shapes = this.shapeWithStyle(version);
		return obj;
	}
	SwfParser.prototype.parseDefineSound = function(length) {
		var obj = {};
		var byteStream = this.byteStream;
		var startOffset = byteStream.position;
		obj.id = byteStream.readUint16();
		obj.format = this.parseSoundFormat();
		obj.numSamples = byteStream.readUint32();
		var sub = byteStream.position - startOffset;
		var dataLength = length - sub;
		obj.data = byteStream.readBytes(dataLength);
		return obj;
	}
	SwfParser.prototype.parseDefineText = function(ver) {
		var byteStream = this.byteStream;
		var obj = {};
		obj.id = byteStream.readUint16();
		obj.bounds = this.rect();
		obj.matrix = this.matrix();
		var GlyphBits = byteStream.readUint8();
		var AdvanceBits = byteStream.readUint8();
		obj.records = this.getTextRecords(ver, GlyphBits, AdvanceBits);
		return obj;
	}
	SwfParser.prototype.parseDefineBinaryData = function(length) {
		var byteStream = this.byteStream;
		var obj = {}
		obj.id = byteStream.readUint16();
		byteStream.readUint32();
		obj.data = byteStream.readBytes(length - 6);
		return obj;
	}
	SwfParser.prototype.parseDefineScalingGrid = function() {
		var byteStream = this.byteStream;
		var obj = {};
		obj.characterId = byteStream.readUint16();
		obj.splitter = this.rect();
		byteStream.byteAlign();
		return obj;
	}
	SwfParser.prototype.parseDefineSceneAndFrameLabelData = function() {
		var byteStream = this.byteStream;
		var obj = {};
		var sceneCount = byteStream.getU30();
		obj.sceneInfo = [];
		while (sceneCount--) {
			obj.sceneInfo.push({
				offset: byteStream.getU30(),
				name: decodeURIComponent(byteStream.readStringWithUntil())
			});
		}
		var frameLabelCount = byteStream.getU30();
		obj.frameInfo = [];
		while (frameLabelCount--) {
			obj.frameInfo.push({
				num: byteStream.getU30(),
				label: decodeURIComponent(byteStream.readStringWithUntil())
			});
		}
		return obj;
	}
	SwfParser.prototype.parseDefineVideoStream = function() {
		var byteStream = this.byteStream;
		var obj = {};
		obj.id = byteStream.readUint16();
		obj.numFrames = byteStream.readUint16();
		obj.width = byteStream.readUint16();
		obj.height = byteStream.readUint16();
		// TODO(Herschel): Check SWF version.
		var flags = byteStream.readUint8();
		switch (byteStream.readUint8()) {
			case 0: // None
				obj.codec = "none";
				break;
			case 2: // H263
				obj.codec = "H263";
				break;
			case 3: // ScreenVideo
				obj.codec = "ScreenVideo";
				break;
			case 4: // Vp6
				obj.codec = "Vp6";
				break;
			case 5: // Vp6WithAlpha
				obj.codec = "Vp6WithAlpha";
				break;
			case 6: // ScreenVideoV2
				obj.codec = "ScreenVideoV2";
				break;
			default:
				throw new Error("Invalid video codec.");
		}
		switch ((flags >> 1) & 0b111) {
			case 0: // None
				obj.deblocking = "useVideoPacketValue";
				break;
			case 1: // None
				obj.deblocking = "none";
				break;
			case 2: // Level1
				obj.deblocking = "Level1";
				break;
			case 3: // Level2
				obj.deblocking = "Level2";
				break;
			case 4: // Level3
				obj.deblocking = "Level3";
				break;
			case 5: // Level4
				obj.deblocking = "Level4";
				break;
			default:
				throw new Error("Invalid video deblocking value.");
		}
		obj.isSmoothed = flags & 0b1;
		return obj;
	}
	SwfParser.prototype.parseDefineBitsLossLess = function(ver, length) {
		var obj = {};
		var byteStream = this.byteStream;
		var startOffset = byteStream.position;
		obj.id = byteStream.readUint16();
		obj.ver = ver;
		var format = byteStream.readUint8();
		obj.width = byteStream.readUint16();
		obj.height = byteStream.readUint16();
		switch (format) {
			case 3: // ColorMap8
				obj.numColors = byteStream.readUint8();
				break;
			case 4: // Rgb15
			case 5: // Rgb32
				break;
			default:
				throw new Error("Invalid bitmap format: " + format);
		}
		var sub = byteStream.position - startOffset;
		obj.data = byteStream.readBytes(length - sub);
		obj.format = format;
		return obj;
	}
	SwfParser.prototype.parseDefineFontName = function() {
		var obj = {};
		var byteStream = this.byteStream;
		obj.id = byteStream.readUint16();
		obj.name = byteStream.readStringWithUntil();
		obj.copyrightInfo = byteStream.readStringWithUntil();
		return obj;
	}
	SwfParser.prototype.parseDefineBits = function(ver, length) {
		var obj = {};
		var byteStream = this.byteStream;
		var startOffset = byteStream.position;
		obj.id = byteStream.readUint16();
		if (ver <= 2) {
			obj.data = byteStream.readBytes(length - 2);
		} else {
			var dataSize = byteStream.readUint32();
			var deblocking = null;
			if (ver >= 4) {
				deblocking = byteStream.readUint16();
			}
			var data = byteStream.readBytes(dataSize);
			var sub = byteStream.position - startOffset;
			var alphaData = byteStream.readBytes(length - sub);
			obj.data = data;
			obj.alphaData = alphaData;
			obj.deblocking = deblocking;
		}
		return obj;
	}
	SwfParser.prototype.parseDefineButtonCxform = function(length) {
		var byteStream = this.byteStream;
		var startOffset = byteStream.position;
		var obj = {};
		// SWF19 is incorrect here. You can have >1 color transforms in this tag. They apply
		// to the characters in a button in sequence.

		obj.id = byteStream.readUint16();
		var colorTransforms = [];
		
		// Read all color transforms.
		while ((byteStream.position - startOffset) < length) {
			colorTransforms.push(this.colorTransform(false));
			byteStream.byteAlign();
		}
		obj.colorTransforms = colorTransforms;
		return obj;
	}
	SwfParser.prototype.parseDefineMorphShape = function(ver) {
		var byteStream = this.byteStream;
		var obj = {};
		obj.id = byteStream.readUint16();
		obj.startBounds = this.rect();
		obj.endBounds = this.rect();
		if (ver == 2) {
			obj.startEdgeBounds = this.rect();
			obj.endEdgeBounds = this.rect();
			var flags = byteStream.readUint8();
			obj.isScalingStrokes = flags & 1;
			obj.isNonScalingStrokes = (flags >>> 1) & 1;
		}
		byteStream.readUint32(); // Offset to EndEdges.
		obj.morphFillStyles = this.morphFillStyleArray(ver);
		obj.morphLineStyles = this.morphLineStyleArray(ver);
	
		// TODO(Herschel): Add read_shape
		obj.startEdges = this.morphShapeWithStyle(ver, false);
		obj.endEdges = this.morphShapeWithStyle(ver, true);
		return obj;
	}
	SwfParser.prototype.parseDefineFontAlignZones = function(length) {
		var byteStream = this.byteStream;
		var tag = {};
		var startOffset = byteStream.position;
		tag.id = byteStream.readUint16();
		tag.thickness = byteStream.readUint8();
		var zones = [];
		while (byteStream.position < (startOffset + length)) {
			byteStream.readUint8(); // Always 2.
			zones.push({
				left: byteStream.readInt16(),
				width: byteStream.readInt16(),
				bottom: byteStream.readInt16(),
				height: byteStream.readInt16()
			});
			byteStream.readUint8(); // Always 0b000000_11 (2 dimensions).
		}
		tag.zones = zones;
		return tag;
	}
	SwfParser.prototype.parsePlaceObject = function(ver, length) {
		var byteStream = this.byteStream;
		var obj = {};
		var startOffset = byteStream.position;
		obj.version = ver;
		if (ver === 1) {
			obj.characterId = byteStream.readUint16();
			obj.depth = byteStream.readUint16();
			obj.matrix = this.matrix();
			byteStream.byteAlign();
			if ((byteStream.position - startOffset) < length) {
				obj.colorTransform = this.colorTransform();
			}
		} else {
			var flags;
			if (ver >= 3) {
				flags = byteStream.readUint16();
			} else {
				flags = byteStream.readUint8();
			}
			obj.depth = byteStream.readUint16();

			var isMove = (flags & 1);
			var hasCharacter = (flags >>> 1) & 1;
			var hasMatrix = (flags >>> 2) & 1;
			var hasColorTransform = (flags >>> 3) & 1;
			var hasRatio = (flags >>> 4) & 1;
			var hasName = (flags >>> 5) & 1;
			var hasClipDepth = (flags >>> 6) & 1;
			var hasClipActions = (flags >>> 7) & 1;
			// PlaceObject3
			var hasFilters = (flags >>> 8) & 1;
			var hasBlendMode = (flags >>> 9) & 1;
			var hasBitmapCache = (flags >>> 10) & 1;
			var hasClassName = (flags >>> 11) & 1;
			var hasImage = (flags >>> 12) & 1;
			var hasVisible = (flags >>> 13) & 1;
			var hasBackgroundColor = (flags >>> 14) & 1;

			// PlaceObject3
			// SWF19 p.40 incorrectly says class name if (HasClassNameFlag || (HasImage && HasCharacterID))
			// I think this should be if (HasClassNameFlag || (HasImage && !HasCharacterID)),
			// you use the class name only if a character ID isn't present.
			// But what is the case where we'd have an image without either HasCharacterID or HasClassName set?
			obj.hasImage = hasImage;
			if ((hasClassName) || ((obj.hasImage) && !hasCharacter)) {
				obj.className = byteStream.readStringWithUntil();
			}
			obj.isMove = isMove;
			if (hasCharacter) {
				obj.characterId = byteStream.readUint16();
			}
			if (!obj.isMove && !hasCharacter) {
				throw new Error("Invalid PlaceObject type");
			}
			if (hasMatrix) {
				obj.matrix = this.matrix();
			}
			if (hasColorTransform) {
				obj.colorTransform = this.colorTransform(true);
			}
			if (hasRatio) {
				obj.ratio = byteStream.readUint16();
			}
			if (hasName) {
				obj.name = byteStream.readStringWithUntil();
			}
			if (hasClipDepth) {
				obj.clipDepth = byteStream.readUint16();
			}
			// PlaceObject3
			if (hasFilters) {
				obj.filters = this.getFilterList();
			}
			if (hasBlendMode) {
				obj.blendMode = this.parseBlendMode();
			}
			if (hasBitmapCache) {
				obj.bitmapCache = byteStream.readUint8();
			}
			if (hasVisible) {
				obj.visible = byteStream.readUint8();
			}
			if (hasBackgroundColor) {
				obj.backgroundColor = this.rgba();
			}
			if (hasClipActions) {
				obj.clipActions = this.parseClipActions(startOffset, length);
			}
			// PlaceObject4
			if (ver === 4) {
				obj.amfData = byteStream.readBytes((length - (byteStream.position - startOffset)));
			}
		}
		byteStream.byteAlign();
		return obj;
	}
	SwfParser.prototype.parseDoAction = function(length) {
		var byteStream = this.byteStream;
		var obj = {};
		obj.action = this.parseAction(byteStream.readBytes(length));
		return obj;
	}
	SwfParser.prototype.parseDoInitAction = function(length) {
		var byteStream = this.byteStream;
		var obj = {};
		obj.spriteId = byteStream.readUint16();
		obj.action = this.parseAction(byteStream.readBytes(length - 2));
		return obj;
	}
	SwfParser.prototype.parseDoABC = function(ver, length) {
		var byteStream = this.byteStream;
		var startOffset = byteStream.position;
		var obj = {};
		obj.version = ver;
		obj.flags = byteStream.readUint32();
		obj.lazyInitialize = obj.flags & 1;
		obj.name = byteStream.readStringWithUntil();
		var offset = length - (byteStream.position - startOffset) | 0;
		obj.abc = this.parseABC(byteStream.readBytes(offset));
		return obj;
	}
	SwfParser.prototype.parseProductInfo = function() {
		// Not documented in SWF19 reference.
		// See http://wahlers.com.br/claus/blog/undocumented-swf-tags-written-by-mxmlc/
		var byteStream = this.byteStream;
		var obj = {};
		obj.productID = byteStream.readUint32();
		obj.edition = byteStream.readUint32();
		obj.majorVersion = byteStream.readUint8();
		obj.minorVersion = byteStream.readUint8();
		obj.buildBumber = byteStream.readUint64();
		obj.compilationDate = byteStream.readUint64();
		return obj;
	}
	SwfParser.prototype.parseDebugID = function(length) {
		// Not documented in SWF19 reference.
		// See http://wahlers.com.br/claus/blog/undocumented-swf-tags-written-by-mxmlc/
		var byteStream = this.byteStream;
		var obj = {};
		obj.debugId = byteStream.readUint8();
		byteStream.position--;
		byteStream.position += length;
		return obj;
	}
	SwfParser.prototype.parseNameCharacter = function() {
		// Not documented in SWF19 reference, and seems to be ignored by the official Flash Player.
		// Not generated by any version of the Flash IDE, but some 3rd party tools contain it.
		// See https://www.m2osw.com/swf_tag_namecharacter
		var byteStream = this.byteStream;
		var obj = {};
		obj.id = byteStream.readUint16();
		obj.name = byteStream.readStringWithUntil();
		return obj;
	}
	SwfParser.prototype.parseFileAttributes = function() {
		var byteStream = this.byteStream;
		var obj = {};
		var flags = byteStream.readUint32();

		/// Whether this SWF requests hardware acceleration to blit to the screen.
		obj.useDirectBlit = (flags >> 6) & 1;

		/// Whether this SWF requests hardware acceleration for compositing.
		obj.useGPU = (flags >> 5) & 1;

		/// Whether this SWF contains XMP metadata in a Metadata tag.
		obj.hasMetadata = (flags >> 4) & 1;

		/// Whether this SWF uses ActionScript 3 (AVM2).
		obj.isActionScript3 = (flags >> 3) & 1;

		/// Whether this SWF should be placed in the network sandbox when run locally.
		///
		/// SWFs in the network sandbox can only access network resources,  not local resources.
		/// SWFs in the local sandbox can only access local resources, not network resources.
		obj.useNetworkSandbox = (flags >> 0) & 1;
		return obj;
	}
	SwfParser.prototype.parseSymbolClass = function() {
		var byteStream = this.byteStream;
		var obj = {};
		var symbols = [];
		var count = byteStream.readUint16();
		while (count--) {
			symbols.push({
				tagId: byteStream.readUint16(),
				path: byteStream.readStringWithUntil()
			});
		}
		obj.symbols = symbols;
		return obj;
	}
	SwfParser.prototype.parseFrameLabel = function(length) {
		var byteStream = this.byteStream;
		var startOffset = byteStream.position;
		var obj = {};
		obj.label = byteStream.readStringWithUntil();
		var isAnchor = false;
		if (this._swfVersion >= 6 && (byteStream.position - startOffset) !== length) {
			isAnchor = byteStream.readUint8() != 0;
		}
		obj.isAnchor = isAnchor;
		return obj;
	}
	SwfParser.prototype.parseRemoveObject = function(ver) {
		var obj = {};
		if (ver == 1) {
			obj.characterId = this.byteStream.readUint16();
		}
		obj.depth = this.byteStream.readUint16();
		return obj;
	}
	SwfParser.prototype.parseExportAssets = function() {
		var obj = {};
		var byteStream = this.byteStream;
		var count = byteStream.readUint16();
		var packages = [];
		while (count--) {
			var id = byteStream.readUint16();
			var name = byteStream.readStringWithUntil();
			packages.push([id, name]);
		}
		obj.packages = packages;
		return obj;
	}
	SwfParser.prototype.parseImportAssets = function(ver) {
		var obj = {};
		var url = this.byteStream.readStringWithUntil();
		if (ver == 2) {
			this.byteStream.readUint8(); // Reserved; must be 1
			this.byteStream.readUint8(); // Reserved; must be 0
		}
		var num_imports = this.byteStream.readUint16();
		var imports = [];
		while (num_imports--) {
			imports.push({
				id: this.byteStream.readUint16(),
				name: this.byteStream.readStringWithUntil()
			});
		}
		obj.url = url;
		obj.imports = imports;
		return obj;
	}
	SwfParser.prototype.parseStartSound = function(ver) {
		var byteStream = this.byteStream;
		var obj = {};
		if (ver == 2) {
			obj.className = byteStream.readStringWithUntil();
		} else {
			obj.id = byteStream.readUint16();
		}
		obj.info = this.parseSoundInfo();
		return obj;
	}
	SwfParser.prototype.parseSoundStreamHead = function(ver) {
		var obj = {};
		var byteStream = this.byteStream;
		// TODO: Verify version requirements.
		obj.playback = this.parseSoundFormat();
		obj.stream = this.parseSoundFormat();
		obj.samplePerBlock = byteStream.readUint16();
		obj.latencySeek = 0;
		if (obj.stream.compression === "MP3") {
			// SWF19 says latency seek is i16, not u16. Is this wrong> How are negative values used?
			// Some software creates SWF files that incorrectly omit this value.
			// Fail silently if it's missing.
			// TODO: What is Flash's behavior in this case? Does it read the value from the following bytes?
			obj.latencySeek = byteStream.readInt16();
		}
		byteStream.byteAlign();
		return obj;
	}
	SwfParser.prototype.parseSoundStreamBlock = function(length) {
		var byteStream = this.byteStream;
		var obj = {};
		obj.compressed = byteStream.readBytes(length);
		return obj;
	}
	SwfParser.prototype.parseVideoFrame = function(length) {
		var byteStream = this.byteStream;
		var startOffset = byteStream.position;
		var obj = {};
		obj.streamId = byteStream.readUint16();
		byteStream.readUint16();
		var sub = byteStream.position - startOffset;
		var dataLength = length - sub;
		obj.videoData = byteStream.readBytes(dataLength);
		return obj;
	}
	SwfParser.prototype.parseCSMTextSettings = function() {
		var obj = {};
		var byteStream = this.byteStream;
		obj.id = byteStream.readUint16();
		var flags = byteStream.readUint8();
		obj.useAdvancedRendering = flags & 0b01000000;
		switch ((flags >> 3) & 0b11) {
			case 0:
				obj.gridFit = "none";
				break;
			case 1:
				obj.gridFit = "pixel";
				break;
			case 2:
				obj.gridFit = "subPixel";
				break;
			default:
				throw new Error("Invalid text grid fitting");
		}
		obj.thickness = byteStream.readFloat32();
		obj.sharpness = byteStream.readFloat32();
		byteStream.readUint8(); // Reserved (0).
		return obj;
	}
	const ActionParser = function(data) {
		this.byteStream = new ByteStream(data);
	}
	ActionParser.prototype.parseAvm1 = function(data) {
		var avm1Parser = new ActionParser(data);
		return avm1Parser.parse();
	}
	ActionParser.prototype.parse = function() {
		return this.parseCaches();
	}
	ActionParser.prototype.parseCaches = function() {
		var caches = [];
		var byteOffset;
		while (this.byteStream.position < this.byteStream.getLength()) {
			byteOffset = this.byteStream.position;
			var action = this.parseAction();
			caches[byteOffset] = action;
			if (action.opcode === 0x00) break;
		}
		return caches;
	}
	ActionParser.prototype.parseAction = function() {
		let {opcode, length} = this.parseOpcodeAndLength();
		let startOffset = this.byteStream.position;
		let action = this.parseOpcode(opcode, length);
		action.opcode = opcode;
		action.end = this.byteStream.position;
		if ((this.byteStream.position - startOffset) !== action.len) {
			console.log("Length mismatch in AVM1 action: ", opcode, ((this.byteStream.position - startOffset) + " = " + action.len));
			this.byteStream.position = startOffset + action.len;
		}
		return action;

	}
	ActionParser.prototype.parseOpcodeAndLength = function() {
		let opcode = this.byteStream.readUint8();
		let length = (opcode >= 0x80) ? this.byteStream.readUint16() : 0;
		return {opcode, length}
	}
	ActionParser.prototype.parseOpcode = function(opcode, length) {
		var action = {};
		var lenFix = length;
		switch (opcode) {
			case 0x00: // End
			case 0x04: // NextFrame
			case 0x05: // PreviousFrame
			case 0x06: // Play
			case 0x07: // Stop
			case 0x08: // ToggleQuality
			case 0x09: // StopSounds
			case 0x0A: // Add
			case 0x0B: // Subtract
			case 0x0C: // Multiply
			case 0x0D: // Divide
			case 0x0E: // Equals
			case 0x0F: // Less
			case 0x10: // And
			case 0x11: // Or
			case 0x12: // Not
			case 0x13: // StringEquals
			case 0x14: // StringLength
			case 0x15: // StringExtract

			case 0x17: // Pop
			case 0x18: // ToInteger

			case 0x1C: // GetVariable
			case 0x1D: // SetVariable

			case 0x20: // SetTarget2
			case 0x21: // StringAdd
			case 0x22: // GetProperty
			case 0x23: // SetProperty
			case 0x24: // CloneSprite
			case 0x25: // RemoveSprite
			case 0x26: // Trace
			case 0x27: // StartDrag
			case 0x28: // EndDrag
			case 0x29: // StringLess
			case 0x2A: // Throw
			case 0x2B: // CastOp
			case 0x2C: // ImplementsOp
			case 0x2D: // FsCommand2

			case 0x30: // RandomNumber
			case 0x31: // MBStringLength
			case 0x32: // CharToAscii
			case 0x33: // AsciiToChar
			case 0x34: // GetTime
			case 0x35: // MBStringExtract
			case 0x36: // MBCharToAscii
			case 0x37: // MBAsciiToChar

			case 0x3A: // Delete
			case 0x3B: // Delete2
			case 0x3C: // DefineLocal
			case 0x3D: // CallFunction
			case 0x3E: // Return
			case 0x3F: // Modulo
			case 0x40: // NewObject
			case 0x41: // DefineLocal2
			case 0x42: // InitArray
			case 0x43: // InitObject
			case 0x44: // TypeOf
			case 0x45: // TargetPath
			case 0x46: // Enumerate
			case 0x47: // Add2
			case 0x48: // Less2
			case 0x49: // Equals2
			case 0x4a: // ToNumber
			case 0x4b: // ToString
			case 0x4c: // PushDuplicate
			case 0x4d: // StackSwap
			case 0x4e: // GetMember
			case 0x4f: // SetMember
			case 0x50: // Increment
			case 0x51: // Decrement
			case 0x52: // CallMethod
			case 0x53: // NewMethod
			case 0x54: // InstanceOf
			case 0x55: // Enumerate2
				
			case 0x60: // BitAnd
			case 0x61: // BitOr
			case 0x62: // BitXor
			case 0x63: // BitLShift
			case 0x64: // BitRShift
			case 0x65: // BitURShift
			case 0x66: // StrictEquals
			case 0x67: // Greater
			case 0x68: // StringGreater
			case 0x69: // Extends

			case 0x9E: // Call
				break;
			case 0x81: // GotoFrame
				action.frame = this.byteStream.readUint16();
				break;
			case 0x83: // GetUrl
				action.url = this.byteStream.readStringWithUntil();
				action.target = this.byteStream.readStringWithUntil();
				break;
			case 0x87: // StoreRegister
				action.register = this.byteStream.readUint8();
				break;
			case 0x88: // ConstantPool
				var count = this.byteStream.readUint16();
				var strings = [];
				if (count > 0) {
					while (count--) {
						strings.push(this.byteStream.readStringWithUntil());
					}
				}
				action.strings = strings;
				break;
			case 0x8A: // WaitForFrame
				action.frame = this.byteStream.readUint16();
				action.numActionsToSkip = this.byteStream.readUint8();
				break;
			case 0x8B: // SetTarget
				action.target = this.byteStream.readStringWithUntil();
				break;
			case 0x8C: // GotoLabel
				action.label = this.byteStream.readStringWithUntil();
				break;
			case 0x8D: // WaitForFrame2
				action.numActionsToSkip = this.byteStream.readUint8();
				break;
			case 0x8E: // DefineFunction2
				var name = this.byteStream.readStringWithUntil();
				var numParams = this.byteStream.readUint16();
				var registerCount = this.byteStream.readUint8();
				var flags = this.byteStream.readUint16();
				var params = [];
				while (numParams--) {
					params.push({
						registerIndex: this.byteStream.readUint8(),
						name: this.byteStream.readStringWithUntil()
					});
				}
				var codeLength = this.byteStream.readUint16();
				action.name = name;
				action.params = params;
				action.registerCount = registerCount;
				action.preloadThis = flags & 1;
				action.suppressThis = (flags >>> 1) & 1;
				action.preloadArguments = (flags >>> 2) & 1;
				action.suppressArguments = (flags >>> 3) & 1;
				action.preloadSuper = (flags >>> 4) & 1;
				action.suppressSuper = (flags >>> 5) & 1;
				action.preloadRoot = (flags >>> 6) & 1;
				action.preloadParent = (flags >>> 7) & 1;
				action.preloadGlobal = (flags >>> 8) & 1;
				action.actions = this.parseAvm1(this.byteStream.readBytes(codeLength));
				lenFix += codeLength;
				break;
			case 0x8F: // Try
				if (length < 7) {
					action.tryBody = [];
				} else {
					var flags = this.byteStream.readUint8();
					let trySize = this.byteStream.readUint16();
					let catchSize = this.byteStream.readUint16();
					let finallySize = this.byteStream.readUint16();
					var catchVar;
					if ((flags >>> 2) & 1) {
						catchVar = this.byteStream.readUint8();
					} else {
						catchVar = this.byteStream.readStringWithUntil();
					}
					var tryBody = this.parseAvm1(this.byteStream.readBytes(trySize));
					var catchBody = this.parseAvm1(this.byteStream.readBytes(catchSize));
					var finallyBody = this.parseAvm1(this.byteStream.readBytes(finallySize));
					action.catchVar = catchVar;
					action.tryBody = tryBody;
					if (flags & 1) {
						action.catchBody = catchBody;
					}
					if ((flags >>> 1) & 1) {
						action.finallyBody = finallyBody;
					}
					lenFix += (trySize + catchSize + finallySize);
				}
				break;
			case 0x94: // With
				var codeLength = this.byteStream.readUint16();
				action.actions = this.parseAvm1(this.byteStream.readBytes(codeLength));
				lenFix += codeLength;
				break;
			case 0x96: // Push
				var startOffset = this.byteStream.position;
				var values = [];
				while (this.byteStream.position < (startOffset + length)) {
					var value;
					var type = this.byteStream.readUint8();
					switch (type) {
						case 0: // String
							value = String(this.byteStream.readStringWithUntil());
							break;
						case 1: // Float
							value = this.byteStream.readFloat32();
							break;
						case 2: // Null
							value = null;
							break;
						case 3: // Undefined
							value = undefined;
							break;
						case 4: // Register
							value = this.byteStream.readUint8();
							break;
						case 5: // Boolean
							value = (this.byteStream.readUint8() != 0);
							break;
						case 6: // Double
							value = this.byteStream.readFloat64();
							break;
						case 7: // Int
							value = this.byteStream.readInt32();
							break;
						case 8: // ConstantPool
							value = this.byteStream.readUint8();
							break;
						case 9: // ConstantPool
							value = this.byteStream.readUint16();
							break;
						default:
							throw new Error("Invalid value type: " + type + " in ActionPush");
					}
					values.push({
						type: type,
						value: value
					});
				}
				action.values = values;
				break;
			case 0x99: // Jump
				action.offset = this.byteStream.readInt16();
				break;
			case 0x9A: // GetUrl2
				action.loadVariablesFlag = this.byteStream.getUIBits(1); // 0=none, 1=LoadVariables
				action.loadTargetFlag = this.byteStream.getUIBits(1);// 0=web, 1=Sprite
				this.byteStream.getUIBits(4); // Reserved
				action.sendVarsMethod = this.byteStream.getUIBits(2);// 0=NONE, 1=GET, 2=POST
				this.byteStream.byteAlign();
				break;
			case 0x9B: // DefineFunction
				var name = this.byteStream.readStringWithUntil();
				var count = this.byteStream.readUint16();
				var params = [];
				if (count > 0) {
					while (count--) {
						params.push(this.byteStream.readStringWithUntil());
					}
				}
				var codeLength = this.byteStream.readUint16();
				action.name = name;
				action.params = params;
				action.actions = this.parseAvm1(this.byteStream.readBytes(codeLength));
				lenFix += codeLength;
				break;
			case 0x9D: // If
				action.offset = this.byteStream.readInt16();
				break;
			case 0x9F: // GotoFrame2
				var flags = this.byteStream.readUint8();
				action.setPlaying = flags & 0b1 != 0;
				action.sceneOffset = ((flags & 0b10) != 0) ? this.byteStream.readUint16() : 0;
				break;
			default:
				console.log("Unknown AVM1 opcode: " + opcode);
				this.byteStream.position += length;
		}
		action.len = lenFix;
		return action;
	}
	const AbcParser = function(data) {
		this.byteStream = new ByteStream(data);
	}
	AbcParser.prototype.parse = function() {
		var byteStream = this.byteStream;
		var len;
		var i;
		var minorVersion = byteStream.readUint16();
		var majorVersion = byteStream.readUint16();
		var constantPool = this.readConstantPool();
		len = byteStream.getU30();
		var methods = [];
		while (len--) {
			methods.push(this.readMethod());
		}
		len = byteStream.getU30();
		var metadata = [];
		while (len--) {
			metadata.push(this.readMetadata());
		}
		len = byteStream.getU30();
		i = len;
		var instances = [];
		while (i--) {
			instances.push(this.readInstance());
		}
		i = len;
		var classes = [];
		while (i--) {
			classes.push(this.readClass());
		}
		len = byteStream.getU30();
		var scripts = [];
		while (len--) {
			scripts.push(this.readScript());
		}
		len = byteStream.getU30();
		var methodBodies = [];
		while (len--) {
			methodBodies.push(this.readMethodBody());
		}
		var obj = {};
		obj.minorVersion = minorVersion;
		obj.majorVersion = majorVersion;
		obj.constantPool = constantPool;
		obj.methods = methods;
		obj.metadata = metadata;
		obj.instances = instances;
		obj.classes = classes;
		obj.scripts = scripts;
		obj.methodBodies = methodBodies;
		return obj;
	}
	AbcParser.prototype.readConstantPool = function() {
		var byteStream = this.byteStream;
		var count;
		count = 0 | byteStream.getU30();
		var integers = [];
		for (let i = 1; count > i; i++) {
			integers[i] = byteStream.getS30();
		}
		count = 0 | byteStream.getU30();
		var uintegers = [];
		for (let i = 1; count > i; i++) {
			uintegers[i] = byteStream.getU30();
		}
		count = 0 | byteStream.getU30();
		var doubles = [];
		for (let i = 1; count > i; i++) {
			doubles[i] = byteStream.readDouble();
		}
		count = 0 | byteStream.getU30();
		var strings = [];
		for (let i = 1; count > i; i++) {
			// TODO: Avoid allocating a String.
			strings[i] = this.readString();
		}
		count = 0 | byteStream.getU30();
		var nameSpaces = [];
		for (let i = 1; count > i; i++) {
			nameSpaces[i] = this.readNamespace();
		}
		count = 0 | byteStream.getU30();
		var nsSets = [];
		for (let i = 1; count > i; i++) {
			var nsCount = byteStream.getU30();
			var ns = [];
			if (nsCount) {
				for (var j = 0; j < nsCount; j++) {
					ns[j] = byteStream.getU30();
				}
			}
			nsSets[i] = ns;
		}
		count = 0 | byteStream.getU30();
		var multinames = [];
		for (let i = 1; count > i; i++) {
			multinames[i] = this.readMultiname();
		}
		var obj = {};
		obj.integer = integers;
		obj.uinteger = uintegers;
		obj.double = doubles;
		obj.strings = strings;
		obj.nameSpaces = nameSpaces;
		obj.nsSets = nsSets;
		obj.multinames = multinames;
		return obj;
	}
	AbcParser.prototype.readString = function() {
		var byteStream = this.byteStream;
		const t = [];
		let e = byteStream.getU30();
		for (let s = 0; e > s; ) {
			const e = byteStream.readUint8();
			switch (!0) {
				case e > 193:
					switch (!0) {
						case e < 248 && e > 239:
							t[t.length] = 55296 | ((7 & e) << 8 | (63 & byteStream.readUint8()) << 2 | byteStream.readUint8() >>> 4 & 3) - 64, t[t.length] = 56320 | (15 & byteStream.readUint8()) << 6 | 63 & byteStream.readUint8(), s += 4;
							break;
						case e < 240 && e > 223:
							t[t.length] = (15 & e) << 12 | (63 & byteStream.readUint8()) << 6 | 63 & byteStream.readUint8(), s += 3;
							break;
						case e < 224:
							t[t.length] = (31 & e) << 6 | 63 & byteStream.readUint8(), s += 2;
							break;
						default:
							t[t.length] = e, ++s
					}
					break;
				default:
					t[t.length] = e, ++s
			}
		}
		let s = "", a = 0, i = 65535;
		e = 0 | t.length;
		for (let r = 0; e > a; ) s += String.fromCharCode.apply(null, t.slice(a, i)), ++r, a = 65535 * r, i = 65535 * (r + 1);
		return s
	}
	AbcParser.prototype.readNamespace = function() {
		var byteStream = this.byteStream;
		var obj = {};
		obj.kind = byteStream.readUint8();
		obj.name = byteStream.getU30();
		// TODO: AVM2 specs say that "non-system" namespaces
		// should have an empty name?
		switch (obj.kind) {
			case 0x05: // Private
			case 0x08: // Namespace
			case 0x16: // Package
			case 0x17: // PackageInternal
			case 0x18: // Protected
			case 0x19: // Explicit
			case 0x1a: // StaticProtected
				break;
			default:
				throw new Error("Invalid namespace kind");
		}
		return obj;
	}
	AbcParser.prototype.readMultiname = function() {
		var byteStream = this.byteStream;
		var obj = {};
		obj.kind = byteStream.readUint8();
		switch (obj.kind) {
			case 0x07: // QName
			case 0x0D: // QNameA
				obj.ns = byteStream.getU30();
				obj.name = byteStream.getU30();
				break;
			case 0x0F: // RTQName
			case 0x10: // RTQNameA
				obj.string = byteStream.getU30();
				break;
			case 0x11: // RTQNameL
			case 0x12: // RTQNameLA
				break;
			case 0x09: // Multiname
			case 0x0E: // MultinameA
				obj.name = byteStream.getU30();
				obj.nsSet = byteStream.getU30();
				break;
			case 0x1B: // MultinameL
			case 0x1C: // MultinameLA
				obj.nsSet = byteStream.getU30();
				break;
			case 0x1d:
				obj.index = byteStream.getU30();
				var count = byteStream.getU30();
				var parameters = [];
				while (count--) {
					parameters.push(byteStream.getU30());
				}
				obj.parameters = parameters;
				break;
			default:
				throw new Error("Invalid multiname kind: " + obj.kind);
		}
		return obj;
	}
	AbcParser.prototype.readMethod = function() {
		var byteStream = this.byteStream;
		var obj = {};
		var i;
		var count = byteStream.getU30();
		obj.paramCount = count;
		obj.returnType = byteStream.getU30();
		if (count) {
			var paramType = [];
			for (i = 0; i < count; i++) {
				paramType.push(byteStream.getU30());
			}
			obj.paramType = paramType;
		}
		obj.name = byteStream.getU30();
		var flags = byteStream.readUint8();
		obj.needArguments = flags & 1;
		obj.needActivation = (flags >>> 1) & 1;
		obj.needRest = (flags >>> 2) & 1;
		obj.ignoreRest = (flags >>> 4) & 1;
		obj.native = (flags >>> 5) & 1;
		obj.setDXNS = (flags >>> 6) & 1;
		if (8 & flags) {
			var options = [];
			var optionCount = byteStream.getU30();
			while (optionCount--) {
				options.push(this.readConstantValue());
			}
			obj.options = options;
		}
		if (128 & flags) {
			var paramNames = [];
			if (count) {
				for (i = 0; i < count; i++) {
					paramNames.push(byteStream.getU30());
				}
			}
			obj.paramNames = paramNames;
		}
		return obj;
	}
	AbcParser.prototype.readConstantValue = function() {
		var byteStream = this.byteStream;
		var obj = {};
		obj.index = byteStream.getU30();
		obj.kind = byteStream.readUint8();
		switch (obj.kind) {
			case 0x00: // Undefined
			case 0x01: // String
			case 0x03: // Int
			case 0x04: // Uint
			case 0x05: // Private
			case 0x06: // Double
			case 0x08: // Namespace
			case 0x0a: // False
			case 0x0b: // True
			case 0x0c: // Null
			case 0x16: // Package
			case 0x17: // PackageInternal
			case 0x18: // Protected
			case 0x19: // Explicit
			case 0x1a: // StaticProtected
				break;
			default:
				throw new Error("Invalid namespace kind");
		}
		return obj;
	}
	AbcParser.prototype.readOptionalValue = function() {
		var byteStream = this.byteStream;
		var obj = {};
		obj.index = byteStream.getU30();
		if (obj.index) {
			obj.kind = byteStream.readUint8();
			switch (obj.kind) {
				case 0x00: // Undefined
				case 0x01: // String
				case 0x03: // Int
				case 0x04: // Uint
				case 0x05: // Private
				case 0x06: // Double
				case 0x08: // Namespace
				case 0x0a: // False
				case 0x0b: // True
				case 0x0c: // Null
				case 0x16: // Package
				case 0x17: // PackageInternal
				case 0x18: // Protected
				case 0x19: // Explicit
				case 0x1a: // StaticProtected
					break;
				default:
					throw new Error("Invalid namespace kind");
			}
		}
		return obj;
	}
	AbcParser.prototype.readMetadata = function() {
		var byteStream = this.byteStream;
		var obj = {};
		obj.name = byteStream.getU30();
		var count = byteStream.getU30();
		var items = [];
		while (count--) {
			items.push({
				key: byteStream.getU30(),
				value: byteStream.getU30()
			});
		}
		obj.items = items;
		return obj;
	}
	AbcParser.prototype.readInstance = function() {
		var byteStream = this.byteStream;
		var obj = {};
		obj.name = byteStream.getU30();
		obj.superName = byteStream.getU30();
		var flags = byteStream.readUint8();
		if (flags & 0x08) {
			obj.protectedNs = byteStream.getU30();
		}
		var count = byteStream.getU30();
		var interfaces = [];
		while (count--) {
			interfaces.push(byteStream.getU30());
		}
		obj.interfaces = interfaces;
		obj.initMethod = byteStream.getU30();
		obj.trait = this.readTrait();
		obj.isSealed = flags & 0x01;
		obj.isFinal = flags & 0x02;
		obj.isInterface = flags & 0x04;
		return obj;
	}
	AbcParser.prototype.readClass = function() {
		var byteStream = this.byteStream;
		var initMethod = byteStream.getU30();
		var trait = this.readTrait();
		return {initMethod, trait};
	}
	AbcParser.prototype.readScript = function() {
		var byteStream = this.byteStream;
		var initMethod = byteStream.getU30();
		var trait = this.readTrait();
		return {initMethod, trait};
	}
	AbcParser.prototype.readTrait = function() {
		var byteStream = this.byteStream;
		var count = byteStream.getU30();
		var trait = [];
		while (count--) {
			var tObj = {};
			tObj.id = byteStream.getU30();
			var flags = byteStream.readUint8();
			var kind = flags & 0b1111;
			var data = {};
			switch (kind) {
				case 0: // Slot
				case 6: // Const
					data.id = byteStream.getU30();
					data.name = byteStream.getU30();
					data.value = this.readOptionalValue();
					break;
				case 1: // Method
				case 2: // Getter
				case 3: // Setter
				case 4: // Class
				case 5: // Function
					data.id = byteStream.getU30();
					data.info = byteStream.getU30();
					break;
				default:
					throw new Error("Invalid trait kind: " + kind);
			}
			tObj.kind = kind;
			tObj.data = data;
			if (flags & 0x40) {
				var metadataCount = byteStream.getU30();
				var metadata = [];
				if (metadataCount) {
					for (var j = 0; j < metadataCount; j++) {
						metadata.push(byteStream.getU30());
					}
				}
				tObj.metadata = metadata;
			}
			tObj.isFinal = (flags & 0x10);
			tObj.isOverride = (flags & 0x20);
			trait.push(tObj);
		}
		return trait;
	}
	AbcParser.prototype.readMethodBody = function() {
		var byteStream = this.byteStream;
		var obj = {};
		obj.method = byteStream.getU30();
		obj.maxStack = byteStream.getU30();
		obj.localCount = byteStream.getU30();
		obj.initScopeDepth = byteStream.getU30();
		obj.maxScopeDepth = byteStream.getU30();
		obj.codes = this.readCodes();
		var count = byteStream.getU30();
		var exceptions = [];
		while (count--) {
			exceptions[exceptions.length] = this.readException();
		}
		obj.exceptions = exceptions;
		obj.trait = this.readTrait();
		return obj;
	}
	AbcParser.prototype.readCodes = function() {
		var byteStream = this.byteStream;
		var count = byteStream.getU30();
		var array = [];
		var cacheOffset;
		for (var i = 0; i < count; i++) {
			var obj = {};
			var code = byteStream.readUint8();
			var offset = 0;
			obj.code = code;
			cacheOffset = byteStream.position;
			switch (code) {
				case 0xa0: // Add
				case 0xc5: // AddI
				case 0x87: // AsTypeLate
				case 0xA8: // BitAnd
				case 0x97: // BitNot
				case 0xa9: // BitOr
				case 0xaa: // BitXor
				case 0x01: // Bkpt
				case 0x78: // CheckFilter
				case 0x82: // CoerceA
				case 0x81: // CoerceB
				case 0x84: // CoerceD
				case 0x83: // CoerceI
				case 0x89: // CoerceO
				case 0x85: // CoerceS
				case 0x88: // CoerceU
				case 0x76: // ConvertB
				case 0x75: // ConvertD
				case 0x73: // ConvertI
				case 0x77: // ConvertO
				case 0x70: // ConvertS
				case 0x74: // ConvertU
				case 0x93: // Decrement
				case 0xc1: // DecrementI
				case 0xa3: // Divide
				case 0x2a: // Dup
				case 0x07: // DxnsLate
				case 0xab: // Equals
				case 0x72: // EscXAttr
				case 0x71: // EscXElem
				case 0x64: // GetGlobalScope
				case 0xd0: // GetLocal0
				case 0xd1: // GetLocal1
				case 0xd2: // GetLocal2
				case 0xd3: // GetLocal3
				case 0xb0: // GreaterEquals Listed incorrectly in AVM2 specs.
				case 0xaf: // GreaterThan
				case 0x1f: // HasNext
				case 0xb4: // In
				case 0x91: // Increment
				case 0xc0: // IncrementI
				case 0xb1: // InstanceOf
				case 0xb3: // IsTypeLate
				case 0x09: // Label
				case 0xae: // LessEquals
				case 0xad: // LessThan
				case 0x38: // Lf32
				case 0x39: // Lf64
				case 0x36: // Li16
				case 0x37: // Li32
				case 0x35: // Li8
				case 0xa5: // LShift
				case 0xa4: // Modulo
				case 0xa2: // Multiply
				case 0xc7: // MultiplyI
				case 0x90: // Negate
				case 0xc4: // NegateI
				case 0x57: // NewActivation
				case 0x1e: // NextName
				case 0x23: // NextValue
				case 0x02: // Nop
				case 0x96: // Not
				case 0x29: // Pop
				case 0x1d: // PopScope
				case 0x27: // PushFalse
				case 0x28: // PushNaN
				case 0x20: // PushNull
				case 0x30: // PushScope
				case 0x26: // PushTrue
				case 0x21: // PushUndefined
				case 0x1c: // PushWith
				case 0x48: // ReturnValue
				case 0x47: // ReturnVoid
				case 0xa6: // RShift
				case 0xd4: // SetLocal0
				case 0xd5: // SetLocal1
				case 0xd6: // SetLocal2
				case 0xd7: // SetLocal3
				case 0x3d: // Sf32
				case 0x3e: // Sf64
				case 0x3b: // Si16
				case 0x3c: // Si32
				case 0x3a: // Si8
				case 0xac: // StrictEquals
				case 0xa1: // Subtract
				case 0xc6: // SubtractI
				case 0x2b: // Swap
				case 0x50: // Sxi1
				case 0x52: // Sxi16
				case 0x51: // Sxi8
				case 0x03: // Throw
				case 0xf3: // Timestamp
				case 0x95: // TypeOf
				case 0xa7: // URShift
					break;
				case 0x53: // ApplyType
				case 0x80: // Coerce
				case 0x86: // AsType
				case 0xf2: // BkptLine
				case 0x41: // Call
				case 0x42: // Construct
				case 0x49: // ConstructSuper
				case 0xf1: // DebugFile
				case 0xf0: // DebugLine
				case 0x94: // DecLocal
				case 0xc3: // DecLocalI
				case 0x6a: // DeleteProperty
				case 0x06: // Dxns
				case 0x5f: // FindDef
				case 0x5e: // FindProperty
				case 0x5d: // FindPropStrict
				case 0x59: // GetDescendants
				case 0x6e: // GetGlobalSlot
				case 0x60: // GetLex
				case 0x62: // GetLocal
				case 0x67: // GetOuterScope
				case 0x66: // GetProperty
				case 0x6c: // GetSlot
				case 0x04: // GetSuper
				case 0x92: // IncLocal
				case 0xc2: // IncLocalI
				case 0x68: // InitProperty
				case 0xb2: // IsType
				case 0x08: // Kill
				case 0x56: // NewArray
				case 0x5a: // NewCatch
				case 0x58: // NewClass
				case 0x40: // NewFunction
				case 0x55: // NewObject
				case 0x22: // PushConstant unused
				case 0x2f: // PushDouble
				case 0x2d: // PushInt
				case 0x31: // PushNamespace
				case 0x25: // PushShort
				case 0x2c: // PushString
				case 0x2e: // PushUint
				case 0x6f: // SetGlobalSlot
				case 0x63: // SetLocal
				case 0x61: // SetProperty
				case 0x6d: // SetSlot
				case 0x05: // SetSuper
					obj.value1 = byteStream.getU30();
					break;
				case 0x43: // CallMethod
				case 0x46: // CallProperty
				case 0x4c: // CallPropLex
				case 0x4f: // CallPropVoid
				case 0x44: // CallStatic
				case 0x45: // CallSuper
				case 0x4e: // CallSuperVoid
				case 0x4a: // ConstructProp
				case 0x32: // HasNext2
					obj.value1 = byteStream.getU30();
					obj.value2 = byteStream.getU30();
					break;
				case 0x65: // GetScopeObject
				case 0x24: // PushByte
					obj.value1 = byteStream.readInt8();
					break;
				case 0x13: // IfEq
				case 0x12: // IfFalse
				case 0x18: // IfGe
				case 0x17: // IfGt
				case 0x16: // IfLe
				case 0x15: // IfLt
				case 0x14: // IfNe
				case 0x0f: // IfNge
				case 0x0e: // IfNgt
				case 0x0d: // IfNle
				case 0x0c: // IfNlt
				case 0x19: // IfStrictEq
				case 0x1a: // IfStrictNe
				case 0x11: // IfTrue
				case 0x10: // Jump
					obj.value1 = byteStream.readInt24();
					break;
				case 0x1b: // LookupSwitch
					obj.value1 = byteStream.readInt24();
					obj.value2 = byteStream.getU30();
					obj.value3 = [];
					for (let index = -1; index < obj.value2; ) {
						index++;
						obj.value3.push(byteStream.readInt24());
					}
					break;
				case 0xef: // Debug
					obj.value1 = byteStream.readUint8();
					obj.value2 = byteStream.getU30();
					obj.value3 = byteStream.readUint8();
					obj.value4 = byteStream.getU30();
					break;
				default:
					throw new Error("Unknown ABC opcode: " + code);
			}
			offset += (byteStream.position - cacheOffset);
			obj.offset = offset;
			array[i] = obj;
			i += offset;
		}
		return array;
	}
	AbcParser.prototype.readException = function() {
		var byteStream = this.byteStream;
		var obj = {};
		obj.from = byteStream.getU30();
		obj.to = byteStream.getU30();
		obj.target = byteStream.getU30();
		obj.excType = byteStream.getU30();
		obj.varName = byteStream.getU30();
		return obj;
	}
	const ShapeToCanvas = {
		clone: function(src) {
			var execute = function(src, obj) {
				var prop;
				for (prop in src) {
					if (!src.hasOwnProperty(prop)) {
						continue;
					}
					var value = src[prop];
					if (value instanceof Array) {
						obj[prop] = [];
						execute(value, obj[prop]);
					} else if (value instanceof Object) {
						obj[prop] = {};
						execute(value, obj[prop]);
					} else {
						obj[prop] = value;
					}
				}
			};
			var obj = {};
			execute(src, obj);
			return obj;
		},
		convertCurrentPosition: function(src, ne) {
			var array = [];
			var currentPosition = {x: 0, y: 0};
			for (let i = 0; i < src.length; i++) {
				const record = src[i];
				if (ne) {
					array.push(record);
					continue;
				}
				if (record) {
					if (record.isChange) {
						if (record.stateMoveTo) {
							currentPosition.x = record.moveX;
							currentPosition.y = record.moveY;
						}
						array.push(record);
					} else {
						var isCurved = record.isCurved;
						if (isCurved) {
							var _controlX = currentPosition.x + record.controlDeltaX;
							var _controlY = currentPosition.y + record.controlDeltaY;
							currentPosition.x = _controlX + record.anchorDeltaX;
							currentPosition.y = _controlY + record.anchorDeltaY;
							array.push({
								controlX: _controlX,
								controlY: _controlY,
								anchorX: currentPosition.x,
								anchorY: currentPosition.y,
								isCurved: true,
								isChange: false
							});
						} else {
							currentPosition.x += record.deltaX;
							currentPosition.y += record.deltaY;
							array.push({
								controlX: 0,
								controlY: 0,
								anchorX: currentPosition.x,
								anchorY: currentPosition.y,
								isCurved: false,
								isChange: false
							});
						}
					}
				} else {
					array.push(null);
				}
			}
			array.push(null);
			return array;
		},
		convert: function(shapes, isMorph, isText) {
			var lineStyles = shapes.lineStyles || [];
			var fillStyles = shapes.fillStyles || [];
			var records = this.convertCurrentPosition(shapes.shapeRecords, isMorph);
			if (isText) {
				var _cmd = [];
				for (var i = 0; i < records.length; i++) {
					var record = records[i];
					if (!record) {
						break;
					}
					var isCurved = record.isCurved;
					var isChange = record.isChange;
					var code;
					if (isChange) {
						code = [0, record.moveX, record.moveY];
					} else {
						if (isCurved) {
							code = [1, record.controlX, record.controlY, record.anchorX, record.anchorY];
						} else {
							code = [2, record.anchorX, record.anchorY];
						}
					}
					_cmd.push(code);
				}
				return _cmd;
			}
			var idx = 0;
			var obj = {};
			var cache = [];
			var AnchorX = 0;
			var AnchorY = 0;
			var MoveX = 0;
			var MoveY = 0;
			var LineX = 0;
			var LineY = 0;
			var FillStyle0 = 0;
			var FillStyle1 = 0;
			var LineStyle = 0;
			var fills0 = [];
			var fills1 = [];
			var lines = [];
			var stack = [];
			var depth = 0;
			var length = records.length;
			for (var i = 0; i < length; i++) {
				var record = records[i];
				if (!record) {
					this.setStack(stack, this.fillMerge(fills0, fills1, isMorph));
					this.setStack(stack, lines);
					break;
				}
				if (record.isChange) {
					depth++;
					if (record.stateNewStyles) {
						AnchorX = 0;
						AnchorY = 0;
						this.setStack(stack, this.fillMerge(fills0, fills1, isMorph));
						this.setStack(stack, lines);
						fills0 = [];
						fills1 = [];
						lines = [];
						if (record.numFillBits) {
							fillStyles = record.fillStyles;
						}
						if (record.numLineBits) {
							lineStyles = record.lineStyles;
						}
					}
					MoveX = AnchorX;
					MoveY = AnchorY;
					if (record.stateMoveTo) {
						MoveX = record.moveX;
						MoveY = record.moveY;
					}
					LineX = MoveX;
					LineY = MoveY;
					if (record.stateFillStyle0) {
						FillStyle0 = record.fillStyle0;
					}
					if (record.stateFillStyle1) {
						FillStyle1 = record.fillStyle1;
					}
					if (record.stateLineStyle) {
						LineStyle = record.lineStyle;
					}
				} else {
					var isCurved = record.isCurved;
					AnchorX = record.anchorX;
					AnchorY = record.anchorY;
					var ControlX = record.controlX;
					var ControlY = record.controlY;
					if (FillStyle0) {
						idx = FillStyle0 - 1;
						if (!(idx in fills0)) {
							fills0[idx] = [];
						}
						if (!(depth in fills0[idx])) {
							fills0[idx][depth] = {
								obj: fillStyles[idx],
								startX: MoveX,
								startY: MoveY,
								endX: 0,
								endY: 0,
								cache: []
							};
						}
						obj = fills0[idx][depth];
						cache = obj.cache;
						cache[cache.length] = this.clone(record);
						obj.endX = AnchorX;
						obj.endY = AnchorY;
					}
					if (FillStyle1) {
						idx = FillStyle1 - 1;
						if (!(idx in fills1)) {
							fills1[idx] = [];
						}
						if (!(depth in fills1[idx])) {
							fills1[idx][depth] = {
								obj: fillStyles[idx],
								startX: MoveX,
								startY: MoveY,
								endX: 0,
								endY: 0,
								cache: []
							};
						}
						obj = fills1[idx][depth];
						cache = obj.cache;
						cache[cache.length] = this.clone(record);
						obj.endX = AnchorX;
						obj.endY = AnchorY;
					}
					if (LineStyle) {
						idx = LineStyle - 1;
						if (!(idx in lines)) {
							lines[idx] = {
								obj: lineStyles[idx],
								cache: []
							};
						}
						obj = lines[idx];
						cache = obj.cache;
						cache[cache.length] = [0, LineX, LineY];
						var code = [2, AnchorX, AnchorY];
						if (isCurved) {
							code = [1, ControlX, ControlY, AnchorX, AnchorY];
						}
						cache[cache.length] = code;
					}
					LineX = AnchorX;
					LineY = AnchorY;
				}
			}
			return stack;
		},
		fillMerge: function(fills0, fills1, isMorph) {
			fills0 = this.fillReverse(fills0);
			if (fills0.length) {
				for (var i in fills0) {
					if (!fills0.hasOwnProperty(i)) {
						continue;
					}
					var fills = fills0[i];
					if (i in fills1) {
						var fill1 = fills1[i];
						for (var depth in fills) {
							if (!fills.hasOwnProperty(depth)) {
								continue;
							}
							fill1[fill1.length] = fills[depth];
						}
					} else {
						fills1[i] = fills;
					}
				}
			}
			return this.coordinateAdjustment(fills1, isMorph);
		},
		fillReverse: function(fills0) {
			if (!fills0.length) {
				return fills0;
			}
			for (var i in fills0) {
				if (!fills0.hasOwnProperty(i)) {
					continue;
				}
				var fills = fills0[i];
				for (var depth in fills) {
					if (!fills.hasOwnProperty(depth)) {
						continue;
					}
					var AnchorX = 0;
					var AnchorY = 0;
					var obj = fills[depth];
					var cacheX = obj.startX;
					var cacheY = obj.startY;
					var cache = obj.cache;
					var length = cache.length;
					if (length) {
						for (var idx in cache) {
							if (!cache.hasOwnProperty(idx)) {
								continue;
							}
							var recode = cache[idx];
							AnchorX = recode.anchorX;
							AnchorY = recode.anchorY;
							recode.anchorX = cacheX;
							recode.anchorY = cacheY;
							cacheX = AnchorX;
							cacheY = AnchorY;
						}
						var array = [];
						if (length > 0) {
							while (length--) {
								array[array.length] = cache[length];
							}
						}
						obj.cache = array;
					}
					cacheX = obj.startX;
					cacheY = obj.startY;
					obj.startX = obj.endX;
					obj.startY = obj.endY;
					obj.endX = cacheX;
					obj.endY = cacheY;
				}
			}
			return fills0;
		},
		coordinateAdjustment: function(fills1, isMorph) {
			for (var i in fills1) {
				if (!fills1.hasOwnProperty(i)) {
					continue;
				}
				var array = [];
				var fills = fills1[i];
				for (var depth in fills) {
					if (!fills.hasOwnProperty(depth)) {
						continue;
					}
					array[array.length] = fills[depth];
				}
				var adjustment = [];
				if (array.length > 1 && !isMorph) {
					while (true) {
						if (!array.length) {
							break;
						}
						var fill = array.shift();
						if (fill.startX === fill.endX && fill.startY === fill.endY) {
							adjustment[adjustment.length] = fill;
							continue;
						}
						var mLen = array.length;
						if (mLen < 0) {
							break;
						}
						var isMatch = 0;
						while (mLen--) {
							var comparison = array[mLen];
							if (comparison.startX === fill.endX && comparison.startY === fill.endY) {
								fill.endX = comparison.endX;
								fill.endY = comparison.endY;
								var cache0 = fill.cache;
								var cache1 = comparison.cache;
								var cLen = cache1.length;
								for (var cIdx = 0; cIdx < cLen; cIdx++) {
									cache0[cache0.length] = cache1[cIdx];
								}
								array.splice(mLen, 1);
								array.unshift(fill);
								isMatch = 1;
								break;
							}
						}
						if (!isMatch) {
							array.unshift(fill);
						}
					}
				} else {
					adjustment = array;
				}
				var aLen = adjustment.length;
				var cache = [];
				var obj = {};
				for (var idx = 0; idx < aLen; idx++) {
					var data = adjustment[idx];
					obj = data.obj;
					var caches = data.cache;
					var cacheLength = caches.length;
					cache[cache.length] = [0, data.startX, data.startY];
					for (var compIdx = 0; compIdx < cacheLength; compIdx++) {
						var r = caches[compIdx];
						var code = [2, r.anchorX, r.anchorY];
						if (r.isCurved) {
							code = [1, r.controlX, r.controlY, r.anchorX, r.anchorY];
						}
						cache[cache.length] = code;
					}
				}
				fills1[i] = {cache: cache, obj: obj};
			}
			return fills1;
		},
		setStack: function(stack, array) {
			if (array.length) {
				for (var i in array) {
					if (!array.hasOwnProperty(i)) {
						continue;
					}
					var data = array[i];
					stack.push({
						obj: data.obj,
						cmd: data.cache
					});
				}
			}
		},
	}

	// Red: MovieClip
	// Green: Button
	// Yellow: TextField
	// Pulpe: StaticText

    const SoundTransform = function() {
    }
    const DisplayObject = function(context) {
		this.context = context;

        this.matrix = [1, 0, 0, 1, 0, 0];
        this.colorTransform = [1, 1, 1, 1, 0, 0, 0, 0];
        this.blendMode = null;
        this.filters = [];

        this.parent = null;
        this.placeFrame = 0;
        this.depth = 0;
        this.name = "";
        this.clipDepth = 0;
        this.nextAvm1Clip = null;
        this.soundTransform = new SoundTransform();
        this.masker = null;
        this.maskee = null;
        this.opaqueBackground = null;

        /// flags
        this.AVM1_REMOVED = false;
        this.VISIBLE = true;
        this.SCALE_ROTATION_CACHED = false;
        this.TRANSFORMED_BY_SCRIPT = false;
        this.PLACED_BY_SCRIPT = false;
        this.INSTANTIATED_BY_TIMELINE = false;
        this.IS_ROOT = false;
        this.LOCK_ROOT = false;
        this.CACHE_AS_BITMAP = false;
        this.HAS_SCROLL_RECT = false;
        this.HAS_EXPLICIT_NAME = false;
        this.SKIP_NEXT_ENTER_FRAME = false;
        this.CACHE_INVALIDATED = false;

		this.displayType = "Base";
		this.coll = [255, 0, 0, 1];
		this._debug_colorDisplayType = [0, 0, 0, 1];
    }
    DisplayObject.prototype.getColorTransform = function() {
        return this.colorTransform;
    }
    DisplayObject.prototype.setColorTransform = function(colorTransform) {
		this.colorTransform = colorTransform;
    }
    DisplayObject.prototype.getMatrix = function() {
        return this.matrix;
    }
    DisplayObject.prototype.setMatrix = function(matrix) {
		this.matrix = matrix;
    }
    DisplayObject.prototype.getDepth = function() {
		return this.depth;
    }
	DisplayObject.prototype.setDepth = function(depth) {
		this.depth = depth;
    }
	DisplayObject.prototype.getVisible = function() {
		return this.VISIBLE;
    }
	DisplayObject.prototype.setVisible = function(visible) {
		this.VISIBLE = visible;
    }
	DisplayObject.prototype.getPlaceFrame = function() {
		return this.placeFrame;
	}
	DisplayObject.prototype.setPlaceFrame = function(frame) {
        this.placeFrame = frame;
	}
	DisplayObject.prototype.getParent = function() {
        return this.parent;
	}
	DisplayObject.prototype.setParent = function(parent) {
        this.parent = parent;
	}
	DisplayObject.prototype.isAvm1PendingRemoval = function() {
        return this.depth < 0;
	}
	DisplayObject.prototype.setSkipNextEnterFrame = function(b) {
        this.SKIP_NEXT_ENTER_FRAME = b;
	}
	DisplayObject.prototype.shouldSkipNextEnterFrame = function(b) {
        return this.SKIP_NEXT_ENTER_FRAME;
	}
    DisplayObject.prototype.applyPlaceObject = function(placeObject) {
		if (!this.TRANSFORMED_BY_SCRIPT) {
			if ("matrix" in placeObject) { // Matrix
				this.setMatrix(placeObject.matrix);
			}
			if ("colorTransform" in placeObject) {
				this.setColorTransform(placeObject.colorTransform); // ColorTransform
			}
			if ("visible" in placeObject) { // Visible
				this.setVisible(!!placeObject.visible);
			}
			if (this instanceof Shape) {
				if ("ratio" in placeObject) {
					this.setRatio(placeObject.ratio);
				}
			}
		}
    }
    /// Called when this object should be replaced by a PlaceObject tag.
    DisplayObject.prototype.replaceWith = function(stage, characterId) {
        // Noop for most symbols; only shapes can replace their innards with another Graphic.
    }
    DisplayObject.prototype.postInstantiation = function(initObject, instantiatedBy, runFrame) {
        if (runFrame) {
            this.runFrameAvm1();
        }
    }
    DisplayObject.prototype.render = function() {}
	DisplayObject.prototype.debugRender = function(initObject, instantiatedBy, runFrame) {
		return [0, 0, 0, 0];
    }

    /// Run any start-of-frame actions for this display object.
    ///
    /// When fired on `Stage`, this also emits the AVM2 `enterFrame` broadcast.
	DisplayObject.prototype.enterFrame = function() {}

    /// Execute all other timeline actions on this object.
    DisplayObject.prototype.runFrameAvm1 = function() {}
	
    DisplayObject.prototype.avm1Unload = function() {
        // Unload children.
		if (this instanceof DisplayObjectContainer) {
			var children = this.iterRenderList();
			for (let i = 0; i < children.length; i++) {
				const child = children[i];
                child.avm1Unload();
			}
		}
		this.AVM1_REMOVED = true;
    }
    const InteractiveObject = function(context) {
		DisplayObject.call(this, context);
		this.displayType = "InteractiveObject";
		this._mouseEnabled = true;
    }
    InteractiveObject.prototype = Object.create(DisplayObject.prototype);
    InteractiveObject.prototype.constructor = InteractiveObject;
    const DisplayObjectContainer = function(context) {
		InteractiveObject.call(this, context);
		this.displayType = "Container";
		this.renderList = [];
		this.depthList = [];
    }
    DisplayObjectContainer.prototype = Object.create(InteractiveObject.prototype);
    DisplayObjectContainer.prototype.constructor = DisplayObjectContainer;

	// renderList
	DisplayObjectContainer.prototype.numChildren = function () {
		return this.renderList.length;
	}
	DisplayObjectContainer.prototype.replaceId = function (id, child) {
		this.renderList[id] = child;
	}
	DisplayObjectContainer.prototype.insertId = function (id, child) {
		if (this.renderList.length) {
			if (id >= this.renderList.length) {
				this.renderList.push(child);
			} else {
				this.renderList.splice(id, 0, child);
			}
		} else {
			this.renderList.push(child);
		}
	}
	DisplayObjectContainer.prototype.pushId = function (child) {
		this.renderList.push(child);
	}
	DisplayObjectContainer.prototype.removeId = function (id) {
		if (this.renderList.length) {
			if (id >= this.renderList.length) {
				this.renderList.pop();
			} else {
				this.renderList.splice(id, 1);
			}
		}
	}

    DisplayObjectContainer.prototype.replaceAtDepth = function (depth, child) {
		var prevChild = this.insertChildIntoDepthList(depth, child);
		if (prevChild) {
			console.log(prevChild);
		}
		var aboveChild = null;
		for (let i = 0; i < this.depthList.length; i++) {
			const c = this.depthList[i];
			if (c && (i !== depth)) {
				if (i > depth) {
					aboveChild = c;
					break;
				}
			}
		}
		if (aboveChild) {
			var rs = this.renderList.indexOf(aboveChild);
			if (rs >= 0) {
				this.insertId(rs, child);
			} else {
				this.pushId(child);
			}
		} else {
			this.pushId(child);
		}
	}
    DisplayObjectContainer.prototype.childByDepth = function (depth) {
		return this.depthListGetDepth(depth);
	}
    DisplayObjectContainer.prototype.removeChild = function (child) {
		this.removeChildDirectly(child);
	}
	DisplayObjectContainer.prototype.removeChildDirectly = function (child) {
		// Remove the child from the depth list, before moving it to a negative depth

		this.removeChildFromDepthList(child);
		this.removeChildFromRenderList(child);

		child.avm1Unload();
	}

	DisplayObjectContainer.prototype.removeChildFromDepthList = function (child) {
		let depth = child.getDepth();
		delete this.depthList[depth];
	}
	DisplayObjectContainer.prototype.removeChildFromRenderList = function (child) {
		var rs = this.renderList.indexOf(child);
		if (rs >= 0) {
			this.removeId(rs);
		} else {
			console.log(child);
		}
	}
	DisplayObjectContainer.prototype.insertChildIntoDepthList = function (depth, child) {
		var r = this.depthList[depth];
		this.depthList[depth] = child;
		return r;
	}
	DisplayObjectContainer.prototype.depthListGetDepth = function (depth) {
		return this.depthList[depth];
	}
    DisplayObjectContainer.prototype.iterRenderList = function () {
		return this.renderList.slice(0);
	}
	DisplayObjectContainer.prototype.updatePendingRemovals = function () {
		var chs = this.iterRenderList();
		for (let i = 0; i < chs.length; i++) {
			const c = chs[i];
			if (c.isAvm1PendingRemoval()) {
			}
		}
	}
    DisplayObjectContainer.prototype.render = function (stage, renderer, matrix, colorTransform, visible, isClip) {
		var isVisible = (visible && this.getVisible());
		var rColorTransform = multiplicationColor(colorTransform, this.getColorTransform());
		var rMatrix = multiplicationMatrix(matrix, this.getMatrix());
		var clips = [];
		let isClipDepth = false;
		var children = this.iterRenderList();
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			let depth = child.getDepth();
			const cLen = clips.length;
			for (let cIdx = 0; cIdx < cLen; cIdx++) {
				const cDepth = clips[cIdx];
				if (depth > cDepth) {
					clips.splice(cIdx, 1);
					renderer.restore();
					break;
				}
			}
			if (child.clipDepth > 0) {
				renderer.save();
				renderer.beginPath();
				clips.push(child.clipDepth);
				isClipDepth = true;
			}
			child.render(stage, renderer, rMatrix, rColorTransform, isVisible, isClipDepth || isClip);
			if (isClipDepth) {
				renderer.clip();
				isClipDepth = false;
			}
		}
		if (clips.length) {
			renderer.restore();
		}
	}
	DisplayObjectContainer.prototype.debugRender = function (ctx, matrix, colorTransform, stage, visible) {
		this.coll = [255, 0, 0, 1];
		var rColorTransform = multiplicationColor(colorTransform, this.getColorTransform());
		var rMatrix = multiplicationMatrix(matrix, this.getMatrix());
		var children = this.iterRenderList();
		var bounds = [];
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			if (child) {
				var res = child.debugRender(ctx, rMatrix, rColorTransform, stage, visible);
				if (res) {
					bounds.push(res);
				}
			}
		}
		var sbounds = [Infinity, Infinity, -Infinity, -Infinity];
		for (var i = 0; i < bounds.length; i++) {
			var b = bounds[i];
			if (sbounds[0] > b.xMin) {
				sbounds[0] = b.xMin;
			}
			if (sbounds[1] > b.yMin) {
				sbounds[1] = b.yMin;
			}
			if (sbounds[2] < b.xMax) {
				sbounds[2] = b.xMax;
			}
			if (sbounds[3] < b.yMax) {
				sbounds[3] = b.yMax;
			}
		}
		if (!bounds.length) {
			sbounds = [rMatrix[4], rMatrix[5], rMatrix[4], rMatrix[5]];
		}
		ctx.globalAlpha = 1;
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		var css = [0, 0, 0, 1];
		ctx.beginPath();
		ctx.globalAlpha = 1;
		ctx.strokeStyle = 'rgba(' + generateColorTransform(css, rColorTransform).join(",") + ')';
		ctx.lineWidth = 2;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.rect(sbounds[0], sbounds[1], (sbounds[2] - sbounds[0]), (sbounds[3] - sbounds[1]));
		ctx.stroke();
		ctx.fillStyle = 'rgba(' + generateColorTransform(this._debug_colorDisplayType, rColorTransform).join(",") + ')';
		ctx.font = "20px Arial";
		ctx.textAlign = "left";
		ctx.fillText(this.displayType, sbounds[0], sbounds[1] - 27);
		ctx.globalAlpha = 1;
		return {xMin: sbounds[0], yMin: sbounds[1], xMax: sbounds[2], yMax: sbounds[3]}
	}
	const Shape = function(context) {
		DisplayObject.call(this, context);
		this.ShapeData = null;
		this.ratio = 0;
		this.displayType = "Shape";
		this._debug_colorDisplayType = [0, 0, 255, 1];
    }
    Shape.prototype = Object.create(DisplayObject.prototype);
    Shape.prototype.constructor = Shape;
	Shape.prototype.init = function(ShapeData) {
		this.ShapeData = ShapeData;
		if (this.ShapeData instanceof MorphShapeData) {
			this.displayType = "MorphShape";
			this._debug_colorDisplayType = [0, 255, 255, 1];
		} else {
			this.displayType = "Shape";
			this._debug_colorDisplayType = [0, 0, 255, 1];
		}
	}
    Shape.prototype.replaceWith = function(characterId) {
		this.init(this.context.library.getCharacter(characterId));
    }
	Shape.prototype.setRatio = function(ratio) {
		this.ratio = ratio;
    }
	Shape.prototype.getBounds = function(matrix) {
		var r = this.ShapeData.getShape(this.ratio).bounds;
		if (matrix) {
			return boundsMatrix(r, matrix);
		} else {
			return r;
		}
	}
	Shape.prototype.render = function(stage, renderer, matrix, colorTransform, visible, isClip) {
		var isVisible = (visible && this.getVisible());
		var m2 = multiplicationMatrix(matrix, this.getMatrix());
		var rColorTransform = multiplicationColor(colorTransform, this.getColorTransform());
		if (isVisible) {
			this.ShapeData.executeRender(stage, renderer, m2, rColorTransform, this.ratio, isClip);
		}
	}
	Shape.prototype.debugRender = function(ctx, matrix, colorTransform, stage, visible) {
		if (visible) {
			var m2 = multiplicationMatrix(matrix, this.getMatrix());
			var rColorTransform = multiplicationColor(colorTransform, this.getColorTransform());
			var b = this.getBounds();
			ctx.globalAlpha = 1;
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.beginPath();
			var color = generateColorTransform(this.coll, rColorTransform);
			ctx.globalAlpha = 1;
			ctx.lineWidth = 2;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			var css = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")";
			ctx.strokeStyle = css;
			ctx.moveTo(...generateMatrix([b.xMin, b.yMin], m2));
			ctx.lineTo(...generateMatrix([b.xMax, b.yMin], m2));
			ctx.lineTo(...generateMatrix([b.xMax, b.yMax], m2));
			ctx.lineTo(...generateMatrix([b.xMin, b.yMax], m2));
			ctx.lineTo(...generateMatrix([b.xMin, b.yMin], m2));
			ctx.stroke();
			var bm = this.getBounds(m2);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.globalAlpha = 1;
			ctx.lineWidth = 2;
			ctx.strokeStyle = 'rgba(' + generateColorTransform([0, 0, 0, 1], rColorTransform).join(",") + ')';
			ctx.beginPath();
			ctx.rect(bm.xMin, bm.yMin, (bm.xMax - bm.xMin), (bm.yMax - bm.yMin));
			ctx.stroke();
			ctx.setTransform(1, 0, 0, 1, bm.xMin, bm.yMin);
			ctx.fillStyle = 'rgba(' + generateColorTransform(this._debug_colorDisplayType, rColorTransform).join(",") + ')';
			ctx.font = "20px Arial";
			ctx.textAlign = "left";
			ctx.fillText(this.displayType, 0, -8);
			ctx.globalAlpha = 1;
			return bm;
		}
	}
	const TextDisplay = function(context) {
		DisplayObject.call(this, context);
		this.ShapeData = null;
		this.displayType = "StaticText";
		this._debug_colorDisplayType = [255, 0, 255, 1];
    }
    TextDisplay.prototype = Object.create(DisplayObject.prototype);
    TextDisplay.prototype.constructor = TextDisplay;
	TextDisplay.prototype.init = function(ShapeData) {
		this.ShapeData = ShapeData;
	}
    TextDisplay.prototype.replaceWith = function(characterId) {
		this.init(this.context.library.getCharacter(characterId));
    }
	TextDisplay.prototype.getBounds = function(matrix) {
		var r = this.ShapeData.bounds;
		if (matrix) {
			return boundsMatrix(r, matrix);
		} else {
			return r;
		}
	}
	TextDisplay.prototype.render = function(stage, renderer, matrix, colorTransform, visible, isClip) {
		var isVisible = (visible && this.getVisible());
		var m2 = multiplicationMatrix(matrix, this.getMatrix());
		var rColorTransform = multiplicationColor(colorTransform, this.getColorTransform());
		if (isVisible) {
			this.ShapeData.executeRender(stage, renderer, m2, rColorTransform, isClip);
		}
	}
	TextDisplay.prototype.debugRender = function(ctx, matrix, colorTransform, stage, visible) {
		if (visible) {
			var m2 = multiplicationMatrix(matrix, this.getMatrix());
			var rColorTransform = multiplicationColor(colorTransform, this.getColorTransform());
			var b = this.getBounds();
			ctx.globalAlpha = 1;
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.beginPath();
			var color = generateColorTransform(this.coll, rColorTransform);
			ctx.lineWidth = 2;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			var css = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")";
			ctx.strokeStyle = css;
			ctx.moveTo(...generateMatrix([b.xMin, b.yMin], m2));
			ctx.lineTo(...generateMatrix([b.xMax, b.yMin], m2));
			ctx.lineTo(...generateMatrix([b.xMax, b.yMax], m2));
			ctx.lineTo(...generateMatrix([b.xMin, b.yMax], m2));
			ctx.lineTo(...generateMatrix([b.xMin, b.yMin], m2));
			ctx.stroke();
			var bm = this.getBounds(m2);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.lineWidth = 2;
			ctx.strokeStyle = 'rgba(' + generateColorTransform([0, 0, 0, 1], rColorTransform).join(",") + ')';
			ctx.globalAlpha = 1;
			ctx.beginPath();
			ctx.rect(bm.xMin, bm.yMin, (bm.xMax - bm.xMin), (bm.yMax - bm.yMin));
			ctx.stroke();
			ctx.setTransform(1, 0, 0, 1, bm.xMin, bm.yMin);
			ctx.fillStyle = 'rgba(' + generateColorTransform(this._debug_colorDisplayType, rColorTransform).join(",") + ')';
			ctx.font = "20px Arial";
			ctx.textAlign = "left";
			ctx.fillText(this.displayType, 0, -8);
			ctx.globalAlpha = 1;
			return bm;
		}
	}
	const TextField = function(context) {
		InteractiveObject.call(this, context);
		this.displayType = "TextField";
		this._debug_colorDisplayType = [255, 255, 0, 1];
		this.text_bounds = {xMin: 0, yMin: 0, yMax: 0, xMax: 0};
		this.text_html = "";
		this.textColor = null;
		this.fontHeight = 0;
		this.__backgroundColor = [255, 255, 255, 1];
		this.__border_color = [0, 0, 0, 1];
	}
    TextField.prototype = Object.create(InteractiveObject.prototype);
    TextField.prototype.constructor = TextField;
	TextField.prototype.init = function(textInfo) {
		this.text_bounds = textInfo.bounds;
		this.fontHeight = textInfo.fontHeight || 0;
		if ("initialText" in textInfo) {
			this.text_html = ("" + textInfo.initialText);
		}
		if ("textColor" in textInfo) {
			this.textColor = textInfo.textColor;
		}
	}
	TextField.prototype.getBounds = function(matrix) {
		var r = this.text_bounds;
		if (matrix) {
			return boundsMatrix(r, matrix);
		} else {
			return r;
		}
	}
	TextField.prototype.render = function(stage, renderer, matrix, colorTransform, visible, isClip) {
		var isVisible = (visible && this.getVisible());
		var m2 = multiplicationMatrix(matrix, this.getMatrix());
		var rColorTransform = multiplicationColor(colorTransform, this.getColorTransform());
		if (isVisible) {
			var b = this.getBounds();
			var color = generateColorTransform(this.__backgroundColor, rColorTransform);
			renderer.beginPath();
			renderer.setFillColor(color[0], color[1], color[2], color[3]);
			renderer.setTransform(m2[0], m2[1], m2[2], m2[3], m2[4], m2[5]);
			renderer.rect(b.xMin, b.yMin, (b.xMax - b.xMin), (b.yMax - b.yMin));
			renderer.fill();
		}
	}
	TextField.prototype.debugRender = function(ctx, matrix, colorTransform, stage, visible) {
		if (visible) {
			var m2 = multiplicationMatrix(matrix, this.getMatrix());
			var rColorTransform = multiplicationColor(colorTransform, this.getColorTransform());
			var b = this.getBounds();
			ctx.globalAlpha = 1;
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.beginPath();
			var color = generateColorTransform(this.coll, rColorTransform);
			ctx.lineWidth = 2;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			var css = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")";
			ctx.strokeStyle = css;
			ctx.moveTo(...generateMatrix([b.xMin, b.yMin], m2));
			ctx.lineTo(...generateMatrix([b.xMax, b.yMin], m2));
			ctx.lineTo(...generateMatrix([b.xMax, b.yMax], m2));
			ctx.lineTo(...generateMatrix([b.xMin, b.yMax], m2));
			ctx.lineTo(...generateMatrix([b.xMin, b.yMin], m2));
			ctx.stroke();
			var bm = this.getBounds(m2);
			ctx.globalAlpha = 1;
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.lineWidth = 2;
			ctx.strokeStyle = 'rgba(' + generateColorTransform([0, 0, 0, 1], rColorTransform).join(",") + ')';
			ctx.beginPath();
			ctx.rect(bm.xMin, bm.yMin, (bm.xMax - bm.xMin), (bm.yMax - bm.yMin));
			ctx.stroke();
			ctx.setTransform(1, 0, 0, 1, bm.xMin, bm.yMin);
			ctx.fillStyle = 'rgba(' + generateColorTransform(this._debug_colorDisplayType, rColorTransform).join(",") + ')';
			ctx.font = "20px Arial";
			ctx.textAlign = "left";
			ctx.fillText(this.displayType, 0, -8);
			ctx.globalAlpha = 1;
			return bm;
		}
	}
    const Avm1Buttom = function(context) {
		DisplayObjectContainer.call(this, context);
		this.__initialized = false;
		this._records = null;
		this.displayType = "Buttom";
		this._debug_colorDisplayType = [0, 255, 0, 1];
    }
    Avm1Buttom.prototype = Object.create(DisplayObjectContainer.prototype);
    Avm1Buttom.prototype.constructor = Avm1Buttom;
	Avm1Buttom.prototype.init = function(i) {
		this._records = i.data.records;
	}
	Avm1Buttom.prototype.postInstantiation = function(initObject, instantiatedBy, runFrame) {
		this.context.avm1.addExecuteList(this);
	}
	Avm1Buttom.prototype.setState = function(status) {
		var children = [];
		for (var i = 0; i < this._records.length; i++) {
			var record = this._records[i];
			if (record.buttonStateUp) {
				var child = this.context.library.instantiateById(record.characterId);
				child.setParent(this);
				child.setDepth(record.depth);
				
                // Set transform of child (and modify previous child if it already existed)
				child.setMatrix(record.matrix);
				if ("colorTransform" in record) {
					child.setColorTransform(record.colorTransform);
				}

				children.push([record.depth, child]);
			}
		}
		for (let o = 0; o < children.length; o++) {
			const c = children[o];
			var depth = c[0];
			var child = c[1];

			// Initialize new child.
			child.postInstantiation(null, null, false);
			child.runFrameAvm1();
			this.replaceAtDepth(depth, child);
		}
	}
	Avm1Buttom.prototype.runFrameAvm1 = function() {
		if (!this.__initialized) {
			this.__initialized = true;
			this.setState("up");
		}
	}
    Avm1Buttom.prototype.avm1Unload = function() {
		this.AVM1_REMOVED = true;
    }
    const MovieClip = function(context) {
		DisplayObjectContainer.call(this, context);
        this.currentFrame = 0;
		this.totalframes = 0;
		this.framesloaded = 0;
		this.framesInfo = [];
		this.streamSounds = [];
		this.audioStream = null;

		// flags

        /// Whether this `MovieClip` has run its initial frame.
        this.isPlaying = true;

		this.INITIALIZED = false;
		this.PROGRAMMATICALLY_PLAYED = false;
		this.EXECUTING_AVM2_FRAME_SCRIPT = false;
		this.LOOP_QUEUED = false;
		this.displayType = "MovieClip";
		this._debug_colorDisplayType = [255, 0, 0, 1];
    }
    MovieClip.prototype = Object.create(DisplayObjectContainer.prototype);
    MovieClip.prototype.constructor = MovieClip;
	MovieClip.prototype.getTag = function (frame) {
		return this.framesInfo[frame - 1];
	}
	MovieClip.prototype.setTotalFrames = function (frame) {
		this.totalframes = frame;
		this.framesloaded = frame;
	}
	MovieClip.prototype.postInstantiation = function (initObject, instantiatedBy, runFrame) {
		this.context.avm1.addExecuteList(this);
	}
	MovieClip.prototype.play = function () {
		// Can only play clips with multiple frames.
		if (this.totalframes > 1) {
			this.isPlaying = true;
		}
	}
	MovieClip.prototype.stop = function () {
		this.isPlaying = false;
        this.stopAudioStream();
	}
	MovieClip.prototype.determineNextFrame = function () {
		if (this.currentFrame < this.totalframes) {
			return "next";
		} else if (this.totalframes > 1) {
			return "first";
		} else {
			return "same";
		}
	}
	MovieClip.prototype.runIntervalFrame = function (runDisplayAction, runSounds) {
		let nextFrame = this.determineNextFrame();
		switch (nextFrame) {
			case "next":
				this.currentFrame++;
				if (this.totalframes == 1) { // TODO
					this.stop();
				}
				break;
			case "first":
				this.runGoto(1, true);
				return;
			case "same":
				this.stop();
				break;
		}
		var tags = this.getTag(this.currentFrame);
		for (var i = 0; i < tags.length; i++) {
			var tag = tags[i];
			switch(tag.tagType) {
				case "PlaceObject":
				case "PlaceObject2":
				case "PlaceObject3":
				case "PlaceObject4":
					if (runDisplayAction) {
						this.placeObject(tag);
					}
					break;
				case "RemoveObject":
				case "RemoveObject2":
					if (runDisplayAction) {
						this.removeObject(tag);
					}
					break;
				case "StartSound":
				case "StartSound2":
					if (runSounds) {
						this.startSound(tag);
					}
					break;
				case "SoundStreamBlock":
					if (runSounds) {
						this.soundStreamBlock();
					}
					break;
				case "SetBackgroundColor": 
					this.context.stage.setBackgroundColor(...tag.rgb);
					break;
				case "DoAction":
					this.doAction(tag);
					break;
			}
		}
	}
	MovieClip.prototype.runGoto = function (frame, isImplicit) {
		this.setSkipNextEnterFrame(false);
		let children = this.iterRenderList();
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			if (child.getPlaceFrame() !== frame) {
				this.removeChild(child);
			}
		}
		this.currentFrame = frame;
		var tags = this.getTag(this.currentFrame);
		for (var i = 0; i < tags.length; i++) {
			var tag = tags[i];
			switch(tag.tagType) {
				case "PlaceObject":
				case "PlaceObject2":
				case "PlaceObject3":
				case "PlaceObject4":
					if ("characterId" in tag) {
						if (tag.isMove) {
							var child = this.childByDepth(tag.depth);
							if (child) {
								child.replaceWith(tag.characterId);
								child.applyPlaceObject(tag);
								child.setPlaceFrame(this.currentFrame);
							}
						} else {
							var prevChild = this.childByDepth(tag.depth);
							if (prevChild) {
								prevChild.applyPlaceObject(tag);
								prevChild.setPlaceFrame(this.currentFrame);
							} else {
								this.instantiateChild(tag.characterId, tag.depth, tag);
							}
						}
					} else {
						if (tag.isMove) {
							var child = this.childByDepth(tag.depth);
							child.applyPlaceObject(tag);
						}
					}
					break;
				case "RemoveObject":
				case "RemoveObject2":
					var child = this.childByDepth(tag.depth);
					if (child) {
						this.removeChild(child);
					}
					break;
			}
		}
		this.currentFrame--;
		this.runIntervalFrame(false, true);
	}
	MovieClip.prototype.runFrameAvm1 = function () {
		var isLoadFrame = !this.INITIALIZED;
		if (isLoadFrame) {
			this.INITIALIZED = true;
		}
		// Run my SWF tags.
		// In AVM2, SWF tags are processed at enterFrame time.
		if (this.isPlaying) {
			this.runIntervalFrame(true, true);
		}
	}
	MovieClip.prototype.instantiateChild = function (id, depth, place) {
		var child = this.context.library.instantiateById(id);
		this.replaceAtDepth(depth, child);
		child.INSTANTIATED_BY_TIMELINE = true;
		child.setDepth(depth);
		child.setParent(this);
		child.setPlaceFrame(this.currentFrame);
		// Apply PlaceObject parameters.
		child.applyPlaceObject(place);
		if ("clipDepth" in place) {
			child.clipDepth = place.clipDepth;
		}
		// Run first frame.
		child.postInstantiation(null, null, false);
		child.enterFrame();

		// In AVM1, children are added in `run_frame` so this is necessary.
		// In AVM2 we add them in `construct_frame` so calling this causes
		// duplicate frames
		child.runFrameAvm1();
	}
	MovieClip.prototype.enterFrame = function () {
        let skipFrame = this.shouldSkipNextEnterFrame();
        //Child removals from looping gotos appear to resolve in reverse order.
		var children = this.iterRenderList();
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			if (skipFrame) {
                // If we're skipping our current frame, then we want to skip it for our children
                // as well. This counts as the skipped frame for any children that already
                // has this set to true (e.g. a third-level grandchild doesn't skip three frames).
                // We'll still call 'enter_frame' on the child - it will recurse, propagating along
                // the flag, and then set its own flag back to 'false'.
                //
                // We do *not* propagate `skip_frame=false` down to children, since a normally
                // executing parent can add a child that should have its first frame skipped.

                // FIXME - does this propagate through non-movie-clip children (Loader/Button)?
				child.setSkipNextEnterFrame(true);
			}
			child.enterFrame();
		}
		if (skipFrame) {
			this.setSkipNextEnterFrame(false);
		}
	}
	MovieClip.prototype.placeObject = function (place) {
		if ("characterId" in place) {
			if (place.isMove) {
				var child = this.childByDepth(place.depth);
				if (child) {
					child.replaceWith(place.characterId);
					child.applyPlaceObject(place);
					child.setPlaceFrame(this.currentFrame);
				}
			} else {
				this.instantiateChild(place.characterId, place.depth, place);
			}
		} else {
			if (place.isMove) {
				var child = this.childByDepth(place.depth);
				if (child) child.applyPlaceObject(place);
			}
		}
	}
	MovieClip.prototype.removeObject = function (re) {
		var child = this.childByDepth(re.depth);
		if (child) {
			this.removeChild(child);
		}
	}
	MovieClip.prototype.doAction = function (tag) {
		this.context.queueAction(this, {
			type: "normal",
			caches: tag.action
		}, false);
	}
	MovieClip.prototype.startSound = function (tag) {
		this.context.audio.startSound(tag, this);
	}
	MovieClip.prototype.soundStreamBlock = function () {
		var sounds = this.streamSounds;
		if (sounds) {
			var sound = sounds[this.currentFrame - 1];
			if (sound) {
				if (this.isPlaying) {
					this.audioStream = this.context.audio.startStreamSound(sound, this);
				}
			}
		}
	}
	MovieClip.prototype.stopAudioStream = function () {
		if (this.audioStream) {
			this.context.audio.stopStreamSound(this.audioStream, this);
			this.audioStream = null;
		}
	}
    MovieClip.prototype.avm1Unload = function() {
        // Unload children.
		var children = this.iterRenderList();
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			child.avm1Unload();
		}
		this.stopAudioStream();
		this.AVM1_REMOVED = true;
    }
	const MovieClipData = function(stage) {
        this.stage = stage;
		this.frames = [];
		this.characterId = -1;
		this.isRoot = false;
    }
	MovieClipData.prototype.init = function(frames) {
		this.frames = frames;
    }
	MovieClipData.prototype.instantiate = function() {
        var clip = new MovieClip(this.stage.context);
		clip.setTotalFrames(this.frames.length);
		clip.framesInfo = this.frames;
		clip.streamSounds = this.streamSounds;
		return clip;
    }
	const ShapeData = function(stage, data) {
        this.stage = stage;
		this.data = data;
		this.characterId = data.id;
		this.shapeCache = null;
	}
	ShapeData.prototype.getShape = function() {
		if (!this.shapeCache) {
			this.shapeCache = {
				bounds: this.data.bounds,
				shapes: ShapeToCanvas.convert(this.data.shapes, false)
			}
		}
		return this.shapeCache;
	}
	ShapeData.prototype.instantiate = function() {
        var shape = new Shape(this.stage.context);
		shape.init(this);
		return shape;
    }
	ShapeData.prototype._clone = function(src) {
		return JSON.parse(JSON.stringify(src));
	}
	ShapeData.prototype.linearGradientXY = function(m) {
		var x0 = -16384 * m[0] - 16384 * m[2] + m[4];
		var x1 =  16384 * m[0] - 16384 * m[2] + m[4];
		var x2 = -16384 * m[0] + 16384 * m[2] + m[4];
		var y0 = -16384 * m[1] - 16384 * m[3] + m[5];
		var y1 =  16384 * m[1] - 16384 * m[3] + m[5];
		var y2 = -16384 * m[1] + 16384 * m[3] + m[5];
		var vx2 = x2 - x0;
		var vy2 = y2 - y0;
		var r1 = Math.sqrt(vx2 * vx2 + vy2 * vy2);
		vx2 /= r1;
		vy2 /= r1;
		var r2 = (x1 - x0) * vx2 + (y1 - y0) * vy2;
		return [x0 + r2 * vx2, y0 + r2 * vy2, x1, y1];
	}
	ShapeData.prototype.executeRender = function(stage, renderer, m2, colorTransform, ratio, isClip) {
		var info = this.getShape(ratio);
		var shapes = info.shapes;
		if (shapes) {
			if (isClip) {
				renderer.setTransform(...m2);
				for (let k = 0; k < shapes.length; k++) {
					const data = shapes[k];
					var obj = data.obj;
					if (!obj) {
						continue;
					}
					var cmd = data.cmd;
					_executeCmdCtx2dPath(renderer, cmd);
				}
				return;
			} else {
				for (let k = 0; k < shapes.length; k++) {
					renderer.setTransform(...m2);
					const data = shapes[k];
					var obj = data.obj;
					var cmd = data.cmd;
					renderer.beginPath();
					_executeCmdCtx2dPath(renderer, cmd);
					var styleObj = (!("fillType" in obj)) ? obj : obj.fillType;
					var isStroke = ("width" in obj);
					var styleType = styleObj.type || 0;
					switch (styleType) {
						case 0:
							var color = generateColorTransform(styleObj.color, colorTransform);
							if (isStroke) {
								renderer.setLineWidth(obj.width);
								renderer.setStrokeColor(...color);
								renderer.stroke();
							} else {
								renderer.setFillColor(...color);
								renderer.fill();
							}
							break;
						case 0x10:
						case 0x12:
						case 0x13:
							var gg = styleObj.gradient;
							if (!gg) {
								gg = styleObj.linearGradient;
							}
							if (!gg) {
								gg = styleObj.radialGradient;
							}
							var m = gg.matrix;
							var type = styleObj.type;
							var css;
							if (type !== 16) {
								renderer.save();
								renderer.setTransform(...multiplicationMatrix(m2, m));
								css = [[1, [0, 0, 0, 0, 0, 16384]]];
							} else {
								var xy = this.linearGradientXY(m);
								css = [[0, [xy[0] || 0, xy[1] || 0, xy[2] || 0, xy[3] || 0]]];
							}
							var records = gg.gradientRecords;
							var rLength = records.length;
							for (var rIdx = 0; rIdx < rLength; rIdx++) {
								var record = records[rIdx];
								var color = generateColorTransform(record.color, colorTransform);
								css.push([record.ratio, color.slice(0)]);
							}
							if (isStroke) {
								renderer.setLineWidth(obj.width);
								renderer.setStrokeGradient(css);
								renderer.stroke();
							} else {
								renderer.setFillGradient(css);
								renderer.fill();
							}
							if (type !== 16) {
								renderer.restore();
							}
							break;
						case 0x40:
						case 0x41:
						case 0x42:
						case 0x43:
							var bitmapId = styleObj.bitmapId;
							var bMatrix = multiplicationMatrix(m2, styleObj.bitmapMatrix);
							var repeat = (styleType === 0x40 || styleType === 0x42) ? "repeat" : "no-repeat";
							var image = stage.library.getCharacter(bitmapId);
							if (image && image.image) {
								var c = image.image;
								var rr = Math.max(0, Math.min((255 * colorTransform[3]) + colorTransform[7], 255)) / 255;
								if (styleType === 0x41 || styleType === 0x43) {
									renderer.save();
									renderer.clip();
									renderer.setTransform(...bMatrix);
									renderer.ctx.globalAlpha = rr;
									renderer.ctx.drawImage(c, 0, 0);
									renderer.ctx.globalAlpha = 1;
									renderer.restore();
								} else {
									renderer.ctx.globalAlpha = rr;
									renderer.ctx.fillStyle = renderer.ctx.createPattern(c, repeat);
									renderer.setTransform(...bMatrix);
									renderer.ctx.fill();
									renderer.ctx.globalAlpha = 1;
								}
							}
							break;
					}
				}
			}
		}
	}
	const MorphShapeData = function(stage, data) {
		ShapeData.call(this, stage, data);
		this.morphChapeCache = null;
	}
    MorphShapeData.prototype = Object.create(ShapeData.prototype);
    MorphShapeData.prototype.constructor = MorphShapeData;
	MorphShapeData.prototype.getShape = function(ratio) {
		if (!this.morphChapeCache) {
			this.initMorph();
		}
		var res = this.executeMorph(ratio / 65535);
		return {
			bounds: res.bounds,
			shapes: ShapeToCanvas.convert(res.shapes, true)
		}
	}
	MorphShapeData.prototype.initMorph = function() {
		var edges = this.convertMorphShape(this.data);
		var lineStyles = this._clone(this.data.morphLineStyles);
		var fillStyles = this._clone(this.data.morphFillStyles);
        var startBound = this.data.startBounds;
        var endBound = this.data.endBounds;
		this.morphChapeCache = {
			lineStyles,
			fillStyles,
			edges,
			startBound,
			endBound,
		}
	}
	MorphShapeData.prototype.convertCurrentPosition = function(src) {
		var array = [];
		for (let i = 0; i < src.length; i++) {
			const record = src[i];
			if (record) {
				if (record.isChange) {
					array.push(this._clone(record));
				} else {
					var isCurved = record.isCurved;
					if (isCurved) {
						array.push({
							controlX: record.controlDeltaX,
							controlY: record.controlDeltaY,
							anchorX: record.anchorDeltaX,
							anchorY: record.anchorDeltaY,
							isCurved: true,
							isChange: false
						});
					} else {
						array.push({
							controlX: 0,
							controlY: 0,
							anchorX: record.deltaX,
							anchorY: record.deltaY,
							isCurved: false,
							isChange: false
						});
					}
				}
			} else {
				array.push(null);
			}
		}
		return array;
	}
	MorphShapeData.prototype.convertMorphShape = function(obj) {
		var startPosition = {x: 0, y: 0};
		var endPosition = {x: 0, y: 0};
		var StartRecords = this.convertCurrentPosition(obj.startEdges);
		var EndRecords = this.convertCurrentPosition(obj.endEdges);
		var StartRecordLength = StartRecords.length;
		var EndRecordLength = EndRecords.length;
		var length = Math.max(StartRecordLength, EndRecordLength);
		for (var i = 0; i < length; i++) {
			var addRecode = {};
			var StartRecord = StartRecords[i];
			var EndRecord = EndRecords[i];
			if (!StartRecord || !EndRecord) {
				continue;
			}
			if (!StartRecord.isChange && !EndRecord.isChange) {
				if (StartRecord.isCurved) {
					startPosition.x += StartRecord.controlX + StartRecord.anchorX;
					startPosition.y += StartRecord.controlY + StartRecord.anchorY;
				} else {
					startPosition.x += StartRecord.AnchorX;
					startPosition.y += StartRecord.AnchorY;
				}
				if (EndRecord.isCurved) {
					endPosition.x += EndRecord.controlX + EndRecord.anchorX;
					endPosition.y += EndRecord.controlY + EndRecord.anchorY;
				} else {
					endPosition.x += EndRecord.anchorX;
					endPosition.y += EndRecord.anchorY;
				}
				continue;
			}
			if (StartRecord.isChange && !EndRecord.isChange) {
				addRecode = {
					fillStyle0: StartRecord.fillStyle0,
					fillStyle1: StartRecord.fillStyle1,
					lineStyle: StartRecord.lineStyle,
					stateFillStyle0: StartRecord.stateFillStyle0,
					stateFillStyle1: StartRecord.stateFillStyle1,
					stateLineStyle: StartRecord.stateLineStyle,
					stateMoveTo: StartRecord.stateMoveTo,
					stateNewStyles: StartRecord.stateNewStyles,
					isChange: true
				};
				if (StartRecord.stateMoveTo) {
					addRecode.moveX = endPosition.x;
					addRecode.moveY = endPosition.y;
					startPosition.x = StartRecord.moveX;
					startPosition.y = StartRecord.moveY;
				}
				EndRecords.splice(i, 0, addRecode);
			} else if (!StartRecord.isChange && EndRecord.isChange) {
				addRecode = {
					fillStyle0: EndRecord.fillStyle0,
					fillStyle1: EndRecord.fillStyle1,
					lineStyle: EndRecord.lineStyle,
					stateFillStyle0: EndRecord.stateFillStyle0,
					stateFillStyle1: EndRecord.stateFillStyle1,
					stateLineStyle: EndRecord.stateLineStyle,
					stateMoveTo: EndRecord.stateMoveTo,
					stateNewStyles: EndRecord.stateNewStyles,
					isChange: true
				};
				if (EndRecord.StateMoveTo) {
					addRecode.moveX = startPosition.x;
					addRecode.moveY = startPosition.y;
					endPosition.x = EndRecord.moveX;
					endPosition.y = EndRecord.moveY;
				}
				StartRecords.splice(i, 0, addRecode);
			} else {
				if (StartRecord.StateMoveTo) {
					startPosition.x = StartRecord.moveX;
					startPosition.y = StartRecord.moveY;
				}
				if (EndRecord.StateMoveTo) {
					endPosition.x = EndRecord.moveX;
					endPosition.y = EndRecord.moveY;
				}
			}
		}
		var FillType = 0;
		var FillStyle = 0;
		length = StartRecords.length;
		for (i = 0; i < length; i++) {
			var record = StartRecords[i];
			if (!record.isChange) {
				continue;
			}
			if (record.stateFillStyle0) {
				FillStyle = record.fillStyle0;
			}
			if (FillStyle) {
				record.stateFillStyle0 = 1;
				record.stateFillStyle1 = 1;
				if (FillType) {
					record.fillStyle0 = 0;
					record.fillStyle1 = FillStyle;
				} else {
					record.fillStyle0 = FillStyle;
					record.fillStyle1 = 0;
				}
			} else {
				record.stateFillStyle1 = 1;
				record.fillStyle1 = 0;
			}
			FillType = (FillType) ? 0 : 1;
		}
		return {
			starts: StartRecords,
			ends: EndRecords
		}
	}
	MorphShapeData.prototype.executeMorph = function(per) {
        var startPer = 1 - per;
        var newShapeRecords = [];
        var lineStyles = this._clone(this.morphChapeCache.lineStyles);
        var fillStyles = this._clone(this.morphChapeCache.fillStyles);
        var EndBounds = this.morphChapeCache.endBound;
        var StartBounds = this.morphChapeCache.startBound;
		var result = this.morphChapeCache.edges;
        var lineStyleCount = lineStyles.length;
        var fillStyleCount = fillStyles.length;
        var StartEdges = result.starts;
        var EndEdges = result.ends;
        var StartShapeRecords = StartEdges;
        var EndShapeRecords = EndEdges;
        var shapes = {
            lineStyles: [],
            fillStyles: [],
            shapeRecords: []
        };
        var position = {x: 0, y: 0};
        var len = StartShapeRecords.length;
        for (var i = 0; i < len; i++) {
            var StartRecord = StartShapeRecords[i];
            if (!StartRecord) {
                continue;
            }
            var EndRecord = EndShapeRecords[i];
            if (!EndRecord) {
                continue;
            }
            var newRecord = {};
            if (StartRecord.isChange) {
                var MoveX = 0;
                var MoveY = 0;
                if (StartRecord.stateMoveTo === 1) {
                    MoveX = StartRecord.moveX * startPer + EndRecord.moveX * per;
                    MoveY = StartRecord.moveY * startPer + EndRecord.moveY * per;
                    position.x = MoveX;
                    position.y = MoveY;
                }
                newRecord = {
                    fillStyle0: StartRecord.fillStyle0,
                    fillStyle1: StartRecord.fillStyle1,
                    lineStyle: StartRecord.lineStyle,
                    moveX: MoveX,
                    moveY: MoveY,
                    stateFillStyle0: StartRecord.stateFillStyle0,
                    stateFillStyle1: StartRecord.stateFillStyle1,
                    stateLineStyle: StartRecord.stateLineStyle,
                    stateMoveTo: StartRecord.stateMoveTo,
                    stateNewStyles: StartRecord.stateNewStyles,
                    isChange: true
                };
            } else {
                var AnchorX = 0;
                var AnchorY = 0;
                var ControlX = 0;
                var ControlY = 0;
                var startAnchorX = StartRecord.anchorX;
                var startAnchorY = StartRecord.anchorY;
                var endAnchorX = EndRecord.anchorX;
                var endAnchorY = EndRecord.anchorY;
                var startControlX = StartRecord.controlX;
                var startControlY = StartRecord.controlY;
                var endControlX = EndRecord.controlX;
                var endControlY = EndRecord.controlY;
                if (per > 0 && per < 1 && StartRecord.isCurved !== EndRecord.isCurved) {
                    if (!StartRecord.isCurved) {
                        startAnchorX = StartRecord.anchorX / 2;
                        startAnchorY = StartRecord.anchorY / 2;
                        startControlX = startAnchorX;
                        startControlY = startAnchorY;
                    }
                    if (!EndRecord.isCurved) {
                        endAnchorX = EndRecord.anchorX / 2;
                        endAnchorY = EndRecord.anchorY / 2;
                        endControlX = endAnchorX;
                        endControlY = endAnchorY;
                    }
                }
                ControlX = startControlX * startPer + endControlX * per + position.x;
                ControlY = startControlY * startPer + endControlY * per + position.y;
                AnchorX = startAnchorX * startPer + endAnchorX * per + ControlX;
                AnchorY = startAnchorY * startPer + endAnchorY * per + ControlY;
                position.x = AnchorX;
                position.y = AnchorY;
                newRecord = {
                    anchorX: AnchorX,
                    anchorY: AnchorY,
                    controlX: ControlX,
                    controlY: ControlY,
                    isChange: false,
                    isCurved: (StartRecord.isCurved || EndRecord.isCurved)
                };
            }
            newShapeRecords[i] = newRecord;
        }
        newShapeRecords[newShapeRecords.length] = 0;
        shapes.shapeRecords = newShapeRecords;
        var EndColor;
        var StartColor;
        var color;
        for (i = 0; i < lineStyleCount; i++) {
            var lineStyle = lineStyles[i];
            EndColor = lineStyle.endColor;
            StartColor = lineStyle.startColor;
            color = [Math.floor(StartColor[0] * startPer + EndColor[0] * per), Math.floor(StartColor[1] * startPer + EndColor[1] * per), Math.floor(StartColor[2] * startPer + EndColor[2] * per), StartColor[3] * startPer + EndColor[3] * per];
            var EndWidth = lineStyles[i].endWidth;
            var StartWidth = lineStyles[i].startWidth;
            shapes.lineStyles[i] = {
                width: Math.floor(StartWidth * startPer + EndWidth * per),
                color: color,
                type: 0
            };
        }
        for (i = 0; i < fillStyleCount; i++) {
            var fillStyle = fillStyles[i];
            var fillStyleType = fillStyle.type;
            if (fillStyleType === 0x00) {
                EndColor = fillStyle.endColor;
                StartColor = fillStyle.startColor;
                color = [Math.floor(StartColor[0] * startPer + EndColor[0] * per), Math.floor(StartColor[1] * startPer + EndColor[1] * per), Math.floor(StartColor[2] * startPer + EndColor[2] * per), StartColor[3] * startPer + EndColor[3] * per];
                shapes.fillStyles[i] = {
                    color: color,
                    type: fillStyleType
                };
            } else {
            	if (fillStyleType == 0x40 || fillStyleType == 0x41 || fillStyleType == 0x42 || fillStyleType == 0x43) {
	                var EndMatrix = fillStyle.bitmapEndMatrix;
	                var StartMatrix = fillStyle.bitmapStartMatrix;
	                var matrix = [StartMatrix[0] * startPer + EndMatrix[0] * per, StartMatrix[1] * startPer + EndMatrix[1] * per, StartMatrix[2] * startPer + EndMatrix[2] * per, StartMatrix[3] * startPer + EndMatrix[3] * per, StartMatrix[4] * startPer + EndMatrix[4] * per, StartMatrix[5] * startPer + EndMatrix[5] * per];
	                shapes.fillStyles[i] = {
	                    bitmapId: fillStyle.bitmapId,
	                    bitmapMatrix: matrix,
	                    isSmoothed: fillStyle.isSmoothed,
	                    isRepeating: fillStyle.isRepeating,
	                    type: fillStyleType
	                };
            	} else {
	                var gradient = fillStyle.gradient;
	            	if (!gradient) {
            			gradient = fillStyle.linearGradient;
	            	}
	            	if (!gradient) {
            			gradient = fillStyle.radialGradient;
	            	}
	                var EndGradientMatrix = gradient.endMatrix;
	                var StartGradientMatrix = gradient.startMatrix;
	                var matrix = [StartGradientMatrix[0] * startPer + EndGradientMatrix[0] * per, StartGradientMatrix[1] * startPer + EndGradientMatrix[1] * per, StartGradientMatrix[2] * startPer + EndGradientMatrix[2] * per, StartGradientMatrix[3] * startPer + EndGradientMatrix[3] * per, StartGradientMatrix[4] * startPer + EndGradientMatrix[4] * per, StartGradientMatrix[5] * startPer + EndGradientMatrix[5] * per];
	                var gRecords = [];
	                var gRecords1 = [];
	                for (var i2 = 0; i2 < gradient.startRecords.length; i2++) {
	                	var sta = gradient.startRecords[i2];
	                	var end = gradient.endRecords[i2];
	                	gRecords1.push({startRatio: sta.ratio, startColor: sta.color, endRatio: end.ratio, endColor: end.color});
	                }
	                var GradientRecords = gRecords1;
	                var gLen = GradientRecords.length;
	                for (var gIdx = 0; gIdx < gLen; gIdx++) {
	                    var gRecord = GradientRecords[gIdx];
	                    EndColor = gRecord.endColor;
	                    StartColor = gRecord.startColor;
	                    color = [Math.floor(StartColor[0] * startPer + EndColor[0] * per), Math.floor(StartColor[1] * startPer + EndColor[1] * per), Math.floor(StartColor[2] * startPer + EndColor[2] * per), StartColor[3] * startPer + EndColor[3] * per];
	                    gRecords[gIdx] = {
	                        color: color,
	                        ratio: gRecord.startRatio * startPer + gRecord.endRatio * per
	                    };
	                }
	                shapes.fillStyles[i] = {
	                    gradient: {
	                   		matrix: matrix,
	                    	gradientRecords: gRecords,
							spreadMode: gradient.spreadMode,
							interpolationMode: gradient.interpolationMode
	                    },
	                    type: fillStyleType
	                };
            	}
            }
        }
        var bounds = {
            xMax: (StartBounds.xMax * startPer) + (EndBounds.xMax * per),
            xMin: (StartBounds.xMin * startPer) + (EndBounds.xMin * per),
            yMax: (StartBounds.yMax * startPer) + (EndBounds.yMax * per),
            yMin: (StartBounds.yMin * startPer) + (EndBounds.yMin * per)
        };
        return {
        	bounds,
        	shapes
        }
	}
	const FontData = function (stage, data) {
		this.stage = stage;
		this.data = data;
		this.glyphs = [];
		this.characterId = data.id;
		this.init();
	}
	FontData.prototype.init = function () {
		if (this.data.glyphs) {
			for (var i = 0; i < this.data.glyphs.length; i++) {
				this.glyphs.push(ShapeToCanvas.convert({
					shapeRecords: this.data.glyphs[i]
				}, false, true));
			}
		}
	}
	FontData.prototype.setAlignZones = function (alignZones) {
		this.alignZones = alignZones;
	}
	const TextData = function(stage, data) {
		this.stage = stage;
		this.data = data;
		this.characterId = data.id;
		this.init();
	}
	TextData.prototype.init = function() {
		this.bounds = this.data.bounds;
		this.matrix = this.data.matrix;
		this.records = this.data.records;
	}
	TextData.prototype.instantiate = function() {
		var d = new TextDisplay(this.stage.context);
		d.init(this);
		return d;
	}
	TextData.prototype.executeRender = function(stage, renderer, matrix, colorTransform, isClip) {
		var length = this.records.length;
		var offsetX = 0;
		var offsetY = 0;
		var color = [0, 0, 0, 0];
		var textHeight = 0;
		var ShapeTable = null;
		var isZoneTable = false;
		var cm = multiplicationMatrix(matrix, this.matrix);
		for (var i = 0; i < length; i++) {
			var record = this.records[i];
			if ("fontId" in record) {
				var fontId = record.fontId;
				var fontData = stage.library.getCharacter(fontId);
				ShapeTable = fontData.glyphs;
				isZoneTable = false;
				if ("alignZones" in fontData) {
					isZoneTable = true;
				}
			}
			if ("XOffset" in record) {
				offsetX = record.XOffset;
			}
			if ("YOffset" in record) {
				offsetY = record.YOffset;
			}
			if ("textColor" in record) {
				color = record.textColor;
			}
			if ("textHeight" in record) {
				textHeight = record.textHeight;
				if (isZoneTable) {
					textHeight /= 20;
				}
			}
			renderer.setFillColor(...generateColorTransform(color, colorTransform));
			var entries = record.glyphEntries;
			var _scale = textHeight / 1024;
			for (var idx = 0; idx < entries.length; idx++) {
				var entry = entries[idx];
				var cmd = ShapeTable[entry.index];
				var matrix = [_scale, 0, 0, _scale, offsetX, offsetY];
				var m3 = multiplicationMatrix(cm, matrix);
				renderer.setTransform(m3[0], m3[1], m3[2], m3[3], m3[4], m3[5]);
				renderer.beginPath();
				_executeCmdCtx2dPath(renderer, cmd);
				if (!isClip) {
					renderer.fill();
				}
				offsetX += entry.advance;
			}
		}
	}
	const CharacterBitmap = function(stage, data) {
		this.stage = stage;
		this.data = data;
		this.characterId = data.id;
	}
	const ButtonData = function(stage, data) {
		this.stage = stage;
		this.data = data;
		this.characterId = data.id;
	}
	ButtonData.prototype.instantiate = function() {
		var b = new Avm1Buttom(this.stage.context);
		b.init(this);
		return b;
	}
	const EditTextData = function(stage, data) {
		this.stage = stage;
		this.data = data;
		this.characterId = data.id;
	}
	EditTextData.prototype.instantiate = function() {
		var t = new TextField(this.stage.context);
		t.init(this.data);
		return t;
	}
	const BinaryData = function(stage, data) {
		this.stage = stage;
		this.data = data.data;
		this.characterId = data.id;
	}
	const DefineVideoData = function(stage, data) {
		this.stage = stage;
		this.characterId = data.id;
	}
	DefineVideoData.prototype.instantiate = function() {
		return new DisplayObject();
	}
	const SoundData = function(stage, data) {
		this.stage = stage;
		this.data = data;
		this.audio = null;
		this.characterId = data.id;
		this.id = data.id;
		this.numSamples = data.numSamples;
		this.format = data.format;
	}
	SoundData.prototype.setAudio = function(audio) {
		this.audio = audio;
	}
	const Avm1Object = function() {
		this.props = Object.create(null);
		this.___proto = undefined;
		this.___hasProto = false;
		this.___type = "object";
	}
	Avm1Object.prototype.getProperty = function(name) {
		return this.props[name];
	}
	Avm1Object.prototype.setProperty = function(name, value) {
		this.props[name] = value;
	}
	Avm1Object.prototype.findProperty = function(name) {
		return name in this.props;
	}
	const Avm1Activation = function(avm1, clip, caches) {
		this.avm1 = avm1;
		this.clip = clip;
		this.caches = caches;
		this.pos = 0;
		this.stack = [];
	}
	Avm1Activation.actionLibrary = Object.create(null);
	Avm1Activation.prototype.runActions = function() {
		var caches = this.caches;
		var cLength = caches.length;
		this.pos = 0;
		while(this.pos < cLength) {
			var aScript = caches[this.pos];
			var result = this.doAction(aScript);
			if (!result) console.log(aScript.opcode);
			if (result[0] === 1) {
				if (result[1] === 1) {
					return result[2];
				} else {
					return undefined;
				}
			} else {
			}
			this.pos = aScript.end;
		}
	}
	Avm1Activation.prototype.doAction = function(aScript) {
		var actionCode = aScript.opcode;
		var actionFunc = Avm1Activation.actionLibrary[actionCode];
		actionFunc(this, aScript);
	}
	const actionLibrary = Avm1Activation.actionLibrary;
	actionLibrary[0x00] = function(activation, aScript) { // ActionEnd

	}
	actionLibrary[0x81] = function(activation, aScript) { // ActionGotoFrame

	}
	actionLibrary[0x04] = function(activation, aScript) { // ActionNextFrame

	}
	actionLibrary[0x05] = function(activation, aScript) { // ActionPreviousFrame

	}
	actionLibrary[0x06] = function(activation, aScript) { // ActionPlay

	}
	actionLibrary[0x07] = function(activation, aScript) { // ActionStop

	}
	actionLibrary[0x08] = function(activation, aScript) { // ActionToggleQuality

	}
	actionLibrary[0x8A] = function(activation, aScript) { // ActionWaitForFrame

	}
	actionLibrary[0x09] = function(activation, aScript) { // ActionStopSounds

	}
	actionLibrary[0x8B] = function(activation, aScript) { // ActionSetTarget

	}
	actionLibrary[0x8C] = function(activation, aScript) { // ActionGoToLabel

	}
	actionLibrary[0x83] = function(activation, aScript) { // ActionGetURL

	}
	actionLibrary[0x0A] = function(activation, aScript) { // ActionAdd

	}
	actionLibrary[0x0B] = function(activation, aScript) { // ActionSubtract

	}
	actionLibrary[0x0C] = function(activation, aScript) { // ActionMultiply

	}
	actionLibrary[0x0D] = function(activation, aScript) { // ActionDivide

	}
	actionLibrary[0x0E] = function(activation, aScript) { // ActionEquals

	}
	actionLibrary[0x0F] = function(activation, aScript) { // ActionLess

	}
	actionLibrary[0x10] = function(activation, aScript) { // ActionAnd

	}
	actionLibrary[0x11] = function(activation, aScript) { // ActionOr

	}
	actionLibrary[0x12] = function(activation, aScript) { // ActionNot

	}
	actionLibrary[0x13] = function(activation, aScript) { // ActionStringEquals

	}
	actionLibrary[0x14] = function(activation, aScript) { // ActionStringLength

	}
	actionLibrary[0x31] = function(activation, aScript) { // ActionMBStringLength

	}
	actionLibrary[0x21] = function(activation, aScript) { // ActionStringAdd

	}
	actionLibrary[0x15] = function(activation, aScript) { // ActionStringExtract

	}
	actionLibrary[0x35] = function(activation, aScript) { // ActionMBStringExtract

	}
	actionLibrary[0x29] = function(activation, aScript) { // ActionStringLess

	}
	actionLibrary[0x17] = function(activation, aScript) { // ActionPop

	}
	actionLibrary[0x96] = function(activation, aScript) { // ActionPush

	}
	actionLibrary[0x33] = function(activation, aScript) { // ActionAsciiToChar

	}
	actionLibrary[0x37] = function(activation, aScript) { // ActionAsciiToChar

	}
	actionLibrary[0x36] = function(activation, aScript) { // ActionCharToAscii

	}
	actionLibrary[0x32] = function(activation, aScript) { // ActionCharToAscii

	}
	actionLibrary[0x18] = function(activation, aScript) { // ActionToInteger

	}
	actionLibrary[0x9E] = function(activation, aScript) { // ActionCall

	}
	actionLibrary[0x9D] = function(activation, aScript) { // ActionIf

	}
	actionLibrary[0x99] = function(activation, aScript) { // ActionJump

	}
	actionLibrary[0x1C] = function(activation, aScript) { // ActionGetVariable

	}
	actionLibrary[0x1D] = function(activation, aScript) { // ActionSetVariable

	}
	actionLibrary[0x9A] = function(activation, aScript) { // ActionGetURL2

	}
	actionLibrary[0x22] = function(activation, aScript) { // ActionGetProperty

	}
	actionLibrary[0x9F] = function(activation, aScript) { // ActionGoToFrame2

	}
	actionLibrary[0x20] = function(activation, aScript) { // ActionSetTarget2

	}
	actionLibrary[0x23] = function(activation, aScript) { // ActionSetProperty

	}
	actionLibrary[0x27] = function(activation, aScript) { // ActionStartDrag

	}
	actionLibrary[0x8D] = function(activation, aScript) { // ActionWaitForFrame2

	}
	actionLibrary[0x24] = function(activation, aScript) { // ActionCloneSprite

	}
	actionLibrary[0x25] = function(activation, aScript) { // ActionRemoveSprite

	}
	actionLibrary[0x28] = function(activation, aScript) { // ActionEndDrag

	}
	actionLibrary[0x34] = function(activation, aScript) { // ActionGetTime

	}
	actionLibrary[0x30] = function(activation, aScript) { // ActionRandomNumber

	}
	actionLibrary[0x26] = function(activation, aScript) { // ActionTrace

	}
	actionLibrary[0x2D] = function(activation, aScript) { // ActionFsCommand2

	}
	actionLibrary[0x52] = function(activation, aScript) { // ActionCallMethod

	}
	actionLibrary[0x88] = function(activation, aScript) { // ActionConstantPool

	}
	actionLibrary[0x3d] = function(activation, aScript) { // ActionCallFunction

	}
	actionLibrary[0x3c] = function(activation, aScript) { // ActionDefineLocal

	}
	actionLibrary[0x41] = function(activation, aScript) { // ActionDefineLocal2

	}
	actionLibrary[0x3a] = function(activation, aScript) { // ActionDelete

	}
	actionLibrary[0x3b] = function(activation, aScript) { // ActionDelete2

	}
	actionLibrary[0x46] = function(activation, aScript) { // ActionEnumerate

	}
	actionLibrary[0x49] = function(activation, aScript) { // ActionEquals2

	}
	actionLibrary[0x4e] = function(activation, aScript) { // ActionGetMember

	}
	actionLibrary[0x42] = function(activation, aScript) { // ActionInitArray

	}
	actionLibrary[0x43] = function(activation, aScript) { // ActionInitObject

	}
	actionLibrary[0x53] = function(activation, aScript) { // ActionNewMethod

	}
	actionLibrary[0x40] = function(activation, aScript) { // ActionNewObject

	}
	actionLibrary[0x4f] = function(activation, aScript) { // ActionSetMember

	}
	actionLibrary[0x45] = function(activation, aScript) { // ActionTargetPath

	}
	actionLibrary[0x94] = function(activation, aScript) { // ActionWith

	}
	actionLibrary[0x4a] = function(activation, aScript) { // ActionToNumber

	}
	actionLibrary[0x4b] = function(activation, aScript) { // ActionToString

	}
	actionLibrary[0x44] = function(activation, aScript) { // ActionTypeOf

	}
	actionLibrary[0x47] = function(activation, aScript) { // ActionAdd2

	}
	actionLibrary[0x48] = function(activation, aScript) { // ActionLess2

	}
	actionLibrary[0x3f] = function(activation, aScript) { // ActionModulo

	}
	actionLibrary[0x60] = function(activation, aScript) { // ActionBitAnd

	}
	actionLibrary[0x63] = function(activation, aScript) { // ActionBitLShift

	}
	actionLibrary[0x61] = function(activation, aScript) { // ActionBitOr

	}
	actionLibrary[0x64] = function(activation, aScript) { // ActionBitRShift

	}
	actionLibrary[0x65] = function(activation, aScript) { // ActionBitURShift

	}
	actionLibrary[0x62] = function(activation, aScript) { // ActionBitXor

	}
	actionLibrary[0x51] = function(activation, aScript) { // ActionDecrement

	}
	actionLibrary[0x50] = function(activation, aScript) { // ActionIncrement

	}
	actionLibrary[0x4c] = function(activation, aScript) { // ActionPushDuplicate

	}
	actionLibrary[0x3e] = function(activation, aScript) { // ActionReturn

	}
	actionLibrary[0x4d] = function(activation, aScript) { // ActionStackSwap

	}
	actionLibrary[0x87] = function(activation, aScript) { // ActionStoreRegister

	}
	actionLibrary[0x54] = function(activation, aScript) { // ActionInstanceOf

	}
	actionLibrary[0x55] = function(activation, aScript) { // ActionEnumerate

	}
	actionLibrary[0x66] = function(activation, aScript) { // ActionStrictEquals

	}
	actionLibrary[0x67] = function(activation, aScript) { // ActionGreater

	}
	actionLibrary[0x68] = function(activation, aScript) { // ActionStringGreater

	}
	actionLibrary[0x8e] = function(activation, aScript) { // ActionDefineFunction

	}
	actionLibrary[0x9b] = function(activation, aScript) { // ActionDefineFunction2

	}
	actionLibrary[0x69] = function(activation, aScript) { // ActionExtends

	}
	actionLibrary[0x2b] = function(activation, aScript) { // ActionCastOp

	}
	actionLibrary[0x2c] = function(activation, aScript) { // ActionImplementsOp

	}
	actionLibrary[0x8f] = function(activation, aScript) { // ActionTry

	}
	actionLibrary[0x2a] = function(activation, aScript) { // ActionThrow

	}
	const Avm1 = function() {
		this.version = 6;
		this.clipExecList = null;
		this.context = null;
    }
	Avm1.prototype.findDisplayObjectsPendingRemoval = function(obj, out) {
		var parent = obj;
		if (parent instanceof DisplayObjectContainer) {
			var children = parent.iterRenderList();
			for (let i = 0; i < children.length; i++) {
				const child = children[i];
				if (child.isAvm1PendingRemoval()) {
					out.push(child);
					this.findDisplayObjectsPendingRemoval(child, out);
				}
			}
		}
	}
	Avm1.prototype.removePending = function() {
		var vec = [];
		var rootClip = this.context.stage.clip;
		if (rootClip) {
			this.findDisplayObjectsPendingRemoval(rootClip, vec);
		}
		for (let i = 0; i < vec.length; i++) {
			const child = vec[i];
            let parent = child.getParent();
			if (parent && (parent instanceof DisplayObjectContainer)) {
				parent.removeChildDirectly(child);
				parent.updatePendingRemovals();	
			}
		}
	}
	Avm1.prototype.runFrame = function() {
        // Remove pending objects
		this.removePending();

        // In AVM1, we only ever execute the idle phase, and all the work that
        // would ordinarily be phased is instead run all at once in whatever order
        // the SWF requests it.
		this.context.framePhase = "idle";
		var prev = null;
		var next = this.clipExecList;
		while(true) {
			var clip = next;
			if (!clip) {
				break;
			}
			next = clip.nextAvm1Clip;
			if (clip.AVM1_REMOVED) {
                // Clean up removed clips from this frame or a previous frame.
				if (prev) {
					prev.nextAvm1Clip = next;
				} else {
					this.clipExecList = next;
				}
				clip.nextAvm1Clip = null;
			} else {
				clip.runFrameAvm1();
				prev = clip;
			}
		}

		this.context.framePhase = "idle";
    }
	Avm1.prototype.addExecuteList = function(clip) {
        // Adding while iterating is safe, as this does not modify any active nodes.
		if (!clip.nextAvm1Clip) {
			clip.nextAvm1Clip = this.clipExecList;
			this.clipExecList = clip;
		}
    }
	Avm1.prototype.valueTypeof = function(value) {
		var r = (typeof value);
		return r;
	}
	Avm1.prototype.valueToNumber = function(value) {
		return +value;
	}
	Avm1.prototype.valueToF64 = function(value) {
		return +value;
	}
	Avm1.prototype.valueToString = function(value) {
		return value + "";
	}
	Avm1.prototype.valueAsBool = function(value) {
		return !!value;
	}
	Avm1.prototype.abstractLT = function(value) {
		
	}
	Avm1.prototype.abstractEQ = function(value) {
		
	}
	const SoundDecoder = function(info) {
		this.info = info;
		this.formatInfo = null;
		this.numSamples = null;
		this.data = info.data;
		this.byteStream = null;
		this.onload = null;
	}
	SoundDecoder.INDEX_TABLE = [];
	SoundDecoder.INDEX_TABLE[0] = [-1, 2];
	SoundDecoder.INDEX_TABLE[1] = [-1, -1, 2, 4];
	SoundDecoder.INDEX_TABLE[2] = [-1, -1, -1, -1, 2, 4, 6, 8];
	SoundDecoder.INDEX_TABLE[3] = [-1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 4, 6, 8, 10, 13, 16];
	SoundDecoder.STEP_TABLE = [
		7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 21, 23, 25, 28, 31, 34, 37, 41, 45, 50, 55, 60, 66,
		73, 80, 88, 97, 107, 118, 130, 143, 157, 173, 190, 209, 230, 253, 279, 307, 337, 371, 408, 449,
		494, 544, 598, 658, 724, 796, 876, 963, 1060, 1166, 1282, 1411, 1552, 1707, 1878, 2066, 2272,
		2499, 2749, 3024, 3327, 3660, 4026, 4428, 4871, 5358, 5894, 6484, 7132, 7845, 8630, 9493,
		10442, 11487, 12635, 13899, 15289, 16818, 18500, 20350, 22385, 24623, 27086, 29794, 32767,
	];
	SoundDecoder.SAMPLE_DELTA_CALCULATOR = [];

    // 2 bits
	SoundDecoder.SAMPLE_DELTA_CALCULATOR[0] = function(step, magnitude) {
        let delta = step >> 1;
        if (magnitude & 1) {
            delta += step;
        }
        return delta;
	};
    // 3 bits
	SoundDecoder.SAMPLE_DELTA_CALCULATOR[1] = function(step, magnitude) {
        let  delta = step >> 2;
        if (magnitude & 1) {
            delta += step >> 1;
        }
        if (magnitude & 2) {
            delta += step;
        }
        return delta;
	}
    // 4 bits
	SoundDecoder.SAMPLE_DELTA_CALCULATOR[2] = function(step, magnitude) {
        let delta = step >> 3;
        if (magnitude & 1) {
            delta += step >> 2;
        }
        if (magnitude & 2) {
            delta += step >> 1;
        }
        if (magnitude & 4) {
            delta += step;
        }
        return delta;
	}
    // 5 bits
	SoundDecoder.SAMPLE_DELTA_CALCULATOR[3] = function(step, magnitude) {
        let delta = step >> 4;
        if (magnitude & 1) {
            delta += step >> 3;
        }
        if (magnitude & 2) {
            delta += step >> 2;
        }
        if (magnitude & 4) {
            delta += step >> 1;
        }
        if (magnitude & 8) {
            delta += step;
        }
        return delta;
	}

	SoundDecoder.NELLY_DEQUANTIZATION_TABLE = [0.0000000000, -0.8472560048, 0.7224709988, -1.5247479677, -0.4531480074, 0.3753609955, 1.4717899561, -1.9822579622, -1.1929379702, -0.5829370022, -0.0693780035, 0.3909569979, 0.9069200158, 1.4862740040, 2.2215409279, -2.3887870312, -1.8067539930, -1.4105420113, -1.0773609877, -0.7995010018, -0.5558109879, -0.3334020078, -0.1324490011, 0.0568020009, 0.2548770010, 0.4773550034, 0.7386850119, 1.0443060398, 1.3954459429, 1.8098750114, 2.3918759823, -2.3893830776, -1.9884680510, -1.7514040470, -1.5643119812, -1.3922129869, -1.2164649963, -1.0469499826, -0.8905100226, -0.7645580173, -0.6454579830, -0.5259280205, -0.4059549868, -0.3029719889, -0.2096900046, -0.1239869967, -0.0479229987, 0.0257730000, 0.1001340002, 0.1737180054, 0.2585540116, 0.3522900045, 0.4569880068, 0.5767750144, 0.7003160119, 0.8425520062, 1.0093879700, 1.1821349859, 1.3534560204, 1.5320819616, 1.7332619429, 1.9722349644, 2.3978140354, -2.5756309032, -2.0573320389, -1.8984919786, -1.7727810144, -1.6662600040, -1.5742180347, -1.4993319511, -1.4316639900, -1.3652280569, -1.3000990152, -1.2280930281, -1.1588579416, -1.0921250582, -1.0135740042, -0.9202849865, -0.8287050128, -0.7374889851, -0.6447759867, -0.5590940118, -0.4857139885, -0.4110319912, -0.3459700048, -0.2851159871, -0.2341620028, -0.1870580018, -0.1442500055, -0.1107169986, -0.0739680007, -0.0365610011, -0.0073290002, 0.0203610007, 0.0479039997, 0.0751969963, 0.0980999991, 0.1220389977, 0.1458999962, 0.1694349945, 0.1970459968, 0.2252430022, 0.2556869984, 0.2870100141, 0.3197099864, 0.3525829911, 0.3889069855, 0.4334920049, 0.4769459963, 0.5204820037, 0.5644530058, 0.6122040153, 0.6685929894, 0.7341650128, 0.8032159805, 0.8784040213, 0.9566209912, 1.0397069454, 1.1293770075, 1.2211159468, 1.3080279827, 1.4024800062, 1.5056819916, 1.6227730513, 1.7724959850, 1.9430880547, 2.2903931141];
	SoundDecoder.NELLY_BAND_SIZES_TABLE = [2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 5, 6, 6, 7, 8, 9, 10, 12, 14, 15];
	SoundDecoder.NELLY_INIT_TABLE = [3134, 5342, 6870, 7792, 8569, 9185, 9744, 10191, 10631, 11061, 11434, 11770, 12116, 12513, 12925, 13300, 13674, 14027, 14352, 14716, 15117, 15477, 15824, 16157, 16513, 16804, 17090, 17401, 17679, 17948, 18238, 18520, 18764, 19078, 19381, 19640, 19921, 20205, 20500, 20813, 21162, 21465, 21794, 22137, 22453, 22756, 23067, 23350, 23636, 23926, 24227, 24521, 24819, 25107, 25414, 25730, 26120, 26497, 26895, 27344, 27877, 28463, 29426, 31355];
	SoundDecoder.NELLY_DELTA_TABLE = [-11725, -9420, -7910, -6801, -5948, -5233, -4599, -4039, -3507, -3030, -2596, -2170, -1774, -1383, -1016, -660, -329, -1, 337, 696, 1085, 1512, 1962, 2433, 2968, 3569, 4314, 5279, 6622, 8154, 10076, 12975];
	SoundDecoder.prototype.load = function() {
		var _this = this;
		var format = this.info.format;
		this.formatInfo = format;
		this.numSamples = this.info.numSamples;
		var channels = (format.isStereo ? 2 : 1);
		this.byteStream = new ByteStream(this.data);
		if (format.compression == "MP3") {
			var seekSample = this.byteStream.readInt16();
			audioContext.decodeAudioData(this.data.slice(2), function(a) {
				if (_this.onload) {
					_this.onload({
						buffer: a,
						seekSample
					});
				}
			}, function(e) {
				console.log("MP3: failed");
				if (_this.onload) {
					_this.onload({
						buffer: audioContext.createBuffer(1, 1, audioContext.sampleRate),
						seekSample: 0
					});
				}
			});
			return;
		}
		var buffer = audioContext.createBuffer(channels, this.numSamples, format.sampleRate);
		this.decodeFormat(format.compression, buffer, channels);
		if (this.onload) {
			this.onload({
				buffer,
				seekSample: 0
			});
		}
	}
	SoundDecoder.prototype.decodeFormat = function(compression, buffer, channels, pos_buffer) {
		switch(compression) {
			case "uncompressed":
				return this.decodePCM(buffer, channels, pos_buffer);
			case "ADPCM":
				return this.decodeADPCM(buffer, channels, pos_buffer);
			default:
				console.log("TODO", compression);
				return 0;
		}
	}
	// info.format.is16Bit
	// info.format.isStereo
	// info.format.sampleRate
	SoundDecoder.prototype.decodePCM = function(buffer, channels, pos_buffer) {
		var _pos_buffer = pos_buffer || 0;

		var format = this.formatInfo;
		/// Decoder for PCM audio data in a Flash file.
		/// Flash exports this when you use the "Raw" compression setting.
		/// 8-bit unsigned or 16-bit signed PCM.
		var i = _pos_buffer;
		var _left = buffer.getChannelData(0);
		var _right = null;
		if (channels == 2) {
			_right = buffer.getChannelData(1);
		}
		while(this.byteStream.getBytesAvailable() >= 2) {
			if (format.is16Bit) {
				_left[i] = (this.byteStream.readInt16() / 32768);
				if (channels == 2) {
					_right[i] = (this.byteStream.readInt16() / 32768);
				}
			} else {
				_left[i] = ((this.byteStream.readUint8() - 128) / 128);
				if (channels == 2) {
					_right[i] = ((this.byteStream.readUint8() - 128) / 128);
				}
			}
			i++;
		}

		return i;
	}
	SoundDecoder.prototype.decodeADPCM = function(buffer, channels, pos_buffer) {
		var byteStream = this.byteStream;

		let adpcmCodeSize = byteStream.getUIBits(2);

		let bits_per_sample = (adpcmCodeSize + 2);
		var _pos_buffer = pos_buffer || 0;
		var _left = buffer.getChannelData(0);
		var _right = null;
		if (channels == 2) {
			_right = buffer.getChannelData(1);
		}
		var decoder = SoundDecoder.SAMPLE_DELTA_CALCULATOR[bits_per_sample - 2];

		let num_channels = channels;
		var _channels = [{}, {}];

		let sign_mask = (1 << (bits_per_sample - 1));

		var isEnd = false;
		
		while(!isEnd) {
			// The initial sample values are NOT byte-aligned.
			for (let i = 0; i < num_channels; i++) {
				const ch = _channels[i];
				ch.sample = toInt16(byteStream.getUIBits(16));
				ch.stepIndex = byteStream.getUIBits(6);
			}

			for (let i3 = 0; i3 < 4095; i3++) {
				if ((byteStream.getBytesAvailable() <= 1) && (byteStream.bit_offset >= (8 - bits_per_sample))) {
					isEnd = true;
					break;
				}
				for (let i2 = 0; i2 < num_channels; i2++) {
					if ((byteStream.getBytesAvailable() <= 1) && (byteStream.bit_offset >= (8 - bits_per_sample))) {
						break;
					}
					const ch = _channels[i2];
					let step = SoundDecoder.STEP_TABLE[ch.stepIndex];
					let data = byteStream.getUIBits(bits_per_sample);
					let magnitude = (data & (sign_mask - 1)); // TODO
					
					// (data + 0.5) * step / 2^(bits_per_sample - 2)
					let delta = decoder(step, magnitude);

					var result_sample = 0;
					if (data & sign_mask) {
						result_sample = (ch.sample - delta);
						if (result_sample < -32768) {
							result_sample = -32768;
						}
					} else {
						result_sample = (ch.sample + delta);
						if (result_sample > 32767) {
							result_sample = 32767;
						}
					}
					ch.sample = result_sample;

					ch.stepIndex += SoundDecoder.INDEX_TABLE[bits_per_sample - 2][magnitude];
					if (ch.stepIndex > 88) {
						ch.stepIndex = 88;
					}
					if (ch.stepIndex < 0) {
						ch.stepIndex = 0;
					}
				}
				var __left = _channels[0].sample;
				var __right = _channels[1].sample;
				_left[_pos_buffer] = __left / 0x8000;
				if (num_channels == 2) {
					_right[_pos_buffer] = __right / 0x8000;
				}
				_pos_buffer += 1;
			}
		}
		return _pos_buffer;
	}
	SoundDecoder.prototype.decodeMP3 = function() {
		
	}
	const SoundStreamDecoder = function(streamInfo, blocks) {
		SoundDecoder.call(this, {data: null});
		this.streamInfo = streamInfo;
		this.blocks = blocks;
	}
	SoundStreamDecoder.prototype = Object.create(SoundDecoder.prototype);
	SoundStreamDecoder.prototype.constructor = SoundStreamDecoder;
	SoundStreamDecoder.prototype.load = function() {
		var _this = this;

		var streamInfo = this.streamInfo;
		var blocks = this.blocks;

		var streamStream = streamInfo.stream;
		var streamPlayback = streamInfo.playback;

		var isMP3 = (streamStream.compression == "MP3");
		var idlimit = isMP3 ? 4 : 0;

		var gg1 = 0;
		for (var i = 0; i < blocks.length; i++) {
			var b1 = blocks[i];
			gg1 += (b1.byteLength - idlimit);
		}
		var gg = new Uint8Array(gg1);
		var idd = 0;
		var sh = false;
		for (var i = 0; i < blocks.length; i++) {
			var bb = blocks[i];
			var ui8view = new Uint8Array(bb);
			for (var i2 = idlimit; i2 < bb.byteLength; i2++) {
				gg[idd++] = ui8view[i2];
			}
			sh = true;
		}

		var compressed = gg.buffer;
		if (compressed.byteLength > 0) {
			this.data = compressed;
			this.formatInfo = streamStream;
			this.numSamples = blocks.length * streamInfo.samplePerBlock; // TODO
			var channels = (this.formatInfo.isStereo ? 2 : 1);
			this.byteStream = new ByteStream(this.data);
			if (isMP3) {
				var seekSample = streamInfo.latencySeek;
				audioContext.decodeAudioData(this.data.slice(0), function(a) {
					if (_this.onload) {
						_this.onload({
							buffer: a,
							seekSample
						});
					}
				}, function(e) {
					console.log("MP3: failed");
					if (_this.onload) {
						_this.onload({
							buffer: audioContext.createBuffer(1, 1, audioContext.sampleRate),
							seekSample: 0
						});
					}
				});
				return;
			}
			var buffer = audioContext.createBuffer(channels, this.numSamples, streamStream.sampleRate);
			this.decodeStreamFormat(streamStream.compression, buffer, channels, blocks);
			if (this.onload) {
				this.onload({
					buffer,
					seekSample: 0
				});
			}
		} else {
			if (_this.onload) {
				_this.onload({
					buffer: audioContext.createBuffer(1, 1, audioContext.sampleRate),
					seekSample
				});
			}
		}
	}
	SoundStreamDecoder.prototype.decodeStreamFormat = function (compression, buffer, channels, blocks) {
		var oPos = 0;
		for (let i = 0; i < blocks.length; i++) {
			const block = blocks[i];
			this.data = block;
			this.byteStream = new ByteStream(this.data);
			var posBuffer = this.decodeFormat(compression, buffer, channels, oPos);
			oPos = posBuffer;
		}
	}
	const Sound = function() {
		this.buffer = null;
		this.duration = 0;
		this.seekSample = 0;
    }
	Sound.prototype.getBuffer = function() {
		return this.buffer;
    }
	Sound.prototype.setBuffer = function(buffer) {
		this.buffer = buffer;
		this.duration = buffer.duration;
    }
	const SoundStream = function() {
		this.buffer = audioContext.createBuffer(1, 1, audioContext.sampleRate);;
		this.duration = 0;
		this.seekSample = 0;
    }
	SoundStream.prototype.getBuffer = function() {
		return this.buffer;
    }
	SoundStream.prototype.setBuffer = function(buffer) {
		this.buffer = buffer;
		this.duration = buffer.duration;
    }
    const AudioBackend = function(stage) {
        this.stage = stage;
		this.node = audioContext.createGain();
		this.node.connect(audioContext.destination);
		this.playingAudios = [];
		this.playingSoundStreams = [];
		this.tickTime = 0;
    }
	AudioBackend.prototype._createPan = function(input) {
		var inputNode = audioContext.createGain();
		var leftGain = audioContext.createGain();
		var rightGain = audioContext.createGain();
		var channelMerger = audioContext.createChannelMerger(2);
		inputNode.connect(leftGain);
		inputNode.connect(rightGain);
		leftGain.connect(channelMerger, 0, 0);
		rightGain.connect(channelMerger, 0, 1);
		channelMerger.connect(input);
		return {inputNode, leftGain, rightGain};
	}
	AudioBackend.prototype.cleanup = function() {
		this.stopAll(true);
		this.stopAllSoundStream();
	}
	AudioBackend.prototype.pause = function() {
		if (audioContext) audioContext.suspend();
	}
	AudioBackend.prototype.resume = function() {
		if (audioContext) audioContext.resume();
	}
	AudioBackend.prototype.getVolume = function() {
		return this.node.gain.value * 100;
	}
	AudioBackend.prototype.setVolume = function(value) {
		this.node.gain.value = value / 100;
	}
	AudioBackend.prototype.tick = function() {
		this.tickTime = this.stage.tickTime;
		for (let i = 0; i < this.playingAudios.length; i++) {
			const playingaudio = this.playingAudios[i];
			if (!playingaudio.ended) {
				var SGFtime = (this.tickTime - playingaudio.startTime) / 1000;
				var SGFtime2 = (this.tickTime - playingaudio.startTimeOriginal) / 1000;
				if (playingaudio.stateEnvelopeSound) {
					var envelopes = playingaudio._envelopes;
					var nodeLR = playingaudio.nodeLR;
					if (playingaudio.envelopeId < envelopes.length) {
						var rs = envelopes[playingaudio.envelopeId];
						var rs2 = envelopes[playingaudio.envelopeId - 1];
						if (rs2) {
							const per = Math.max(Math.min(((SGFtime2 * playingaudio.__rate) - rs2.sample) / (rs.sample - rs2.sample), 1), 0);
							const startPer = 1 - per;
							const leftVal = ((rs2.leftVolume * startPer) + (rs.leftVolume * per)) / 32768;
							const rightVal = ((rs2.rightVolume * startPer) + (rs.rightVolume * per)) / 32768;
							nodeLR.rightGain.gain.value = Math.max(Math.min(rightVal, 1), 0);
							nodeLR.leftGain.gain.value = Math.max(Math.min(leftVal, 1), 0);
						}
						if (SGFtime2 >= rs.sample / playingaudio.__rate) {
							const leftVal = rs.leftVolume / 32768;
							const rightVal = rs.rightVolume / 32768;
							nodeLR.rightGain.gain.value = Math.max(Math.min(rightVal, 1), 0);
							nodeLR.leftGain.gain.value = Math.max(Math.min(leftVal, 1), 0);
							playingaudio.envelopeId++;
						}
					}
				}
				if ((SGFtime + playingaudio.__startSound) > playingaudio.__endSound) {
					playingaudio.numLoops--;
					if (playingaudio.numLoops > 0) {
						this.playSource(playingaudio);
						playingaudio.startTime = this.tickTime;
					} else {
						playingaudio.stateEnvelopeSound = false;
						this.stopSound(playingaudio);
					}
				}
			}
		}
		for (let i = 0; i < this.playingSoundStreams.length; i++) {
			const playingaudio = this.playingSoundStreams[i];
			if (!playingaudio.ended) {
				if ((this.tickTime - playingaudio.startTime) > (playingaudio.duration * 1000)) {
					this.stopStreamSound(playingaudio);
				}
			}
		}
		var newTags = [];
		for (let i = 0; i < this.playingAudios.length; i++) {
			const playingaudio = this.playingAudios[i];
			if (!playingaudio.ended) {
				newTags.push(playingaudio);
			}
		}
		this.playingAudios = newTags;
		var newTags2 = [];
		for (let i = 0; i < this.playingSoundStreams.length; i++) {
			const playingaudio2 = this.playingSoundStreams[i];
			if (!playingaudio2.ended) {
				newTags2.push(playingaudio2);
			}
		}
		this.playingSoundStreams = newTags2;
	}
	AudioBackend.prototype.startSound = function(soundinfo, mc) {
		//console.log(soundinfo);
		var sound = this.getSound(soundinfo.id);
		if (!sound) {
			console.log("missing: " + soundinfo.id);
			return;
		}
		for (let i = 0; i < this.playingAudios.length; i++) {
			const playingaudio = this.playingAudios[i];
			if ((playingaudio.id == soundinfo.id) && (playingaudio.mc === mc)) {
				//this.stopSound(playingaudio);
			}
		}
		if (sound.audio) {
			this.playingAudios.push(this.playSound(sound, soundinfo, mc));
		}
	}
	AudioBackend.prototype.startStreamSound = function(sound, mc) {
		var rs = {};
		if (!sound.audioStream) return;
		var source = audioContext.createBufferSource();
		source.buffer = sound.audioStream.getBuffer();
		source.connect(this.node);
		source.start(audioContext.currentTime);
		rs.mc = mc;
		rs.source = source;
		rs.startTime = this.tickTime;
		rs.duration = sound.audioStream.duration;
		this.playingSoundStreams.push(rs);
		return rs;
	}
	AudioBackend.prototype.stopSound = function(playingaudio) {
		if (playingaudio.source) {
			playingaudio.source.disconnect();
			playingaudio.source = null;
		}
		playingaudio.ended = true;
	}
	AudioBackend.prototype.stopStreamSound = function(playingaudio) {
		if (playingaudio.source) {
			playingaudio.source.disconnect();
			playingaudio.source = null;
		}
		playingaudio.ended = true;
	}
	AudioBackend.prototype.stopAll = function() {
		for (let i = 0; i < this.playingAudios.length; i++) {
			const playingaudio = this.playingAudios[i];
			this.stopSound(playingaudio);
		}
	}
	AudioBackend.prototype.stopAllSoundStream = function() {
		for (let i = 0; i < this.playingSoundStreams.length; i++) {
			const playingaudio = this.playingSoundStreams[i];
			this.stopStreamSound(playingaudio);
		}
	}
	AudioBackend.prototype.playSound = function(sud, soundinfo, mc) {
		var sound = {};
		var audio = sud.audio;

		var __info = soundinfo.info;
		var sampleRate = sud.format.sampleRate;
		
		sound.buffer = audio.getBuffer();;
		sound.mc = mc;
		sound.id = sud.id;

		let duration = (sud.numSamples / sampleRate);
		let seekTime = (audio.seekSample / sampleRate);

		var nodeLR = this._createPan(this.node);
		sound.nodeLR = nodeLR;

		sound.duration = duration;
		sound.__start = seekTime;
		sound.__rate = 44100;

		if ("numLoops" in __info) {
			sound.numLoops = __info.numLoops;
		} else {
			sound.numLoops = 1;
		}
		if ("inSample" in __info) {
			sound.__startSound = (__info.inSample / sound.__rate);
		} else {
			sound.__startSound = 0;
		}
		if ("outSample" in __info) {
			sound.__endSound = (__info.outSample / sound.__rate);
		} else {
			sound.__endSound = duration;
		}
		if ("envelope" in __info) {
			sound.stateEnvelopeSound = true;
			sound.envelopeId = 0;
			var envelopes =  __info.envelope;
			var rs = envelopes[0];
			if (rs) {
				const leftVal = rs.leftVolume / 32768;
				const rightVal = rs.rightVolume / 32768;
				nodeLR.rightGain.gain.value = Math.max(Math.min(rightVal, 1), 0);
				nodeLR.leftGain.gain.value = Math.max(Math.min(leftVal, 1), 0);
			}
			sound._envelopes = envelopes;
		} else {
			sound.stateEnvelopeSound = false;
		}
		sound.startTime = this.tickTime;
		sound.startTimeOriginal = this.tickTime;
		this.playSource(sound);
		return sound;
	}
	AudioBackend.prototype.playSource = function(sound) {
		if (sound.source) {
			sound.source.disconnect();
			sound.source = null;
		}
		sound.source = audioContext.createBufferSource();
		sound.source.buffer = sound.buffer;
		if (sound.nodeLR) {
			sound.source.connect(sound.nodeLR.inputNode);
		} else {
			sound.source.connect(this.node);
		}
		sound.source.start(audioContext.currentTime, (sound.__start + (sound.__startSound || 0)));
	}
	AudioBackend.prototype.decodeSound = function(sound, callback) {
		// info.format.is16Bit
		// info.format.isStereo
		// info.format.sampleRate
		var sd = new SoundDecoder(sound);
		sd.onload = function(buf) {
			var s = new Sound();
			s.setBuffer(buf.buffer);
			s.seekSample = buf.seekSample;
			callback(s);
		}
		sd.load();
	}
	AudioBackend.prototype.decodeSoundStream = function(streamInfo, blocks, callback) {
		var sd = new SoundStreamDecoder(streamInfo, blocks);
		sd.onload = function(buf) {
			var s = new SoundStream();
			s.setBuffer(buf.buffer);
			s.seekSample = buf.seekSample;
			callback(s);
		}
		sd.load();
	}
	AudioBackend.prototype.getSound = function(id) {
		return this.stage.library.getCharacter(id);
	}
    const Library = function(stage) {
        this.stage = stage;
        this.characters = [];
    }
	Library.prototype.getCharacter = function(id) {
		return this.characters[id];
	}
	Library.prototype.setCharacter = function(id, character) {
		this.characters[id] = character;
	}
	Library.prototype.instantiateById = function(id) {
		var c = this.getCharacter(id);
		if (c) {
			return this.instantiateDisplayObject(c);
		} else {
			console.log("Character id doesn't exist");
		}
	}
	Library.prototype.instantiateDisplayObject = function(character) {
		switch (true) {
			case character instanceof ShapeData:
			case character instanceof MovieClipData:
			case character instanceof TextData:
			case character instanceof ButtonData:
			case character instanceof EditTextData:
			case character instanceof DefineVideoData:
				return character.instantiate();
			default:
				console.log("Not a DisplayObject");
		}
	}
    const Renderer = function() {
		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.width = 640;
		this.height = 480;
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.stack = [[1, 0, 0, 1, 0, 0]];
		
		this.pathStack = [];

		this.backgroundColor = [255, 255, 255];

		this.fill_style_color = [0, 0, 0, 1];
		this.stroke_style_color = [0, 0, 0, 1];

		this.fill_style_gradient = null;
		this.stroke_style_gradient = null;

		this.fill_style_pattern = null;
		this.stroke_style_pattern = null;

		this.fill_style_type = 0;
		this.stroke_style_type = 0;
    }
	Renderer.prototype.setBackgroundColor = function(r, g, b) {
		this.backgroundColor = [r, g, b];
    }
	Renderer.prototype.clear = function() {
		this.setTransform(1, 0, 0, 1, 0, 0);
		this.beginPath();
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillStyle = "rgb(" + this.backgroundColor.join(",") + ")";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
	Renderer.prototype.resize = function(w, h) {
		this.width = w;
		this.height = h;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
    }
	Renderer.prototype.drawImage = function(img, x, y, width, height) {
		this.ctx.drawImage(img, x, y);
    }
	Renderer.prototype.save = function() {
		this.ctx.save();
    }
	Renderer.prototype.clip = function() {
		this.ctx.clip();
    }
	Renderer.prototype.restore = function() {
		this.ctx.restore();
    }
	Renderer.prototype.setTransform = function(a, b, c, d, e, f) {
		this.ctx.setTransform(a, b, c, d, e, f);
    }
	Renderer.prototype.executeGradient = function(lists) {
		var css = null;
		if (lists[0][0] == 0) {
			css = this.ctx.createLinearGradient(...lists[0][1]);
		} else {
			css = this.ctx.createRadialGradient(...lists[0][1]);
		}
		for (let i = 1; i < lists.length; i++) {
			const s = lists[i];
			css.addColorStop(s[0], 'rgba(' + s[1].join(",") + ')');
		}
		return css;
    }
	Renderer.prototype.fill = function() {
		if (this.fill_style_type == 1) {
			this.ctx.fillStyle = this.executeGradient(this.fill_style_gradient);
		} else {
			this.ctx.fillStyle = 'rgba(' + this.fill_style_color.join(",") + ')';
		}
		this.ctx.fill();
    }
	Renderer.prototype.stroke = function() {
		this.ctx.lineWidth = this.line_width;
		this.ctx.lineCap = "round";
		this.ctx.lineJoin = "round";
		if (this.stroke_style_type == 1) {
			this.ctx.strokeStyle = this.executeGradient(this.stroke_style_gradient);
		} else {
			this.ctx.strokeStyle = 'rgba(' + this.stroke_style_color.join(",") + ')';
		}
		this.ctx.stroke();
    }
	Renderer.prototype.setLineWidth = function(w) {
		this.line_width = w;
    }
	Renderer.prototype.setFillColor = function(r, g, b, a) {
		this.fill_style_color[0] = r;
		this.fill_style_color[1] = g;
		this.fill_style_color[2] = b;
		this.fill_style_color[3] = a;
		this.fill_style_gradient = null;
		this.fill_style_type = 0;
    }
	Renderer.prototype.setStrokeColor = function(r, g, b, a) {
		this.stroke_style_color[0] = r;
		this.stroke_style_color[1] = g;
		this.stroke_style_color[2] = b;
		this.stroke_style_color[3] = a;
		this.stroke_style_type = 0;
		this.stroke_style_gradient = null;
    }
	Renderer.prototype.setFillGradient = function(lists) {
		this.fill_style_gradient = JSON.parse(JSON.stringify(lists));
		this.fill_style_type = 1;
    }
	Renderer.prototype.setStrokeGradient = function(lists) {
		this.stroke_style_gradient = JSON.parse(JSON.stringify(lists));
		this.stroke_style_type = 1;
    }
	Renderer.prototype.beginPath = function() {
		this.ctx.beginPath();
		//this.pathStack = [];
    }
	Renderer.prototype.moveTo = function(x, y) {
		this.ctx.moveTo(x, y);
		//this.pathStack.push([0, x, y]);
    }
	Renderer.prototype.lineTo = function(x, y) {
		this.ctx.lineTo(x, y);
		//this.pathStack.push([2, x, y]);
    }
	Renderer.prototype.quadraticCurveTo = function(x1, y1, x2, y2) {
		this.ctx.quadraticCurveTo(x1, y1, x2, y2);
		//this.pathStack.push([1, x1, y1, x2, y2]);
    }
	Renderer.prototype.rect = function(x, y, w, h) {
		this.ctx.rect(x, y, w, h);
		//this.pathStack.push([0, x, y]);
		//this.pathStack.push([2, x + w, y]);
		//this.pathStack.push([2, x + w, y + h]);
		//this.pathStack.push([2, x, y + h]);
		//this.pathStack.push([2, x, y]);
		//this.pathStack.push([0, x, y]);
    }
	const Timer = function() {
		this.startTime = 0;
		this.tickTime = 0;
	}
	Timer.prototype.update = function(t) {
		this.tickTime = t;
	}
	Timer.prototype.getTime = function() {
		return this.tickTime - this.startTime;
	}
	const UpdateContext = function(stage) {
		this.stage = stage;
		this.library = stage.library;
		this.renderer = stage.renderer;
		this.audio = stage.audio;
		this.avm1 = stage.avm1;
		this.framePhase = "";
		this.actionQueue = [];
	}
	UpdateContext.prototype.init = function() {
	}
	UpdateContext.prototype.queueAction = function(clip, action, isUnload) {
		let _action = {};
		_action.clip = clip;
		_action.action = action;
		_action.isUnload = isUnload;
		this.actionQueue.push(_action);
	}
	UpdateContext.prototype.popAction = function() {
		return this.actionQueue.pop();
	}
    const Stage = function() {
		this.width = 0;
		this.height = 0;
        this.version = 0;
		this.frameRate = 5;
		this.isLoad = false;
		this.mousePosition = [0, 0];
		this.mousePressed = false;
		this.dirty = false;

		this.clip = null;
		this.rootClipTag = null;
		this.playing = false;

		this.onenterframe = null;
		this.onload = null;
		this.onerror = null;
		this.onrender = null;
		this.onprogress = null;

        this.library = new Library(this);
        this.renderer = new Renderer();
		this.canvas = this.renderer.canvas;
        this.audio = new AudioBackend(this);
		this.avm1 = new Avm1(this);

		this.timer = new Timer();

		this.context = new UpdateContext(this);

		this.avm1.context = this.context;

		this.debugMovieCanvas = document.createElement('canvas');
		this.debugMovieCtx = this.debugMovieCanvas.getContext("2d");

		this.tickTime = 0;
		this._starttime = 0;
		this.lastTime = 0;
		this._startOffset = 0;

		this.checkRender = function() {
			return true;
		};
    }
    Stage.prototype.tick = function() {
		this.timeUpdate();
		if (this.isLoad) {
			if (this.playing) {
				var rate = +((1000 / this.frameRate).toFixed(1));
				if (!this.clip) {
					this._starttime = this.timer.getTime();
					this.timeUpdate();
					this._startOffset = this.tickTime - rate; 
					if (audioContext) audioContext.resume();
					this.initRoot();
				}
				this.lastTime = this.tickTime;
				this.audio.tick();
				while ((this.tickTime - this._startOffset) > rate) { // TODO
					this.runFrame();
					this._startOffset += rate;
				}
			} else {
				this._starttime = this.timer.getTime() - this.lastTime;
			}
			if (this.dirty) {
				this.render();
				this.dirty = false;
			}
		}
    }
	Stage.prototype.timeUpdate = function() {
		this.tickTime = this.timer.getTime() - this._starttime;
    }
	Stage.prototype.pause = function() {
		this.playing = false;
		this.audio.pause();
    }
	Stage.prototype.resume = function() {
		this.playing = true;
		this.audio.resume();
    }
	Stage.prototype.start = function() {
		this.playing = true;
		this.audio.resume();
    }
	Stage.prototype.clipPlay = function() {
		this.dirty = true;
		if (this.clip) {
			this.clip.play();
		}
	}
	Stage.prototype.clipStop = function() {
		if (this.clip) {
			this.clip.stop();
		}
	}
	Stage.prototype.initRoot = function() {
		var mc = this.rootClipTag.instantiate();
		mc.postInstantiation(null, null, false);
		this.clip = mc;
    }
	Stage.prototype.runFrame = function() {
		this.dirty = true;
		this.avm1.runFrame();
		this.runActions();
    }
	Stage.prototype.runActions = function() {
		var context = this.context;
		while (context.actionQueue.length) {
			var actionInfo = context.popAction();
			//console.log(actionInfo);
		}
    }
	Stage.prototype.resize = function(scale) {
		this.dirty = true;
		var w = Math.floor(this.width * scale);
		var h = Math.floor(this.height * scale);
		this.renderer.resize(w, h);
		this.debugMovieCanvas.width = w;
		this.debugMovieCanvas.height = h;
		this.render();
		this.dirty = false;
    }
    Stage.prototype.render = function() {
        this.renderer.clear();
		if (this.clip && this.isLoad) {
			if (this.checkRender()) {
				this.clip.render(this, this.renderer, [(this.renderer.width / this.width) / 20, 0, 0, (this.renderer.height / this.height) / 20, 0, 0], [1, 1, 1, 1, 0, 0, 0, 0], true, false);
			}
			this.debugMovieCtx.setTransform(1, 0, 0, 1, 0, 0);
			this.debugMovieCtx.clearRect(0, 0, this.debugMovieCanvas.width, this.debugMovieCanvas.height);
			this.clip.debugRender(this.debugMovieCtx, [(this.debugMovieCanvas.width / this.width) / 20, 0, 0, (this.debugMovieCanvas.height / this.height) / 20, 0, 0], [1, 1, 1, 1, 0, 0, 0, 0], this, true);
		}
    }
	Stage.prototype.setBackgroundColor = function(r, g, b) {
		this.renderer.setBackgroundColor(r, g, b);
    }
	Stage.prototype.setPlayerBounds = function() {
		this.width = (this.bounds.xMax - this.bounds.xMin) / 20;
		this.height = (this.bounds.yMax - this.bounds.yMin) / 20;
    }
	Stage.prototype.mouseMove = function(x, y) {
		this.mousePosition = [x, y];
	}
	Stage.prototype.mouseDown = function() {
		this.mousePressed = true;
	}
	Stage.prototype.mouseUp = function() {
		this.mousePressed = false;
	}
	Stage.prototype.destroy = function() {
		this.audio.cleanup();
		this.isLoad = false;
    }
    const Loader = function(file) {
		this.swfFile = file;
		this.swfInfo = null;
		this.jpegTable = null;
		this.onload = null;
		this.onerror = null;
		this.onprogress = null;
		this.loadimgsoundCount = 0;
		this.swfparser = null;
		this.aborted = false;
    }
	Loader.prototype._stepLoadedComplete = function(callback) {
		if (this.loadimgsoundCount == 0) {
			this.complete(callback);
		}
	}
	Loader.prototype.complete = function(callback) {
		if (this.interval !== null) {
			clearInterval(this.interval);
			this.interval = null;
		}
		callback();
	}
	Loader.prototype.cancel = function() {
		if (this.swfparser) {
			this.swfparser.cancel();
			this.swfparser = null;
		}
		this.aborted = true;
	}
	Loader.prototype.loadedCC = function() {
		this.loadimgsoundCount--;
	}
	Loader.prototype.loadTags = function(tags, clip, stage) {
		var obj = [];
		var frames = [];
		for (let tagId = 0; tagId < tags.length; tagId++) {
			const tag = tags[tagId];
			switch (tag.tagType) {
				//////// frames ////////
				case "End":
					break;
				case "ShowFrame":
					frames.push(obj);
					obj = [];
					break;
				case "PlaceObject":
				case "PlaceObject2":
				case "PlaceObject3":
				case "PlaceObject4":
				case "RemoveObject":
				case "RemoveObject2":
				case "StartSound":
				case "StartSound2":
				case "DoAction":
				case "FrameLabel":
				case "SetBackgroundColor":
				case "SoundStreamHead":
				case "SoundStreamHead2":
				case "SoundStreamBlock":
					obj.push(tag);
					break;
				//////// Define ////////
				case "DefineFont":
				case "DefineFont2":
				case "DefineFont3":
					this.defineFont(tag, stage);
					break;
				case "DefineBitsLossless":
				case "DefineBitsLossless2":
					this.defineLossless(tag, stage);
					break;
				case "DefineBits":
				case "DefineBitsJpeg2":
				case "DefineBitsJpeg3":
				case "DefineBitsJpeg4":
					this.defineBits(tag, stage);
					break;
				case "DefineSound":
					this.defineSound(tag, stage);
					break;
				case "DefineVideoStream":
					this.defineVideoStream(tag, stage);
					break;
				case "DefineShape":
				case "DefineShape2":
				case "DefineShape3":
				case "DefineShape4":
					this.defineShape(tag, stage);
					break;
				case "DefineMorphShape":
				case "DefineMorphShape2":
					this.defineMorphShape(tag, stage);
					break;
				case "DefineSprite":
					this.defineSprite(tag, stage);
					break;
				case "DefineText":
				case "DefineText2":
					this.defineText(tag, stage);
					break;
				case "DefineEditText":
					this.defineEditText(tag, stage);
					break;
				case "DefineButton":
				case "DefineButton2":
					this.defineButton(tag, stage);
					break;
				case "DefineBinaryData":
					this.defineBinaryData(tag, stage);
					break;
				case "DefineFontAlignZones": 
					this.defineFontAlignZones(tag, stage);
					break;
				//////// . ////////
				case "JpegTables":
					this.jpegTable = tag.jpegtable;
					break;
			}
		}
		clip.init(frames);
		this.loadSoundStreamSprite(clip, stage);
	}
	Loader.prototype.generateDefaultTagObj = function() {
		return {
			tags: []
		}
	}
	Loader.prototype.defineFont = function(tag, stage) {
		stage.library.setCharacter(tag.id, new FontData(stage, tag));
	}
	Loader.prototype.defineBits = function(tag1, stage) {
		var rr = this.jpegTable;
		this.jpegTable = null;
		var tag = new CharacterBitmap(stage, tag1);
		tag.jpegTable = rr;
		var _this = this;
		var image = new Image();
		var JPEGData = new Uint8Array(tag.data.data);
		var bitmadA = tag.data.alphaData;
		image.onload = function() {
			if (bitmadA) {
				var width = image.width;
				var height = image.height;
				var dat = ZLib.decompress(bitmadA, (width * height), 0);
				var adata = new Uint8Array(dat);
				var canvas = document.createElement('canvas');
				canvas.width = width;
				canvas.height = height;
				var imageContext = canvas.getContext("2d");
				imageContext.drawImage(image, 0, 0, width, height);
				var imgData = imageContext.getImageData(0, 0, width, height);
				var pxData = imgData.data;
				var pxIdx = 3;
				var len = width * height;
				for (var i = 0; i < len; i++) {
					pxData[pxIdx] = adata[i];
					pxIdx += 4;
				}
				imageContext.putImageData(imgData, 0, 0);
				tag.image = canvas;
			} else {
				tag.image = image;
			}
			_this.loadedCC();
		}
		image.onerror = function() {
			_this.loadedCC();
		}
		_this.loadimgsoundCount++;
		var jpegTables = tag.jpegTable;
		if (jpegTables !== null && jpegTables.byteLength > 4) {
			var margeData = [];
			var _jpegTables = new Uint8Array(tag.jpegTable);
			var len = _jpegTables.length - 2;
			for (var idx = 0; idx < len; idx++) {
				margeData[margeData.length] = _jpegTables[idx];
			}
			len = JPEGData.length;
			for (idx = 2; idx < len; idx++) {
				margeData[margeData.length] = JPEGData[idx];
			}
			JPEGData = margeData;
		}
		image.src = "data:image/jpeg;base64," + window.btoa(_this.parseJpegData(JPEGData));
		setTimeout(function() {});
		stage.library.setCharacter(tag1.id, tag);
	}
	Loader.prototype.defineLossless = function(bitmapInfo, stage) {
		var isAlpha = (bitmapInfo.ver == 2);
		var width = bitmapInfo.width;
		var height = bitmapInfo.height;
		var format = bitmapInfo.format;
		var colorTableSize = 0;
		if (format === 3) {
			colorTableSize = bitmapInfo.numColors + 1;
		}
		if (format === 4) {
		}
		if (format === 5) {
		}
		var sizeZLib = 4;
		var dat = ZLib.decompress(bitmapInfo.data, ((width * height) * sizeZLib), 0);
		var data = new Uint8Array(dat);
		var canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		var imageContext = canvas.getContext("2d");
		var imgData = imageContext.createImageData(width, height);
		var pxData = imgData.data;
		var idx = 0;
		var pxIdx = 0;
		var x = width;
		var y = height;
		if (format === 5 && !isAlpha) {
			idx = 0;
			pxIdx = 0;
			for (y = height; y--;) {
				for (x = width; x--;) {
					idx++;
					pxData[pxIdx++] = data[idx++];
					pxData[pxIdx++] = data[idx++];
					pxData[pxIdx++] = data[idx++];
					pxData[pxIdx++] = 255;
				}
			}
		} else {
			var bpp = (isAlpha) ? 4 : 3;
			var cmIdx = colorTableSize * bpp;
			var pad = 0;
			if (colorTableSize) {
				pad = ((width + 3) & ~3) - width;
			}
			for (y = height; y--;) {
				for (x = width; x--;) {
					idx = (colorTableSize) ? data[cmIdx++] * bpp : cmIdx++ * bpp;
					if (!isAlpha) {
						pxData[pxIdx++] = data[idx++];
						pxData[pxIdx++] = data[idx++];
						pxData[pxIdx++] = data[idx++];
						idx++;
						pxData[pxIdx++] = 255;
					} else {
						var alpha = (format === 3) ? data[idx + 3] : data[idx++];
						pxData[pxIdx++] = data[idx++];
						pxData[pxIdx++] = data[idx++];
						pxData[pxIdx++] = data[idx++];
						pxData[pxIdx++] = alpha;
						if (format === 3) {
							idx++;
						}
					}
				}
				cmIdx += pad;
			}
		}
		imageContext.putImageData(imgData, 0, 0);
		var rg = new CharacterBitmap(stage, bitmapInfo);
		rg.image = canvas;
		stage.library.setCharacter(bitmapInfo.id, rg);
	}
	Loader.prototype.defineSound = function(tag, stage) {
		var sp = new SoundData(stage, tag);
		var _this = this;
		_this.loadimgsoundCount++;
		stage.audio.decodeSound(tag, function(a) {
			sp.setAudio(a);
			_this.loadedCC();
		});
		stage.library.setCharacter(tag.id, sp);
	}
	Loader.prototype.defineShape = function(tag, stage) {
		var shape = new ShapeData(stage, tag);
		stage.library.setCharacter(tag.id, shape);
	}
	Loader.prototype.defineMorphShape = function(tag, stage) {
		var shape = new MorphShapeData(stage, tag);
		stage.library.setCharacter(tag.id, shape);
	}
	Loader.prototype.defineSprite = function(tag, stage) {
		var clip = new MovieClipData(stage);
		clip.characterId = tag.id;
		this.loadTags(tag.tags, clip, stage);
		stage.library.setCharacter(tag.id, clip);
	}
	Loader.prototype.defineText = function(tag, stage) {
		stage.library.setCharacter(tag.id, new TextData(stage, tag));
	}
	Loader.prototype.defineEditText = function(tag, stage) {
		stage.library.setCharacter(tag.id, new EditTextData(stage, tag))
	}
	Loader.prototype.defineButton = function(tag, stage) {
		var r = new ButtonData(stage, tag);
		stage.library.setCharacter(tag.id, r);
	}
	Loader.prototype.defineFontAlignZones = function(tag, stage) {
		var resultFont = stage.library.getCharacter(tag.id);
		resultFont.setAlignZones(tag);
	}
	Loader.prototype.defineBinaryData = function(tag, stage) {
		stage.library.setCharacter(tag.id, new BinaryData(stage, tag));
	}
	Loader.prototype.defineVideoStream = function(tag, stage) {
		stage.library.setCharacter(tag.id, new DefineVideoData(stage, tag));
	}
	Loader.prototype.parseJpegData = function(JPEGData) {
		var i = 0;
		var idx = 0;
		var str = "";
		var length = JPEGData.length;
		if (JPEGData[0] === 0xFF && JPEGData[1] === 0xD9 && JPEGData[2] === 0xFF && JPEGData[3] === 0xD8) {
			for (i = 4; i < length; i++) {
				str += String.fromCharCode(JPEGData[i]);
			}
		} else if (JPEGData[i++] === 0xFF && JPEGData[i++] === 0xD8) {
			for (idx = 0; idx < i; idx++) {
				str += String.fromCharCode(JPEGData[idx]);
			}
			while (i < length) {
				if (JPEGData[i] === 0xFF) {
					if (JPEGData[i + 1] === 0xD9 && JPEGData[i + 2] === 0xFF && JPEGData[i + 3] === 0xD8) {
						i += 4;
						for (idx = i; idx < length; idx++) {
							str += String.fromCharCode(JPEGData[idx]);
						}
						break;
					} else if (JPEGData[i + 1] === 0xDA) {
						for (idx = i; idx < length; idx++) {
							str += String.fromCharCode(JPEGData[idx]);
						}
						break;
					} else {
						var segmentLength = (JPEGData[i + 2] << 8) + JPEGData[i + 3] + i + 2;
						for (idx = i; idx < segmentLength; idx++) {
							str += String.fromCharCode(JPEGData[idx]);
						}
						i += segmentLength - i;
					}
				}
			}
		}
		return str;
	}
	Loader.prototype.getSoundStreamHead = function(tags) {
		for (let i = 0; i < tags.length; i++) {
			const tag = tags[i];
			if (tag.tagType == "SoundStreamHead" || tag.tagType == "SoundStreamHead2") {
				return tag;
			}
		}
	}
	Loader.prototype.getSoundStreamBlock = function(tags) {
		for (let i = 0; i < tags.length; i++) {
			const tag = tags[i];
			if (tag.tagType == "SoundStreamBlock") {
				return tag;
			}
		}
	}
	Loader.prototype.loadSoundStreamSprite = function(sp, stage) {
		var frames = sp.frames;
		sp.streamSounds = [];
		var soundStreamInfo = null;
		var _soundStreamStart = false;
		var curFrame = 0;
		var blocks = [];
		for (let tagId = 0; tagId < frames.length; tagId++) {
			var tag = frames[tagId];
			var __soundStreamHead = this.getSoundStreamHead(tag);
			var __soundStreamBlock = this.getSoundStreamBlock(tag);
			if (__soundStreamHead) {
				soundStreamInfo = __soundStreamHead;
			}
			var blockStreams = __soundStreamBlock;
			if (blockStreams) {
				if (!_soundStreamStart) {
					curFrame = tagId;
				}
				_soundStreamStart = true;
				blocks.push(blockStreams.compressed);
			} else {
				if (_soundStreamStart) {
					sp.streamSounds[curFrame] = this.loadSoundStream(soundStreamInfo, blocks, stage);
					blocks = [];
					_soundStreamStart = false;
				}
			}
		}
		if (_soundStreamStart) {
			sp.streamSounds[curFrame] = this.loadSoundStream(soundStreamInfo, blocks, stage);
		}
	}
	Loader.prototype.loadSoundStream = function(streamInfo, blocks, stage) {
		var soundInfo = {
			blocks: blocks,
			streamInfo: streamInfo
		}
		var result = {};
		result.soundInfo = soundInfo;
		var _this = this;
		_this.loadimgsoundCount++;
		stage.audio.decodeSoundStream(streamInfo, blocks, function(a) {
			result.audioStream = a;
			_this.loadedCC();
		}, true);
		return result;
	}
	Loader.prototype.loadSwfMovie = function(swfInfo, swfData, calllback) {
		this.swfInfo = swfInfo;
		var _this = this;
		var stage = new Stage();
		stage.swf = swfInfo;
		stage.swfData = swfData;
		stage.version = this.swfInfo.header.version;
		stage.bounds = this.swfInfo.movieInfo.bounds;
		stage.frameRate = this.swfInfo.movieInfo.frameRate;
		stage.setPlayerBounds();
		stage.resize(1);
		var rootClip = new MovieClipData(stage);
		rootClip.isRoot = true;
		rootClip.frameCount = this.swfInfo.movieInfo.numFrames;
		_this.loadTags(this.swfInfo.tags, rootClip, stage);
		stage.rootClipTag = rootClip;
		this.interval = setInterval(function() {
			_this._stepLoadedComplete(function() {
				if (!_this.aborted) {
					stage.isLoad = true;
					calllback(stage);	
				}
			});
		}, 10);
    }
	Loader.prototype.load = function() {
		var _this = this;
		var reader = new FileReader();
		reader.onload = function(e) {
			var data = e.target.result;
			var swfparser = new SwfParser(data);
			swfparser.onprogress = function(fs) {
				if (_this.onprogress) {
					_this.onprogress(fs);
				}
			}
			swfparser.onload = function() {
				_this.swfparser = null;
				_this.loadSwfMovie(swfparser.result, data, function(stage) {
					if (_this.onload) {
						_this.onload(stage);
					}
				});
			}
			swfparser.onerror = function(e) {
				_this.cancel();
				if (_this.onerror) {
					_this.onerror(e);
				}
			}
			_this.swfparser = swfparser;
			swfparser.load();
		};
		reader.readAsArrayBuffer(this.swfFile);
    }
	const Slot = function() {
		this._listeners = [];
	}
	Slot.prototype.subscribe = function(fn) {
		this._listeners.push(fn);
	}
	Slot.prototype.emit = function() {
		for (const listener of this._listeners) {
			listener(...arguments);
		}
	}
	const ScreenCap = function () {
		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext("2d");
	}
	ScreenCap.prototype.scan = function (image, width, height) {
		this.canvas.width = width || image.width;
		this.canvas.height = height || image.height;
		this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
		return this.canvas.toDataURL();
	}
    const Player = function(options = {}) {
		this.onload = new Slot();
		this.onstartload = new Slot();
		this.oncleanup = new Slot();
		this.onerror = new Slot();
		this.onprogress = new Slot();
		this.onresume = new Slot();
		this.onpause = new Slot();
		this.onoptionschange = new Slot();
		this.scanned = new ScreenCap();
		this.stage = null;
		this.currentLoader = null;
		this.width = 0;
		this.height = 0;
		this.root = document.createElement('div');
		this.root.className = 'pinkfie-root';
		this.playerContainer = document.createElement('div');
		this.playerContainer.className = 'pinkfie-stage';
		this.root.appendChild(this.playerContainer);
		this._clickToPlay = false;
		this._viewFrame = false;
		this._o = 0;
		this.mousePoint = [0, 0];
		this.tickTime = 0;
		this.isLoad = false;
		this.loaded = 0;
		this.loadedTick = 0;
        this.canvas = document.createElement("canvas");
		this.playerContainer.appendChild(this.canvas);
		this.addMenuVerticals();
		this.addSettingVerticals();
        this.ctx = this.canvas.getContext("2d");
		this.setOptions(Object.assign(Object.assign({}, options), Player.DEFAULT_OPTIONS));
		this.handleError = this.handleError.bind(this);
		this.resize(640, 400);
		this.addEventListeners();
		setInterval(this.tick.bind(this), 10);
    }
	Player.prototype.addEventListeners = function () {
		var _this = this;
		this._onmousedown = this._onmousedown.bind(this);
		this._onmouseup = this._onmouseup.bind(this);
		this._onmousemove = this._onmousemove.bind(this);
		this._ontouchstart = this._ontouchstart.bind(this);
		this._ontouchend = this._ontouchend.bind(this);
		this._ontouchmove = this._ontouchmove.bind(this);
		document.addEventListener('mousedown', this._onmousedown);
		document.addEventListener('mouseup', this._onmouseup);
		document.addEventListener('mousemove', this._onmousemove);
		document.addEventListener('touchstart', this._ontouchstart, { passive: false });
		document.addEventListener('touchend', this._ontouchend);
		document.addEventListener('touchmove', this._ontouchmove);
		document.addEventListener('contextmenu', function(e) {
			if (e.target === _this.canvas) {
				e.preventDefault();
				_this.sendList(e);
			}
		});
	}
	Player.prototype._onmousedown = function (e) {
		if (e.target === this.canvas) {
			this.MenuVertical.style.display = 'none';
			this.updateMouseDown(e);
			e.preventDefault();
		}
	}
	Player.prototype._onmouseup = function (e) {
		this.updateMouseUp(e);
		if (e.target === this.canvas) e.preventDefault();
	}
	Player.prototype._onmousemove = function (e) {
		this.updateMouse(e);
		if (e.target === this.canvas) e.preventDefault();
	}
	Player.prototype._ontouchstart = function (e) {
		for (var i = 0; i < e.changedTouches.length; i++) {
			const t = e.changedTouches[i];
			this.updateMouseDown(t);
		}
		if (e.target === this.canvas) {
			this.MenuVertical.style.display = 'none';
			e.preventDefault();
		}
	}
	Player.prototype._ontouchend = function (e) {
		for (var i = 0; i < e.changedTouches.length; i++) {
			const t = e.changedTouches[i];
			this.updateMouseUp(t);
		}
	}
	Player.prototype._ontouchmove = function (e) {
		for (var i = 0; i < e.changedTouches.length; i++) {
			const t = e.changedTouches[i];
			this.updateMouse(t);
		}
	}
	Player.prototype.addMenuVerticals = function () {
		var _this = this;
		this.MenuVertical = document.createElement('div');
        this.MenuVertical.className = 'watcher-pinkfie-menu-vertical';
		this.movie_playPause = this._createE('Pause', function () {
			_this.toggleRunning();
			_this.MenuVertical.style.display = 'none';
		});
		this.MenuVertical.appendChild(this.movie_playPause);
        this.movie_playStop = this._createE('Stop', function () {
			_this.c_playStop();
			_this.MenuVertical.style.display = 'none';
		});
		this.MenuVertical.appendChild(this.movie_playStop);
		this.MenuVertical.appendChild(this._createE('View Stats', function () {
			_this.viewStats();
			_this.MenuVertical.style.display = 'none';
		}));
		this.MenuVertical.appendChild(this._createE('Save Screenshot', function () {
			_this.saveScreenshot();
			_this.MenuVertical.style.display = 'none';
		}));
		this.MenuVertical.appendChild(this._createE('Download SWF', function () {
			_this.downloadSwf();
			_this.MenuVertical.style.display = 'none';
		}));
		var rr = this._createE('Settings', function () {
			_this.showSetting();
			_this.MenuVertical.style.display = 'none';
		});
		this.MenuVertical.appendChild(rr);
        this.playerContainer.appendChild(this.MenuVertical);
		this.MenuVertical.style.display = 'none';
	}
	Player.prototype.addSettingVerticals = function() {
		var _this = this;
		this.settingVertical = document.createElement('div');
        this.settingVertical.className = 'watcher-pinkfie-setting';
		this.settingVertical.style = '';
		this.settingVertical.style.display = 'none';
		this.settingVertical.style.position = 'absolute';
		this.settingVertical.style.top = '0px';
		this.settingVertical.style.left = '0px';
		this.settingVertical.style.background = 'rgba(0, 0, 0, 0.6)';
		this.settingVertical.style.width = '100%';
		this.settingVertical.style.height = '100%';
		var rrj = document.createElement('div');
		rrj.style = '';
		rrj.style.overflow = 'auto';
		rrj.style.position = 'absolute';
		rrj.style.top = '50%';
		rrj.style.left = '50%';
		rrj.style.padding = '6px';
		rrj.style.transform = 'translate(-50%, -50%)';
		rrj.style.background = 'rgba(0, 0, 0, 0.6)';
		rrj.style.width = '320px';
		rrj.style.height = '200px';
		rrj.innerHTML = '<h3>Settings</h3>';
		var rrj2 = document.createElement('a');
		rrj2.href = "#";
		rrj2.onclick = function() {
			_this.settingVertical.style.display = 'none';
		};
		rrj2.style = '';
		rrj2.style.position = 'absolute';
		rrj2.style.top = '0%';
		rrj2.style.right = '0%';
		rrj2.innerHTML = "[x]";
		var rrj3 = document.createElement('label');
		rrj3.innerHTML = "volume:";
		var rrj4 = document.createElement('input');
		rrj4.type = "range";
		rrj4.value = 100;
		rrj4.max = 100;
		rrj4.min = 0;
		rrj4.addEventListener('input', function (e) {
			_this.setVolume(rrj4.value);
		});
		this._rrj4 = rrj4;
		var rrj5 = document.createElement('label');
		rrj5.innerHTML = "Base Bounds: ";
		
		var rrj6 = document.createElement('input');
		rrj6.type = "checkbox";
		rrj6.addEventListener('input', function (e) {
			_this.c_bbbb();
		});
		this._rrj6 = rrj6;
		rrj.appendChild(rrj2);
		rrj.appendChild(rrj3);
		rrj.appendChild(rrj4);
		rrj.appendChild(document.createElement('br'));
		rrj.appendChild(rrj5);
		rrj.appendChild(rrj6);
		this.settingVertical.appendChild(rrj);
        this.playerContainer.appendChild(this.settingVertical);
	}
	Player.prototype._createE = function (name, fun) {
        var MVG1 = document.createElement('div');
        MVG1.textContent = name;
        MVG1.onclick = function() {
        	fun();
        }
        MVG1.onclick = MVG1.onclick.bind(this);
        return MVG1;
	}
	Player.prototype.sendList = function (event) {
		var rect = this.playerContainer.getBoundingClientRect();
		this.MenuVertical.style = '';
		this.MenuVertical.style.position = 'absolute';
		this.MenuVertical.style.top = (event.clientY - rect.top) + 'px';
		this.MenuVertical.style.left = (event.clientX - rect.left) + 'px';
		this.MenuVertical.style.background = 'rgba(0, 0, 0, 0.5)';
		this.MenuVertical.style.height = 'auto';
		if (this.isPlayMovie()) {
			this.movie_playStop.innerHTML = "Stop";
		} else {
			this.movie_playStop.innerHTML = "Play";
		}
		if (this.hasStage() && this.stage.playing) {
			this.movie_playPause.innerHTML = "Pause";
		} else {
			this.movie_playPause.innerHTML = "Resume";
		}
	}
	Player.prototype.getSwfName = function () {
		var swf = this.stage.swf;
		return "pinkfie_" + swf.header.compression + "_" + swf.header.version + "_" + swf.header.uncompressedLength + "_fps" + swf.movieInfo.frameRate + "_frames" + swf.movieInfo.numFrames;
	}
	Player.prototype.hasStage = function () {
		return !!this.stage;
	}
	Player.prototype.getOptions = function () {
		return this.options;
	}
	Player.prototype.saveScreenshot = function () {
		if (!this.hasStage()) return;
		var _movieCanvas = this.stage.canvas;
		if (this.options.viewBounds) {
			_movieCanvas = this.stage.debugMovieCanvas;
		}
		if (!this.isLoad) return;
		var j = this.getSwfName();
		var h = this.scanned.scan(_movieCanvas);
		var a = document.createElement("a");
		a.href = h;
		a.download = j + ".png";
		a.click();
	}
	Player.prototype.downloadSwf = function () {
		if (!this.hasStage()) return;
		var j = this.getSwfName();
		var h = URL.createObjectURL(new Blob([new Uint8Array(this.stage.swfData)]));
		var a = document.createElement("a");
		a.href = h;
		a.download = j + ".swf";
		a.click();
	}
	Player.prototype.isPlayMovie = function() {
		if (!this.hasStage()) return false;
		if (this.stage.clip) {
			return this.stage.clip.isPlaying;
		}
		return false;
	}
	Player.prototype.c_playStop = function () {
		if (!this.hasStage()) return;
		if (this.stage.clip) {
			if (this.isPlayMovie()) {
				this.stopMovie();
			} else {
				this.playMovie();
			}
		}
	}
	Player.prototype.setOptions = function (changedOptions) {
		this.options = Object.assign(Object.assign({}, this.options), changedOptions);
		if (this.hasStage()) {
			this.applyOptionsToStage();
		}
		this._rrj4.value = this.options.volume;
		this._rrj6.value = this.options.viewBounds;
		this.onoptionschange.emit(changedOptions);
	}
	Player.prototype.viewStats = function () {
		if (this._viewFrame) {
			this._viewFrame = false;
		} else {
			this._viewFrame = true;
		}
	}
	Player.prototype.showSetting = function () {
		this.settingVertical.style.display = '';
	}
	Player.prototype.c_bbbb = function () {
		this.setOptions({
			viewBounds: !this.options.viewBounds
		});
	}
	Player.prototype.updateMouse = function (e) {
		if (this.stage) {
			var rect = this.canvas.getBoundingClientRect();
			var xm = e.clientX - rect.left;
			var ym = e.clientY - rect.top;
			this.mousePoint[0] = xm;
			this.mousePoint[1] = ym;
			var rc = this.getRectStage();
			var x = ((xm - rc[0]) / rc[2]);
			var y = ((ym - rc[1]) / rc[3]);
			var wx = Math.round(x * this.stage.width);
			var wy = Math.round(y * this.stage.height);
			if (((x >= 0) && (y >= 0)) && ((x < 1) && (y < 1))) {
				this.stage.mouseMove(wx, wy);
			}	
		}
	}
	Player.prototype.updateMouseDown = function (e) {
		if (this._clickToPlay && this.isLoad) {
			if (this.stage) {
				this.stage.resume();
			}
			this._clickToPlay = false;
		}
		if (this.stage) {
			this.stage.mouseDown();
		}
	}
	Player.prototype.updateMouseUp = function () {
		if (this.stage) {
			this.stage.mouseUp();
		}
	}
	Player.prototype.playMovie = function () {
		if (this.stage) {
			this.stage.clipPlay();
		}
	}
	Player.prototype.stopMovie = function () {
		if (this.stage) {
			this.stage.clipStop();
		}
	}
	Player.prototype.handleError = function(error) {
		console.log(error);
		this.onerror.emit(error);
	}
	Player.prototype.beginLoadingSWF = function() {
		this.cleanup();
	}
	Player.prototype.loadSwfFromFile = function(file) {
		this.beginLoadingSWF();
		var _this = this;
		_this.loaded = 1;
		var loader = new Loader(file);
		_this.currentLoader = loader;
		loader.onprogress = function(fs) {
			_this.loadedTick = ((fs[0] + fs[1]) / 2);
			_this.onprogress.emit(((fs[0] + fs[1]) / 2));
		}
		loader.onload = function(stage) {
			_this.currentLoader = null;
			_this.setStage(stage);
		}
		loader.onerror = function(e) {
			_this.handleError(e);
		}
		loader.load();
	}
	Player.prototype.getInfoStage = function() {
		var stage = this.stage;
		return {
			width: stage.width,
			height: stage.height
		}
	}
	Player.prototype.setStage = function(stage) {
		var _this = this;
		this.stage = stage;
		this.loaded = 2;
		stage.checkRender = function() { return !_this.options.viewBounds };
		this.applyOptionsToStage();
		this.applyResizeStage();
		this.isLoad = true;
		this.applyAutoplayPolicy(this.options.autoplayPolicy);
		this.onload.emit(stage);
	}
	Player.prototype.applyAutoplayPolicy = function(policy) {
		switch (policy) {
			case 'always': {
				this.triggerStartMovie();
				break;
			}
			case 'if-audio-playable': {
				if (!audioContext || audioContext.state === 'running') {
					this.triggerStartMovie();
				} else {
					this.showClickToPlayContainer();
				}
				break;
			}
			case 'never': {
				this.showClickToPlayContainer();
				break;
			}
		}
    }
	Player.prototype.triggerStartMovie = function() {
		this.stage.start();
		this._clickToPlay = false;
    }
	Player.prototype.showClickToPlayContainer = function() {
		this._clickToPlay = true;
    }
	Player.prototype.applyResizeStage = function() {
		if (this.stage) {
			var scaleW = this.width / this.stage.width;
			var scaleH = this.height / this.stage.height;
			var scale = Math.min(Math.abs(scaleW), Math.abs(scaleH));
			this.stage.resize(scale);
		}
    }
    Player.prototype.setWH = function(w, h) {
		this.resize(w, h);
    }
	Player.prototype.resize = function(w, h) {
		this.width = w;
		this.height = h;
		this.canvas.width = w;
		this.canvas.height = h;
		this.applyResizeStage();
		this.render();
    }
    Player.prototype.applyOptionsToStage = function() {
		if (this.stage) {
			this.stage.audio.setVolume(this.options.volume);
		}
    }
    Player.prototype.tick = function() {
		this.tickTime += 10;
		if (this.isLoad) {
			this.stage.timer.update(Date.now());
			this.stage.tick();
			if ((!this.stage.playing) && !this._clickToPlay) {
				this._o = this.tickTime + 1000;
			}
		}
		this.render();
    }
	Player.prototype.setVolume = function(val) {
		this.setOptions({volume: val});
	}
	Player.prototype.resume = function() {
		if (this.hasStage()) {
			this._clickToPlay = false;
			this.stage.resume();
		}
	}
	Player.prototype.pause = function() {
		if (this.hasStage()) {
			this.stage.pause();
		}
	}
	Player.prototype.toggleRunning = function() {
		if (this.hasStage()) {
			if (this.stage.playing) {
				this.pause();
			} else {
				this.resume();
			}
		}
	}
	Player.prototype.getRectStage = function() {
		if (this.hasStage()) {
			var _movieCanvas = this.stage.canvas;
			var w, h;
			var x = 0, y = 0;
			var __Width = this.width;
			var __Height = this.height;
			if ((__Height - (_movieCanvas.height * (__Width / _movieCanvas.width))) < 0) {
				w = (_movieCanvas.width * (__Height / _movieCanvas.height));
				h = (_movieCanvas.height * (__Height / _movieCanvas.height));
				x = (__Width - w) / 2;
			} else {
				w = (_movieCanvas.width * (__Width / _movieCanvas.width));
				h = (_movieCanvas.height * (__Width / _movieCanvas.width));
				y = (__Height - h) / 2;
			}
			return [x, y, w, h];
		} else {
			return [0, 0, 0, 0];
		}
	}

	Player.prototype.render = function() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		if (this.loaded == 1) {
			this.renderloading();
		} else {
			if (this.isLoad) {
				var _movieDebugCanvas = this.stage.debugMovieCanvas;
				var _movieCanvas = this.stage.canvas;
				var rc = this.getRectStage();
				var x = rc[0];
				var y = rc[1];
				var w = rc[2];
				var h = rc[3];
				this.ctx.globalAlpha = 1;
				this.ctx.fillStyle = "rgba(255, 255, 255, 1)";
				this.ctx.fillRect(x, y, w, h);
				this.ctx.imageSmoothingEnabled = false;
				if (this.options.viewBounds) {
					this.ctx.drawImage(_movieDebugCanvas, x, y);
				} else {
					this.ctx.drawImage(_movieCanvas, x, y);
				}
				var rrgg = (this._o > this.tickTime);
				var XG = x;
				var YG = y + (rrgg ? 25 : 0);
				if (this._viewFrame && this.stage && this.stage.clip) {
					this.ctx.font = "15px Arial";
					this.ctx.textAlign = "left";
					this.ctx.globalAlpha = 0.75;
					this.ctx.fillStyle = "#000";
					this.ctx.fillRect(XG + 3, YG + 3, 180, 54);
					this.ctx.fillStyle = "#fff";
					this.ctx.globalAlpha = 1;
					var _r = getDuraction((this.stage.clip.currentFrame / this.stage.clip.totalframes) * (this.stage.clip.totalframes / this.stage.frameRate)) + "/" + getDuraction(this.stage.clip.totalframes / this.stage.frameRate);
					var _u = this.stage.clip.currentFrame + "/" +  this.stage.clip.totalframes;
					this.ctx.fillText("Time: " + _r, XG + 8, YG + 20);
					this.ctx.fillText("Frame: " + _u, XG + 8, YG + 35);
					this.ctx.fillText("Mouse Point: " + this.stage.mousePosition, XG + 8, YG + 51);
				}
				if (rrgg && !this._clickToPlay) {
					var GSGGG = this.stage.playing ? "Play" : "Pause";
					this.ctx.font = "15px Arial";
					this.ctx.textAlign = "left";
					this.ctx.globalAlpha = 0.75;
					this.ctx.fillStyle = "#000";
					var rr = this.ctx.measureText(GSGGG);
					this.ctx.fillRect(XG + 3, y + 3, rr.width + 11, 23);
					this.ctx.fillStyle = "#fff";
					this.ctx.globalAlpha = 1;
					this.ctx.fillText(GSGGG, XG + 8, y + 20);
				}
				if (this._clickToPlay) {
					this.ctx.globalAlpha = 0.5;
					this.ctx.fillStyle = "#000";
					this.ctx.fillRect(x, y, w, h);
					this.ctx.globalAlpha = 1;
					this.ctx.fillStyle = "#fff";
					this.ctx.font = "30px Arial";
					this.ctx.textAlign = "center";
					this.ctx.fillText("Click To Play", this.width / 2, (this.height / 2));
				}
			}
		}
    }
	Player.prototype.cleanup = function() {
		this._clickToPlay = true;
		this.loaded = 0;
		this.isLoad = false;
		this.settingVertical.style.display = 'none';
		if (this.currentLoader) {
			this.currentLoader.cancel();
			this.currentLoader = null;
		}
		if (this.stage) {
			this.stage.destroy();
			this.stage = null;
		}
    }
    Player.prototype.renderloading = function() {
		var r = (this.loadedTick) * 360;
		this.ctx.save();
		this.ctx.fillStyle = "#0c0";
		this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fill();
		this.ctx.restore();
		this.renderLogo((this.canvas.width / 2), (this.canvas.height / 2) - 20);
		this.ctx.save();

		this.ctx.lineWidth = 5;
		this.ctx.lineCap = "round";

		this.ctx.beginPath();
		this.ctx.strokeStyle = "#000";
		this.ctx.arc((this.canvas.width / 2), (this.canvas.height / 2) + 50, 20, 0 * (Math.PI / 180), 360 * (Math.PI / 180));
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.strokeStyle = "#fff";
		this.ctx.arc((this.canvas.width / 2), (this.canvas.height / 2) + 50, 20, -90 * (Math.PI / 180), (r - 90) * (Math.PI / 180));
		this.ctx.stroke();

		this.ctx.restore();
		this.ctx.fillStyle = "#000";
		this.ctx.font = "10px Arial";
		this.ctx.textAlign = "center";
		this.ctx.fillText("(C) 2024, THandPEPeerTDP", this.width / 2, this.height - 5);
	}
    Player.prototype.renderLogo = function(x, y) {
		this.ctx.save();
		this.ctx.translate(x, y);
		this.ctx.scale(0.05, 0.05);
		this.ctx.lineWidth = 180;
		this.ctx.lineCap = "round";
		this.ctx.strokeStyle = "#f0f";
		this.ctx.translate(-1580, -200);
		this.ctx.beginPath();
		this.ctx.moveTo(-1061, 660);
		this.ctx.lineTo(-840,-129);
		this.ctx.moveTo(-840, -129);
		this.ctx.lineTo(-686,-680);
		this.ctx.moveTo(-686, -680);
		this.ctx.lineTo(-574,-671);
		this.ctx.moveTo(-574, -671);
		this.ctx.quadraticCurveTo(-440, -656, -332, -629);
		this.ctx.moveTo(-332, -629);
		this.ctx.quadraticCurveTo(13, -541, -31, -360);
		this.ctx.moveTo(-31, -360);
		this.ctx.quadraticCurveTo(-75, -179, -462, -136);
		this.ctx.moveTo(-462, -136);
		this.ctx.lineTo(-723,-124);
		this.ctx.moveTo(-723, -124);
		this.ctx.lineTo(-840,-129);
		this.ctx.moveTo(69, 630);
		this.ctx.lineTo(344,-650);
		this.ctx.moveTo(619, -125);
		this.ctx.lineTo(532,243);
		this.ctx.moveTo(532, 243);
		this.ctx.quadraticCurveTo(571, 161, 639, 83);
		this.ctx.moveTo(639, 83);
		this.ctx.quadraticCurveTo(773, -72, 913, -50);
		this.ctx.moveTo(913, -50);
		this.ctx.quadraticCurveTo(1084, -24, 1058, 331);
		this.ctx.moveTo(1058, 331);
		this.ctx.quadraticCurveTo(1046, 508, 999, 680);
		this.ctx.moveTo(439, 635);
		this.ctx.lineTo(532,243);
		this.ctx.moveTo(1269, 630);
		this.ctx.lineTo(1520,-650);
		this.ctx.moveTo(1720, 630);
		this.ctx.lineTo(1390, 270);
		this.ctx.lineTo(1820,-10);
		this.ctx.stroke();
		this.ctx.beginPath();
		this.ctx.translate(3061, 0);
		this.ctx.strokeStyle = "#00f";
		this.ctx.moveTo(-1070, 618);
		this.ctx.lineTo(-918,-9);
		this.ctx.moveTo(-918, -9);
		this.ctx.lineTo(-765,-637);
		this.ctx.moveTo(-765, -637);
		this.ctx.lineTo(-20,-637);
		this.ctx.moveTo(-918, -9);
		this.ctx.lineTo(-210,-37);
		this.ctx.moveTo(150, -337);
		this.ctx.lineTo(0,638);
		this.ctx.moveTo(440, 148);
		this.ctx.lineTo(1065,153);
		this.ctx.moveTo(1065, 153);
		this.ctx.quadraticCurveTo(1080, 61, 1050, -31);
		this.ctx.moveTo(1050, -31);
		this.ctx.quadraticCurveTo(989, -215, 763, -216);
		this.ctx.moveTo(763, -216);
		this.ctx.quadraticCurveTo(592, -217, 484, -118);
		this.ctx.moveTo(484, -118);
		this.ctx.quadraticCurveTo(375, -19, 360, 153);
		this.ctx.moveTo(360, 153);
		this.ctx.quadraticCurveTo(346, 316, 431, 448);
		this.ctx.moveTo(431, 448);
		this.ctx.quadraticCurveTo(501, 559, 591, 589);
		this.ctx.moveTo(591, 589);
		this.ctx.quadraticCurveTo(769, 648, 920, 559);
		this.ctx.moveTo(920, 559);
		this.ctx.quadraticCurveTo(995, 514, 1035, 458);
		this.ctx.stroke();
		this.ctx.restore();
    }
	Player.DEFAULT_OPTIONS = {
		autoplayPolicy: 'always',
		volume: 100,
		viewBounds: false
	};
    return {
        Player,
		SwfParser,
		audioContext,
		ActionParser,
		AbcParser
    }
}());