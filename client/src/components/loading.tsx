export default function Loading({loading}: {loading: boolean}) {
    return(
        <>
            {loading && (
                <div className="flex items-center justify-center w-full">
                <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading...</p>
                </div>
                </div>
            )}
        </>
    )
}