// vite-plugin-environment exposes env vars as process.env.*
export const isDemoMode = process.env.VITE_DEMO_MODE === 'true'

export default isDemoMode
