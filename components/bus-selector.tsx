import Image from "next/image"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface BusSelectorProps {
  id: string
  value: string
  title: string
  description: string
  price: string
  imageSrc: string
}

export function BusSelector({ id, value, title, description, price, imageSrc }: BusSelectorProps) {
  return (
    <div className="relative">
      <RadioGroupItem value={value} id={id} className="peer sr-only" />
      <Label
        htmlFor={id}
        className="flex flex-col sm:flex-row items-start gap-4 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-rose-600 [&:has([data-state=checked])]:border-rose-600"
      >
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          width={200}
          height={100}
          className="rounded-md object-cover w-full sm:w-24 h-auto"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="font-medium">{title}</p>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="text-right">
              <div className="font-semibold text-rose-600">{price}</div>
              <div className="text-xs text-muted-foreground">per person</div>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {value === "standard" && (
              <>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  Economical
                </span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  Regular
                </span>
              </>
            )}
            {value === "ac" && (
              <>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  Air Conditioned
                </span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  Comfortable
                </span>
              </>
            )}
            {value === "panoramic" && (
              <>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  Transparent Roof
                </span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  Sightseeing
                </span>
              </>
            )}
          </div>
        </div>
      </Label>
    </div>
  )
}
