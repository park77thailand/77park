import { useState, useEffect } from "react";

/* ─── Brand Tokens ─── */
const B = {
  navy:    "#081C3B",
  navyMid: "#0F2D5E",
  blue:    "#1B6EF3",
  orange:  "#F97316",
  orangeL: "#FFF3E8",
  gold:    "#F59E0B",
  green:   "#22C55E",
  bg:      "#F4F7FF",
  white:   "#FFFFFF",
  text:    "#0F172A",
  sub:     "#64748B",
  border:  "#E2E8F0",
};

/* 77 Province names */
const PROVINCES = [
  "กรุงเทพฯ","กระบี่","กาญจนบุรี","กาฬสินธุ์","กำแพงเพชร","ขอนแก่น","จันทบุรี","ฉะเชิงเทรา",
  "ชลบุรี","ชัยนาท","ชัยภูมิ","ชุมพร","เชียงราย","เชียงใหม่","ตรัง","ตราด","ตาก","นครนายก",
  "นครปฐม","นครพนม","นครราชสีมา","นครศรีธรรมราช","นครสวรรค์","นนทบุรี","นราธิวาส","น่าน",
  "บึงกาฬ","บุรีรัมย์","ปทุมธานี","ประจวบคีรีขันธ์","ปราจีนบุรี","ปัตตานี","พระนครศรีอยุธยา",
  "พะเยา","พระแสง","พัทลุง","พิจิตร","พิษณุโลก","เพชรบุรี","เพชรบูรณ์","แพร่","ภูเก็ต",
  "มหาสารคาม","มุกดาหาร","แม่ฮ่องสอน","ยโสธร","ยะลา","ร้อยเอ็ด","ระนอง","ระยอง",
  "ราชบุรี","ลพบุรี","ลำปาง","ลำพูน","เลย","ศรีสะเกษ","สกลนคร","สงขลา","สตูล",
  "สมุทรปราการ","สมุทรสงคราม","สมุทรสาคร","สระแก้ว","สระบุรี","สิงห์บุรี","สุโขทัย",
  "สุพรรณบุรี","สุราษฎร์ธานี","สุรินทร์","หนองคาย","หนองบัวลำภู","อ่างทอง","อำนาจเจริญ",
  "อุดรธานี","อุตรดิตถ์","อุทัยธานี","อุบลราชธานี",
];

const HOW_OWNER = [
  { n:"01", icon:"📝", title:"สมัครเปิดร้าน", desc:"กรอกข้อมูลที่จอด ใส่รูปภาพ กำหนดราคา" },
  { n:"02", icon:"💳", title:"ชำระ ฿200", desc:"โอน PromptPay ส่งสลิป รอ Approve ภายใน 24 ชม." },
  { n:"03", icon:"🚗", title:"รับลูกค้าทันที", desc:"ที่จอดของคุณขึ้นเว็บ ลูกค้าจองได้เลย" },
];

const HOW_DRIVER = [
  { n:"01", icon:"🔍", title:"ค้นหา", desc:"พิมพ์ชื่อจังหวัด ย่าน หรือ BTS/MRT" },
  { n:"02", icon:"📅", title:"เลือกวันเวลา", desc:"จองล่วงหน้า เลือกเวลาเข้า-ออก" },
  { n:"03", icon:"✅", title:"จอดได้เลย", desc:"รับรหัสการจอง นำทาง GPS แสดงรหัสเข้า" },
];

const FEATURES = [
  { icon:"🗺️", title:"ครบ 77 จังหวัด", desc:"ค้นหาที่จอดได้ทั่วประเทศไทย ทุกจังหวัด" },
  { icon:"📸", title:"รูปภาพจริง", desc:"เจ้าของอัปโหลดภาพจริง เห็นก่อนจอง" },
  { icon:"💬", title:"รีวิวจริง", desc:"ให้คะแนนจากผู้เคยใช้จริงทุกครั้ง" },
  { icon:"🔒", title:"ปลอดภัย", desc:"ระบบยืนยันตัวตน ทุกที่จอดผ่านการตรวจสอบ" },
  { icon:"📱", title:"ใช้ได้ทุกอุปกรณ์", desc:"เว็บ + PWA ลงมือถือได้ไม่ต้องโหลดแอป" },
  { icon:"⚡", title:"จองเร็ว", desc:"ยืนยันการจองทันที ไม่เสียเวลารอ" },
];

