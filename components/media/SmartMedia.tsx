import Image from "next/image"

type SmartMediaProps = {
  src?: string | null
  alt: string
  className?: string
  embedClassName?: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  priority?: boolean
  fallbackSrc?: string
}

const EMBED_PREFIXES = ["embed:", "iframe:"]

const extractGoogleDriveId = (raw: string): string | null => {
  try {
    const url = new URL(raw)
    if (!url.hostname.includes("drive.google.com")) {
      return null
    }

    const path = url.pathname

    const fileMatch = path.match(/\/file\/d\/([^/]+)/)
    if (fileMatch?.[1]) {
      return fileMatch[1]
    }

    const ucMatch = path.match(/\/uc$/)
    if (ucMatch) {
      const ucId = url.searchParams.get("id")
      if (ucId) {
        return ucId
      }
    }

    const openId = url.searchParams.get("id")
    if (openId) {
      return openId
    }

    return null
  } catch {
    return null
  }
}

const normalizeImageUrl = (raw: string): string => {
  const driveId = extractGoogleDriveId(raw)
  if (driveId) {
    return `https://drive.google.com/thumbnail?id=${driveId}&sz=w1600`
  }

  return raw
}

const toSafeEmbedUrl = (raw: string): string | null => {
  try {
    const url = new URL(raw)
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null
    }
    return url.toString()
  } catch {
    return null
  }
}

const extractIframeSrc = (raw: string): string | null => {
  const match = raw.match(/<iframe[^>]*\s+src=["']([^"']+)["'][^>]*>/i)
  if (!match?.[1]) {
    return null
  }
  return match[1].trim()
}

const toEmbedSrc = (raw: string): string | null => {
  const trimmed = raw.trim()
  for (const prefix of EMBED_PREFIXES) {
    if (trimmed.toLowerCase().startsWith(prefix)) {
      const candidate = trimmed.slice(prefix.length).trim()
      return toSafeEmbedUrl(candidate)
    }
  }

  const iframeSrc = extractIframeSrc(trimmed)
  if (iframeSrc) {
    return toSafeEmbedUrl(iframeSrc)
  }

  const lower = trimmed.toLowerCase()

  if (lower.includes("youtube.com/embed/")) {
    return toSafeEmbedUrl(trimmed)
  }

  if (lower.includes("player.vimeo.com/video/")) {
    return toSafeEmbedUrl(trimmed)
  }

  if (lower.includes("google.com/maps/embed")) {
    return toSafeEmbedUrl(trimmed)
  }

  if (lower.includes("youtube.com/watch") || lower.includes("youtu.be/")) {
    try {
      if (lower.includes("youtu.be/")) {
        const id = trimmed.split("youtu.be/")[1]?.split(/[?&]/)[0]
        if (id) {
          return toSafeEmbedUrl(`https://www.youtube.com/embed/${id}`)
        }
      }
      const url = new URL(trimmed)
      const id = url.searchParams.get("v")
      if (id) {
        return toSafeEmbedUrl(`https://www.youtube.com/embed/${id}`)
      }
    } catch {
      return null
    }
  }

  if (lower.includes("vimeo.com/")) {
    const id = trimmed.split("vimeo.com/")[1]?.split(/[?&/]/)[0]
    if (id) {
      return toSafeEmbedUrl(`https://player.vimeo.com/video/${id}`)
    }
  }

  return null
}

export function SmartMedia({
  src,
  alt,
  className,
  embedClassName,
  width,
  height,
  fill,
  sizes,
  priority,
  fallbackSrc = "/placeholder.svg",
}: SmartMediaProps) {
  const normalized = src?.trim() ?? ""
  const embedSrc = normalized ? toEmbedSrc(normalized) : null

  if (embedSrc) {
    return (
      <iframe
        src={embedSrc}
        title={alt}
        className={embedClassName ?? className}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    )
  }

  const imageSrc = normalized || fallbackSrc
  const normalizedImageSrc = normalizeImageUrl(imageSrc)

  if (fill) {
    return (
      <Image
        src={normalizedImageSrc}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
      />
    )
  }

  return (
    <Image
      src={normalizedImageSrc}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  )
}
