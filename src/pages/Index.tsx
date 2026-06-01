import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "library" | "controls" | "settings" | "stats" | "about";

const MONO = "'Courier New', Courier, monospace";
const SANS = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

// Android package names для Intent-запуска
const EMULATORS = [
  {
    id: "retroarch",
    name: "RetroArch",
    desc: "Универсальный — сотни систем",
    icon: "Layers",
    pkg: "com.retroarch",
    systems: ["NES", "SNES", "PS1", "GBA", "N64", "Saturn"],
    color: "#4e9af1",
    installed: true,
  },
  {
    id: "ppsspp",
    name: "PPSSPP",
    desc: "PlayStation Portable",
    icon: "Gamepad2",
    pkg: "org.ppsspp.ppsspp",
    systems: ["PSP"],
    color: "#00aaff",
    installed: true,
  },
  {
    id: "dolphin",
    name: "Dolphin",
    desc: "GameCube / Wii",
    icon: "Fish",
    pkg: "org.dolphinemu.dolphinemu",
    systems: ["GameCube", "Wii"],
    color: "#5ecfb0",
    installed: false,
  },
  {
    id: "winlator",
    name: "Winlator",
    desc: "Запуск .exe на Android",
    icon: "Monitor",
    pkg: "com.winlator",
    systems: [".EXE", "Win32", "DirectX"],
    color: "#00bfff",
    installed: true,
  },
  {
    id: "xenia",
    name: "Xenia",
    desc: "Xbox 360 (когда выйдет)",
    icon: "Tv",
    pkg: "com.xenia.android",
    systems: ["Xbox 360", "XBLA"],
    color: "#52cc52",
    installed: false,
  },
];

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "library", label: "Игры", icon: "Gamepad2" },
  { id: "controls", label: "Ctrl", icon: "Keyboard" },
  { id: "settings", label: "Настройки", icon: "SlidersHorizontal" },
  { id: "stats", label: "FPS", icon: "BarChart2" },
  { id: "about", label: "О системе", icon: "Info" },
];

function launchEmulator(pkg: string) {
  // Android Intent через deep link — открывает установленное приложение
  window.location.href = `intent://#Intent;package=${pkg};scheme=android-app;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;end`;
}

function FpsCounter({ target }: { target: number }) {
  const [fps, setFps] = useState(target);
  useEffect(() => {
    const id = setInterval(() => {
      setFps(target - 4 + Math.floor(Math.random() * 9));
    }, 900);
    return () => clearInterval(id);
  }, [target]);
  return <span style={{ fontFamily: MONO, color: "var(--neon)", fontSize: "2rem", fontWeight: 700 }}>{fps}</span>;
}

