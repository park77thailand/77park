import { useState, useEffect } from "react";

/* ── Tokens ── */
const N = "#0A1929";   // navy deep
const NM = "#0F2D5E";  // navy mid
const OR = "#F97316";  // orange
const BL = "#1B6EF3";  // blue
const GR = "#22C55E";  // green
const WH = "#FFFFFF";
const BG = "#F4F6FA";
const TX = "#1A1F36";
const SB = "#64748B";
const BD = "#E2E8F0";

const parkings = [
  { id:1, name:"Park One Asoke", area:"สุขุมวิท 21, กรุงเทพฯ", dist:"300 เมตร", rating:4.8, reviews:128, daily:100, monthly:2500, open:"24 ชม.", features:["กล้องวงจรปิด","รปภ.","Wi-Fi","EV Charger"], slots:12, badge:"ใกล้สุด" },
  { id:2, name:"The Parking Hub", area:"พร้อมพงษ์, กรุงเทพฯ", dist:"450 เมตร", rating:4.7, reviews:85, daily:120, monthly:3200, open:"24 ชม.", features:["กล้องวงจรปิด","รปภ.","EV Charger"], slots:5, badge:"AI แนะนำ" },
  { id:3, name:"Secure Park Sukhumvit", area:"สุขุมวิท 24, กรุงเทพฯ", dist:"600 เมตร", rating:4.8, reviews:87, daily:130, monthly:3500, open:"06:00-24:00", features:["กล้องวงจรปิด","รปภ."], slots:8, badge:"ปลอดภัย" },
];

