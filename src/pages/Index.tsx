import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "library" | "controls" | "settings" | "stats" | "about";

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "library", label: "Игры", icon: "Gamepad2" },
  { id: "controls", label: "Ctrl", icon: "Keyboard" },
  { id: "settings", label: "Настройки", icon: "SlidersHorizontal" },
  { id: "stats", label: "FPS", icon: "BarChart2" },
  { id: "about", label: "О системе", icon: "Info" },
];

const QUICK_LAUNCHERS = [
  { name: "Win32 EXE", desc: "Эмуляция .exe файлов", icon: "Monitor", status: "active", fps: "60–90" },
  { name: "Xbox 360", desc: "XBLA / Disc образы", icon: "Gamepad2", status: "active", fps: "30–60" },
  { name: "DOS / Win9x", desc: "Ретро-приложения", icon: "Terminal", status: "beta", fps: "120+" },
];

const LIBRARY_GAMES = [
  { title: "Halo 3", platform: "XBOX360", size: "6.7 GB", fps: 60, compat: 94, genre: "Шутер" },
  { title: "GTA IV", platform: "WIN32", size: "16.0 GB", fps: 45, compat: 78, genre: "Экшн" },
  { title: "Forza Horizon", platform: "XBOX360", size: "8.2 GB", fps: 60, compat: 91, genre: "Гонки" },
  { title: "Far Cry 3", platform: "WIN32", size: "12.4 GB", fps: 55, compat: 85, genre: "Шутер" },
  { title: "Red Dead Redemption", platform: "XBOX360", size: "7.1 GB", fps: 30, compat: 72, genre: "Приключения" },
  { title: "Crysis 2", platform: "WIN32", size: "9.8 GB", fps: 40, compat: 80, genre: "Шутер" },
];

const CONTROL_PROFILES = [
  { name: "Стандартный Xbox", type: "ГЕЙМПАД", keys: 16, active: true },
  { name: "Сенсор + Гироскоп", type: "ТАЧСКРИН", keys: 12, active: false },
  { name: "Клавиатура WASD", type: "КЛАВИАТУРА", keys: 24, active: false },
  { name: "Мой профиль", type: "КАСТОМ", keys: 18, active: false },
];

const SETTINGS_GROUPS = [
  {
    group: "Графика",
    icon: "Layers",
    items: [
      { label: "Разрешение рендера", value: "1920×1080", type: "select" },
      { label: "Сглаживание (AA)", value: "FXAA", type: "select" },
      { label: "Вертикальная синхронизация", value: "Вкл", type: "toggle" },
      { label: "HDR-рендеринг", value: "Выкл", type: "toggle" },
    ],
  },
  {
    group: "Производительность",
    icon: "Cpu",
    items: [
      { label: "Ядра процессора", value: "4 / 8", type: "select" },
      { label: "Лимит FPS", value: "120", type: "select" },
      { label: "Оптимизация Kirin 710F", value: "Вкл", type: "toggle" },
      { label: "Тактирование GPU", value: "Авто", type: "select" },
    ],
  },
  {
    group: "Звук",
    icon: "Volume2",
    items: [
      { label: "Аудиобуфер", value: "256 сэмпл", type: "select" },
      { label: "Частота дискретизации", value: "48 000 Гц", type: "select" },
      { label: "Spatial Audio", value: "Выкл", type: "toggle" },
    ],
  },
];

function FpsCounter({ target }: { target: number }) {
  const [fps, setFps] = useState(target - 5);
  useEffect(() => {
    const id = setInterval(() => {
      setFps(target - 3 + Math.floor(Math.random() * 8));
    }, 800);
    return () => clearInterval(id);
  }, [target]);
  return (
    <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--neon)", fontSize: "2rem", fontWeight: 700 }}>{fps}</span>
  );
}

