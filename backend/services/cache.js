import NodeCache from 'node-cache';

const cache = new NodeCache({
    stdTTL: parseInt(process.env.CACHE_TTL) || 3600, // 1 hour default
    checkperiod: 600, // Check for expired keys every 10 minutes
    useClones: false,
});

export const getCachedTactic = (key) => {
    return cache.get(key);
};

export const setCachedTactic = (key, value, ttl) => {
    return cache.set(key, value, ttl);
};

export const generateCacheKey = (input) => {
    return `tactic_${input.formation}_${input.playstyle}_${input.squadLevel}_${input.opponentStyle}`;
};

export default cache;