function Nav({ onRegister }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:100,
      background: scrolled ? "rgba(8,28,59,.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,.08)" : "none",
      transition:"all .3s", padding:"0 24px",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      height:64,
    }}>
      {/* Logo */}
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <div style={{ fontWeight:900, fontSize:26, lineHeight:1 }}>
          <span style={{ color:B.orange }}>77</span>
          <span style={{ color:B.white }}>Park</span>
        </div>
        <div style={{
          fontSize:10, color:B.orange, background:"rgba(249,115,22,.15)",
          padding:"2px 7px", borderRadius:20, fontWeight:700, border:"1px solid rgba(249,115,22,.3)",
        }}>THAILAND</div>
      </div>
      {/* Nav links */}
      <div style={{ display:"flex", gap:28, alignItems:"center" }}>
        {["สำหรับเจ้าของ","ค้นหาที่จอด","ราคา"].map(l=>(
          <a key={l} href="#" style={{ color:"rgba(255,255,255,.7)", fontSize:14, textDecoration:"none", fontWeight:500 }}>{l}</a>
        ))}
        <button onClick={onRegister} style={{
          background:B.orange, color:B.white, border:"none", borderRadius:10,
          padding:"9px 20px", fontWeight:700, fontSize:14, cursor:"pointer",
          fontFamily:"inherit", boxShadow:"0 2px 12px rgba(249,115,22,.4)",
        }}>เปิดร้าน ฿200</button>
      </div>
    </nav>
  );
}

