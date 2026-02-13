const EMBED_PREFIXES = ["embed:", "iframe:"]

const toSafeHttpUrl = (raw: string): string | null => {
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
  if (!match?.[1]) return null
  return match[1].trim()
}

const stripEmbedPrefix = (raw: string): string => {
  const trimmed = raw.trim()
  const lower = trimmed.toLowerCase()
  for (const prefix of EMBED_PREFIXES) {
    if (lower.startsWith(prefix)) {
      return trimmed.slice(prefix.length).trim()
    }
  }
  return trimmed
}

const normalizeRawUrl = (raw: string): string => {
  const withoutPrefix = stripEmbedPrefix(raw)
  const iframeSrc = extractIframeSrc(withoutPrefix)
  return iframeSrc ?? withoutPrefix
}

export const extractGoogleDriveFileId = (raw: string): string | null => {
  try {
    const normalized = normalizeRawUrl(raw)
    const url = new URL(normalized)
    if (!url.hostname.includes("drive.google.com")) return null

    const path = url.pathname
    const fileMatch = path.match(/\/file\/d\/([^/]+)/)
    if (fileMatch?.[1]) return fileMatch[1]

    if (path.endsWith("/uc")) {
      const ucId = url.searchParams.get("id")
      if (ucId) return ucId
    }

    const queryId = url.searchParams.get("id")
    if (queryId) return queryId

    return null
  } catch {
    return null
  }
}

export const extractYouTubeVideoId = (raw: string): string | null => {
  try {
    const normalized = normalizeRawUrl(raw)
    const url = new URL(normalized)
    const host = url.hostname.toLowerCase()
    const path = url.pathname

    if (host.includes("youtu.be")) {
      const id = path.split("/").filter(Boolean)[0]
      return id || null
    }

    if (host.includes("youtube.com")) {
      const embedMatch = path.match(/\/embed\/([^/?]+)/)
      if (embedMatch?.[1]) return embedMatch[1]
      const v = url.searchParams.get("v")
      if (v) return v
    }
  } catch {
    return null
  }
  return null
}

export const toEmbeddableVideoUrl = (raw: string | null | undefined): string | null => {
  if (!raw?.trim()) return null
  const normalized = normalizeRawUrl(raw)
  const lower = normalized.toLowerCase()

  const youtubeId = extractYouTubeVideoId(normalized)
  if (youtubeId) {
    return toSafeHttpUrl(`https://www.youtube.com/embed/${youtubeId}`)
  }

  const driveId = extractGoogleDriveFileId(normalized)
  if (driveId) {
    return toSafeHttpUrl(`https://drive.google.com/file/d/${driveId}/preview`)
  }

  if (lower.includes("player.vimeo.com/video/") || lower.includes("vimeo.com/")) {
    try {
      const url = new URL(normalized)
      const id = url.pathname.split("/").filter(Boolean).pop()
      if (id) return toSafeHttpUrl(`https://player.vimeo.com/video/${id}`)
    } catch {
      return null
    }
  }

  if (lower.endsWith(".mp4") || lower.endsWith(".webm")) {
    return toSafeHttpUrl(normalized)
  }

  if (lower.includes("/embed/")) {
    return toSafeHttpUrl(normalized)
  }

  return null
}

export const toFloorPlanPdfUrl = (raw: string | null | undefined): string | null => {
  if (!raw?.trim()) return null
  const normalized = normalizeRawUrl(raw)
  const safeUrl = toSafeHttpUrl(normalized)
  if (safeUrl) return safeUrl
  return `https://drive.google.com/file/d/${normalized}/view`
}

export const toImagePreviewUrl = (raw: string | null | undefined): string | null => {
  if (!raw?.trim()) return null
  const normalized = normalizeRawUrl(raw)

  const driveId = extractGoogleDriveFileId(normalized)
  if (driveId) {
    return `https://drive.google.com/thumbnail?id=${driveId}&sz=w1600`
  }

  const youtubeId = extractYouTubeVideoId(normalized)
  if (youtubeId) {
    return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
  }

  const safeUrl = toSafeHttpUrl(normalized)
  return safeUrl
}
