"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function useErrorBoundary() {
    const router = useRouter();
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (hasError) {
            router.push("/error-page");
        }
    }, [hasError, router]);

    const handleError = () => setHasError(true);

    return {
        hasError,
        handleError,
    };
}
