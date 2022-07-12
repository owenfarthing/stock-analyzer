import { useEffect } from "react"
import { useRouter } from "next/router";

const LabRoutes = () => {
    const router = useRouter();

    useEffect(() => {
        // If latest experiment available, load latest
        // Redirect to latest stage

        // Else
        router.push(router.query.expId + '/create-experiment');
    }, [])
}

export default LabRoutes;