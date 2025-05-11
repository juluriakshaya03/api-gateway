// import 
// import dotenv from 'dotenv';
// dotenv.config();

// export default createProxyMiddleware({
//   target: "http://localhost:5000",
//   changeOrigin: true,
//   pathRewrite: { '^/auth': '' },
//   logLevel: 'debug', // <-- this is safe
//   onError(err: { message: any; }, req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; error: any; }): void; new(): any; }; }; }) {
//     console.error('🔴 Proxy error:', err.message);
//     res.status(500).json({ message: 'Proxy error', error: err.message });
//   },
// } as any); // <== cast to 'any' to avoid TS error


// src/utils/createProxy.ts
import proxy from 'express-http-proxy';
import { Request } from 'express';

export function createProxy(target: string, serviceName: string,basePath: string = "") {
  return proxy(target, {
    proxyReqPathResolver: (req: Request) => {
      // Append original request URL (minus the base path)
      const newPath = req.path;
      return basePath + newPath;
    },
    userResDecorator: async (proxyRes, proxyResData, req) => {
      console.log(`[PROXY] ${req.method} ${req.originalUrl} -> ${target}${req.originalUrl}`);
      return proxyResData;
    },
    proxyErrorHandler(err, res, next) {
      console.error(`[PROXY ERROR]`, err.message);
      res.status(500).json({
        success: false,
        message: `${serviceName} service is not available`,
        status: "unavailable"
      });
    }
  });
}

 