function Hero({ onRegister, onSearch }) {
  const [search, setSearch] = useState("");
  return (
    <section style={{
      background:`linear-gradient(160deg, ${B.navy} 0%, ${B.navyMid} 60%, #1A3A6B 100%)`,
      minHeight:"100vh", position:"relative", overflow:"hidden",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding:"100px 24px 60px", textAlign:"center",
    }}>
      {/* Giant "77" bg decoration */}
      <div style={{
        position:"absolute", fontSize:"clamp(280px,40vw,520px)", fontWeight:900,
        color:"rgba(249,115,22,.05)", lineHeight:1, top:"50%", left:"50%",
        transform:"translate(-50%,-50%)", pointerEvents:"none", userSelect:"none",
        letterSpacing:-20,
      }}>77</div>

      {/* Grid dots */}
      <div style={{
        position:"absolute", inset:0, opacity:.3,
        backgroundImage:"radial-gradient(rgba(255,255,255,.15) 1px, transparent 1px)",
        backgroundSize:"32px 32px",
      }}/>

      {/* Badge */}
      <div style={{
        display:"inline-flex", alignItems:"center", gap:8,
        background:"rgba(249,115,22,.12)", border:"1px solid rgba(249,115,22,.3)",
        borderRadius:40, padding:"7px 16px", marginBottom:24,
        fontSize:13, color:B.orange, fontWeight:700,
      }}>
        🇹🇭 ครอบคลุมทุกจังหวัดในไทย · 77 จังหวัด
      </div>

      {/* Headline */}
      <h1 style={{
        fontSize:"clamp(36px,6vw,72px)", fontWeight:900, lineHeight:1.15,
        color:B.white, margin:"0 0 20px", maxWidth:780,
      }}>
        ที่จอดรถ{" "}
        <span style={{
          color:B.orange,
          textShadow:"0 0 40px rgba(249,115,22,.4)",
        }}>ทั่วไทย</span>
        <br/>ค้นหาง่าย จองได้เลย
      </h1>

      <p style={{
        fontSize:"clamp(16px,2vw,20px)", color:"rgba(255,255,255,.65)",
        maxWidth:560, lineHeight:1.7, margin:"0 0 40px",
      }}>
        รวมที่จอดรถทั้ง 77 จังหวัด จากเจ้าของจริง<br/>
        ราคาชัดเจน จองล่วงหน้าได้ทันที
      </p>

      {/* Search bar */}
      <div style={{
        display:"flex", gap:10, maxWidth:540, width:"100%",
        background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.15)",
        borderRadius:16, padding:8, marginBottom:32,
        backdropFilter:"blur(10px)",
      }}>
        <input value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="🔍  ค้นหาจังหวัด ย่าน หรือสถานที่..."
          style={{
            flex:1, background:"none", border:"none", color:B.white,
            fontSize:15, outline:"none", fontFamily:"inherit", padding:"6px 8px",
          }}/>
        <button onClick={onSearch} style={{
          background:B.orange, color:B.white, border:"none", borderRadius:10,
          padding:"10px 24px", fontWeight:700, fontSize:14, cursor:"pointer",
          fontFamily:"inherit", whiteSpace:"nowrap",
        }}>ค้นหา</button>
      </div>

      {/* CTAs */}
      <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center" }}>
        <button onClick={onRegister} style={{
          background:B.orange, color:B.white, border:"none", borderRadius:12,
          padding:"14px 32px", fontWeight:800, fontSize:16, cursor:"pointer",
          fontFamily:"inherit", boxShadow:"0 4px 24px rgba(249,115,22,.5)",
        }}>📋 เปิดร้านจอดรถ · ฿200</button>
        <button style={{
          background:"rgba(255,255,255,.1)", color:B.white,
          border:"1px solid rgba(255,255,255,.25)", borderRadius:12,
          padding:"14px 32px", fontWeight:700, fontSize:16, cursor:"pointer",
          fontFamily:"inherit",
        }}>🚗 หาที่จอดรถ</button>
      </div>

      {/* Scroll hint */}
      <div style={{ position:"absolute", bottom:32, fontSize:22, color:"rgba(255,255,255,.3)", animation:"bounce 2s infinite" }}>↓</div>
      <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}`}</style>
    </section>
  );
}

function Stats() {
  const items = [
    { num:"77", label:"จังหวัดทั่วไทย", icon:"🗺️" },
    { num:"฿200", label:"ค่าสมัครเปิดร้าน", icon:"💳" },
    { num:"15%", label:"Commission ต่อการจอง", icon:"💰" },
    { num:"24/7", label:"เข้าถึงได้ตลอดเวลา", icon:"⚡" },
  ];
  return (
    <section style={{ background:B.orange, padding:"48px 24px" }}>
      <div style={{
        maxWidth:1000, margin:"0 auto",
        display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:24,
      }}>
        {items.map(({ num, label, icon }) => (
          <div key={label} style={{ textAlign:"center" }}>
            <div style={{ fontSize:32, marginBottom:6 }}>{icon}</div>
            <div style={{ fontSize:36, fontWeight:900, color:B.white, lineHeight:1 }}>{num}</div>
            <div style={{ fontSize:14, color:"rgba(255,255,255,.8)", marginTop:4, fontWeight:600 }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const [tab, setTab] = useState("owner");
  const steps = tab === "owner" ? HOW_OWNER : HOW_DRIVER;
  return (
    <section style={{ background:B.bg, padding:"80px 24px" }}>
      <div style={{ maxWidth:880, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ fontSize:13, fontWeight:700, color:B.orange, letterSpacing:2, marginBottom:8, textTransform:"uppercase" }}>วิธีการทำงาน</div>
          <h2 style={{ fontSize:"clamp(28px,4vw,42px)", fontWeight:900, color:B.text, margin:0 }}>ง่าย · เร็ว · ปลอดภัย</h2>
        </div>

        {/* Tab toggle */}
        <div style={{
          display:"flex", background:"rgba(0,0,0,.06)", borderRadius:14,
          padding:5, maxWidth:320, margin:"0 auto 48px", gap:4,
        }}>
          {[["owner","🏢 สำหรับเจ้าของ"],["driver","🚗 สำหรับผู้จอด"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{
              flex:1, padding:"10px 0", borderRadius:10, border:"none",
              fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"inherit",
              background:tab===k ? B.orange : "transparent",
              color:tab===k ? B.white : B.sub,
              transition:"all .2s",
            }}>{l}</button>
          ))}
        </div>

        {/* Steps */}
        <div style={{
          display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:24,
        }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{
              background:B.white, borderRadius:20, padding:28,
              boxShadow:"0 4px 20px rgba(0,0,0,.07)",
              border:`1px solid ${B.border}`,
              position:"relative", overflow:"hidden",
            }}>
              {/* bg number */}
              <div style={{
                position:"absolute", top:-10, right:8, fontSize:72, fontWeight:900,
                color:"rgba(249,115,22,.06)", lineHeight:1, pointerEvents:"none",
              }}>{s.n}</div>
              <div style={{ fontSize:36, marginBottom:14 }}>{s.icon}</div>
              <div style={{
                fontSize:11, fontWeight:800, color:B.orange, letterSpacing:2,
                marginBottom:6, textTransform:"uppercase",
              }}>STEP {s.n}</div>
              <div style={{ fontSize:18, fontWeight:800, color:B.text, marginBottom:8 }}>{s.title}</div>
              <div style={{ fontSize:14, color:B.sub, lineHeight:1.7 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section style={{ background:B.white, padding:"80px 24px" }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ fontSize:13, fontWeight:700, color:B.orange, letterSpacing:2, marginBottom:8, textTransform:"uppercase" }}>คุณสมบัติ</div>
          <h2 style={{ fontSize:"clamp(28px,4vw,42px)", fontWeight:900, color:B.text, margin:0 }}>ทำไมต้อง <span style={{ color:B.orange }}>77Park</span>?</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
          {FEATURES.map(f=>(
            <div key={f.title} style={{
              padding:24, borderRadius:16, border:`1px solid ${B.border}`,
              transition:"all .2s", cursor:"default",
            }}
            onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 32px rgba(249,115,22,.12)"}
            onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
              <div style={{ fontSize:32, marginBottom:12 }}>{f.icon}</div>
              <div style={{ fontWeight:800, fontSize:16, color:B.text, marginBottom:6 }}>{f.title}</div>
              <div style={{ fontSize:14, color:B.sub, lineHeight:1.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing({ onRegister }) {
  return (
    <section style={{ background:B.navy, padding:"80px 24px" }}>
      <div style={{ maxWidth:760, margin:"0 auto", textAlign:"center" }}>
        <div style={{ fontSize:13, fontWeight:700, color:B.orange, letterSpacing:2, marginBottom:8, textTransform:"uppercase" }}>ราคา</div>
        <h2 style={{ fontSize:"clamp(28px,4vw,42px)", fontWeight:900, color:B.white, margin:"0 0 48px" }}>โปร่งใส ไม่มีค่าใช้จ่ายซ่อน</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
          {/* Owner card */}
          <div style={{
            background:"rgba(255,255,255,.06)", border:`2px solid ${B.orange}`,
            borderRadius:24, padding:32, textAlign:"left", position:"relative",
          }}>
            <div style={{
              position:"absolute", top:-12, left:24,
              background:B.orange, color:B.white, fontSize:11, fontWeight:800,
              padding:"4px 14px", borderRadius:20,
            }}>เจ้าของที่จอดรถ</div>
            <div style={{ fontSize:48, fontWeight:900, color:B.white, lineHeight:1, marginTop:8 }}>
              ฿200<span style={{ fontSize:16, color:"rgba(255,255,255,.5)", fontWeight:400 }}> /ครั้ง</span>
            </div>
            <div style={{ fontSize:14, color:"rgba(255,255,255,.5)", marginBottom:24 }}>ค่าสมัครเปิดร้านครั้งแรก</div>
            {[
              "ลงประกาศได้ไม่จำกัดรูปภาพ",
              "ตั้งราคา รายวัน / รายเดือน",
              "ระบบจัดการการจองออนไลน์",
              "รับเงินผ่าน PromptPay โดยตรง",
              "แดชบอร์ดดูรายได้",
            ].map(i=>(
              <div key={i} style={{ display:"flex", gap:10, marginBottom:10 }}>
                <span style={{ color:B.green, fontWeight:700 }}>✓</span>
                <span style={{ color:"rgba(255,255,255,.8)", fontSize:14 }}>{i}</span>
              </div>
            ))}
            <div style={{ marginTop:12, padding:"10px 14px", background:"rgba(249,115,22,.15)", borderRadius:10, fontSize:13, color:B.orange, fontWeight:600 }}>
              Commission 15% เฉพาะเมื่อมีการจอง
            </div>
            <button onClick={onRegister} style={{
              width:"100%", marginTop:24, padding:"14px", borderRadius:12,
              background:B.orange, border:"none", color:B.white,
              fontWeight:800, fontSize:16, cursor:"pointer", fontFamily:"inherit",
            }}>สมัครเปิดร้านเลย</button>
          </div>
          {/* Driver card */}
          <div style={{
            background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)",
            borderRadius:24, padding:32, textAlign:"left",
          }}>
            <div style={{ fontSize:48, fontWeight:900, color:B.white, lineHeight:1 }}>
              ฿0<span style={{ fontSize:16, color:"rgba(255,255,255,.5)", fontWeight:400 }}> /ตลอดกาล</span>
            </div>
            <div style={{ fontSize:14, color:"rgba(255,255,255,.5)", marginBottom:24 }}>สำหรับผู้ต้องการจอดรถ</div>
            {[
              "ค้นหาที่จอดรถฟรี ไม่มีค่าสมัคร",
              "ดูรูปภาพและรีวิวก่อนจอง",
              "จองล่วงหน้า เลือกเวลาได้",
              "รับรหัสการจองทันที",
              "นำทาง GPS ไปที่จอดรถ",
            ].map(i=>(
              <div key={i} style={{ display:"flex", gap:10, marginBottom:10 }}>
                <span style={{ color:B.blue, fontWeight:700 }}>✓</span>
                <span style={{ color:"rgba(255,255,255,.8)", fontSize:14 }}>{i}</span>
              </div>
            ))}
            <div style={{ marginTop:12, padding:"10px 14px", background:"rgba(27,110,243,.15)", borderRadius:10, fontSize:13, color:"#7BB8FF", fontWeight:600 }}>
              + ค่าบริการ 15% รวมในราคาที่แสดง
            </div>
            <button style={{
              width:"100%", marginTop:24, padding:"14px", borderRadius:12,
              background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.2)",
              color:B.white, fontWeight:800, fontSize:16, cursor:"pointer", fontFamily:"inherit",
            }}>ค้นหาที่จอดรถ</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Provinces() {
  const [show, setShow] = useState(false);
  const visible = show ? PROVINCES : PROVINCES.slice(0,21);
  return (
    <section style={{ background:B.bg, padding:"80px 24px" }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ fontSize:13, fontWeight:700, color:B.orange, letterSpacing:2, marginBottom:8, textTransform:"uppercase" }}>ครอบคลุม</div>
          <h2 style={{ fontSize:"clamp(28px,4vw,42px)", fontWeight:900, color:B.text, margin:0 }}>
            <span style={{ color:B.orange }}>77</span> จังหวัด ทั่วประเทศไทย
          </h2>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center" }}>
          {visible.map(p=>(
            <div key={p} style={{
              padding:"7px 14px", borderRadius:20, fontSize:13, fontWeight:600,
              background:B.white, border:`1px solid ${B.border}`, color:B.text,
              transition:"all .2s", cursor:"pointer",
            }}
            onMouseEnter={e=>{e.currentTarget.style.background=B.orange;e.currentTarget.style.color=B.white;e.currentTarget.style.borderColor=B.orange;}}
            onMouseLeave={e=>{e.currentTarget.style.background=B.white;e.currentTarget.style.color=B.text;e.currentTarget.style.borderColor=B.border;}}>
              {p}
            </div>
          ))}
        </div>
        {!show && (
          <div style={{ textAlign:"center", marginTop:20 }}>
            <button onClick={()=>setShow(true)} style={{
              background:"none", border:`1.5px solid ${B.orange}`, color:B.orange,
              borderRadius:10, padding:"10px 28px", fontWeight:700, fontSize:14,
              cursor:"pointer", fontFamily:"inherit",
            }}>ดูทั้ง 77 จังหวัด →</button>
          </div>
        )}
      </div>
    </section>
  );
}

function CTA({ onRegister }) {
  return (
    <section style={{
      background:`linear-gradient(135deg, ${B.orange}, #EA580C)`,
      padding:"80px 24px", textAlign:"center",
    }}>
      <div style={{ maxWidth:620, margin:"0 auto" }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🅿️</div>
        <h2 style={{ fontSize:"clamp(28px,4vw,42px)", fontWeight:900, color:B.white, margin:"0 0 16px" }}>
          มีที่จอดรถ? เริ่มสร้างรายได้เลย
        </h2>
        <p style={{ fontSize:18, color:"rgba(255,255,255,.85)", margin:"0 0 32px", lineHeight:1.7 }}>
          สมัครเพียง ฿200 ครั้งเดียว<br/>
          เปิดรับลูกค้าได้จากทั่วประเทศ
        </p>
        <button onClick={onRegister} style={{
          background:B.white, color:B.orange, border:"none",
          borderRadius:14, padding:"16px 40px", fontWeight:900,
          fontSize:18, cursor:"pointer", fontFamily:"inherit",
          boxShadow:"0 8px 32px rgba(0,0,0,.2)",
        }}>สมัครเปิดร้านเลย →</button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background:B.navy, padding:"40px 24px 24px", color:"rgba(255,255,255,.5)" }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:24, marginBottom:32 }}>
          <div>
            <div style={{ fontWeight:900, fontSize:22, marginBottom:8 }}>
              <span style={{ color:B.orange }}>77</span>
              <span style={{ color:B.white }}>Park</span>
            </div>
            <div style={{ fontSize:13, lineHeight:1.8, maxWidth:220 }}>
              แพลตฟอร์มจองที่จอดรถ<br/>ครบทุก 77 จังหวัดในประเทศไทย
            </div>
          </div>
          {[
            { title:"บริการ", links:["ค้นหาที่จอดรถ","เปิดร้านจอดรถ","ราคา & แพ็กเกจ"] },
            { title:"บริษัท", links:["เกี่ยวกับเรา","ติดต่อ","นโยบายความเป็นส่วนตัว"] },
          ].map(g=>(
            <div key={g.title}>
              <div style={{ fontWeight:700, color:B.white, marginBottom:12, fontSize:14 }}>{g.title}</div>
              {g.links.map(l=>(
                <div key={l} style={{ marginBottom:8 }}>
                  <a href="#" style={{ color:"rgba(255,255,255,.5)", fontSize:13, textDecoration:"none" }}>{l}</a>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,.08)", paddingTop:20, textAlign:"center", fontSize:13 }}>
          © 2024 77Park · ที่จอดรถทั่วไทย · สร้างด้วย ❤️ เพื่อคนไทย
        </div>
      </div>
    </footer>
  );
}

/* ─── Register Modal ─── */
function RegisterModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name:"", province:"", address:"", daily:"", monthly:"", phone:"", email:"" });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const Field = ({ label, k, placeholder, type="text" }) => (
    <div style={{ marginBottom:14 }}>
      <label style={{ fontSize:12, fontWeight:700, color:B.sub, display:"block", marginBottom:5 }}>{label}</label>
      {k==="province" ? (
        <select value={form[k]} onChange={e=>set(k,e.target.value)} style={{
          width:"100%", padding:"10px 12px", borderRadius:10, border:`1.5px solid ${B.border}`,
          fontSize:14, fontFamily:"inherit", outline:"none", color:B.text, boxSizing:"border-box",
        }}>
          <option value="">เลือกจังหวัด</option>
          {PROVINCES.map(p=><option key={p} value={p}>{p}</option>)}
        </select>
      ) : (
        <input type={type} value={form[k]} onChange={e=>set(k,e.target.value)}
          placeholder={placeholder} style={{
            width:"100%", padding:"10px 12px", borderRadius:10,
            border:`1.5px solid ${B.border}`, fontSize:14,
            fontFamily:"inherit", outline:"none", color:B.text, boxSizing:"border-box",
          }}/>
      )}
    </div>
  );

  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,.6)", zIndex:200,
      display:"flex", alignItems:"center", justifyContent:"center", padding:20,
    }} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{
        background:B.white, borderRadius:24, padding:32, width:"100%", maxWidth:460,
        maxHeight:"90vh", overflowY:"auto",
      }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
          <div>
            <div style={{ fontWeight:900, fontSize:20, color:B.text }}>เปิดร้านจอดรถ</div>
            <div style={{ fontSize:13, color:B.sub }}>ขั้นตอนที่ {step}/3</div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color:B.sub }}>×</button>
        </div>

        {/* Progress */}
        <div style={{ display:"flex", gap:6, marginBottom:28 }}>
          {[1,2,3].map(i=>(
            <div key={i} style={{
              flex:1, height:4, borderRadius:4,
              background:i<=step ? B.orange : B.border, transition:"background .3s",
            }}/>
          ))}
        </div>

        {step===1 && (
          <div>
            <div style={{ fontWeight:700, fontSize:16, color:B.text, marginBottom:16 }}>📋 ข้อมูลที่จอดรถ</div>
            <Field label="ชื่อที่จอดรถ *" k="name" placeholder="เช่น ที่จอดรถ ABC สุขุมวิท"/>
            <Field label="จังหวัด *" k="province"/>
            <Field label="ที่อยู่โดยละเอียด *" k="address" placeholder="เลขที่ ถนน แขวง เขต"/>
            <div style={{ display:"flex", gap:10 }}>
              <div style={{ flex:1 }}><Field label="ราคารายวัน (฿)" k="daily" placeholder="100" type="number"/></div>
              <div style={{ flex:1 }}><Field label="ราคารายเดือน (฿)" k="monthly" placeholder="2500" type="number"/></div>
            </div>
          </div>
        )}
        {step===2 && (
          <div>
            <div style={{ fontWeight:700, fontSize:16, color:B.text, marginBottom:16 }}>👤 ข้อมูลติดต่อ</div>
            <Field label="ชื่อ-นามสกุล *" k="name" placeholder="ชื่อเจ้าของ"/>
            <Field label="อีเมล *" k="email" placeholder="email@example.com" type="email"/>
            <Field label="เบอร์โทร *" k="phone" placeholder="08X-XXX-XXXX"/>
          </div>
        )}
        {step===3 && (
          <div style={{ textAlign:"center" }}>
            <div style={{ fontWeight:700, fontSize:16, color:B.text, marginBottom:20 }}>💳 ชำระค่าสมัคร</div>
            {/* QR placeholder */}
            <div style={{
              width:180, height:180, margin:"0 auto 16px",
              background:B.bg, borderRadius:16, border:`2px dashed ${B.orange}`,
              display:"flex", alignItems:"center", justifyContent:"center",
              flexDirection:"column", gap:8,
            }}>
              <div style={{ fontSize:40 }}>📱</div>
              <div style={{ fontSize:12, color:B.sub, fontWeight:600 }}>QR PromptPay</div>
            </div>
            <div style={{ fontSize:22, fontWeight:900, color:B.orange, marginBottom:4 }}>฿200</div>
            <div style={{ fontSize:13, color:B.sub, marginBottom:20 }}>โอนและส่งสลิปมาที่ Line: @77park</div>
            <div style={{
              padding:14, background:B.orangeL, borderRadius:12,
              fontSize:13, color:B.orange, textAlign:"left", lineHeight:1.7,
            }}>
              ✅ หลังโอนเงิน ส่งสลิปพร้อมชื่อร้านมาที่ Line<br/>
              ✅ ทีมงานจะ Approve ภายใน 24 ชั่วโมง<br/>
              ✅ ร้านของคุณจะขึ้นเว็บ 77Park ทันที
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display:"flex", gap:10, marginTop:24 }}>
          {step>1 && <button onClick={()=>setStep(s=>s-1)} style={{
            flex:1, padding:"12px", borderRadius:12, border:`1.5px solid ${B.border}`,
            background:"none", fontWeight:700, cursor:"pointer", fontFamily:"inherit", fontSize:14,
          }}>← ย้อนกลับ</button>}
          <button onClick={()=>step<3?setStep(s=>s+1):onClose()} style={{
            flex:2, padding:"12px", borderRadius:12, border:"none",
            background:B.orange, color:B.white, fontWeight:800, cursor:"pointer",
            fontFamily:"inherit", fontSize:15,
          }}>{step===3?"เสร็จสิ้น ✓":"ถัดไป →"}</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main App ─── */
export default function App() {
  const [modal, setModal] = useState(false);
  return (
    <div style={{ fontFamily:"'Sarabun','Noto Sans Thai',sans-serif", color:B.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <Nav onRegister={()=>setModal(true)}/>
      <Hero onRegister={()=>setModal(true)} onSearch={()=>{}}/>
      <Stats/>
      <HowItWorks/>
      <Features/>
      <Pricing onRegister={()=>setModal(true)}/>
      <Provinces/>
      <CTA onRegister={()=>setModal(true)}/>
      <Footer/>
      {modal && <RegisterModal onClose={()=>setModal(false)}/>}
    </div>
  );
}
