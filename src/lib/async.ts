export async function waitUntil(conditionFunction: () => boolean, everyMs: number, untilMs: number | null = null): Promise<boolean> {
    return await new Promise((resolve, _) => {
        let attempts = 0;

        const interval = setInterval(() => {
            attempts++;

            if (untilMs && attempts * everyMs >= untilMs) {
                resolve(false);
                clearInterval(interval);
            }

            if (conditionFunction()) {
                resolve(true);
                clearInterval(interval);
            }
        }, everyMs);
    });
}

export async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchWithRetry(input: string | URL | Request, init?: RequestInit & { attempts?: number; }): Promise<Response> {
    const method = init?.method ?? "GET";
    const maxAttempts = init?.attempts ?? 4;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            if (attempt > 1) {
                console.log(`RETRY FETCH: attempt ${attempt} to ${method} ${input}`);
            }

            const response = await fetch(input, init);
            if (!response.ok) {
                throw `invalid status ${response.status}: ${method} ${input}`;
            }

            return response;
        } catch (error) {
            if (attempt >= maxAttempts) {
                throw error;
            }

            await sleep(1_000);
            continue;
        }
    }

    return fetch(input, init);
}