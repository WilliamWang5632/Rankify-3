export default function Loading({loading}: {loading: boolean}) {
    return(
        <>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                <div className="text-center">
                <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground text-lg">Loading...</p>
                </div>
                </div>
            )}
        </>
    )
}