function SectionHome() {
  const [launching, setLaunching] = useState<string | null>(null);

  function handleLaunch(emu: typeof EMULATORS[0]) {
    if (!emu.installed) return;
    setLaunching(emu.id);
    setTimeout(() => {
      launchEmulator(emu.pkg);
      setLaunching(null);
    }, 600);
  }

  return (
    <div className="animate-slide-up space-y-5">
      {/* Hero */}
      <div className="relative overflow-hidden rounded p-5" style={{ border: "1px solid var(--neon-border)", boxShadow: "0 0 20px rgba(0,255,136,0.1)" }}>
        <div className="absolute inset-0 scan-line" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="status-dot" />
            <span style={{ fontFamily: MONO, fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em" }}>EMUCORE LAUNCHER — OFFLINE MODE</span>
          </div>
          <h1 style={{ fontFamily: MONO, fontSize: "1.8rem", fontWeight: 700, color: "var(--neon)", marginTop: "10px" }}>
            EmuCore<span className="cursor-blink" style={{ color: "var(--text-dim)" }}>_</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "13px", marginTop: "6px", lineHeight: 1.6, fontFamily: SANS }}>
            Лаунчер эмуляторов для Android.<br />
            Полностью офлайн — интернет не нужен.
          </p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {["OFFLINE", "KIRIN 710F", "ANDROID 9+", "NO ADS"].map((t) => (
              <span key={t} className="tag-chip">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Эмуляторы */}
      <div>
        <p style={{ fontFamily: MONO, fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em", marginBottom: "10px" }}>// Запуск эмулятора</p>
        <div className="space-y-2">
          {EMULATORS.map((emu) => (
            <div
              key={emu.id}
              className="surface-card rounded p-4 flex items-center gap-4"
              style={{
                opacity: emu.installed ? 1 : 0.5,
                transition: "all 0.2s",
                border: launching === emu.id ? `1px solid ${emu.color}` : "1px solid var(--surface-3)",
                boxShadow: launching === emu.id ? `0 0 16px ${emu.color}33` : "none",
              }}
            >
              {/* Иконка */}
              <div className="w-11 h-11 rounded flex items-center justify-center flex-shrink-0" style={{ background: `${emu.color}18`, border: `1px solid ${emu.color}44` }}>
                <Icon name={emu.icon} size={22} style={{ color: emu.color }} />
              </div>

              {/* Инфо */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span style={{ fontWeight: 700, fontSize: "14px", color: "var(--text-primary)", fontFamily: SANS }}>{emu.name}</span>
                  {!emu.installed && (
                    <span style={{ fontFamily: MONO, fontSize: "9px", padding: "1px 6px", borderRadius: "2px", background: "#ff440020", color: "#ff6644", border: "1px solid #ff444440" }}>
                      НЕ УСТАНОВЛЕН
                    </span>
                  )}
                </div>
                <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "1px", fontFamily: SANS }}>{emu.desc}</p>
                <div className="flex gap-1 mt-1.5 flex-wrap">
                  {emu.systems.map((s) => <span key={s} className="tag-chip">{s}</span>)}
                </div>
              </div>

              {/* Кнопка */}
              <button
                onClick={() => handleLaunch(emu)}
                disabled={!emu.installed || launching !== null}
                style={{
                  flexShrink: 0,
                  padding: "8px 16px",
                  borderRadius: "4px",
                  fontFamily: MONO,
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: emu.installed ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                  background: launching === emu.id ? emu.color : emu.installed ? `${emu.color}20` : "var(--surface-3)",
                  color: launching === emu.id ? "#000" : emu.installed ? emu.color : "var(--text-dim)",
                  border: `1px solid ${emu.installed ? `${emu.color}55` : "var(--text-dim)"}`,
                  letterSpacing: "0.05em",
                }}
              >
                {launching === emu.id ? "..." : emu.installed ? "ЗАПУСК" : "N/A"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Подсказка */}
      <div className="surface-card rounded p-3 flex items-start gap-3">
        <Icon name="Info" size={15} style={{ color: "var(--text-secondary)", flexShrink: 0, marginTop: 1 }} />
        <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.5, fontFamily: SANS }}>
          Кнопка <b style={{ color: "var(--text-primary)" }}>ЗАПУСК</b> открывает эмулятор, установленный на устройстве. Если эмулятор не установлен — зайдите в раздел <b style={{ color: "var(--text-primary)" }}>О системе</b> за инструкцией.
        </p>
      </div>
    </div>
  );
}

const LIBRARY_GAMES = [
  { title: "Halo 3", platform: "XBOX360", emu: "Xenia", size: "6.7 GB", fps: 60, compat: 94, genre: "Шутер" },
  { title: "GTA IV", platform: "WIN32", emu: "Winlator", size: "16.0 GB", fps: 45, compat: 78, genre: "Экшн" },
  { title: "God of War", platform: "PSP", emu: "PPSSPP", size: "1.4 GB", fps: 60, compat: 98, genre: "Экшн" },
  { title: "Forza Horizon", platform: "XBOX360", emu: "Xenia", size: "8.2 GB", fps: 60, compat: 91, genre: "Гонки" },
  { title: "Far Cry 3", platform: "WIN32", emu: "Winlator", size: "12.4 GB", fps: 55, compat: 85, genre: "Шутер" },
  { title: "Mario Kart Wii", platform: "WII", emu: "Dolphin", size: "4.4 GB", fps: 60, compat: 96, genre: "Гонки" },
  { title: "Tekken 6", platform: "PSP", emu: "PPSSPP", size: "0.9 GB", fps: 60, compat: 99, genre: "Файтинг" },
  { title: "GTA San Andreas", platform: "WIN32", emu: "Winlator", size: "3.6 GB", fps: 70, compat: 92, genre: "Экшн" },
];

function SectionLibrary() {
  const [filter, setFilter] = useState<string>("ALL");
  const platforms = ["ALL", "WIN32", "PSP", "XBOX360", "WII"];
  const filtered = filter === "ALL" ? LIBRARY_GAMES : LIBRARY_GAMES.filter((g) => g.platform === filter);

  return (
    <div className="animate-slide-up space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p style={{ fontFamily: MONO, fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em" }}>// Библиотека игр</p>
        <div className="flex gap-1 flex-wrap">
          {platforms.map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              fontFamily: MONO, fontSize: "9px", padding: "4px 10px", borderRadius: "3px",
              border: filter === f ? "1px solid var(--neon-border)" : "1px solid var(--surface-3)",
              background: filter === f ? "var(--neon-dim)" : "transparent",
              color: filter === f ? "var(--neon)" : "var(--text-secondary)",
              cursor: "pointer", transition: "all 0.15s",
            }}>{f}</button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((game) => (
          <div key={game.title + game.platform} className="surface-card surface-card-hover rounded p-3 flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0" style={{ background: "var(--surface-3)" }}>
              <Icon name={game.platform === "WIN32" ? "Monitor" : game.platform === "PSP" ? "Gamepad2" : "Tv"} size={18} style={{ color: "var(--text-secondary)" }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span style={{ fontWeight: 600, fontSize: "13px", color: "var(--text-primary)", fontFamily: SANS }}>{game.title}</span>
                <span className="tag-chip">{game.emu}</span>
              </div>
              <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "1px", fontFamily: MONO }}>{game.size} · {game.compat}% compat</p>
            </div>
            <span className="fps-badge">{game.fps} FPS</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const CONTROL_PROFILES = [
  { name: "Стандартный Xbox", type: "ГЕЙМПАД", keys: 16, active: true },
  { name: "Сенсор + Гироскоп", type: "ТАЧСКРИН", keys: 12, active: false },
  { name: "Клавиатура WASD", type: "КЛАВИАТУРА", keys: 24, active: false },
  { name: "Мой профиль", type: "КАСТОМ", keys: 18, active: false },
];

function SectionControls() {
  const [activeProfile, setActiveProfile] = useState(0);
  return (
    <div className="animate-slide-up space-y-4">
      <p style={{ fontFamily: MONO, fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em" }}>// Профили управления</p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {CONTROL_PROFILES.map((p, i) => (
          <div key={p.name} onClick={() => setActiveProfile(i)} className="surface-card rounded p-4 cursor-pointer"
            style={{ border: activeProfile === i ? "1px solid var(--neon-border)" : "1px solid var(--surface-3)", boxShadow: activeProfile === i ? "0 0 12px rgba(0,255,136,0.1)" : "none", transition: "all 0.2s" }}>
            <div className="flex items-start justify-between">
              <div>
                <p style={{ fontWeight: 600, fontSize: "13px", color: "var(--text-primary)", fontFamily: SANS }}>{p.name}</p>
                <p style={{ fontFamily: MONO, fontSize: "10px", color: "var(--text-secondary)", marginTop: "2px" }}>{p.type}</p>
              </div>
              <div style={{ width: 20, height: 20, borderRadius: "50%", border: activeProfile === i ? "2px solid var(--neon)" : "2px solid var(--text-dim)", background: activeProfile === i ? "var(--neon-dim)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {activeProfile === i && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--neon)" }} />}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Icon name="Keyboard" size={13} style={{ color: "var(--text-secondary)" }} />
              <span style={{ fontSize: "11px", color: "var(--text-secondary)", fontFamily: SANS }}>{p.keys} кнопок назначено</span>
            </div>
          </div>
        ))}
      </div>

      <div className="surface-card rounded p-4">
        <p style={{ fontFamily: MONO, fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em", marginBottom: "14px" }}>// Раскладка Xbox 360</p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { key: "A", color: "#4ade80" }, { key: "B", color: "#f87171" },
            { key: "X", color: "#60a5fa" }, { key: "Y", color: "#facc15" },
            { key: "LB", color: "#999" },   { key: "RB", color: "#999" },
            { key: "LT", color: "#666" },   { key: "RT", color: "#666" },
            { key: "START", color: "#888" }, { key: "BACK", color: "#888" },
            { key: "LS", color: "#555" },   { key: "RS", color: "#555" },
          ].map((btn) => (
            <button key={btn.key}
              style={{ borderRadius: "3px", border: "1px solid var(--surface-3)", padding: "8px 4px", fontFamily: MONO, fontSize: "11px", fontWeight: 700, color: btn.color, background: "transparent", cursor: "pointer", transition: "all 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = btn.color; e.currentTarget.style.background = `${btn.color}18`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--surface-3)"; e.currentTarget.style.background = "transparent"; }}
            >{btn.key}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

const SETTINGS_GROUPS = [
  { group: "Производительность", icon: "Cpu", items: [
    { label: "Лимит FPS", value: "120", type: "select" },
    { label: "Оптимизация Kirin 710F", value: "Вкл", type: "toggle" },
    { label: "Режим энергосбережения", value: "Выкл", type: "toggle" },
  ]},
  { group: "Графика", icon: "Layers", items: [
    { label: "Разрешение", value: "1080p", type: "select" },
    { label: "Сглаживание", value: "FXAA", type: "select" },
    { label: "VSync", value: "Вкл", type: "toggle" },
  ]},
  { group: "Звук", icon: "Volume2", items: [
    { label: "Аудиобуфер", value: "256", type: "select" },
    { label: "Spatial Audio", value: "Выкл", type: "toggle" },
  ]},
];

function SectionSettings() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "Оптимизация Kirin 710F": true, "VSync": true,
    "Режим энергосбережения": false, "Spatial Audio": false,
  });
  return (
    <div className="animate-slide-up space-y-4">
      <p style={{ fontFamily: MONO, fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em" }}>// Настройки</p>
      {SETTINGS_GROUPS.map((group) => (
        <div key={group.group} className="surface-card rounded overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid var(--surface-3)" }}>
            <Icon name={group.icon} size={14} style={{ color: "var(--neon)" }} />
            <span style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.12em", color: "var(--text-secondary)" }}>{group.group.toUpperCase()}</span>
          </div>
          {group.items.map((item, idx) => (
            <div key={item.label} className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: idx < group.items.length - 1 ? "1px solid var(--surface-3)" : "none" }}>
              <span style={{ fontSize: "13px", color: "var(--text-primary)", fontFamily: SANS }}>{item.label}</span>
              {item.type === "toggle" ? (
                <button onClick={() => setToggles((p) => ({ ...p, [item.label]: !p[item.label] }))}
                  style={{ width: 42, height: 24, borderRadius: 12, border: toggles[item.label] ? "1px solid var(--neon-border)" : "1px solid var(--text-dim)", background: toggles[item.label] ? "var(--neon-dim)" : "transparent", position: "relative", cursor: "pointer", transition: "all 0.2s" }}>
                  <div style={{ position: "absolute", top: 2, left: toggles[item.label] ? 20 : 2, width: 18, height: 18, borderRadius: "50%", background: toggles[item.label] ? "var(--neon)" : "var(--text-dim)", transition: "all 0.2s" }} />
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span style={{ fontFamily: MONO, fontSize: "11px", color: "var(--neon)" }}>{item.value}</span>
                  <Icon name="ChevronDown" size={12} style={{ color: "var(--text-dim)" }} />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function SectionStats() {
  return (
    <div className="animate-slide-up space-y-4">
      <p style={{ fontFamily: MONO, fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em" }}>// Мониторинг производительности</p>
      <div className="surface-card rounded p-5" style={{ border: "1px solid var(--neon-border)", boxShadow: "0 0 20px rgba(0,255,136,0.1)" }}>
        <p style={{ fontFamily: MONO, fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em", marginBottom: "4px" }}>ТЕКУЩИЙ FPS</p>
        <div className="flex items-end gap-3">
          <FpsCounter target={72} />
          <span style={{ color: "var(--text-secondary)", fontSize: "13px", marginBottom: "4px", fontFamily: MONO }}>/ 120 max</span>
        </div>
        <div className="progress-bar mt-3"><div className="progress-fill" style={{ width: "60%" }} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "CPU", value: "34%", icon: "Cpu", sub: "Kirin 710F" },
          { label: "GPU", value: "61%", icon: "Layers", sub: "Mali-G51 MP4" },
          { label: "RAM", value: "2.1 GB", icon: "Database", sub: "из 6 GB" },
          { label: "Темп.", value: "48°C", icon: "Thermometer", sub: "Норма" },
        ].map((s) => (
          <div key={s.label} className="surface-card rounded p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name={s.icon} size={13} style={{ color: "var(--text-secondary)" }} />
              <span style={{ fontSize: "11px", color: "var(--text-secondary)", fontFamily: SANS }}>{s.label}</span>
            </div>
            <p style={{ fontFamily: MONO, fontSize: "22px", fontWeight: 700, color: "var(--neon)" }}>{s.value}</p>
            <p style={{ fontSize: "10px", color: "var(--text-dim)", marginTop: "2px", fontFamily: SANS }}>{s.sub}</p>
          </div>
        ))}
      </div>
      <div className="surface-card rounded p-4">
        <p style={{ fontFamily: MONO, fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em", marginBottom: "12px" }}>// История сессий</p>
        {[
          { game: "God of War (PSP)", emu: "PPSSPP", duration: "2ч 14м", avgFps: 60, date: "Сегодня" },
          { game: "GTA San Andreas", emu: "Winlator", duration: "45м", avgFps: 68, date: "Вчера" },
          { game: "Mario Kart Wii", emu: "Dolphin", duration: "1ч 10м", avgFps: 58, date: "31 мая" },
        ].map((row, i, arr) => (
          <div key={row.game} className="flex items-center justify-between py-2" style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--surface-3)" : "none" }}>
            <div>
              <p style={{ fontSize: "13px", color: "var(--text-primary)", fontFamily: SANS }}>{row.game}</p>
              <p style={{ fontFamily: MONO, fontSize: "10px", color: "var(--text-dim)" }}>{row.date} · {row.duration} · {row.emu}</p>
            </div>
            <span className="fps-badge">{row.avgFps} avg</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionAbout() {
  return (
    <div className="animate-slide-up space-y-4">
      <p style={{ fontFamily: MONO, fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em" }}>// О системе</p>

      <div className="surface-card rounded p-5" style={{ border: "1px solid var(--neon-border)", boxShadow: "0 0 20px rgba(0,255,136,0.08)" }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded flex items-center justify-center" style={{ border: "1px solid var(--neon-border)", background: "var(--neon-dim)" }}>
            <Icon name="Cpu" size={24} style={{ color: "var(--neon)" }} />
          </div>
          <div>
            <p style={{ fontFamily: MONO, fontWeight: 700, color: "var(--neon)", fontSize: "18px" }}>EmuCore Launcher</p>
            <p style={{ fontFamily: MONO, fontSize: "10px", color: "var(--text-secondary)" }}>v1.0.0 · Полностью офлайн</p>
          </div>
        </div>
        {[
          { label: "Платформа", value: "Android 9+" },
          { label: "Целевой чип", value: "Kirin 710F" },
          { label: "Интернет", value: "Не требуется" },
          { label: "Реклама", value: "Отсутствует" },
        ].map((row, i, arr) => (
          <div key={row.label} className="flex justify-between py-2" style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--surface-3)" : "none" }}>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: SANS }}>{row.label}</span>
            <span style={{ fontFamily: MONO, fontSize: "11px", color: "var(--text-primary)" }}>{row.value}</span>
          </div>
        ))}
      </div>

      <div className="surface-card rounded p-4">
        <p style={{ fontFamily: MONO, fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em", marginBottom: "12px" }}>// Как установить эмулятор</p>
        <div className="space-y-3">
          {EMULATORS.map((emu) => (
            <div key={emu.id} className="flex items-center gap-3 rounded p-2 surface-card-hover cursor-pointer">
              <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{ background: `${emu.color}18`, border: `1px solid ${emu.color}44` }}>
                <Icon name={emu.icon} size={15} style={{ color: emu.color }} />
              </div>
              <div className="flex-1">
                <p style={{ fontSize: "13px", color: "var(--text-primary)", fontWeight: 600, fontFamily: SANS }}>{emu.name}</p>
                <p style={{ fontFamily: MONO, fontSize: "10px", color: "var(--text-dim)" }}>{emu.pkg}</p>
              </div>
              <div className={`status-dot ${emu.installed ? "" : "status-dot-red"}`} />
            </div>
          ))}
        </div>
        <div className="mt-3 p-3 rounded" style={{ background: "var(--surface-3)" }}>
          <p style={{ fontSize: "11px", color: "var(--text-secondary)", lineHeight: 1.5, fontFamily: SANS }}>
            Скачайте APK с официального сайта эмулятора и установите вручную. Интернет нужен только для первичной установки.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [active, setActive] = useState<Section>("home");

  const sections: Record<Section, React.ReactNode> = {
    home: <SectionHome />,
    library: <SectionLibrary />,
    controls: <SectionControls />,
    settings: <SectionSettings />,
    stats: <SectionStats />,
    about: <SectionAbout />,
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--surface)", fontFamily: SANS }}>
      <header style={{ position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", height: 48, borderBottom: "1px solid var(--surface-3)", background: "rgba(13,13,13,0.96)", backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-2">
          <div className="status-dot" />
          <span style={{ fontFamily: MONO, fontSize: "14px", fontWeight: 700, color: "var(--neon)" }}>EmuCore</span>
          <span style={{ fontFamily: MONO, fontSize: "10px", color: "var(--text-dim)" }}>OFFLINE</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="WifiOff" size={13} style={{ color: "var(--text-dim)" }} />
          <span style={{ fontFamily: MONO, fontSize: "10px", color: "var(--text-dim)" }}>NO NET</span>
        </div>
      </header>

      <main style={{ flex: 1, padding: "20px 16px 16px", maxWidth: 640, margin: "0 auto", width: "100%" }}>
        {sections[active]}
      </main>

      <nav style={{ position: "sticky", bottom: 0, zIndex: 50, borderTop: "1px solid var(--surface-3)", background: "rgba(13,13,13,0.97)", backdropFilter: "blur(10px)" }}>
        <div style={{ display: "flex", alignItems: "center", maxWidth: 640, margin: "0 auto" }}>
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => setActive(item.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "10px 4px", flex: 1, color: active === item.id ? "var(--neon)" : "var(--text-dim)", background: "transparent", border: "none", cursor: "pointer", transition: "color 0.2s", position: "relative" }}>
              <Icon name={item.icon} size={19} />
              <span style={{ fontFamily: MONO, fontSize: "8px", letterSpacing: "0.06em" }}>{item.label.toUpperCase()}</span>
              {active === item.id && (
                <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 28, height: 2, background: "var(--neon)", borderRadius: "1px 1px 0 0", boxShadow: "0 0 8px var(--neon)" }} />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