function SectionHome() {
  return (
    <div className="animate-slide-up space-y-5">
      <div className="relative overflow-hidden rounded p-5" style={{ border: "1px solid var(--neon-border)", boxShadow: "0 0 20px rgba(0,255,136,0.15)" }}>
        <div className="absolute inset-0 scan-line" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="status-dot" />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em" }}>EMUCORE v1.0.0 — ACTIVE</span>
          </div>
          <h1 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "2rem", fontWeight: 700, color: "var(--neon)", marginTop: "12px" }}>
            EmuCore<span className="cursor-blink" style={{ color: "var(--text-dim)" }}>_</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "13px", marginTop: "6px", lineHeight: 1.6 }}>
            Профессиональный эмулятор ПК (.exe) и Xbox 360 для Android.<br />
            Оптимизирован под Kirin 710F — Honor 9X.
          </p>
          <div className="flex gap-2 mt-4 flex-wrap">
            {["KIRIN 710F", "ARM64", "VULKAN 1.1", "NO INTERNET", "ANDROID 9+"].map((t) => (
              <span key={t} className="tag-chip">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em", marginBottom: "10px" }}>// Быстрый запуск</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {QUICK_LAUNCHERS.map((item) => (
            <div key={item.name} className="surface-card surface-card-hover rounded p-4 cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded flex items-center justify-center" style={{ background: "var(--neon-dim)", border: "1px solid var(--neon-border)" }}>
                  <Icon name={item.icon} size={18} style={{ color: "var(--neon)" }} />
                </div>
                <span className="fps-badge">{item.fps} FPS</span>
              </div>
              <p style={{ fontWeight: 600, fontSize: "13px", color: "var(--text-primary)" }}>{item.name}</p>
              <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px" }}>{item.desc}</p>
              <div className="flex items-center gap-2 mt-3">
                <div className={`status-dot ${item.status === "beta" ? "status-dot-yellow" : ""}`} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.1em" }}>
                  {item.status === "beta" ? "BETA" : "ГОТОВ"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em", marginBottom: "10px" }}>// Статус системы</p>
        <div className="surface-card rounded p-4 space-y-3">
          {[
            { label: "Ядро эмуляции", val: 88 },
            { label: "Совместимость DirectX", val: 74 },
            { label: "Драйвер Vulkan", val: 96 },
            { label: "Аудиосистема XAudio2", val: 91 },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex justify-between items-center mb-1">
                <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{row.label}</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "var(--neon)" }}>{row.val}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${row.val}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionLibrary() {
  const [filter, setFilter] = useState<"ALL" | "WIN32" | "XBOX360">("ALL");
  const filtered = filter === "ALL" ? LIBRARY_GAMES : LIBRARY_GAMES.filter((g) => g.platform === filter);

  return (
    <div className="animate-slide-up space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em" }}>// Библиотека игр</p>
        <div className="flex gap-1">
          {(["ALL", "WIN32", "XBOX360"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "10px",
                padding: "5px 12px",
                borderRadius: "3px",
                border: filter === f ? "1px solid var(--neon-border)" : "1px solid var(--surface-3)",
                background: filter === f ? "var(--neon-dim)" : "transparent",
                color: filter === f ? "var(--neon)" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((game) => (
          <div key={game.title} className="surface-card surface-card-hover rounded p-4 flex items-center gap-4 cursor-pointer">
            <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0" style={{ background: "var(--surface-3)" }}>
              <Icon name={game.platform === "XBOX360" ? "Gamepad2" : "Monitor"} size={20} style={{ color: "var(--text-secondary)" }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span style={{ fontWeight: 600, fontSize: "13px", color: "var(--text-primary)" }}>{game.title}</span>
                <span className="tag-chip">{game.platform}</span>
                <span className="tag-chip">{game.genre}</span>
              </div>
              <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px" }}>{game.size}</p>
            </div>
            <div className="text-right flex-shrink-0 space-y-1">
              <div className="fps-badge">{game.fps} FPS</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "var(--text-secondary)", textAlign: "right" }}>{game.compat}% compat</div>
            </div>
            <Icon name="ChevronRight" size={16} style={{ color: "var(--text-dim)", flexShrink: 0 }} />
          </div>
        ))}
      </div>

      <div
        className="surface-card rounded p-4 flex items-center gap-3 cursor-pointer group"
        style={{ border: "2px dashed var(--surface-3)", transition: "border-color 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--neon-border)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--surface-3)")}
      >
        <div className="w-10 h-10 rounded flex items-center justify-center" style={{ background: "var(--surface-3)" }}>
          <Icon name="FolderOpen" size={20} style={{ color: "var(--text-secondary)" }} />
        </div>
        <div>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>Добавить игру / приложение</p>
          <p style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Поддерживаются .exe, .xex, .iso, .img</p>
        </div>
      </div>
    </div>
  );
}

function SectionControls() {
  const [activeProfile, setActiveProfile] = useState(0);
  return (
    <div className="animate-slide-up space-y-4">
      <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em" }}>// Профили управления</p>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {CONTROL_PROFILES.map((p, i) => (
          <div
            key={p.name}
            onClick={() => setActiveProfile(i)}
            className="surface-card rounded p-4 cursor-pointer"
            style={{
              border: activeProfile === i ? "1px solid var(--neon-border)" : "1px solid var(--surface-3)",
              boxShadow: activeProfile === i ? "0 0 12px rgba(0,255,136,0.1)" : "none",
              transition: "all 0.2s",
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p style={{ fontWeight: 600, fontSize: "13px", color: "var(--text-primary)" }}>{p.name}</p>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "var(--text-secondary)", marginTop: "2px", letterSpacing: "0.08em" }}>{p.type}</p>
              </div>
              <div style={{
                width: 20, height: 20, borderRadius: "50%",
                border: activeProfile === i ? "2px solid var(--neon)" : "2px solid var(--text-dim)",
                background: activeProfile === i ? "var(--neon-dim)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {activeProfile === i && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--neon)" }} />}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Icon name="Keyboard" size={13} style={{ color: "var(--text-secondary)" }} />
              <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{p.keys} кнопок назначено</span>
            </div>
          </div>
        ))}
      </div>

      <div className="surface-card rounded p-4">
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em", marginBottom: "14px" }}>// Раскладка кнопок Xbox 360</p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { key: "A", color: "#4ade80" },
            { key: "B", color: "#f87171" },
            { key: "X", color: "#60a5fa" },
            { key: "Y", color: "#facc15" },
            { key: "LB", color: "#999" },
            { key: "RB", color: "#999" },
            { key: "LT", color: "#666" },
            { key: "RT", color: "#666" },
            { key: "START", color: "#888" },
            { key: "BACK", color: "#888" },
            { key: "LS", color: "#555" },
            { key: "RS", color: "#555" },
          ].map((btn) => (
            <button
              key={btn.key}
              style={{
                borderRadius: "3px",
                border: "1px solid var(--surface-3)",
                padding: "8px 4px",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "11px",
                fontWeight: 700,
                color: btn.color,
                background: "transparent",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = btn.color; e.currentTarget.style.background = `${btn.color}15`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--surface-3)"; e.currentTarget.style.background = "transparent"; }}
            >
              {btn.key}
            </button>
          ))}
        </div>
        <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "10px" }}>Нажмите кнопку для переназначения</p>
      </div>
    </div>
  );
}

