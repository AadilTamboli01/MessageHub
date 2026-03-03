import aj from "../lib/acrjet.js"


export const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);
        console.log("Arcjet decision", decision);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {

                return res.status(429).json({ success: false, message: "Rate limit exceeded please try again later " });
            } else if (decision.reason.isBot()) {

                return res.status(403).json({ success: false, message: "Bot access denied " });
            } else {

                return res.status(403).json({ success: false, message: "Access denied by security policy" });
            }
        }

        next();
    } catch (error) {
        console.log("Error in the acrcjet protection route", error);
         res.status(500).json({
            success: false,
            message: "Security check failed"
        });
    }
}