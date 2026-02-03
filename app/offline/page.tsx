export const metadata = {
  title: "Offline | Aman Group of Companies",
  description: "You are offline. Some content may be unavailable.",
}

export default function OfflinePage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-12">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-3xl font-bold">You are offline</h1>
        <p className="text-muted-foreground">
          It looks like you do not have an internet connection. You can still browse
          cached pages and use the calculator. Please reconnect to see the latest listings.
        </p>
      </div>
    </div>
  )
}
