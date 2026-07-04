import { Alert, AlertDescription } from "./ui/alert"

export default function AlertMessages({error, success}: {error: string, success: string}) {
    return (
        <>
            {error && (
                <Alert className="mb-6 border-destructive">
                <AlertDescription className="text-destructive">{error}</AlertDescription>
                </Alert>
            )}
            
            {success && (
                <Alert className="mb-6 border-green-600 bg-green-500/10">
                <AlertDescription className="text-green-500">{success}</AlertDescription>
                </Alert>
            )}
        </>
    )
}