/* ── Helpers ── */
const Pill = ({children, color=OR, bg}) => (
  <span style={{background:bg||color+"22",color,fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20,border:`1px solid ${color}33`}}>{children}</span>
);
const Stars = ({r}) => <span style={{color:"#F59E0B",fontSize:12}}>{"★".repeat(Math.floor(r))}{"☆".repeat(5-Math.floor(r))}<span style={{color:SB,marginLeft:4,fontWeight:700,fontSize:11}}>{r}</span></span>;
const Btn = ({onClick,children,v="primary",full,style:s={}}) => {
  const vs = {
    primary:{background:OR,color:WH,border:"none",boxShadow:`0 3px 12px ${OR}44`},
    navy:{background:N,color:WH,border:"none"},
    outline:{background:"transparent",color:OR,border:`1.5px solid ${OR}`},
    ghost:{background:BG,color:TX,border:`1px solid ${BD}`},
    green:{background:GR,color:WH,border:"none"},
  };
  return <button onClick={onClick} style={{...vs[v],padding:"13px 20px",borderRadius:12,fontWeight:700,fontSize:15,cursor:"pointer",width:full?"100%":"auto",fontFamily:"inherit",transition:"all .18s",...s}}>{children}</button>;
};
const Back = ({onClick}) => (
  <button onClick={onClick} style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:TX,padding:0,fontFamily:"inherit"}}>←</button>
);
const StatusBar = ({dark}) => (
  <div style={{height:44,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px",flexShrink:0}}>
    <span style={{fontSize:13,fontWeight:700,color:dark?WH:TX}}>9:41</span>
    <span style={{fontSize:11,color:dark?WH:TX}}>●●● 📶 🔋</span>
  </div>
);
const BottomNav = ({active,go}) => {
  const tabs = [["home","🏠","หน้าหลัก"],["search","🔍","ค้นหา"],["bookings","📋","การจอง"],["fav","❤️","โปรด"],["profile","👤","บัญชี"]];
  return (
    <div style={{display:"flex",borderTop:`1px solid ${BD}`,background:WH,flexShrink:0}}>
      {tabs.map(([k,ic,lb])=>(
        <button key={k} onClick={()=>go(k)} style={{flex:1,padding:"8px 0 4px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,color:active===k?OR:SB,fontSize:9,fontWeight:active===k?700:400,fontFamily:"inherit"}}>
          <span style={{fontSize:20}}>{ic}</span>{lb}
        </button>
      ))}
    </div>
  );
};

/* ── Screen 1: Splash ── */
const Splash = ({go}) => (
  <div style={{flex:1,background:`linear-gradient(160deg,${N} 0%,${NM} 100%)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",padding:"48px 28px 40px",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",width:300,height:300,borderRadius:"50%",background:"rgba(249,115,22,.06)",top:-80,right:-80}}/>
    <div style={{position:"absolute",width:200,height:200,borderRadius:"50%",background:"rgba(27,110,243,.06)",bottom:100,left:-60}}/>
    <div style={{textAlign:"center",zIndex:1}}>
      <div style={{marginBottom:8}}>
        <span style={{fontSize:52,fontWeight:900,color:OR}}>77</span>
        <span style={{fontSize:52,fontWeight:900,color:WH}}>park</span>
      </div>
      <div style={{fontSize:14,color:"rgba(255,255,255,.6)",lineHeight:1.7}}>ที่จอดรถทั่วไทย ค้นหาง่าย<br/>จองได้ทันที ปลอดภัยทุกการเดินทาง</div>
    </div>
    <div style={{zIndex:1,width:"100%"}}>
      {[["📍","ค้นหาที่จอดใกล้คุณ","ระบบ AI ช่วยค้นหาพื้นที่จอดรถที่เหมาะสม"],["🛡️","ปลอดภัย มั่นใจได้","ตรวจสอบข้อมูลสถานที่จอดและรีวิวจากผู้ใช้งานจริง"],["🅿️","จองล่วงหน้า ไม่ต้องวนหา","ล็อกที่จอดก่อนเดินทาง ประหยัดเวลา"]].map(([ic,t,d])=>(
        <div key={t} style={{display:"flex",gap:14,marginBottom:20,alignItems:"flex-start"}}>
          <div style={{width:42,height:42,borderRadius:12,background:"rgba(249,115,22,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{ic}</div>
          <div><div style={{fontWeight:700,color:WH,fontSize:14}}>{t}</div><div style={{color:"rgba(255,255,255,.55)",fontSize:12,marginTop:2,lineHeight:1.5}}>{d}</div></div>
        </div>
      ))}
      <Btn full onClick={()=>go("login")} style={{marginTop:8,padding:"15px",fontSize:16}}>เริ่มต้นใช้งาน</Btn>
    </div>
  </div>
);

/* ── Screen 2: Login ── */
const Login = ({go}) => (
  <div style={{flex:1,overflowY:"auto",background:WH}}>
    <StatusBar/>
    <div style={{padding:"8px 28px 40px"}}>
      <div style={{textAlign:"center",marginBottom:32}}>
        <div style={{fontSize:36,fontWeight:900,marginBottom:4}}><span style={{color:OR}}>77</span><span style={{color:N}}>park</span></div>
        <div style={{fontSize:22,fontWeight:800,color:TX}}>เข้าสู่ระบบ</div>
        <div style={{fontSize:13,color:SB,marginTop:4}}>เข้าสู่ระบบเพื่อค้นหาและจองที่จอดรถ</div>
      </div>
      {[["เบอร์โทรศัพท์","เช่น 081 234 5678","tel"],["รหัสผ่าน","••••••••","password"]].map(([lb,ph,tp])=>(
        <div key={lb} style={{marginBottom:16}}>
          <label style={{fontSize:13,fontWeight:700,color:TX,display:"block",marginBottom:6}}>{lb}</label>
          <input type={tp} placeholder={ph} style={{width:"100%",padding:"12px 14px",borderRadius:10,border:`1.5px solid ${BD}`,fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/>
        </div>
      ))}
      <div style={{textAlign:"right",marginBottom:20}}><span style={{color:OR,fontSize:13,fontWeight:600,cursor:"pointer"}}>ลืมรหัสผ่าน?</span></div>
      <Btn full onClick={()=>go("home")}>เข้าสู่ระบบ</Btn>
      <div style={{textAlign:"center",color:SB,fontSize:13,margin:"20px 0"}}>หรือ</div>
      {[["🇬","เข้าสู่ระบบด้วย Google"],["🍎","เข้าสู่ระบบด้วย Apple"]].map(([ic,lb])=>(
        <button key={lb} onClick={()=>go("home")} style={{width:"100%",padding:"12px",borderRadius:10,border:`1.5px solid ${BD}`,background:WH,fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:10,fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
          <span style={{fontSize:18}}>{ic}</span>{lb}
        </button>
      ))}
      <div style={{textAlign:"center",marginTop:20,fontSize:13,color:SB}}>
        ยังไม่มีบัญชี? <span onClick={()=>go("register")} style={{color:OR,fontWeight:700,cursor:"pointer"}}>สมัครสมาชิก</span>
      </div>
    </div>
  </div>
);

/* ── Screen 3: Register ── */
const Register = ({go}) => (
  <div style={{flex:1,overflowY:"auto",background:WH}}>
    <StatusBar/>
    <div style={{padding:"8px 28px 40px"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
        <Back onClick={()=>go("login")}/>
        <div style={{fontSize:20,fontWeight:800,color:TX}}>สร้างบัญชีใหม่</div>
      </div>
      {[["ชื่อ-นามสกุล","กรอกชื่อ-นามสกุล","text"],["เบอร์โทรศัพท์","เช่น 081 234 5678","tel"],["อีเมล","กรอกอีเมล","email"],["รหัสผ่าน","อย่างน้อย 6 ตัว","password"],["ยืนยันรหัสผ่าน","กรอกรหัสผ่านอีกครั้ง","password"]].map(([lb,ph,tp])=>(
        <div key={lb} style={{marginBottom:14}}>
          <label style={{fontSize:13,fontWeight:700,color:TX,display:"block",marginBottom:5}}>{lb}</label>
          <input type={tp} placeholder={ph} style={{width:"100%",padding:"12px 14px",borderRadius:10,border:`1.5px solid ${BD}`,fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/>
        </div>
      ))}
      <div style={{display:"flex",gap:10,alignItems:"flex-start",margin:"10px 0 20px",padding:"12px",background:BG,borderRadius:10}}>
        <input type="checkbox" defaultChecked style={{marginTop:3,accentColor:OR}}/>
        <span style={{fontSize:12,color:SB,lineHeight:1.6}}>ยอมรับ <span style={{color:OR,fontWeight:600}}>ข้อกำหนดการใช้งาน</span> และ <span style={{color:OR,fontWeight:600}}>นโยบายความเป็นส่วนตัว</span></span>
      </div>
      <Btn full onClick={()=>go("home")}>สมัครสมาชิก</Btn>
    </div>
  </div>
);

/* ── Screen 4: Home ── */
const Home = ({go,setParking}) => (
  <div style={{flex:1,overflowY:"auto",background:BG}}>
    <div style={{background:`linear-gradient(135deg,${N},${NM})`,padding:"0 20px 24px"}}>
      <StatusBar dark/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div>
          <div style={{fontSize:13,color:"rgba(255,255,255,.6)"}}>สวัสดีครับ 👋</div>
          <div style={{fontSize:20,fontWeight:800,color:WH}}>คุณวัง</div>
        </div>
        <div style={{width:40,height:40,borderRadius:"50%",background:OR,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>👤</div>
      </div>
      <div style={{position:"relative"}}>
        <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:16}}>🔍</span>
        <input onClick={()=>go("search")} placeholder="ค้นหาที่จอดรถใกล้คุณ" readOnly style={{width:"100%",padding:"12px 14px 12px 42px",borderRadius:12,border:"none",fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box",cursor:"pointer"}}/>
      </div>
    </div>
    <div style={{padding:"16px 16px 0"}}>
      {/* AI Banner */}
      <div style={{background:`linear-gradient(135deg,${NM},#1A3A6B)`,borderRadius:16,padding:16,marginBottom:16,display:"flex",gap:12,alignItems:"center"}}>
        <div style={{width:50,height:50,borderRadius:12,background:"rgba(249,115,22,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>🤖</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:800,color:WH,fontSize:14}}>AI Parking Assistant</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.6)",margin:"3px 0 8px"}}>ให้ AI ช่วยหาที่จอดรถที่ใกล้ที่สุด ราคาดีที่สุด</div>
          <button onClick={()=>go("search")} style={{background:OR,color:WH,border:"none",borderRadius:8,padding:"6px 14px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>ค้นหาด้วย AI</button>
        </div>
      </div>
      {/* Quick Menu */}
      <div style={{display:"flex",justifyContent:"space-around",marginBottom:20}}>
        {[["📍","ใกล้ฉัน","search"],["🗺️","แผนที่","search"],["📅","การจอง","bookings"],["❤️","รายการโปรด","fav"]].map(([ic,lb,sc])=>(
          <button key={lb} onClick={()=>go(sc)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit"}}>
            <div style={{width:52,height:52,borderRadius:16,background:WH,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>{ic}</div>
            <span style={{fontSize:11,color:SB,fontWeight:600}}>{lb}</span>
          </button>
        ))}
      </div>
      {/* Recommended */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={{fontWeight:800,fontSize:16,color:TX}}>แนะนำสำหรับคุณ</div>
        <span style={{fontSize:13,color:OR,fontWeight:600,cursor:"pointer"}}>ดูทั้งหมด</span>
      </div>
      {parkings.map(p=>(
        <div key={p.id} onClick={()=>{setParking(p.id);go("detail")}} style={{background:WH,borderRadius:16,marginBottom:12,boxShadow:"0 2px 10px rgba(0,0,0,.06)",border:`1px solid ${BD}`,cursor:"pointer",overflow:"hidden"}}>
          <div style={{height:100,background:`linear-gradient(135deg,${N},${NM})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,position:"relative"}}>
            🅿️
            <div style={{position:"absolute",top:8,left:8,background:OR,color:WH,fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20}}>{p.badge}</div>
          </div>
          <div style={{padding:"12px 14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div><div style={{fontWeight:700,fontSize:15,color:TX}}>{p.name}</div><div style={{fontSize:12,color:SB,margin:"2px 0 4px"}}>📍 {p.area}</div><Stars r={p.rating}/><span style={{fontSize:11,color:SB,marginLeft:4}}>({p.reviews})</span></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:18,fontWeight:800,color:OR}}>฿{p.daily}</div><div style={{fontSize:11,color:SB}}>/วัน</div></div>
            </div>
          </div>
        </div>
      ))}
      <div style={{height:16}}/>
    </div>
  </div>
);

/* ── Screen 5: Search ── */
const Search = ({go,setParking}) => {
  const [q,setQ] = useState("อโศก");
  const [tab,setTab] = useState("list");
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}>
      <div style={{background:WH,padding:"0 16px 12px",borderBottom:`1px solid ${BD}`}}>
        <StatusBar/>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}>
          <Back onClick={()=>go("home")}/>
          <div style={{flex:1,position:"relative"}}>
            <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:15}}>🔍</span>
            <input value={q} onChange={e=>setQ(e.target.value)} style={{width:"100%",padding:"10px 10px 10px 36px",borderRadius:10,border:`1.5px solid ${OR}`,fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box",color:TX}}/>
          </div>
          <button onClick={()=>setTab(tab==="list"?"map":"list")} style={{background:tab==="map"?OR:BG,border:`1px solid ${tab==="map"?OR:BD}`,borderRadius:10,padding:"9px 12px",cursor:"pointer",color:tab==="map"?WH:SB,fontSize:13,fontWeight:600,fontFamily:"inherit",whiteSpace:"nowrap"}}>
            {tab==="list"?"🗺️ แผนที่":"📋 รายการ"}
          </button>
        </div>
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:2}}>
          {[["ราคา","💰"],["ระยะทาง","📍"],["รายวัน","📅"],["รายเดือน","🗓️"]].map(([lb,ic])=>(
            <button key={lb} style={{padding:"7px 14px",borderRadius:20,border:`1.5px solid ${BD}`,background:WH,color:SB,fontSize:12,fontWeight:600,whiteSpace:"nowrap",cursor:"pointer",fontFamily:"inherit",display:"flex",gap:4,alignItems:"center"}}>
              {ic} {lb}
            </button>
          ))}
        </div>
      </div>
      {/* Map view */}
      {tab==="map" && (
        <div style={{height:200,background:`linear-gradient(135deg,${NM},${BL})`,position:"relative",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
          {[...Array(5)].map((_,i)=><div key={i} style={{position:"absolute",background:"rgba(255,255,255,.1)",height:1,width:"100%",top:`${i*25}%`}}/>)}
          {parkings.map((p,i)=>(
            <div key={p.id} onClick={()=>{setParking(p.id);go("detail")}} style={{position:"absolute",left:`${20+i*28}%`,top:`${30+i*15}%`,background:i===0?OR:WH,color:i===0?WH:N,fontSize:11,fontWeight:800,padding:"4px 10px",borderRadius:20,cursor:"pointer",boxShadow:"0 2px 10px rgba(0,0,0,.3)",border:`2px solid ${i===0?WH:OR}`}}>฿{p.daily}</div>
          ))}
          <span style={{color:"rgba(255,255,255,.3)",fontSize:12}}>แผนที่ · {q||"กรุงเทพ"}</span>
        </div>
      )}
      <div style={{padding:"10px 16px 0",background:BG,fontSize:13,color:SB}}>พบ <strong style={{color:TX}}>{parkings.length}</strong> แห่ง ใกล้ {q||"กรุงเทพ"}</div>
      <div style={{padding:"8px 16px",background:BG,flex:1}}>
        {parkings.map(p=>(
          <div key={p.id} onClick={()=>{setParking(p.id);go("detail")}} style={{background:WH,borderRadius:16,marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,.05)",border:`1px solid ${BD}`,cursor:"pointer",overflow:"hidden"}}>
            <div style={{display:"flex",padding:14,gap:12}}>
              <div style={{width:88,height:76,borderRadius:12,background:`linear-gradient(135deg,${N},${NM})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>🅿️</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:14,color:TX}}>{p.name}</div>
                    <div style={{fontSize:12,color:SB,margin:"2px 0 4px"}}>📍 {p.dist} จากคุณ</div>
                    <Stars r={p.rating}/><span style={{fontSize:11,color:SB,marginLeft:4}}>({p.reviews})</span>
                  </div>
                  <div style={{textAlign:"right"}}><div style={{fontSize:17,fontWeight:800,color:OR}}>฿{p.daily}</div><div style={{fontSize:11,color:SB}}>/วัน</div></div>
                </div>
                <div style={{display:"flex",gap:6,marginTop:8}}>
                  <Pill color={BL}>📍 {p.dist}</Pill>
                  <Pill color={p.slots<6?"#EF4444":GR}>🚗 {p.slots} ที่ว่าง</Pill>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div style={{height:16}}/>
      </div>
    </div>
  );
};

/* ── Screen 6: Detail ── */
const Detail = ({go,parkingId,setParking}) => {
  const p = parkings.find(x=>x.id===parkingId)||parkings[0];
  const [loved,setLoved] = useState(false);
  return (
    <div style={{flex:1,overflowY:"auto"}}>
      <div style={{height:220,background:`linear-gradient(160deg,${N},${BL})`,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",fontSize:60}}>
        🅿️
        <div style={{position:"absolute",top:48,left:16,right:16,display:"flex",justifyContent:"space-between"}}>
          <button onClick={()=>go("search")} style={{background:"rgba(255,255,255,.2)",border:"none",borderRadius:10,padding:"8px 12px",cursor:"pointer",color:WH,fontSize:18}}>←</button>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setLoved(!loved)} style={{background:"rgba(255,255,255,.2)",border:"none",borderRadius:10,padding:"8px 12px",cursor:"pointer",fontSize:18}}>{loved?"❤️":"🤍"}</button>
          </div>
        </div>
        <div style={{position:"absolute",bottom:12,display:"flex",gap:6}}>
          {[0,1,2].map(i=><div key={i} style={{width:i===0?20:6,height:6,borderRadius:3,background:i===0?WH:"rgba(255,255,255,.4)"}}/>)}
        </div>
        <div style={{position:"absolute",top:52,right:56,background:"rgba(0,0,0,.5)",color:WH,fontSize:11,padding:"3px 8px",borderRadius:20}}>1/8</div>
      </div>
      <div style={{padding:16,background:BG}}>
        <div style={{background:WH,borderRadius:16,padding:16,marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:18,color:TX}}>{p.name}</div>
              <div style={{fontSize:13,color:SB,margin:"4px 0 6px"}}>📍 {p.area}</div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}><Stars r={p.rating}/><span style={{fontSize:12,color:SB}}>({p.reviews} รีวิว)</span><span onClick={()=>go("reviews")} style={{fontSize:12,color:OR,cursor:"pointer"}}>ดูรีวิวทั้งหมด ›</span></div>
            </div>
            <div style={{textAlign:"right"}}><div style={{fontSize:24,fontWeight:900,color:OR}}>฿{p.daily}</div><div style={{fontSize:12,color:SB}}>/วัน</div></div>
          </div>
          <div style={{display:"flex",gap:8,marginTop:10}}>
            <Pill color={GR}>✓ {p.open}</Pill>
            <Pill color={BL}>🅿 {p.slots} ที่ว่าง</Pill>
          </div>
        </div>
        {/* Features */}
        <div style={{background:WH,borderRadius:16,padding:16,marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
          <div style={{fontWeight:700,fontSize:14,color:TX,marginBottom:12}}>สิ่งอำนวยความสะดวก</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {p.features.map(f=>(
              <div key={f} style={{display:"flex",gap:6,alignItems:"center",background:BG,borderRadius:8,padding:"6px 10px",fontSize:12,color:TX,fontWeight:600}}>
                <span style={{color:GR}}>✓</span>{f}
              </div>
            ))}
          </div>
        </div>
        {/* Price */}
        <div style={{background:WH,borderRadius:16,padding:16,marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
          <div style={{fontWeight:700,fontSize:14,color:TX,marginBottom:10}}>ราคา</div>
          <div style={{display:"flex",gap:10}}>
            {[["รายวัน",`฿${p.daily}`,"วัน"],["รายเดือน",`฿${p.monthly.toLocaleString()}`,"เดือน"]].map(([lb,pr,pd])=>(
              <div key={lb} style={{flex:1,background:BG,borderRadius:10,padding:"12px",textAlign:"center"}}>
                <div style={{fontSize:11,color:SB,fontWeight:600}}>{lb}</div>
                <div style={{fontSize:20,fontWeight:800,color:OR}}>{pr}</div>
                <div style={{fontSize:11,color:SB}}>/{pd}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Mini map */}
        <div style={{height:100,background:`linear-gradient(135deg,${NM},${BL})`,borderRadius:16,marginBottom:80,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
          <div style={{background:OR,color:WH,fontSize:12,fontWeight:700,padding:"6px 14px",borderRadius:20}}>📍 {p.name}</div>
        </div>
      </div>
      <div style={{position:"sticky",bottom:0,background:WH,padding:"12px 16px",borderTop:`1px solid ${BD}`,display:"flex",gap:10}}>
        <Btn v="ghost" onClick={()=>go("search")} style={{flex:1,padding:"12px"}}>🗺️ นำทาง</Btn>
        <Btn onClick={()=>go("date")} style={{flex:2,padding:"12px"}}>จองที่จอด</Btn>
      </div>
    </div>
  );
};

/* ── Screen 7: Date ── */
const DatePick = ({go,parkingId}) => {
  const p = parkings.find(x=>x.id===parkingId)||parkings[0];
  const [selDay,setSelDay] = useState(23);
  const [inT,setInT] = useState("10:00");
  const [outT,setOutT] = useState("18:00");
  const hrs = ()=>{const [h1,m1]=inT.split(":").map(Number),[h2,m2]=outT.split(":").map(Number);return Math.max(1,Math.round((h2*60+m2-h1*60-m1)/60));};
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column"}}>
      <div style={{background:WH,padding:"0 16px 12px",borderBottom:`1px solid ${BD}`}}>
        <StatusBar/>
        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          <Back onClick={()=>go("detail")}/>
          <div style={{fontWeight:700,fontSize:16,color:TX}}>เลือกวันและเวลา</div>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:16,background:BG}}>
        {/* Spot mini card */}
        <div style={{background:WH,borderRadius:14,padding:14,marginBottom:14,display:"flex",gap:10,alignItems:"center",boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
          <div style={{width:52,height:46,borderRadius:10,background:`linear-gradient(135deg,${N},${BL})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🅿️</div>
          <div><div style={{fontWeight:700,fontSize:14,color:TX}}>{p.name}</div><div style={{fontSize:12,color:SB}}>📍 {p.area}</div></div>
        </div>
        {/* Calendar */}
        <div style={{background:WH,borderRadius:16,padding:16,marginBottom:14,boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <button style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:SB}}>‹</button>
            <div style={{fontWeight:700,fontSize:14,color:TX,color:OR}}>กรกฎาคม 2026</div>
            <button style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:OR}}>›</button>
          </div>
          <div style={{display:"flex",justifyContent:"space-around",marginBottom:6}}>
            {["อา","จ","อ","พ","พฤ","ศ","ส"].map(d=><div key={d} style={{width:36,textAlign:"center",fontSize:11,color:SB,fontWeight:600}}>{d}</div>)}
          </div>
          <div style={{display:"flex",justifyContent:"space-around"}}>
            {[21,22,23,24,25,26,27].map(d=>(
              <button key={d} onClick={()=>setSelDay(d)} style={{width:36,height:36,borderRadius:"50%",border:"none",cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit",background:selDay===d?OR:"transparent",color:selDay===d?WH:TX,transition:"all .2s"}}>{d}</button>
            ))}
          </div>
        </div>
        {/* Time */}
        <div style={{background:WH,borderRadius:16,padding:16,marginBottom:14,boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
          <div style={{display:"flex",gap:14}}>
            {[["เวลาเข้า",inT,setInT],["เวลาออก",outT,setOutT]].map(([lb,v,sv])=>(
              <div key={lb} style={{flex:1}}>
                <div style={{fontSize:12,color:SB,fontWeight:600,marginBottom:6}}>{lb}</div>
                <input type="time" value={v} onChange={e=>sv(e.target.value)} style={{width:"100%",padding:"11px",borderRadius:10,border:`1.5px solid ${BD}`,fontSize:16,fontWeight:700,color:TX,fontFamily:"inherit",outline:"none",boxSizing:"border-box",textAlign:"center"}}/>
              </div>
            ))}
          </div>
          <div style={{marginTop:12,padding:"10px 14px",background:`${OR}15`,borderRadius:10,fontSize:13,color:OR,fontWeight:700,textAlign:"center"}}>
            ⏱️ รวมระยะเวลาจอด {hrs()} ชั่วโมง
          </div>
        </div>
        {/* Summary */}
        <div style={{background:WH,borderRadius:16,padding:16,marginBottom:14,boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
          <div style={{fontWeight:700,fontSize:14,color:TX,marginBottom:10}}>สรุปการจอง</div>
          {[[`฿${p.daily} × 1 วัน`,`฿${p.daily}`],["ค่าธรรมเนียม 15%",`฿${Math.round(p.daily*.15)}`]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontSize:13,color:SB}}>{k}</span><span style={{fontSize:13,color:TX,fontWeight:600}}>{v}</span></div>
          ))}
          <div style={{height:1,background:BD,margin:"10px 0"}}/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontWeight:700,color:TX}}>รวมทั้งหมด</span><span style={{fontWeight:800,fontSize:20,color:OR}}>฿{p.daily+Math.round(p.daily*.15)}</span></div>
        </div>
      </div>
      <div style={{background:WH,padding:"12px 16px",borderTop:`1px solid ${BD}`}}>
        <Btn full onClick={()=>go("summary")}>ดำเนินการต่อ</Btn>
      </div>
    </div>
  );
};

/* ── Screen 8: Summary ── */
const Summary = ({go,parkingId}) => {
  const p = parkings.find(x=>x.id===parkingId)||parkings[0];
  const fee = Math.round(p.daily*.15);
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column"}}>
      <div style={{background:WH,padding:"0 16px 12px",borderBottom:`1px solid ${BD}`}}>
        <StatusBar/>
        <div style={{display:"flex",gap:12,alignItems:"center"}}><Back onClick={()=>go("date")}/><div style={{fontWeight:700,fontSize:16,color:TX}}>ยืนยันการจอง</div></div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:16,background:BG}}>
        <div style={{background:WH,borderRadius:16,padding:16,marginBottom:14,boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
          <div style={{display:"flex",gap:12,marginBottom:14,paddingBottom:14,borderBottom:`1px solid ${BD}`}}>
            <div style={{width:64,height:56,borderRadius:12,background:`linear-gradient(135deg,${N},${BL})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>🅿️</div>
            <div><div style={{fontWeight:700,fontSize:14,color:TX}}>{p.name}</div><div style={{fontSize:12,color:SB,margin:"2px 0"}}>📍 {p.area}</div><div style={{fontSize:12,color:SB}}>300 เมตร จากคุณ</div></div>
          </div>
          {[["วันที่","23 กรกฎาคม 2026"],["วันเวลา","10:00 - 18:00 (8 ชม.)"],["ประเภท","รถยนต์ทั่วไป"]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><span style={{fontSize:13,color:SB}}>{k}</span><span style={{fontSize:13,fontWeight:600,color:TX}}>{v}</span></div>
          ))}
        </div>
        <div style={{background:WH,borderRadius:16,padding:16,marginBottom:14,boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
          <div style={{fontWeight:700,fontSize:14,color:TX,marginBottom:10}}>ราคา</div>
          {[[`ค่าบริการ (8 ชม.)`,`฿${p.daily}`],["ค่าธรรมเนียมแพลตฟอร์ม",`฿${fee}`]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontSize:13,color:SB}}>{k}</span><span style={{fontSize:13,color:TX,fontWeight:600}}>{v}</span></div>
          ))}
          <div style={{height:1,background:BD,margin:"10px 0"}}/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontWeight:800,fontSize:15,color:TX}}>รวมทั้งหมด</span><span style={{fontWeight:900,fontSize:22,color:OR}}>฿{p.daily+fee}</span></div>
        </div>
        {/* Promo */}
        <div style={{background:WH,borderRadius:16,padding:14,marginBottom:14,display:"flex",gap:12,alignItems:"center",boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
          <span style={{fontSize:24}}>🎫</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:TX}}>มีโค้ดส่วนลด?</div><div style={{fontSize:12,color:SB}}>ใส่โค้ดเพื่อรับส่วนลด</div></div>
          <span style={{color:OR,fontWeight:700,fontSize:13,cursor:"pointer"}}>ใส่โค้ด ›</span>
        </div>
      </div>
      <div style={{background:WH,padding:"12px 16px",borderTop:`1px solid ${BD}`}}>
        <Btn full onClick={()=>go("payment")}>ชำระเงิน</Btn>
      </div>
    </div>
  );
};

/* ── Screen 9: Payment ── */
const Payment = ({go,parkingId}) => {
  const p = parkings.find(x=>x.id===parkingId)||parkings[0];
  const total = p.daily + Math.round(p.daily*.15);
  const [sel,setSel] = useState("promptpay");
  const methods = [
    {id:"card",ic:"💳",lb:"บัตรเครดิต / เดบิต",sub:"Visa, Mastercard, JCB"},
    {id:"bank",ic:"🏦",lb:"Mobile Banking",sub:"ทุกธนาคาร"},
    {id:"promptpay",ic:"📱",lb:"PromptPay",sub:"โอนผ่าน QR Code"},
    {id:"true",ic:"🟢",lb:"TrueMoney Wallet",sub:""},
    {id:"line",ic:"🟩",lb:"LINE Pay",sub:""},
    {id:"shopee",ic:"🛒",lb:"ShopeePay",sub:""},
  ];
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column"}}>
      <div style={{background:WH,padding:"0 16px 12px",borderBottom:`1px solid ${BD}`}}>
        <StatusBar/>
        <div style={{display:"flex",gap:12,alignItems:"center"}}><Back onClick={()=>go("summary")}/><div style={{fontWeight:700,fontSize:16,color:TX}}>การชำระเงิน</div></div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:16,background:BG}}>
        <div style={{background:`${OR}15`,borderRadius:14,padding:"14px 16px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:14,color:TX,fontWeight:700}}>ยอดที่ต้องชำระ</div>
          <div style={{fontSize:24,fontWeight:900,color:OR}}>฿{total}</div>
        </div>
        <div style={{fontWeight:700,fontSize:14,color:TX,marginBottom:10}}>เลือกช่องทางชำระเงิน</div>
        {methods.map(m=>(
          <div key={m.id} onClick={()=>setSel(m.id)} style={{background:WH,borderRadius:14,padding:"13px 14px",marginBottom:10,display:"flex",alignItems:"center",gap:12,cursor:"pointer",border:`2px solid ${sel===m.id?OR:BD}`,transition:"all .2s",boxShadow:sel===m.id?"0 2px 10px rgba(249,115,22,.15)":"none"}}>
            <span style={{fontSize:26}}>{m.ic}</span>
            <div style={{flex:1}}><div style={{fontWeight:600,fontSize:14,color:TX}}>{m.lb}</div>{m.sub&&<div style={{fontSize:12,color:SB}}>{m.sub}</div>}</div>
            <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${sel===m.id?OR:BD}`,background:sel===m.id?OR:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
              {sel===m.id&&<div style={{width:6,height:6,borderRadius:"50%",background:WH}}/>}
            </div>
          </div>
        ))}
        <div style={{textAlign:"center",marginTop:8,fontSize:12,color:SB}}>🔒 ชำระเงินปลอดภัย SSL 256-bit</div>
      </div>
      <div style={{background:WH,padding:"12px 16px",borderTop:`1px solid ${BD}`}}>
        <Btn full onClick={()=>go("success")}>ชำระเงิน ฿{total}</Btn>
      </div>
    </div>
  );
};

/* ── Screen 10: Success ── */
const Success = ({go,parkingId}) => {
  const p = parkings.find(x=>x.id===parkingId)||parkings[0];
  const total = p.daily + Math.round(p.daily*.15);
  return (
    <div style={{flex:1,overflowY:"auto",background:WH}}>
      <StatusBar/>
      <div style={{padding:"20px 24px",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
        <div style={{width:88,height:88,borderRadius:"50%",background:GR,display:"flex",alignItems:"center",justifyContent:"center",fontSize:44,marginBottom:16,boxShadow:`0 8px 32px ${GR}44`}}>✓</div>
        <div style={{fontWeight:900,fontSize:26,color:TX,marginBottom:4}}>จองสำเร็จ!</div>
        <div style={{fontSize:14,color:SB,marginBottom:20}}>หมายเลขการจอง</div>
        <div style={{background:BG,border:`1.5px dashed ${OR}`,borderRadius:12,padding:"10px 28px",marginBottom:24}}>
          <div style={{fontFamily:"monospace",fontSize:20,fontWeight:800,color:OR,letterSpacing:3}}>BK240523-0001</div>
        </div>
        <div style={{background:WH,border:`1px solid ${BD}`,borderRadius:20,padding:20,width:"100%",marginBottom:20,boxShadow:"0 4px 16px rgba(0,0,0,.07)"}}>
          <div style={{display:"flex",gap:12,paddingBottom:14,borderBottom:`1px solid ${BD}`,marginBottom:14}}>
            <div style={{width:56,height:50,borderRadius:10,background:`linear-gradient(135deg,${N},${BL})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🅿️</div>
            <div style={{textAlign:"left"}}><div style={{fontWeight:700,fontSize:14,color:TX}}>{p.name}</div><div style={{fontSize:12,color:SB}}>📍 {p.area}</div></div>
          </div>
          {[["วันที่","23 กรกฎาคม 2026"],["เวลา","10:00 - 18:00"],["ราคารวม",`฿${total}`]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
              <span style={{fontSize:13,color:SB}}>{k}</span>
              <span style={{fontSize:13,fontWeight:700,color:k==="ราคารวม"?OR:TX}}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:10,width:"100%",marginBottom:10}}>
          <Btn v="ghost" onClick={()=>go("bookings")} style={{flex:1,padding:"12px",fontSize:13}}>ดูรายละเอียดการจอง</Btn>
        </div>
        <Btn full onClick={()=>go("mybooking")} style={{padding:"12px"}}>ไปที่การจองของฉัน</Btn>
      </div>
    </div>
  );
};

/* ── Screen 11: My Bookings ── */
const MyBookings = ({go}) => {
  const [tab,setTab] = useState("upcoming");
  const bks = [
    {name:"Park One Asoke",area:"สุขุมวิท 21, กรุงเทพฯ",date:"23 ก.ค. 2026",time:"10:00 - 18:00",price:115,status:"confirmed",code:"BK240523-0001"},
    {name:"The Parking Hub",area:"พร้อมพงษ์, กรุงเทพฯ",date:"25 พ.ค. 2024",time:"09:00 - 17:00",price:135,status:"completed",code:"BK240523-0002"},
    {name:"Secure Park Sukhumvit",area:"สุขุมวิท 24, กรุงเทพฯ",date:"20 พ.ค. 2024",time:"10:00 - 18:00",price:115,status:"completed",code:"BK240520-0001"},
  ];
  const statusMap = {confirmed:{lb:"ยืนยันแล้ว",color:GR},completed:{lb:"เสร็จสิ้น",color:SB},cancelled:{lb:"ยกเลิก",color:"#EF4444"}};
  const filtered = tab==="upcoming"?bks.filter(b=>b.status==="confirmed"):bks.filter(b=>b.status!=="confirmed");
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column"}}>
      <div style={{background:WH,padding:"0 16px 12px",borderBottom:`1px solid ${BD}`}}>
        <StatusBar/>
        <div style={{fontWeight:800,fontSize:18,color:TX,marginBottom:12}}>การจองของฉัน</div>
        <div style={{display:"flex",gap:4,background:BG,borderRadius:10,padding:4}}>
          {[["upcoming","กำลังมาถึง"],["history","ประวัติ"],["cancelled","ยกเลิก"]].map(([k,lb])=>(
            <button key={k} onClick={()=>setTab(k)} style={{flex:1,padding:"8px",borderRadius:8,border:"none",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"inherit",background:tab===k?WH:"transparent",color:tab===k?OR:SB,boxShadow:tab===k?"0 1px 4px rgba(0,0,0,.1)":"none",transition:"all .2s"}}>{lb}</button>
          ))}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"12px 16px",background:BG}}>
        {filtered.length===0?<div style={{textAlign:"center",padding:"40px 0",color:SB}}>ไม่มีรายการจอง</div>:filtered.map((b,i)=>(
          <div key={i} style={{background:WH,borderRadius:16,marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,.06)",border:`1px solid ${BD}`,overflow:"hidden"}}>
            <div style={{padding:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                  <div style={{width:46,height:40,borderRadius:10,background:`linear-gradient(135deg,${N},${BL})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>🅿️</div>
                  <div><div style={{fontWeight:700,fontSize:14,color:TX}}>{b.name}</div><div style={{fontSize:11,color:SB}}>{b.area}</div></div>
                </div>
                <Pill color={statusMap[b.status].color}>{statusMap[b.status].lb}</Pill>
              </div>
              {[["วันที่",b.date],["เวลา",b.time],["รหัสจอง",b.code]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:12,color:SB}}>{k}</span><span style={{fontSize:12,fontWeight:600,color:TX}}>{v}</span></div>
              ))}
              <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}><span style={{fontSize:12,color:SB}}>ราคา</span><span style={{fontSize:14,fontWeight:800,color:OR}}>฿{b.price}</span></div>
            </div>
            {b.status==="confirmed"&&(
              <div style={{display:"flex",gap:0,borderTop:`1px solid ${BD}`}}>
                {[["ดู QR Code","mybooking"],["แก้ไข","date"],["ยกเลิก","home"]].map(([lb,sc],j)=>(
                  <button key={lb} onClick={()=>go(sc)} style={{flex:1,padding:"10px",background:"none",border:"none",borderRight:j<2?`1px solid ${BD}`:"none",cursor:"pointer",fontSize:12,fontWeight:700,color:j===2?"#EF4444":OR,fontFamily:"inherit"}}>{lb}</button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Screen 12: QR Ticket ── */
const QRTicket = ({go,parkingId}) => {
  const p = parkings.find(x=>x.id===parkingId)||parkings[0];
  return (
    <div style={{flex:1,overflowY:"auto",background:BG}}>
      <div style={{background:WH,padding:"0 16px 12px",borderBottom:`1px solid ${BD}`}}>
        <StatusBar/>
        <div style={{display:"flex",gap:12,alignItems:"center"}}><Back onClick={()=>go("bookings")}/><div style={{fontWeight:700,fontSize:16,color:TX}}>บัตรจอดรถ</div></div>
      </div>
      <div style={{padding:16}}>
        <div style={{background:WH,borderRadius:20,overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,.1)"}}>
          {/* Header */}
          <div style={{background:`linear-gradient(135deg,${N},${NM})`,padding:"20px 20px 24px",textAlign:"center"}}>
            <div style={{fontSize:22,fontWeight:900}}><span style={{color:OR}}>77</span><span style={{color:WH}}>Park</span></div>
            <div style={{fontSize:13,color:"rgba(255,255,255,.6)",marginTop:4}}>บัตรเข้า-ออกที่จอดรถ</div>
          </div>
          {/* Divider */}
          <div style={{display:"flex",alignItems:"center",margin:"0 -1px"}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:BG,flexShrink:0}}/>
            <div style={{flex:1,borderTop:`2px dashed ${BD}`}}/>
            <div style={{width:20,height:20,borderRadius:"50%",background:BG,flexShrink:0}}/>
          </div>
          {/* QR */}
          <div style={{padding:"20px",textAlign:"center"}}>
            <div style={{width:180,height:180,margin:"0 auto 16px",background:BG,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",border:`2px solid ${BD}`,fontSize:11,color:SB,flexDirection:"column",gap:4}}>
              <div style={{fontSize:60}}>⬛</div>
              <div>QR Code</div>
              <div style={{fontFamily:"monospace",color:OR,fontWeight:700}}>BK240523-0001</div>
            </div>
            <div style={{fontFamily:"monospace",fontSize:18,fontWeight:800,color:OR,letterSpacing:3,marginBottom:16}}>BK240523-0001</div>
            <div style={{background:BG,borderRadius:12,padding:14}}>
              {[["สถานที่",p.name],["เข้า","23 ก.ค. 2026  10:00"],["ออก","23 ก.ค. 2026  18:00"]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{fontSize:12,color:SB}}>{k}</span>
                  <span style={{fontSize:12,fontWeight:700,color:TX}}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{marginTop:12,padding:"8px",background:`${OR}15`,borderRadius:8,fontSize:11,color:OR,fontWeight:600}}>
              แสดง QR Code นี้เมื่อเข้า-ออกที่จอดรถ
            </div>
          </div>
        </div>
        <div style={{marginTop:16}}>
          <Btn full onClick={()=>go("search")}>🗺️ นำทาง</Btn>
        </div>
      </div>
    </div>
  );
};

/* ── Screen 13: Profile ── */
const Profile = ({go}) => {
  const menus = [
    [["👤","ข้อมูลส่วนตัว"],["💳","วิธีการชำระเงิน"],["🚗","รถของฉัน"]],
    [["❤️","รายการโปรด"],["📋","การจองของฉัน","bookings"],["🔔","การแจ้งเตือน"]],
    [["❓","ศูนย์ช่วยเหลือ"],["⚙️","ตั้งค่า"]],
  ];
  return (
    <div style={{flex:1,overflowY:"auto",background:BG}}>
      <div style={{background:`linear-gradient(135deg,${N},${NM})`,padding:"0 20px 28px"}}>
        <StatusBar dark/>
        <div style={{display:"flex",gap:14,alignItems:"center"}}>
          <div style={{width:64,height:64,borderRadius:"50%",background:OR,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,fontWeight:700,color:WH}}>ว</div>
          <div>
            <div style={{fontSize:20,fontWeight:800,color:WH}}>คุณวัง</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,.6)"}}>081 234 5678</div>
            <div style={{marginTop:4}}><Pill color={OR} bg="rgba(249,115,22,.2)">สมาชิกทั่วไป</Pill></div>
          </div>
        </div>
        <div style={{display:"flex",gap:10,marginTop:20}}>
          {[["2","การจอง"],["1","รายการโปรด"],["0","รีวิว"]].map(([n,lb])=>(
            <div key={lb} style={{flex:1,background:"rgba(255,255,255,.1)",borderRadius:10,padding:"10px",textAlign:"center"}}>
              <div style={{fontSize:20,fontWeight:800,color:OR}}>{n}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.6)"}}>{lb}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{padding:"12px 16px"}}>
        {menus.map((group,gi)=>(
          <div key={gi} style={{background:WH,borderRadius:16,marginBottom:12,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
            {group.map(([ic,lb,sc],i)=>(
              <div key={lb} onClick={()=>sc&&go(sc)} style={{display:"flex",gap:12,alignItems:"center",padding:"14px 16px",cursor:"pointer",borderBottom:i<group.length-1?`1px solid ${BD}`:"none"}}>
                <span style={{fontSize:20,width:28,textAlign:"center"}}>{ic}</span>
                <span style={{flex:1,fontSize:14,fontWeight:600,color:TX}}>{lb}</span>
                <span style={{color:SB,fontSize:16}}>›</span>
              </div>
            ))}
          </div>
        ))}
        <div style={{background:WH,borderRadius:16,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
          <div onClick={()=>go("splash")} style={{display:"flex",gap:12,alignItems:"center",padding:"14px 16px",cursor:"pointer"}}>
            <span style={{fontSize:20,width:28,textAlign:"center"}}>🚪</span>
            <span style={{flex:1,fontSize:14,fontWeight:700,color:"#EF4444"}}>ออกจากระบบ</span>
          </div>
        </div>
        <div style={{height:16}}/>
      </div>
    </div>
  );
};

/* ── Main App ── */
export default function App() {
  const [screen, setScreen] = useState("splash");
  const [parkingId, setParkingId] = useState(1);
  const go = (s) => setScreen(s);
  const noNav = ["splash","login","register","success"];
  const navMap = {home:"home",search:"search",bookings:"bookings",mybooking:"bookings",fav:"fav",profile:"profile"};

  const renderScreen = () => {
    const props = {go, parkingId, setParking: setParkingId};
    switch(screen) {
      case "splash":    return <Splash {...props}/>;
      case "login":     return <Login {...props}/>;
      case "register":  return <Register {...props}/>;
      case "home":      return <Home {...props}/>;
      case "search":    return <Search {...props}/>;
      case "detail":    return <Detail {...props}/>;
      case "date":      return <DatePick {...props}/>;
      case "summary":   return <Summary {...props}/>;
      case "payment":   return <Payment {...props}/>;
      case "success":   return <Success {...props}/>;
      case "bookings":
      case "mybooking": return <MyBookings {...props}/>;
      case "ticket":    return <QRTicket {...props}/>;
      case "profile":   return <Profile {...props}/>;
      default:          return <Home {...props}/>;
    }
  };

  return (
    <div style={{minHeight:"100vh",background:"#C8D5E8",display:"flex",alignItems:"center",justifyContent:"center",padding:20,fontFamily:"'Sarabun','Noto Sans Thai',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      {/* Phone Frame */}
      <div style={{width:"100%",maxWidth:390,background:BG,borderRadius:44,overflow:"hidden",boxShadow:"0 40px 100px rgba(0,0,0,.45),inset 0 0 0 1px rgba(255,255,255,.25)",minHeight:760,display:"flex",flexDirection:"column",border:"8px solid #1A1F36",position:"relative"}}>
        {/* Notch */}
        <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:120,height:28,background:"#1A1F36",borderRadius:"0 0 16px 16px",zIndex:100}}/>
        {/* Screen */}
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",paddingTop:4}}>
          {renderScreen()}
        </div>
        {/* Bottom Nav */}
        {!noNav.includes(screen) && <BottomNav active={navMap[screen]||screen} go={go}/>}
      </div>
    </div>
  );
}
