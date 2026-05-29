// Orange Beauty Studio — Tweaks panel
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#D4580A",
  "headingFont": "Playfair Display",
  "bodyFont": "Inter",
  "roundness": "soft",
  "warmth": "subtle"
}/*EDITMODE-END*/;

const HEADING_FONTS = {
  "Playfair Display": '"Playfair Display", Georgia, serif',
  "Cormorant Garamond": '"Cormorant Garamond", Georgia, serif',
  "DM Serif Display": '"DM Serif Display", Georgia, serif'
};
const BODY_FONTS = {
  "Inter": '"Inter", system-ui, sans-serif',
  "Manrope": '"Manrope", system-ui, sans-serif'
};
const ROUND = {
  "sharp":  { r: "12px", rs: "10px" },
  "soft":   { r: "26px", rs: "16px" },
  "round":  { r: "38px", rs: "22px" }
};
// derive a soft peach tint + lighter orange from the chosen accent
function tints(hex){
  return {
    accent2: `color-mix(in oklab, ${hex} 78%, #ffd9a0)`,
    soft: `color-mix(in oklab, ${hex} 16%, #FAF6F1)`
  };
}
const WARM = {
  "subtle": "#F6ECE0",
  "warm":   "color-mix(in oklab, var(--accent) 12%, #FAF6F1)"
};

function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const root = document.documentElement.style;
    const ti = tints(t.accent);
    root.setProperty('--accent', t.accent);
    root.setProperty('--accent-2', ti.accent2);
    root.setProperty('--accent-soft', ti.soft);
    root.setProperty('--font-display', HEADING_FONTS[t.headingFont] || HEADING_FONTS["Playfair Display"]);
    root.setProperty('--font-body', BODY_FONTS[t.bodyFont] || BODY_FONTS["Inter"]);
    const rd = ROUND[t.roundness] || ROUND.soft;
    root.setProperty('--radius', rd.r);
    root.setProperty('--radius-sm', rd.rs);
    root.setProperty('--bg-warm', WARM[t.warmth] || WARM.subtle);
  }, [t]);

  return (
    <TweaksPanel>
      <TweakSection label="Колір" />
      <TweakColor label="Акцент" value={t.accent}
        options={["#D4580A", "#F07030", "#E2581C", "#C0451A", "#B5651D"]}
        onChange={(v) => setTweak('accent', v)} />
      <TweakRadio label="Теплота фону" value={t.warmth}
        options={["subtle", "warm"]}
        onChange={(v) => setTweak('warmth', v)} />

      <TweakSection label="Шрифти" />
      <TweakSelect label="Заголовки" value={t.headingFont}
        options={Object.keys(HEADING_FONTS)}
        onChange={(v) => setTweak('headingFont', v)} />
      <TweakRadio label="Текст" value={t.bodyFont}
        options={Object.keys(BODY_FONTS)}
        onChange={(v) => setTweak('bodyFont', v)} />

      <TweakSection label="Форма" />
      <TweakRadio label="Заокруглення" value={t.roundness}
        options={["sharp", "soft", "round"]}
        onChange={(v) => setTweak('roundness', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<App />);