function SectionSettings() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "Вертикальная синхронизация": true,
    "HDR-рендеринг": false,
    "Оптимизация Kirin 710F": true,
    "Spatial Audio": false,
  });

  return (
    <div className="animate-slide-up space-y-4">
      <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em" }}>// Настройки эмуляции</p>

      {SETTINGS_GROUPS.map((group) => (
        <div key={group.group} className="surface-card rounded overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid var(--surface-3)" }}>
            <Icon name={group.icon} size={14} style={{ color: "var(--neon)" }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", color: "var(--text-secondary)" }}>{group.group.toUpperCase()}</span>
          </div>
          <div>
            {group.items.map((item, idx) => (
              <div
                key={item.label}
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: idx < group.items.length - 1 ? "1px solid var(--surface-3)" : "none" }}
              >
                <span style={{ fontSize: "13px", color: "var(--text-primary)" }}>{item.label}</span>
                {item.type === "toggle" ? (
                  <button
                    onClick={() => setToggles((prev) => ({ ...prev, [item.label]: !prev[item.label] }))}
                    style={{
                      width: 42, height: 24, borderRadius: 12,
                      border: toggles[item.label] ? "1px solid var(--neon-border)" : "1px solid var(--text-dim)",
                      background: toggles[item.label] ? "var(--neon-dim)" : "transparent",
                      position: "relative", cursor: "pointer", transition: "all 0.2s",
                    }}
                  >
                    <div style={{
                      position: "absolute", top: 2,
                      left: toggles[item.label] ? 20 : 2,
                      width: 18, height: 18, borderRadius: "50%",
                      background: toggles[item.label] ? "var(--neon)" : "var(--text-dim)",
                      transition: "all 0.2s",
                    }} />
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "var(--neon)" }}>{item.value}</span>
                    <Icon name="ChevronDown" size={12} style={{ color: "var(--text-dim)" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionStats() {
  return (
    <div className="animate-slide-up space-y-4">
      <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em" }}>// Мониторинг производительности</p>

      <div className="surface-card rounded p-5" style={{ border: "1px solid var(--neon-border)", boxShadow: "0 0 20px rgba(0,255,136,0.12)" }}>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em", marginBottom: "4px" }}>ТЕКУЩИЙ FPS</p>
        <div className="flex items-end gap-3">
          <FpsCounter target={72} />
          <span style={{ color: "var(--text-secondary)", fontSize: "13px", marginBottom: "4px", fontFamily: "'IBM Plex Mono', monospace" }}>/ 120 max</span>
        </div>
        <div className="progress-bar mt-3">
          <div className="progress-fill" style={{ width: "60%" }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Загрузка CPU", value: "34%", icon: "Cpu", sub: "Kirin 710F × 4 ядра" },
          { label: "Загрузка GPU", value: "61%", icon: "Layers", sub: "Mali-G51 MP4" },
          { label: "Использование RAM", value: "2.1 GB", icon: "Database", sub: "из 6 GB" },
          { label: "Температура", value: "48°C", icon: "Thermometer", sub: "Норма < 65°C" },
        ].map((s) => (
          <div key={s.label} className="surface-card rounded p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name={s.icon} size={13} style={{ color: "var(--text-secondary)" }} />
              <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{s.label}</span>
            </div>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "22px", fontWeight: 700, color: "var(--neon)" }}>{s.value}</p>
            <p style={{ fontSize: "10px", color: "var(--text-dim)", marginTop: "2px" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="surface-card rounded p-4">
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em", marginBottom: "12px" }}>// История сессий</p>
        <div className="space-y-2">
          {[
            { game: "Halo 3", duration: "2ч 14м", avgFps: 58, date: "Сегодня" },
            { game: "GTA IV", duration: "45м", avgFps: 42, date: "Вчера" },
            { game: "Crysis 2", duration: "1ч 30м", avgFps: 38, date: "31 мая" },
          ].map((row, i, arr) => (
            <div
              key={row.game + row.date}
              className="flex items-center justify-between py-2"
              style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--surface-3)" : "none" }}
            >
              <div>
                <p style={{ fontSize: "13px", color: "var(--text-primary)" }}>{row.game}</p>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "var(--text-dim)" }}>{row.date} · {row.duration}</p>
              </div>
              <span className="fps-badge">{row.avgFps} avg</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionAbout() {
  return (
    <div className="animate-slide-up space-y-4">
      <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em" }}>// О системе</p>

      <div className="surface-card rounded p-5" style={{ border: "1px solid var(--neon-border)", boxShadow: "0 0 20px rgba(0,255,136,0.1)" }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded flex items-center justify-center" style={{ border: "1px solid var(--neon-border)", background: "var(--neon-dim)" }}>
            <Icon name="Cpu" size={24} style={{ color: "var(--neon)" }} />
          </div>
          <div>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, color: "var(--neon)", fontSize: "20px" }}>EmuCore</p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "var(--text-secondary)" }}>Version 1.0.0-alpha · Build 2026.06.01</p>
          </div>
        </div>
        <div className="space-y-0">
          {[
            { label: "Платформа", value: "Android 9+ (API 28+)" },
            { label: "Целевой чип", value: "HiSilicon Kirin 710F" },
            { label: "Архитектура", value: "ARM64-v8a" },
            { label: "Рендер", value: "Vulkan 1.1 / OpenGL ES 3.2" },
            { label: "Аудио", value: "XAudio2 эмуляция" },
            { label: "DirectX", value: "DirectX 9 / 11 (трансляция)" },
          ].map((row, i, arr) => (
            <div
              key={row.label}
              className="flex justify-between py-2"
              style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--surface-3)" : "none" }}
            >
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{row.label}</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "var(--text-primary)" }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="surface-card rounded p-4">
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em", marginBottom: "10px" }}>// Поддерживаемые форматы</p>
        <div className="flex flex-wrap gap-2">
          {[".exe", ".xex", ".iso", ".img", ".xiso", ".dll", ".cab", ".msi"].map((ext) => (
            <span key={ext} className="tag-chip">{ext}</span>
          ))}
        </div>
      </div>

      <div className="surface-card rounded p-4">
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.15em", marginBottom: "12px" }}>// Техподдержка</p>
        <div className="space-y-2">
          {[
            { icon: "MessageSquare", label: "Telegram-сообщество", sub: "@emucore_support" },
            { icon: "Bug", label: "Сообщить об ошибке", sub: "Встроенный баг-трекер" },
            { icon: "BookOpen", label: "Документация", sub: "Оффлайн-справка v1.0" },
          ].map((item) => (
            <div key={item.label} className="surface-card-hover flex items-center gap-3 rounded p-2 cursor-pointer">
              <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: "var(--surface-3)" }}>
                <Icon name={item.icon} size={15} style={{ color: "var(--text-secondary)" }} />
              </div>
              <div>
                <p style={{ fontSize: "13px", color: "var(--text-primary)" }}>{item.label}</p>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "var(--text-dim)" }}>{item.sub}</p>
              </div>
            </div>
          ))}
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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--surface)", fontFamily: "'Golos Text', sans-serif" }}>
      {/* Top bar */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px", height: 48,
        borderBottom: "1px solid var(--surface-3)",
        background: "rgba(13,13,13,0.96)", backdropFilter: "blur(8px)",
      }}>
        <div className="flex items-center gap-2">
          <div className="status-dot" />
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "14px", fontWeight: 700, color: "var(--neon)", letterSpacing: "-0.02em" }}>EmuCore</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "var(--text-dim)" }}>v1.0</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="fps-badge">72 FPS</span>
          <div className="flex items-center gap-1.5">
            <Icon name="WifiOff" size={13} style={{ color: "var(--text-dim)" }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "var(--text-dim)" }}>OFFLINE</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={{ flex: 1, padding: "20px 16px 16px", maxWidth: 640, margin: "0 auto", width: "100%" }}>
        {sections[active]}
      </main>

      {/* Bottom navigation */}
      <nav style={{
        position: "sticky", bottom: 0, zIndex: 50,
        borderTop: "1px solid var(--surface-3)",
        background: "rgba(13,13,13,0.97)", backdropFilter: "blur(10px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", maxWidth: 640, margin: "0 auto" }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                padding: "10px 4px", flex: 1,
                color: active === item.id ? "var(--neon)" : "var(--text-dim)",
                background: "transparent", border: "none", cursor: "pointer",
                transition: "color 0.2s",
                position: "relative",
              }}
            >
              <Icon name={item.icon} size={19} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "8px", letterSpacing: "0.08em" }}>{item.label.toUpperCase()}</span>
              {active === item.id && (
                <div style={{
                  position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
                  width: 28, height: 2, background: "var(--neon)",
                  borderRadius: "1px 1px 0 0", boxShadow: "0 0 8px var(--neon)",
                }} />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}