"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { Languages } from "lucide-react"
import { useLocale } from "next-intl"
import { useParams } from "next/navigation"
import { useTransition } from "react"

type Locale = (typeof routing.locales)[number]

const localeLabels: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
}

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const locale = useLocale() as Locale
  const [isPending, startTransition] = useTransition()

  function onSelectChange(nextLocale: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript validates that only known `params` are
        // used in combination with a given `pathname`. Since the two always
        // match for the current route, runtime checks can be skipped.
        { pathname, params },
        { locale: nextLocale }
      )
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            disabled={isPending}
            aria-label="Switch Language"
          >
            <Languages className="size-4" />
            <span className="sr-only">Switch Language</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(value: Locale) => onSelectChange(value)}
        >
          {routing.locales.map((item) => (
            <DropdownMenuRadioItem
              key={item}
              value={item}
              disabled={isPending}
              className="flex items-center justify-center gap-2.5 ps-2"
            >
              <span className="text-[0.625rem] leading-none text-foreground/60 uppercase">
                {item}
              </span>
              <span>{localeLabels[item as Locale] ?? item.toUpperCase()}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
