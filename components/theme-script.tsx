export const THEME_STORAGE_KEY = "flow-web-theme"

export const themeInitScript = `(function(){try{var d=document.documentElement;var s=localStorage.getItem("${THEME_STORAGE_KEY}")||"system";var r=s==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):s;if(r==="dark"){d.classList.add("dark")}else{d.classList.remove("dark")}d.style.colorScheme=r}catch(e){}})();`

export function ThemeScript() {
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: themeInitScript }}
    />
  )
}